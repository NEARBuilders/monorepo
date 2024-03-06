const data = Social.keys("*/profile", "final");

if (!data) {
  return "Loading";
}

const accounts = Object.entries(data);

const allWidgets = [];

for (let i = 0; i < accounts.length; ++i) {
  const accountId = accounts[i][0];

  allWidgets.push(
    <a
      href={`#/mob.near/widget/Profile?accountId=${accountId}`}
      className="text-decoration-none"
    >
      <Widget src="mob.near/widget/ProfileImage" props={{ accountId }} />
    </a>
  );
}

return <div>{allWidgets}</div>;
