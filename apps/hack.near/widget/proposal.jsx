const daoId = props.daoId ?? "rc-dao.sputnik-dao.near";
const proposalId = props.proposalId;

// if proposal is not provided and proposalId and daoId are provided then fetch proposal
let new_proposal = Near.view(daoId, "get_proposal", {
  id: Number(proposalId),
});
if (new_proposal) {
  proposal = new_proposal;
} else if (new_proposal === null) {
  return "Loading...";
} else {
  return "Proposal not found, check console for details.";
}

proposal.type =
  typeof proposal.kind === "string"
    ? proposal.kind
    : Object.keys(proposal.kind)[0];
proposal.type = proposal.type.replace(/([A-Z])/g, " $1").trim(); // Add spaces between camelCase

proposal.status = proposal.status.replace(/([A-Z])/g, " $1").trim(); // Add spaces between camelCase

const Wrapper = styled.div`
  background-color: ${statusBackgroundColor};
  margin: 16px auto;
  max-width: 900px;
  border-radius: 16px;
  padding: 24px;
  box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-height: 500px;

  p {
    line-height: 1.4;
    font-weight: 400;
    font-size: 15px;
    color: #868682;
    margin: 0;
  }

  h3 {
    font-weight: 600;
    font-size: 24px;
    color: #1b1b18;
  }

  h5 {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.2;
    color: #6c757d;
  }

  .status {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.2;
    color: ${statusColor};
  }
`;

return (
  <Wrapper>
    <h5>Proposal ID: {proposal.id}</h5>

    <div>
      <h5>Proposer</h5>
      <Widget
        src="mob.near/widget/Profile.ShortInlineBlock"
        props={{ accountId: proposal.proposer, tooltip: true }}
      />
    </div>
  </Wrapper>
);
