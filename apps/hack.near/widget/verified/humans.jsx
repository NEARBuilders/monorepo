const data = Social.keys("*/profile", "final");

if (!data) {
  return "Loading...";
}

const accounts = Object.entries(data);
const allHumanAccounts = [];

for (let i = 0; i < accounts.length; ++i) {
  const accountId = accounts[i][0];

  let human = false;

  const userSBTs = Near.view(
    "registry.i-am-human.near",
    "sbt_tokens_by_owner",
    {
      account: accountId,
    }
  );

  for (let j = 0; j < userSBTs.length; j++) {
    if ("fractal.i-am-human.near" === userSBTs[j][0]) {
      human = true;
      break;
    }
  }

  if (human) {
    allHumanAccounts.push(
      <div className="mb-2" key={accountId}>
        <Widget src="near/widget/AccountProfileCard" props={{ accountId }} />
      </div>
    );
  }
}

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
      <Widget src="hack.near/widget/HumansOnNearMeter" />
      <Widget src="hack.near/widget/GetVerified" />
    </Container>
    <br />
    <hr />
    <h3>Voter Profiles</h3>
    <h5 className="m-3">{allHumanAccounts.length} Total</h5>
    <div className="m-3">{allHumanAccounts}</div>
  </>
);
