const accountId = props.accountId ?? context.accountId;

const daoId = props.daoId ?? "build.sputnik-dao.near";
const roleId = props.roleId ?? "community";

const authorId = props.authorId ?? "hack.near";
const proposalId = props.proposalId ?? 1;

const proposal = Near.view(daoId, "get_proposal", {
  id: JSON.parse(proposalId),
});

if (proposal === null) {
  return "";
}

const tag = props.tag ?? "build";

const postUrl = props.postUrl ?? `https://near.social?hashtag=${tag}`;

State.init({
  isMember: false,
});

const policy = Near.view(daoId, "get_policy");

if (!policy) {
  return "";
}

const group = policy.roles
  .filter((role) => role.name === roleId)
  .map((role) => role.kind.Group);

const groupMembers = group.join(", ");

const checkMembership = (groupMembers) => {
  if (groupMembers.indexOf(accountId) !== -1) {
    return State.update({ isMember: true });
  }
};

const validMember = checkMembership(groupMembers);

// check if user can vote
const canVote = accountId && proposal.votes[accountId] !== "Approve";

// // SBT verification
// let isVerified = false;
// const userSBTs = Near.view("registry.i-am-human.near", "sbt_tokens_by_owner", {
//   account: accountId,
// });

// for (let i = 0; i < userSBTs.length; i++) {
//   if ("fractal.i-am-human.near" == userSBTs[i][0]) {
//     isVerified = true;
//   }
// }

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
    <Widget src="near/widget/AccountProfile" props={{ accountId: authorId }} />
    <a className="btn flex-fill btn-outline-primary " href={postUrl}>
      Discuss
    </a>
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
  </Card>
);
