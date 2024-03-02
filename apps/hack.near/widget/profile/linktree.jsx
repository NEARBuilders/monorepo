const accountId = props.accountId ?? "mob.near";

if (!accountId) {
  return "";
}

const profile = props.profile ?? Social.getr(`${accountId}/profile`);
const fast = !!props.fast || (!props.profile && accountId);

const name = profile.name;
const isPremium = !!props.isPremium;

const inner = (
  <div>
    <div className="d-flex flex-row">
      <a href={`/near/widget/ProfilePage?accountId=${accountId}`}>
        <Widget
          src="mob.near/widget/ProfileImage"
          props={{
            fast,
            profile,
            accountId,
            widgetName,
            style: { height: "2.5em", width: "2.5em", minWidth: "2.5em" },
            className: "me-2",
          }}
        />
      </a>
      <div className="text-truncate lh-sm">
        <a href={`/near/widget/ProfilePage?accountId=${accountId}`}>{name}</a>
        <Widget
          loading={""}
          src="mob.near/widget/Checkmark"
          props={{ isPremium, accountId }}
        />
        <div className="text-truncate text-muted">
          <small>
            <span className="font-monospace">@{accountId}</span>
          </small>
        </div>
      </div>
    </div>
    <div className="m-2">
      <Widget
        src="mob.near/widget/LinkTree"
        props={{ linktree: profile.linktree }}
      />
    </div>
  </div>
);

return props.tooltip ? (
  <Widget
    src="mob.near/widget/Profile.OverlayTrigger"
    props={{ accountId, children: inner }}
  />
) : (
  inner
);
