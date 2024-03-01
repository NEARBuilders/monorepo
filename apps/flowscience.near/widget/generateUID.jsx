// replace with keccak256() sha-256 hashing algo
// use content of attestation to generate UID
// ensures all attestations are unique & have unique IDs
function generateUID() {
  const length = 42; // This will create a 168-bit number (42 hexadecimal characters)
  // randomly change the case of a character
  const randomCase = (char) =>
    Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
  // Generate a random hexadecimal number and convert it to a string
  let uid = "";
  for (let i = 0; i < length; i++) {
    const randomChar = Math.floor(Math.random() * 16).toString(16); // Generate a single random hexadecimal character
    uid += randomCase(randomChar); // Append the character in either case to the UID
  }
  return uid;
}

return { generateUID };
