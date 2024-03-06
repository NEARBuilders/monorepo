const data = Social.keys("*/profile/linktree/twitter", "final");

if (!data) {
  return "Loading";
}

const accounts = Object.entries(data);

const allWidgets = [];

for (let i = 0; i < accounts.length; ++i) {
  const accountId = accounts[i][0];

  allWidgets.push(
    <div className="mb-2">
      <Widget src="mob.near/widget/Profile" props={{ accountId }} />
    </div>
  );
}

return <div className="container row">{allWidgets}</div>;
