return ({ env }) => {
  const contractId = env === "staging" ? "v1.staging.nadabot.near" : "v1.nadabot.near";

  const NadaBotSDK = {
    getContractId: () => contractId,
    isHuman: (accountId) => {
      return Near.view(contractId, "is_human", { account_id: accountId });
    },
  };
  return NadaBotSDK;
};
