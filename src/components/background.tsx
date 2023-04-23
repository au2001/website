import * as React from "react";
import { Random, MersenneTwister19937, createEntropy } from "random-js";

import * as styles from "./background.module.scss";

type Line = { from: Dot; to: Dot; ratio: number };
type Dot = { x: number; y: number; size: number; lines: Line[] };

export default function Background() {
  const [ready, setReady] = React.useState(false);
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const square = React.useMemo(
    () => width / Math.max(Math.floor(width / 80), 1),
    [width, height]
  );

  const entropy = React.useMemo(() => createEntropy(), []);
  const rngs = React.useMemo(() => {
    const rngs = [];

    let i = 0;
    for (let y = -square / 2; y < height + square; y += square)
      rngs.push(
        new Random(MersenneTwister19937.seedWithArray([...entropy, i++]))
      );

    return rngs;
  }, [height, square, entropy]);

  const dots = React.useMemo(() => {
    const dots: Dot[] = [];

    let i = 0;
    for (let y = -square / 2; y < height + square; y += square) {
      const rng = rngs[i++];

      for (let x = -square / 2; x < width + square; x += square) {
        dots.push({
          x: rng.real(x - square / 2, x + square / 2, true),
          y: rng.real(y - square / 2, y + square / 2, true),
          size: rng.real(4, 6, true),
          lines: [],
        });
      }
    }

    return dots;
  }, [width, height, square, rngs]);

  const lines = React.useMemo(() => {
    const lines: Line[] = [];

    for (let j = 1; j < dots.length; ++j) {
      const to = dots[j];

      for (let i = 0; i < j; ++i) {
        const from = dots[i];

        const reach = (from.size + to.size) / 6;
        const ratio =
          (Math.pow(from.x - to.x, 2) + Math.pow(from.y - to.y, 2)) /
          Math.pow(square * reach, 2);
        if (ratio > 1) continue;

        const line = {
          from,
          to,
          ratio,
        };

        lines.push(line);

        from.lines.push(line);
        to.lines.push(line);
      }
    }

    for (let dot of dots) {
      if (dot.lines.length <= 5) continue;

      dot.lines
        .sort((a, b) => {
          if (a.from === dot && b.from !== dot) return 1;
          else if (a.from !== dot && b.from === dot) return -1;

          return a.ratio - b.ratio;
        })
        .slice(5)
        .map((line) => {
          line.from.lines.splice(line.from.lines.indexOf(line), 1);
          line.to.lines.splice(line.to.lines.indexOf(line), 1);
          lines.splice(lines.indexOf(line), 1);
        });
    }

    return lines;
  }, [dots, square]);

  React.useEffect(() => {
    function refresh() {
      setWidth(document.body.offsetWidth);
      setHeight(document.body.offsetHeight);
    }

    window.addEventListener("load", refresh, { once: true, passive: true });
    window.addEventListener("resize", refresh, { passive: true });
    refresh();

    setReady(true);

    return () => {
      window.removeEventListener("resize", refresh);
    };
  }, []);

  if (!ready) return null;

  return (
    <svg
      className={styles.background}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {dots.map((dot, i) => (
        <circle
          key={i}
          cx={dot.x}
          cy={dot.y}
          r={dot.size}
          fill="currentColor"
        />
      ))}

      {lines.map(({ from, to }, i) => (
        <line
          key={i}
          x1={from.x}
          y1={from.y}
          x2={to.x}
          y2={to.y}
          stroke="currentColor"
          strokeWidth={1}
        />
      ))}
    </svg>
  );
}
