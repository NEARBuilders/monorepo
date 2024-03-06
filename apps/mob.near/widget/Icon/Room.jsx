return (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    width="200"
    height="200"
  >
    {/* Room background */}
    <rect x="0" y="0" width="200" height="200" fill="#E0E0E0" />

    {/* Window */}
    <rect
      x="130"
      y="20"
      width="40"
      height="60"
      fill="#9DC3FF"
      stroke="black"
      strokeWidth="2"
    />
    <rect x="150" y="20" width="2" height="60" fill="black" />
    <rect x="130" y="50" width="40" height="2" fill="black" />

    {/* Table */}
    <rect
      x="30"
      y="100"
      width="120"
      height="10"
      fill="#8B4513"
      stroke="black"
      strokeWidth="2"
    />
    <rect
      x="40"
      y="110"
      width="10"
      height="40"
      fill="#8B4513"
      stroke="black"
      strokeWidth="2"
    />
    <rect
      x="130"
      y="110"
      width="10"
      height="40"
      fill="#8B4513"
      stroke="black"
      strokeWidth="2"
    />

    {/* Items on the table */}
    {/* Laptop */}
    <rect
      x="40"
      y="80"
      width="50"
      height="20"
      fill="#666"
      stroke="black"
      strokeWidth="2"
    />
    <rect
      x="45"
      y="75"
      width="40"
      height="5"
      fill="#333"
      stroke="black"
      strokeWidth="2"
    />

    {/* Coffee cup */}
    <circle
      cx="100"
      cy="95"
      r="5"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
    <rect
      x="97"
      y="90"
      width="6"
      height="10"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />

    {/* Book */}
    <rect
      x="110"
      y="90"
      width="30"
      height="10"
      fill="#FFA500"
      stroke="black"
      strokeWidth="2"
    />
    <text x="112" y="98" fontSize="8" fill="black">
      REKT
    </text>
  </svg>
);
