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

const svg = xml
  .create()
  .ele("http://www.w3.org/2000/svg", "svg")
  .att("width", WIDTH.toFixed())
  .att("height", HEIGHT.toFixed())
  .att("fill", "#fff");

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

svg.ele("path").att("stroke", "#fff").att("d", linepaths.join(""));

const text = svg.end({ headless: true });
fs.writeFileSync(path.join(__dirname, "..", PATH), text);
