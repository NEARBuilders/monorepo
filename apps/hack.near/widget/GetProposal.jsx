const accountId = context.accountId;
const daoId = props.daoId ?? "rc-dao.sputnik-dao.near";
const role = props.role ?? "voter";

State.init({
  daoId,
  proposals: [],
  lastProposalId: null,
  hasMore: true,
});

const loadProposals = () => {
  const lastProposalId =
    state.lastProposalId !== null
      ? state.lastProposalId
      : Near.view(daoId, "get_last_proposal_id");
  if (lastProposalId === null) return;

  if (state.proposals.length > 0 && state.proposals[0].id === lastProposalId)
    return;

  const fromIndex = Math.max(0, lastProposalId - proposalsPerPage + 1);
  const limit = fromIndex === 0 ? lastProposalId + 1 : proposalsPerPage;

  const newProposals = Near.view(daoId, "get_proposals", {
    from_index: fromIndex,
    limit: limit,
  });
  if (newProposals === null) return;

  console.log("Saving new proposals...");
  State.update({
    ...state,
    hasMore: fromIndex > 0,
    proposals: [...state.proposals, ...newProposals.reverse()],
    lastProposalId: fromIndex - 1,
  });
};

return (
  <Widget
    key={i}
    src="sking.near/widget/DAO.Proposal"
    props={{ daoId: state.daoId, proposalId: lastProposalId }}
  />
);
