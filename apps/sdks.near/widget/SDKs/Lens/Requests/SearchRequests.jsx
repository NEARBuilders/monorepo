const $ = VM.require("sdks.near/widget/Loader");
const { Constants } = $("@sdks/lens/definitions#alpha");
const { PublicationFilters } = $("@sdks/lens/filters#alpha");

const PROFILE_SEARCH_WHERE = {
  customFilters: ["GARDENERS"]
};

const PUBLICATION_SEARCH_WHERE = {
  customFilters: ["GARDENERS"],
  metadata: PublicationFilters.METADATA_FILTERS,
  publicationTypes: []
};

const PROFILE_SEARCH_REQUEST = {
  limit: Constants.API_REQUEST_LIMITS.TEN,
  cursor: "",
  where: PROFILE_SEARCH_WHERE,
  query: ""
};

const PUBLICATION_SEARCH_REQUEST = {
  limit: Constants.API_REQUEST_LIMITS.TEN,
  cursor: "",
  where: PUBLICATION_SEARCH_WHERE,
  query: ""
};

return {
  PROFILE_SEARCH_REQUEST,
  PUBLICATION_SEARCH_REQUEST,
  PROFILE_SEARCH_WHERE,
  PUBLICATION_SEARCH_WHERE
};
