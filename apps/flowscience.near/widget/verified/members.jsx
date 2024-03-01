const accountId = context.accountId;
const memberId = props.memberId ?? context.accountId;

const data = Social.keys("*/profile", "final");

if (!data) {
  return "Loading...";
}

State.init({
  isMember: false,
});

const daoId = props.daoId ?? "cannabis-genome.sputnik-dao.near";
const groupId = props.groupId ?? "Council";
const policy = Near.view(daoId, "get_policy");

if (!policy) {
  return "Loading...";
}

const group = policy.roles
  .filter((role) => role.name === groupId)
  .map((role) => role.kind.Group);

// SBT verification
let human = false;
const userSBTs = Near.view("registry.i-am-human.near", "sbt_tokens_by_owner", {
  account: accountId,
});

for (let i = 0; i < userSBTs.length; i++) {
  if ("fractal.i-am-human.near" == userSBTs[i][0]) {
    human = true;
  }
}

// check DAO group membership
const groupMembers = group.join(", ");

const checkMembership = (groupMembers) => {
  if (groupMembers.indexOf(memberId) !== -1) {
    return State.update({ isMember: true });
  }
};

const validMember = checkMembership(groupMembers);

const Container = styled.div`
  display: flex;
  max-width: 1080px;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 39px;

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

return (
  <>
    <Container>
      <Widget src="flowscience.near/widget/progress.members" />
      <div className="m-2">
        {human ? (
          <button
            disabled={validMember}
            className="btn btn-success m-1"
            onClick={handleProposal}
          >
            Join DAO
          </button>
        ) : (
          <Widget
            src="near/widget/DIG.Button"
            props={{
              href: "https://i-am-human.app/?community=banyan&vertical=regionalcommunities",
              label: "Get Verified",
              variant: "outline-primary",
              size: "large",
            }}
          />
        )}
      </div>{" "}
    </Container>
    <hr />
    <div>
      <h3>Voter Profiles</h3>
      <h5>{group[0].length} Total Members</h5>
      <div>
        {group.map((members, i) => (
          <div key={i}>
            {members.map((member, j) => (
              <Widget
                key={j}
                src="near/widget/AccountProfileCard"
                props={{ accountId: member }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  </>
);
