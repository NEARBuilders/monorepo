const accountId = context.accountId;
const memberId = props.memberId ?? "hack.near";
const roleId = props.roleId ?? "community";
const daoId = props.daoId ?? "multi.sputnik-dao.near";

if (!accountId) {
  return "";
}

const policy = Near.view(daoId, "get_policy");
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
          description: "add member to DAO",
          kind: {
            AddMemberToRole: {
              member_id: memberId ?? accountId,
              role: roleId ?? "council",
            },
          },
        },
      },
      gas: 300000000000000,
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

return (
  <div>
    <button
      disabled={validMember}
      className="btn btn-outline-success"
      onClick={handleProposal}
    >
      {roleId}
    </button>
  </div>
);
