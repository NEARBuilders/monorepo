// AllLabels
const ownerId = "zavodil.near";
const appName = "nametag";

const data = Social.keys(`*/${appName}/*`, "final");

if (!data) {
  return "Loading";
}

const contracts = {};

Object.values(data).forEach((account) => {
  Object.keys(account[appName]).forEach((contract) => {
    contracts[contract] = true;
  });
});

const allWidgets = Object.keys(contracts).map((accountId) => {
  return (
    <div className="mb-2 card">
      <div className="card-body">
        <div className="text-truncate">
          <Widget src={`mob.near/widget/ProfileLine`} props={{ accountId }} />
        </div>
        <Widget src={`mob.near/widget/PublicTags`} props={{ accountId }} />
      </div>
    </div>
  );
});

return (
  <>
    <Widget
      src={`mob.near/widget/PublicTagEditor`}
      key={`public-tag-editor-${props.accountId}`}
      props={{ contractId: props.accountId }}
    />
    <hr />
    {allWidgets}
  </>
);
