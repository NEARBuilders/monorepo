const $ = VM.require("sdks.near/widget/Loader");
const { PublicationTypes } = $("@sdks/lens/types#alpha");

const METADATA_CONTENT_WARNING_FILTERS = {
    oneOf: []
};

const METADATA_TAGS_FILTERS = {
    oneOf: [],
    all: []
};

const METADATA_FILTERS = {
    locale: "",
    contentWarning: METADATA_CONTENT_WARNING_FILTERS,
    mainContentFocus: PublicationTypes.METADATA_MAIN_FOCUS_TYPE,
    tags: METADATA_TAGS_FILTERS
}

return {
    METADATA_FILTERS,
    METADATA_TAGS_FILTERS,
    METADATA_CONTENT_WARNING_FILTERS
};