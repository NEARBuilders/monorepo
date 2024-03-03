const daoId = props.daoId ?? "rc-dao.sputnik-dao.near";
const limit = parseInt(props.limit) || 1;

if (!daoId) {
  return "";
}

const daoVersion = Near.view(daoId, "version");
if (!daoVersion) {
  return "";
}

const config = Near.view(daoId, "get_config");
const policy = Near.view(daoId, "get_policy");
const lastProposalId = Near.view(daoId, "get_last_proposal_id");

let proposals = [];

if (lastProposalId) {
  proposals =
    Near.view(daoId, "get_proposals", {
      from_index: Math.max(0, lastProposalId - limit),
      limit,
    }) || [];
  proposals.reverse();
}

return (
  <div className="mt-3">
    <h5>Most Recent Proposal</h5>
    {proposals.map((proposal, i) => (
      <div key={proposal.id} className="mb-3">
        <Widget
          src="hack.near/widget/profile.human"
          props={{ accountId: proposal.proposer, daoId }}
        />
      </div>
    ))}
  </div>
);
