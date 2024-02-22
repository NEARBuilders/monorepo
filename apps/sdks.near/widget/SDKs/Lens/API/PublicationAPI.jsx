const $ = VM.require(`sdks.near/widget/Loader`);
const { Publication } = $("@sdks/lens/queries#alpha");
const { PublicationMutations } = $("@sdks/lens/mutations#alpha");
const { Constants } = $("@sdks/lens/definitions#alpha");
const { ApiHelper } = $("@sdks/lens/utils#alpha");

const PublicationAPI = {
  fetch: (Client, publicationRequest) => {
    return Client.graphql(Publication.PUBLICATION_QUERY, {
      publicationRequest: ApiHelper.clean(publicationRequest),
    }).then((payload) => payload.body.data.publication || {});
  },
  fetchAll: (Client, publicationsRequest) => {
    return Client.graphql(Publication.PUBLICATIONS_QUERY, {
      publicationsRequest: ApiHelper.clean(publicationsRequest),
    }).then((payload) => {
      return {
        publications: payload.body.data.publications.items || [],
        pagination: payload.body.data.publications.pageInfo || {},
      };
    });
  },
  stats: (Client, publicationStatsRequest) => {
    return Client.graphql(Publication.PUBLICATION_STATS_QUERY, ApiHelper.clean({
      publicationRequest: {
        ...(ApiHelper.clean(publicationStatsRequest.publication || {}))
      },
      publicationStatsInputRequest: {
        ...(ApiHelper.clean(publicationStatsRequest.stats || {}))
      },
      publicationStatsCountOpenActionArgsRequest: {
        ...(ApiHelper.clean(publicationStatsRequest.openAction || {}))
      }
    })).then((payload) => {
      return payload.body.data.result || [];
    });
  },
  whoActed: (Client, whoActedOnPublicationRequest) => {
    return Client.graphql(Publication.WHO_ACTED_ON_PUBLICATION_QUERY, {
      whoActedOnPublicationRequest: ApiHelper.clean(whoActedOnPublicationRequest)
    }).then((payload) => {
      return {
        publications: payload.body.data.result.items || [],
        pagination: payload.body.data.result.pageInfo || {},
      };
    });
  },
  comments: (Client, publicationRequest) => {
    return Client.graphql(Publication.PUBLICATION_COMMENTS_QUERY, {
      publicationsRequest: {
        where: {
          commentOn: {
            id: publicationRequest.forId
          }
        }
      },
    }).then((payload) => {
      return {
        comments: payload.body.data.publications.items || [],
        pagination: payload.body.data.publications.pageInfo || {},
      };
    });
  },
  mirrors: (Client, publicationRequest) => {
    return Client.graphql(Publication.PUBLICATION_MIRRORS_QUERY, {
      publicationsRequest: {
        where: {
          mirrorOn: publicationRequest.forId
        }
      },
    }).then((payload) => {
      return {
        mirrors: payload.body.data.publications.items || [],
        pagination: payload.body.data.publications.pageInfo || {},
      };
    });
  },
  quotes: (Client, publicationRequest) => {
    return Client.graphql(Publication.PUBLICATION_QUOTES_QUERY, {
      publicationsRequest: {
        where: {
          quoteOn: publicationRequest.forId
        }
      },
    }).then((payload) => {
      return {
        quotes: payload.body.data.publications.items || [],
        pagination: payload.body.data.publications.pageInfo || {},
      };
    });
  },
  addReaction: (Client, publicationReactionRequest) => 
    PublicationAPI._react(Client, PublicationMutations.PUBLICATION_ADD_REACTION_MUTATION, publicationReactionRequest),
  removeReaction: (Client, publicationReactionRequest) => 
    PublicationAPI._react(Client, PublicationMutations.PUBLICATION_REMOVE_REACTION_MUTATION, publicationReactionRequest),
  fetchReaction: (Client, whoReactedPublicationRequest) => {
    return Client.graphql(Publication.WHO_REACTED_PUBLICATION_QUERY, {
      whoReactedPublicationRequest
    }).then((payload) => {
      return {
        profiles: payload.body.data.items || [],
        pagination: payload.body.data.pageInfo || {},
      };
    });
  },
  hide: (Client, hidePublicationRequest) => {
    return Client.graphql(PublicationMutations.HIDE_PUBLICATION_MUTATION, {
      hidePublicationRequest
    }).then((_) => true).catch((_) => false);
  },
  report: (Client, reportPublicationRequest) => {
    return Client.graphql(PublicationMutations.REPORT_PUBLICATION_MUTATION, {
      reportPublicationRequest
    }).then((_) => true).catch((_) => false);
  },
  _react: (Client, reactionMutation, publicationReactionRequest) => {
    return Client.graphql(reactionMutation, {
      publicationReactionRequest
    }).then((_) => true).catch((_) => false);
  },
};

return PublicationAPI;