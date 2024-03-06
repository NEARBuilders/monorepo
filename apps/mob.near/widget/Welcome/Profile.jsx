return (
  <div className="d-flex justify-content-between align-items-center">
    <a
      href={`#/mob.near/widget/ProfilePage`}
      className="text-decoration-none link-dark me-2 text-truncate"
    >
      <Widget
        src="mob.near/widget/Profile.InlineBlock"
        props={{ accountId: context.accountId }}
      />
    </a>

    <div className="d-none text-nowrap d-md-block">
      <a
        href={`#/mob.near/widget/ProfileEditor`}
        className="btn btn-outline-secondary"
      >
        Edit Profile
      </a>
    </div>
  </div>
);
