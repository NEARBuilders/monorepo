const colors = {
  yellow500: "#eca227",
  seablue500: "#51FFEA",
  blue500: "#51B6FF",
  bg1: "#000000",
  bg2: "#23242B",
  black100: "#000000",
  black50: "Black/50",
  white100: "#FFFFFF",
  white50: "White/50",
  error: "#FD2A5C",
  success: "#38C793",
  warning: "#F17B2C",
};

Storage.set("theme", { colors });

const theme = Storage.get("theme");

return { theme };
