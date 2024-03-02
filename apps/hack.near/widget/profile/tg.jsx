const accountId = props.accountId ?? context.accountId;

if (!accountId) {
  return "";
}

const profile = props.profile ?? Social.getr(`${accountId}/profile`);
const fast = !!props.fast || (!props.profile && accountId);

const name = profile.name;
const telegram = profile.linktree.telegram;
const isPremium = !!props.isPremium;

const inner = (
  <div className="d-flex flex-row">
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
    <div className="text-truncate lh-sm">
      {telegram.length > 0 ? (
        <div className="text-truncate fw-bold">
          <a href={`https://t.me/${telegram}`}>{telegram}</a>
          <Widget
            loading={""}
            src="mob.near/widget/Checkmark"
            props={{ isPremium, accountId }}
          />
        </div>
      ) : (
        <div className="text-truncate fw-bold">{name}</div>
      )}
      <div className="text-truncate text-muted">
        <small>
          <span className="font-monospace">@{accountId}</span>
        </small>
      </div>
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
