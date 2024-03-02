const accountId = props.accountId ?? context.accountId;

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

const name = profile.name;

// IAH Verification
let human = false;
const userSBTs = Near.view("registry.i-am-human.near", "sbt_tokens_by_owner", {
  account: props.accountId,
});

for (let i = 0; i < userSBTs.length; i++) {
  if ("fractal.i-am-human.near" == userSBTs[i][0]) {
    human = true;
  }
}

return (
  <div className="d-flex flex-row">
    <Widget
      src="mob.near/widget/ProfileImage"
      props={{
        metadata,
        accountId,
        widgetName,
        style: { height: "2.5em", width: "2.5em", minWidth: "2.5em" },
        className: "me-2",
      }}
    />
    <div className="text-truncate lh-sm">
      <div className="text-truncate fw-bold row">
        <span>
          {human && <span>✅</span>} {name}
        </span>
      </div>
      <div className="text-truncate text-muted">
        <small>
          <span className="font-monospace">@{accountId}</span>
        </small>
      </div>
    </div>
  </div>
);
