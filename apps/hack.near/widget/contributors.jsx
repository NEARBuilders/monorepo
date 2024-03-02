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
        <Widget src="hack.near/widget/UserRep" props={{ accountId }} />
      </div>
    );
  }
}

return (
  <>
    <h3>Voter Profiles</h3>
    <h5 className="m-3">{allHumanAccounts.length} Total</h5>
    <div className="m-3">{allHumanAccounts}</div>
  </>
);
