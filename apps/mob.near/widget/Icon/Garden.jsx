return (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 300 200"
    width="300"
    height="200"
  >
    {/* Sky */}
    <rect x="0" y="0" width="300" height="200" fill="#87CEEB" />

    {/* Grass */}
    <rect x="0" y="150" width="300" height="50" fill="#228B22" />

    {/* Sun */}
    <circle cx="30" cy="30" r="20" fill="#FFD700" />

    {/* Trees */}
    <g fill="#228B22">
      {/* Tree 1 */}
      <circle cx="100" cy="110" r="30" />
      <rect x="95" y="140" width="10" height="30" />

      {/* Tree 2 */}
      <circle cx="200" cy="110" r="30" />
      <rect x="195" y="140" width="10" height="30" />
    </g>

    {/* Flowers */}
    <g fill="red">
      {/* Flower 1 */}
      <circle cx="140" cy="150" r="5" />
      {/* Flower 2 */}
      <circle cx="180" cy="150" r="5" />
      {/* Flower 3 */}
      <circle cx="220" cy="150" r="5" />
    </g>
  </svg>
);
