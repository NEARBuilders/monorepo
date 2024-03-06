return (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    width="200"
    height="200"
  >
    {/* SpongeBob's body */}
    <rect
      x="40"
      y="60"
      width="120"
      height="100"
      fill="yellow"
      stroke="black"
      strokeWidth="2"
      rx="10"
      ry="10"
    />

    {/* SpongeBob's legs */}
    <rect
      x="65"
      y="160"
      width="10"
      height="30"
      fill="brown"
      stroke="black"
      strokeWidth="2"
    />
    <rect
      x="125"
      y="160"
      width="10"
      height="30"
      fill="brown"
      stroke="black"
      strokeWidth="2"
    />

    {/* SpongeBob's shoes */}
    <rect
      x="60"
      y="190"
      width="20"
      height="10"
      fill="black"
      stroke="black"
      strokeWidth="2"
    />
    <rect
      x="120"
      y="190"
      width="20"
      height="10"
      fill="black"
      stroke="black"
      strokeWidth="2"
    />

    {/* SpongeBob's eyes */}
    <circle
      cx="75"
      cy="70"
      r="12"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
    <circle
      cx="125"
      cy="70"
      r="12"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />

    {/* SpongeBob's pupils */}
    <circle cx="75" cy="70" r="6" fill="blue" />
    <circle cx="125" cy="70" r="6" fill="blue" />

    {/* SpongeBob's mouth */}
    <path
      d="M 70 90 Q 100 110 130 90"
      fill="none"
      stroke="black"
      strokeWidth="2"
    />

    {/* SpongeBob's tie */}
    <path
      d="M 90 100 L 110 100 L 100 120 Z"
      fill="red"
      stroke="black"
      strokeWidth="2"
    />

    {/* SpongeBob's left collar */}
    <path
      d="M 85 100 L 95 80 L 105 100 Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />

    {/* SpongeBob's right collar */}
    <path
      d="M 115 100 L 105 80 L 95 100 Z"
      fill="white"
      stroke="black"
      strokeWidth="2"
    />
  </svg>
);
