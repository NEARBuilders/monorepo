const MAINNET_URL = "https://api-v2.lens.dev";
const TESTNET_URL = "https://api-v2-mumbai-live.lens.dev";
const JWT_TOKEN_LIFESPAN_SECONDS = 1800; // 30 min
const JWT_REFRESH_TOKEN_LIFESPAN_SECONDS = 604800; // 7 days
const RESPONSE_HEALTH_OK = "pong";
const RESPONSE_HEALTH_KO = "ponk";
const API_REQUEST_LIMITS = {
  TEN: "Ten",
  TWENTY_FIVE: "TwentyFive",
  FIFTY: "Fifty",
};

return {
  MAINNET_URL,
  TESTNET_URL,
  JWT_TOKEN_LIFESPAN_SECONDS,
  JWT_REFRESH_TOKEN_LIFESPAN_SECONDS,
  RESPONSE_HEALTH_OK,
  RESPONSE_HEALTH_KO,
  API_REQUEST_LIMITS,
};
