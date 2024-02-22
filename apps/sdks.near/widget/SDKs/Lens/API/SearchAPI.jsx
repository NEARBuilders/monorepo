const $ = VM.require(`sdks.near/widget/Loader`);
const { Search } = $("@sdks/lens/queries#alpha");
const { ApiHelper } = $("@sdks/lens/utils#alpha");

return {
  profiles: (Client, profileSearchRequest) => {
    return Client.graphql(Search.PROFILE_SEARCH_QUERY, {
      profileSearchRequest: ApiHelper.clean(profileSearchRequest)
    }).then((payload) => {
      return {
        result: payload.body.data.searchProfiles.items || [],
        pagination: payload.body.data.searchProfiles.pageInfo || {},
      };
    });
  },
  publications: (Client, publicationSearchRequest) => {
    return Client.graphql(Search.PUBLICATION_SEARCH_QUERY, {
      publicationSearchRequest: ApiHelper.clean(publicationSearchRequest)
    }).then((payload) => {
      return {
        result: payload.body.data.result.items || [],
        pagination: payload.body.data.result.pageInfo || {},
      };
    });
  },
};
