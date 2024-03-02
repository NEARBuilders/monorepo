const accountId = props.accountId ?? context.accountId;
const roleId = props.roleId ?? "community";
const daoId = props.daoId ?? "build.sputnik-dao.near";
const proposalId =
  props.proposalId ?? Near.view(daoId, "get_last_proposal_id") - 1;

if (!accountId) {
  return "";
}

State.init({
  isMember: false,
});

// get DAO policy, deposit, and group
const policy = Near.view(daoId, "get_policy");

if (policy === null) {
  return "";
}

const deposit = policy.proposal_bond;

const group = policy.roles
  .filter((role) => role.name === roleId)
  .map((role) => role.kind.Group);

// get data from last proposal
const proposal = Near.view(daoId, "get_proposal", {
  id: proposalId,
});

if (proposal === null) {
  return "";
}

// check if the potential member submitted last proposal
const canJoin = accountId && accountId !== proposal.proposer;

const handleJoin = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: `add ${accountId} to the ${roleId} group`,
          kind: {
            AddMemberToRole: {
              member_id: accountId,
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
  if (groupMembers.indexOf(accountId) !== -1) {
    return State.update({ isMember: true });
  }
};

const validMember = checkMembership(groupMembers);

// check if the potential member is connected
const connectEdge = Social.keys(
  `${accountId}/graph/connect/${daoId}`,
  undefined,
  {
    values_only: true,
  }
);

const loading = connectEdge === null || inverseEdge === null;
const isConnected = connectEdge && Object.keys(connectEdge).length;

return (
  <div>
    {!isConnected ? (
      <Widget src="hack.near/widget/dao.connect" props={{ daoId }} />
    ) : (
      <>
        {!validMember ? (
          <>
            {canJoin ? (
              <button
                className="btn btn-success m-1 rounded-5"
                onClick={handleJoin}
              >
                Join
              </button>
            ) : (
              <>
                <button
                  disabled={!canJoin}
                  className="btn btn-success m-1 rounded-5"
                >
                  Pending
                </button>
              </>
            )}
          </>
        ) : (
          <>
            <button
              disabled={validMember}
              className="btn btn-success m-1 rounded-5"
            >
              Joined
            </button>
          </>
        )}
      </>
    )}
  </div>
);
