const $ = VM.require(`sdks.near/widget/Loader`);
const { Constants } = $("@sdks/lens/definitions#alpha");
const { PublicationFilters } = $("@sdks/lens/filters#alpha");

const PUBLICATION_REQUEST = {
  forId: "",
  forTxHash: "",
};

const PUBLICATIONS_WHERE_REQUEST = {
  publicationIds: [],
  from: [],
  publicationTypes: ["POST"],
  commentOn: {},
  mirrorOn: "",
  quoteOn: "",
  withOpenActions: [],
  actedBy: "",
  metadata: {},
  customFilters: ["GARDENERS"],
};

const PUBLICATIONS_REQUEST = {
  limit: Constants.API_REQUEST_LIMITS.TEN,
  cursor: "",
  where: PUBLICATIONS_WHERE_REQUEST,
};

const PUBLICATION_STATS_INPUT_REQUEST = {
  customFilters: ["GARDENERS"],
  metadata: PublicationFilters.METADATA_FILTERS
}

const PUBLICATION_STATS_REQUEST = {
  publication: PUBLICATION_REQUEST,
  stats: PUBLICATION_STATS_INPUT_REQUEST,
  openActions: {
    anyOf: [] // OpenActionFilter
  }
};

const WHO_ACTED_ON_PUBLICATION_REQUEST = {
  limit: Constants.API_REQUEST_LIMITS.TEN,
  cursor: "",
  on: "", // Publication ID
  where: {
    anyOf: [] // OpenActionFilter
  }
};

const PUBLICATION_REACTION_REQUEST = {
  reaction: "",
  for: ""
};

const WHO_REACTED_PUBLICATION_REQUEST = {
  limit: Constants.API_REQUEST_LIMITS.TEN,
  cursor: "",
  for: "",
  where: {
    anyOf: [] // PublicationReactionType
  }
};

const HIDE_PUBLICATION_REQUEST = {
  for: ""
};

const REPORT_PUBLICATION_REQUEST = {
  for: "",
  reason: {}, // ReportingReasonInput
  additionalComments: ""
};

return {
  PUBLICATION_REQUEST,
  PUBLICATIONS_WHERE_REQUEST,
  PUBLICATIONS_REQUEST,
  PUBLICATION_STATS_REQUEST,
  PUBLICATION_STATS_INPUT_REQUEST,
  WHO_ACTED_ON_PUBLICATION_REQUEST,
  PUBLICATION_REACTION_REQUEST,
  WHO_REACTED_PUBLICATION_REQUEST,
  HIDE_PUBLICATION_REQUEST,
  REPORT_PUBLICATION_REQUEST
};
