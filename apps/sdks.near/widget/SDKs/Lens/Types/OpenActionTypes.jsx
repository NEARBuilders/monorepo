const MODULE_TYPE = {
  SIMPLE_COLLECT: "SimpleCollectOpenActionModule",
  MULTIRECIPIENT_FEE_COLLECT: "MultirecipientFeeCollectOpenActionModule",
  UNKNOWN: "UnknownOpenActionModule",
  LEGACY_LIMITED_FEE_COLLECT: "LegacyLimitedFeeCollectModule",
  LEGACY_FEE_COLLECT: "LegacyFeeCollectModule",
  LEGACY_LIMITED_TIMED_FEE_COLLECT: "LegacyLimitedTimedFeeCollectModule",
  LEGACY_TIMED_FEE_COLLECT: "LegacyTimedFeeCollectModule",
  LEGACY_AAVE_FEE_COLLECT: "LegacyAaveFeeCollectModule",
  LEGACY_REVERT_COLLECT: "LegacyRevertCollectModule",
  LEGACY_FREE_COLLECT: "LegacyFreeCollectModule",
  LEGACY_MULTIRECIPIENT_FEE_COLLECT: "LegacyMultirecipientFeeCollectModule",
  LEGACY_ERC4626_FEE_COLLECT: "LegacyERC4626FeeCollectModule",
  LEGACY_SIMPLE_COLLECT: "LegacySimpleCollectModule",
};

const CATEGORY_TYPE = {
  COLLECT: "COLLECT",
};

const FILTER = {
    address: "",
    type: "",
    category: ""
};

return {
  MODULE_TYPE,
  CATEGORY_TYPE,
  FILTER,
};
