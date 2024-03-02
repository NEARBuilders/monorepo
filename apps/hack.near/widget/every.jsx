const creatorId = props.creatorId ?? context.accountId ?? "hack.near";

const data = Social.keys(`${creatorId}/widget/*/metadata/tags/*`, "final");

if (!data) {
  return "Loading...";
}

const accounts = Object.entries(data);

const allThings = [];

for (let i = 0; i < accounts.length; ++i) {
  const creatorId = accounts[i][0];
  const namespace = props.namespace ?? "widget";
  const names = Object.keys(accounts[i][1].widget);
  const things = [];

  for (let j = 0; j < names.length; ++j) {
    const thingId = names[j] || <i>Something</i>;
    const src = `${creatorId}/${namespace}/${names[j]}`;

    things.push(
      <div key={src} className="m-2">
        <Widget
          src="hack.near/widget/thing.block"
          props={{ creatorId, thingId }}
        />
      </div>
    );
  }

  allThings.push(
    <div key={creatorId}>
      <div className="m-2">{things}</div>
    </div>
  );
}

return (
  <div className="m-1">
    <p>{allThings}</p>
  </div>
);
