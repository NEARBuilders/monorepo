const accountId = context.accountId;
const memberId = props.memberId ?? "hack.near";
const roleId = props.roleId ?? "community";
const daoId = props.daoId ?? "multi.sputnik-dao.near";

if (!accountId) {
  return null;
}

const policy = Near.view(daoId, "get_policy");
const deposit = policy.proposal_bond;

const group = policy.roles
  .filter((role) => role.name === roleId)
  .map((role) => role.kind.Group);

State.init({
  isAccount: false,
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

const validMember = groupMembers.indexOf(memberId) !== -1;
const validAccount = memberId.indexOf(".near") !== -1;

return (
  <div>
    <button
      disabled={validMember ?? !validAccount}
      className="btn btn-outline-success"
      onClick={handleProposal}
    >
      {roleId}
    </button>
  </div>
);
