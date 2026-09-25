import { Random, MersenneTwister19937, createEntropy } from "random-js";
import * as xml from "xmlbuilder2";
import * as fs from "fs";
import * as path from "path";

// One dot per square of side this number of pixels
const SQUARE_UNIT = 80;

// Size of the SVG to generate
// Higher values = less repetitive pattern, but bigger file size
// Current values are 2560x1440 which should cover most desktop screens
const WIDTH = SQUARE_UNIT * 32;
const HEIGHT = SQUARE_UNIT * 18;

// Number of decimals in final SVG coordinates
const PRECISION = 0;

// Path where to save the resulting SVG file
const PATH = "public/images/background.svg";

// Colors of the network and of the route highlighted through it
const COLOR = "#cde7f6";
const ACCENT = "#f9d0cd";

// The home page highlights a route through the network, next to the hero text
// It goes from ROUTE_FROM to ROUTE_TO, through dots at most ROUTE_WIDTH / 2 away
// The page centers the SVG, so these land to the right of the centered content
// The blog's featured post card is also centered on this route, in its styles
const ROUTE_FROM = { x: 1633, y: 557 };
const ROUTE_TO = { x: 1896, y: 237 };
const ROUTE_WIDTH = SQUARE_UNIT * 2;

// Path where to save the route, kept separate so the page can hide it
const ROUTE_PATH = "public/images/background-route.svg";

type Point = { x: number; y: number };
type Dot = { id: number; x: number; y: number; size: number; lines: Line[] };
type Line = { id: number; from: Dot; to: Dot; ratio: number };

// Generate entropy partially based on the current hour (discarding minutes/seconds/milliseconds)
const entropy = [Math.floor(Date.now() / (60 * 60 * 1000)), ...createEntropy()];
const rng = new Random(MersenneTwister19937.seedWithArray(entropy));

const dots: Dot[] = [];

// Generate one dot per square at a random position inside it
let dotCount = 0;
for (let y = SQUARE_UNIT / 2; y < HEIGHT; y += SQUARE_UNIT) {
  for (let x = SQUARE_UNIT / 2; x < WIDTH; x += SQUARE_UNIT) {
    dots.push({
      id: dotCount++,
      x: rng.real(x - SQUARE_UNIT / 2, x + SQUARE_UNIT / 2, true),
      y: rng.real(y - SQUARE_UNIT / 2, y + SQUARE_UNIT / 2, true),
      size: rng.real(4, 6, true),
      lines: [],
    });
  }
}

// Replicate the same dots in each adjacing screen for the pattern to tile correctly
for (const dy of [-HEIGHT, 0, HEIGHT]) {
  for (const dx of [-WIDTH, 0, WIDTH]) {
    if (dx === 0 && dy === 0) continue;

    // Only replicate the real dots
    for (const dot of dots.slice(0, dotCount)) {
      dots.push({
        id: dot.id,
        x: dot.x + dx,
        y: dot.y + dy,
        size: dot.size,
        lines: [],
      });
    }
  }
}

dots.sort((a, b) => a.id - b.id);

let lines: Line[] = [];

// Connect dots which are "close" to eachother with lines to create a network
for (let i = 0; i < dots.length - 1; ++i) {
  let from = dots[i];

  for (let j = i + 1; j < dots.length; ++j) {
    let to = dots[j];

    // The distance at which dots connect is proportional to their size
    const reach = (from.size + to.size) / 6;
    const ratio =
      (Math.pow(from.x - to.x, 2) + Math.pow(from.y - to.y, 2)) /
      Math.pow(SQUARE_UNIT * reach, 2);
    if (ratio > 1) continue;

    const line = {
      id: from.id + to.id * dotCount,
      from,
      to,
      ratio,
    };

    lines.push(line);
    from.lines.push(line);
    to.lines.push(line);
  }
}

// If there are more than 5 lines going out of a node,
// only keep the links to the 5 "closest" dots.
const hidden = new Set<number>();
for (const dot of dots) {
  dot.lines.sort((a, b) => a.ratio - b.ratio);

  while (dot.lines.filter(({ id }) => !hidden.has(id)).length > 5) {
    const line = dot.lines.findLast(({ id }) => !hidden.has(id));
    hidden.add(line!.id);
  }
}

// TODO: If some dots have no line left, rebalance

function distance(a: Point, b: Point) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

// Distance from a point to the segment going from ROUTE_FROM to ROUTE_TO
function distanceToRoute(point: Point) {
  const dx = ROUTE_TO.x - ROUTE_FROM.x;
  const dy = ROUTE_TO.y - ROUTE_FROM.y;
  const t =
    ((point.x - ROUTE_FROM.x) * dx + (point.y - ROUTE_FROM.y) * dy) /
    (dx * dx + dy * dy);
  const clamped = Math.max(0, Math.min(1, t));
  return distance(point, {
    x: ROUTE_FROM.x + clamped * dx,
    y: ROUTE_FROM.y + clamped * dy,
  });
}

function isOnRoute(dot: Dot) {
  return distanceToRoute(dot) <= ROUTE_WIDTH / 2;
}

// Shortest path along visible lines from a dot to the dot closest to ROUTE_TO
// Lines cost their squared length, which favors routes with more, shorter hops
function findRoute(start: Dot) {
  const costs = new Map<Dot, number>([[start, 0]]);
  const previous = new Map<Dot, Dot>();
  const visited = new Set<Dot>();
  const queue = [start];

  while (queue.length > 0) {
    queue.sort((a, b) => costs.get(a)! - costs.get(b)!);
    const dot = queue.shift()!;
    if (visited.has(dot)) continue;
    visited.add(dot);

    for (const line of dot.lines) {
      if (hidden.has(line.id)) continue;

      const next = line.from === dot ? line.to : line.from;
      if (!isOnRoute(next)) continue;

      const cost = costs.get(dot)! + Math.pow(distance(dot, next), 2);
      if (cost >= (costs.get(next) ?? Infinity)) continue;

      costs.set(next, cost);
      previous.set(next, dot);
      queue.push(next);
    }
  }

  let end = start;
  for (const dot of Array.from(visited)) {
    if (distance(dot, ROUTE_TO) < distance(end, ROUTE_TO)) end = dot;
  }

  const route = [end];
  while (route[0] !== start) route.unshift(previous.get(route[0])!);
  return route;
}

// Try the few dots closest to ROUTE_FROM, and keep the route going the furthest
const route = dots
  .filter(isOnRoute)
  .sort((a, b) => distance(a, ROUTE_FROM) - distance(b, ROUTE_FROM))
  .slice(0, 3)
  .map(findRoute)
  .reduce((best, candidate) =>
    distance(candidate[candidate.length - 1], ROUTE_TO) <
    distance(best[best.length - 1], ROUTE_TO)
      ? candidate
      : best,
  );

const svg = xml
  .create()
  .ele("http://www.w3.org/2000/svg", "svg")
  .att("width", WIDTH.toFixed())
  .att("height", HEIGHT.toFixed())
  .att("fill", COLOR)
  .att("fill-opacity", "0.28");

for (const dot of dots) {
  // Ignore fully out-of-screen dots
  if (dot.x < -dot.size) continue;
  if (dot.x > WIDTH + dot.size) continue;
  if (dot.y < -dot.size) continue;
  if (dot.y > HEIGHT + dot.size) continue;

  svg
    .ele("circle")
    .att("cx", dot.x.toFixed(PRECISION))
    .att("cy", dot.y.toFixed(PRECISION))
    .att("r", dot.size.toFixed(PRECISION));
}

let linepaths = [];
for (const line of lines) {
  // Ignore fully out-of-screen lines
  if (line.from.x < 0 && line.to.x < 0) continue;
  if (line.from.x > WIDTH && line.to.x > WIDTH) continue;
  if (line.from.y < 0 && line.to.y < 0) continue;
  if (line.from.y > HEIGHT && line.to.y > HEIGHT) continue;
  if (hidden.has(line.id)) continue;

  // TODO: Compress SVG path instructions with:
  // - relative commands
  // - include dot circles in path
  // - travelling salesman problem
  const x1 = line.from.x.toFixed(PRECISION);
  const y1 = line.from.y.toFixed(PRECISION);
  const x2 = line.to.x.toFixed(PRECISION);
  const y2 = line.to.y.toFixed(PRECISION);
  linepaths.push(`M${x1} ${y1}L${x2} ${y2}`);
}

svg
  .ele("path")
  .att("stroke", COLOR)
  .att("stroke-opacity", "0.14")
  .att("d", linepaths.join(""));

const text = svg.end({ headless: true });
fs.writeFileSync(path.join(__dirname, "..", PATH), text);

const routeSvg = xml
  .create()
  .ele("http://www.w3.org/2000/svg", "svg")
  .att("width", WIDTH.toFixed())
  .att("height", HEIGHT.toFixed())
  .att("fill", ACCENT);

const routepath = route.map((dot, i) => {
  const x = dot.x.toFixed(PRECISION);
  const y = dot.y.toFixed(PRECISION);
  return `${i === 0 ? "M" : "L"}${x} ${y}`;
});

routeSvg
  .ele("path")
  .att("fill", "none")
  .att("stroke", ACCENT)
  .att("stroke-opacity", "0.85")
  .att("stroke-width", "1.5")
  .att("d", routepath.join(""));

for (const dot of route) {
  routeSvg
    .ele("circle")
    .att("cx", dot.x.toFixed(PRECISION))
    .att("cy", dot.y.toFixed(PRECISION))
    .att("r", "5.5");
}

const routeText = routeSvg.end({ headless: true });
fs.writeFileSync(path.join(__dirname, "..", ROUTE_PATH), routeText);
