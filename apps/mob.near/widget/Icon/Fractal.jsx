const SierpinskiTrianglePath = ({ x, y, size, depth, maxDepth }) => {
  if (depth >= maxDepth) {
    return null;
  }

  const halfSize = size / 2;

  const points = `${x},${y} ${x + size},${y} ${x + size / 2},${y + size}`;

  return (
    <g>
      <path d={`M${points}Z`} fill="none" stroke="black" />
      {SierpinskiTrianglePath({
        x,
        y,
        size: halfSize,
        depth: depth + 1,
        maxDepth,
      })}
      {SierpinskiTrianglePath({
        x: x + halfSize,
        y,
        size: halfSize,
        depth: depth + 1,
        maxDepth,
      })}
      {SierpinskiTrianglePath({
        x: x + halfSize / 2,
        y: y + halfSize,
        size: halfSize,
        depth: depth + 1,
        maxDepth,
      })}
    </g>
  );
};

const SierpinskiTriangle = ({ size, depth }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
    >
      {SierpinskiTrianglePath({ x: 0, y: 0, size, depth: 0, maxDepth: depth })}
    </svg>
  );
};

return SierpinskiTriangle({ size: 200, depth: 6 });
