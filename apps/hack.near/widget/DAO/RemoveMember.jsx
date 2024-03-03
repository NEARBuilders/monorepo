const accountId = context.accountId;
const memberId = props.memberId;
const roleId = props.roleId;
const daoId = props.daoId ?? "multi.sputnik-dao.near";

const policy = Near.view(daoId, "get_policy");
const deposit = policy.proposal_bond;

const handleProposal = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "remove DAO member",
          kind: {
            RemoveMemberFromRole: {
              member_id: memberId,
              role: roleId ?? "council",
            },
          },
        },
      },
      gas: 219000000000000,
      deposit: deposit,
    },
  ]);
};

return (
  <div>
    <button className="btn btn-outline-danger" onClick={handleProposal}>
      Propose Removal
    </button>
  </div>
);
