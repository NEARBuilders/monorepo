function FollowStats({ accountId }) {
  const following = Social.keys(`${accountId}/graph/follow/*`, "final", {
    return_type: "BlockHeight",
    values_only: true,
  });

  const followers = Social.keys(`*/graph/follow/${accountId}`, "final", {
    return_type: "BlockHeight",
    values_only: true,
  });

  const numFollowing = following
    ? Object.keys(following[accountId].graph.follow || {}).length
    : null;
  const numFollowers = followers ? Object.keys(followers || {}).length : null;

  return (
    <div className="d-flex align-items-center gap-4">
      <Widget
        loading=""
        src="app.near/widget/Components.OverlayFaces"
        props={{
          accounts: Object.keys(following[accountId].graph.follow || {}),
          limit: 10,
          children: (
            <p
              className="m-0"
              style={{ color: "var(--color)", fontWeight: 600 }}
            >
              {numFollowing}
              <span style={{ color: "var(--color-muted)", fontWeight: 400 }}>
                Following
              </span>
            </p>
          ),
        }}
      />

      <Widget
        loading=""
        src="app.near/widget/Components.OverlayFaces"
        props={{
          accounts: followers,
          limit: 10,
          children: (
            <p
              className="m-0"
              style={{ color: "var(--color)", fontWeight: 600 }}
            >
              {numFollowers}{" "}
              <span style={{ color: "var(--color-muted)", fontWeight: 400 }}>
                Followers
              </span>
            </p>
          ),
        }}
      />
    </div>
  );
}

return { FollowStats };
