const accountId = context.accountId;
const memberId = props.memberId ?? context.accountId;
const roleId = props.roleId ?? "community";
const daoId = props.daoId ?? "build.sputnik-dao.near";

if (!accountId) {
  return "";
}

const policy = Near.view(daoId, "get_policy");

if (policy === null) {
  return "";
}
const deposit = policy.proposal_bond;

const group = policy.roles
  .filter((role) => role.name === roleId)
  .map((role) => role.kind.Group);

State.init({
  isMember: false,
});

const handleProposal = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "add builder to DAO",
          kind: {
            AddMemberToRole: {
              member_id: memberId,
              role: roleId,
            },
          },
        },
      },
      gas: 219000000000000,
      deposit: deposit,
    },
  ]);
};

const groupMembers = group.join(", ");

const checkMembership = (groupMembers) => {
  if (groupMembers.indexOf(memberId) !== -1) {
    return State.update({ isMember: true });
  }
};

const validMember = checkMembership(groupMembers);

const proposals = Near.view(daoId, "get_proposals", {
  from_index: 0,
  limit: 88888,
});

if (proposals === null) {
  return "";
}

const checkProposals = (proposals) => {
  for (let i = 0; i < proposals.length; i++) {
    if (proposals[i].proposer === memberId) {
      return false;
    }
  }
  return true;
};

let canJoin = checkProposals(proposals);

return (
  <div>
    {canJoin ? (
      <button
        disabled={validMember}
        className="btn btn-success m-1"
        onClick={handleProposal}
      >
        Claim Builder Badge
      </button>
    ) : (
      <a
        className="btn btn-outline-success m-1"
        href="#/hack.near/widget/Academy"
      >
        Learn More
      </a>
    )}
  </div>
);
