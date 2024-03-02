const data = Social.keys("*/profile", "final");

const limit = props.limit || 1;

State.init({
  limit,
});

const onChangeLimit = (limit) => {
  State.update({
    limit,
  });
};

if (!data) {
  return "Loading";
}

let accounts = Object.entries(data);
const numAccounts = accounts.length;
accounts = accounts.slice(0, state.limit);

const allWidgets = [];

for (let i = 0; i < accounts.length; ++i) {
  const accountId = accounts[i][0];

  allWidgets.push(
    <a
      href={`#/near/widget/ProfilePage?accountId=${accountId}`}
      className="text-decoration-none"
      key={i}
    >
      <Widget
        src="mob.near/widget/ProfileImage"
        props={{
          accountId,
          tooltip: true,
          className: "d-inline-block overflow-hidden",
        }}
      />
    </a>
  );
}

return (
  <>
    <h5>Oldest Profiles</h5>
    <p>
      <i>input limit below</i>
    </p>
    <input
      type="number"
      value={state.limit}
      onChange={(e) => onChangeLimit(e.target.value)}
    ></input>
    <br />
    <div class="d-flex flex-wrap gap-1">{allWidgets}</div>
  </>
);
