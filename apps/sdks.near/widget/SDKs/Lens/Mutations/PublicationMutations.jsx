const PUBLICATION_ADD_REACTION_MUTATION = `
  mutation AddReaction($publicationReactionRequest: ReactionRequest!) {
    addReaction(request: $publicationReactionRequest)
  }
`;

const PUBLICATION_REMOVE_REACTION_MUTATION = `
  mutation RemoveReaction($publicationReactionRequest: ReactionRequest!) {
    removeReaction(request: $publicationReactionRequest)
  }
`;

const HIDE_PUBLICATION_MUTATION = `
  mutation HidePublication($hidePublicationRequest: HidePublicationRequest!) {
    result: hidePublication(request: $hidePublicationRequest)
  }
`;

const REPORT_PUBLICATION_MUTATION = `
  mutation ReportPublication($reportPublicationRequest: ReportPublicationRequest!) {
    reportPublication(request: $reportPublicationRequest)
  }
`;

return {
  PUBLICATION_ADD_REACTION_MUTATION,
  PUBLICATION_REMOVE_REACTION_MUTATION,
  HIDE_PUBLICATION_MUTATION,
  REPORT_PUBLICATION_MUTATION
};