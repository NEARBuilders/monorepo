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
      <p className="m-0" style={{ color: "var(--color)" }}>
        {numFollowing}
        <span style={{ color: "var(--color-muted)" }}>Following</span>
      </p>
      <p className="m-0" style={{ color: "var(--color)" }}>
        {numFollowers}
        <span style={{ color: "var(--color-muted)" }}>Followers</span>
      </p>
    </div>
  );
}

return { FollowStats };
