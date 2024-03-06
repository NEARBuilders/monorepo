const accountId = props.accountId ?? context.accountId;

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

if (profile === null) {
  return "Loading...";
}

const name = profile.name || "No-name profile";
const tags = Object.keys(profile.tags ?? {});

return (
  <div className="d-inline-block">
    <a
      href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
      className="text-decoration-none link-dark"
    >
      <Widget
        src="mob.near/widget/ProfileImage"
        props={{
          profile,
          accountId,
          className: "float-start d-inline-block me-2",
        }}
      />
      <div className="d-inline-block" style={{ maxWidth: "16em" }}>
        <div className="text-truncate">{name}</div>
        <div className="d-flex">
          <div className="d-inline-block text-secondary text-truncate">
            @{accountId}
          </div>
        </div>
        {tags.length > 0 && (
          <div className="text-truncate">
            {tags.map((tag) => (
              <span className="me-1 mb-1 badge bg-secondary">#{tag}</span>
            ))}
          </div>
        )}
      </div>
    </a>
  </div>
);
