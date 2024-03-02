const accountId = context.accountId;
const memberId = props.memberId ?? context.accountId;

const daoId = props.daoId ?? "rc-dao.sputnik-dao.near";
const groupId = props.groupId ?? "community";

const candidateId = props.candidateId ?? "multi.near";
const proposalId = props.proposalId ?? 41;

const proposal = Near.view(daoId, "get_proposal", {
  id: JSON.parse(proposalId),
});

if (proposal === null) {
  return "";
}

const postUrl =
  props.postUrl ?? "https://social.near.page/p/rc-dao.near/94244727";

State.init({
  isMember: false,
});

const policy = Near.view(daoId, "get_policy");

if (!policy) {
  return "";
}

const group = policy.roles
  .filter((role) => role.name === groupId)
  .map((role) => role.kind.Group);

const groupMembers = group.join(", ");

const checkMembership = (groupMembers) => {
  if (groupMembers.indexOf(memberId) !== -1) {
    return State.update({ isMember: true });
  }
};

const validMember = checkMembership(groupMembers);

// check if account can vote
const canVote = accountId && proposal.votes[memberId] !== "Approve";

// SBT verification
let human = false;
const userSBTs = Near.view("registry.i-am-human.near", "sbt_tokens_by_owner", {
  account: memberId,
});

for (let i = 0; i < userSBTs.length; i++) {
  if ("fractal.i-am-human.near" == userSBTs[i][0]) {
    human = true;
  }
}

const handleApprove = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "act_proposal",
      args: {
        id: proposalId,
        action: "VoteApprove",
      },
      gas: 219000000000000,
    },
  ]);
};

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  width: 100%;
  border-radius: 9px;
  background: #fff;
  border: 1px solid #eceef0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  overflow: hidden;
  padding: 12px;
  margin: 0.555em;
`;

return (
  <Card>
    <Widget
      src="near/widget/AccountProfile"
      props={{ accountId: candidateId }}
    />
    <a className="btn flex-fill btn-outline-primary " href={postUrl}>
      Discuss
    </a>
    {human ? (
      <div className="m-1 d-flex flex-row gap-1">
        {canVote ? (
          <button className="btn flex-fill btn-success" onClick={handleApprove}>
            Vote
          </button>
        ) : (
          <button
            className="btn flex-fill btn-success"
            onClick={handleApprove}
            disabled={!canVote}
          >
            Voted
          </button>
        )}
      </div>
    ) : (
      <div className="m-1 d-flex flex-row gap-1">
        <Widget
          src="mob.near/widget/FollowButton"
          props={{ accountId: candidateId }}
        />
      </div>
    )}
  </Card>
);
