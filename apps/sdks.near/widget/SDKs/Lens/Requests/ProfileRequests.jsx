const $ = VM.require(`sdks.near/widget/Loader`);
const { Constants } = $("@sdks/lens/definitions#alpha");

const CREATE_PROFILE_WITH_HANDLE_REQUEST = {
  handle: "",
  to: "",
};

const PROFILE_REQUEST = {
  forProfileId: "",
  forHandle: "",
};

const PROFILES_WHERE_REQUEST = {
  profileIds: [],
  ownedBy: [],
  handles: [],
  whoMirroredPublication: [],
  whoQuotedPublication: [],
  whoCommentedOn: [],
};

const PROFILES_REQUEST = {
  limit: Constants.API_REQUEST_LIMITS.TWENTY_FIVE,
  cursor: "",
  where: PROFILES_WHERE_REQUEST,
};

const FOLLOWERS_REQUEST = {
  limit: Constants.API_REQUEST_LIMITS.TWENTY_FIVE,
  cursor: "",
  of: "" // ProfileId
};

const FOLLOWING_REQUEST = {
  limit: Constants.API_REQUEST_LIMITS.TWENTY_FIVE,
  cursor: "",
  for: "" // ProfileId
};

const PROFILE_STATS_REQUEST = PROFILE_REQUEST;

const PROFILE_RECOMMENDATIONS_REQUEST = {
  for: "",
};

const PROFILE_INTERESTS_REQUEST = PROFILE_REQUEST;

const REPORT_PROFILE_REQUEST = {
  for: "",
  reason: {}, // ProfileReportingReasonInput
  additionalComments: "",
};

const BLOCK_PROFILE_REQUEST = {
  profiles: [],
};

const PROFILE_ACTION_HISTORY_REQUEST = {
  limit: Constants.API_REQUEST_LIMITS.TWENTY_FIVE,
};

const PROFILE_ONCHAIN_IDENTITY_REQUEST = PROFILE_REQUEST;

return {
  CREATE_PROFILE_WITH_HANDLE_REQUEST,
  PROFILE_REQUEST,
  PROFILES_WHERE_REQUEST,
  PROFILES_REQUEST,
  FOLLOWING_REQUEST,
  FOLLOWERS_REQUEST,
  PROFILE_STATS_REQUEST,
  PROFILE_RECOMMENDATIONS_REQUEST,
  PROFILE_INTERESTS_REQUEST,
  REPORT_PROFILE_REQUEST,
  BLOCK_PROFILE_REQUEST,
  PROFILE_ACTION_HISTORY_REQUEST,
  PROFILE_ONCHAIN_IDENTITY_REQUEST,
};
