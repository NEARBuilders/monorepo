const daoId = props.daoId ?? "multi.sputnik-dao.near";

const policy = Near.view(daoId, "get_policy");

if (policy == null) {
  return "";
}

const deposit = policy.proposal_bond;

const newPolicy = fetch("NEW POLICY_JSON_GOES_HERE");

const handleProposal = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "update policy",
          kind: {
            ChangePolicy: {
              policy: JSON.parse(newPolicy.body),
            },
          },
        },
      },
      deposit: deposit,
      gas: "219000000000000",
    },
  ]);
};

return (
  <div className="mb-3">
    <button className="btn text-light btn-info m-2" onClick={handleProposal}>
      Update Policy
    </button>
  </div>
);
