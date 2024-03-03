const accountId = context.accountId;
const memberId = props.memberId ?? context.accountId;
const roleId = props.roleId ?? "voter";
const daoId = props.daoId ?? "rc-dao.sputnik-dao.near";

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

const proposals = Near.view(daoId, "get_proposals", {
  from_index: 0,
  limit: 888,
});

const af_proposals = Near.view(
  "africa-community.sputnik-dao.near",
  "get_proposals",
  { from_index: 0, limit: 888 }
);
const as_proposals = Near.view("asia.sputnik-dao.near", "get_proposals", {
  from_index: 0,
  limit: 888,
});
const au_proposals = Near.view("australia.sputnik-dao.near", "get_proposals", {
  from_index: 0,
  limit: 888,
});
const eu_proposals = Near.view("europe.sputnik-dao.near", "get_proposals", {
  from_index: 0,
  limit: 888,
});
const na_proposals = Near.view(
  "north-america.sputnik-dao.near",
  "get_proposals",
  { from_index: 0, limit: 888 }
);
const sa_proposals = Near.view(
  "south-america.sputnik-dao.near",
  "get_proposals",
  { from_index: 0, limit: 888 }
);

if (
  proposals === null ||
  af_proposals === null ||
  as_proposals === null ||
  au_proposals === null ||
  eu_proposals === null ||
  na_proposals === null ||
  sa_proposals === null
) {
  return "";
}

console.log(proposals);

const checkProposals = (proposals) => {
  for (let i = 0; i < proposals.length; i++) {
    if (proposals[i].proposer === memberId) {
      return false;
    }
  }
  return true;
};

let canJoin = checkProposals(proposals);
let canJoinContinent =
  checkProposals(af_proposals) &&
  checkProposals(as_proposals) &&
  checkProposals(au_proposals) &&
  checkProposals(eu_proposals) &&
  checkProposals(na_proposals) &&
  checkProposals(sa_proposals);

console.log(canJoin);
console.log(canJoinContinent);

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
              member_id: memberId,
              role: roleId,
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

// IAH Verification
let human = false;
const userSBTs = Near.view("registry.i-am-human.near", "sbt_tokens_by_owner", {
  account: memberId,
});

for (let i = 0; i < userSBTs.length; i++) {
  if ("fractal.i-am-human.near" == userSBTs[i][0]) {
    human = true;
  }
}

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
  max-width: 555px;
`;

return (
  <div>
    <ButtonContainer>
      {!validMember && canJoin && (
        <button
          disabled={!human}
          className="btn btn-success m-1"
          onClick={handleProposal}
        >
          Join DAO
        </button>
      )}
      {!validMember && !canJoin && (
        <button disabled={!canJoin} className="btn btn-success m-1">
          Pending
        </button>
      )}
      {validMember && !canJoin && (
        <button disabled={validMember} className="btn btn-success m-1">
          Joined
        </button>
      )}
      <a
        className="btn btn-outline-success m-1"
        href="#/hack.near/widget/verified.members"
      >
        Members
      </a>
    </ButtonContainer>
    {!canJoinContinent && (
      <ButtonContainer>
        <h5 className="text-muted">Continental Group Selected</h5>
      </ButtonContainer>
    )}
    {validMember && canJoinContinent && (
      <ButtonContainer>
        <h5>Select Your Home Continent:</h5>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Widget
            src="hack.near/widget/communities.regional"
            props={{
              daoId: "africa-community.sputnik-dao.near",
              name: "Africa",
              memberId: accountId,
              roleId,
            }}
          />
          <Widget
            src="hack.near/widget/communities.regional"
            props={{
              daoId: "asia.sputnik-dao.near",
              name: "Asia",
              memberId: accountId,
              roleId,
            }}
          />
          <Widget
            src="hack.near/widget/communities.regional"
            props={{
              daoId: "australia.sputnik-dao.near",
              name: "Australia",
              memberId: accountId,
              roleId,
            }}
          />
          <Widget
            src="hack.near/widget/communities.regional"
            props={{
              daoId: "europe.sputnik-dao.near",
              name: "Europe",
              memberId: accountId,
              roleId,
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Widget
            src="hack.near/widget/communities.regional"
            props={{
              daoId: "north-america.sputnik-dao.near",
              name: "North America",
              memberId: accountId,
              roleId,
            }}
          />
          <Widget
            src="hack.near/widget/communities.regional"
            props={{
              daoId: "south-america.sputnik-dao.near",
              name: "South America",
              memberId: accountId,
              roleId,
            }}
          />
        </div>
      </ButtonContainer>
    )}
  </div>
);
