const accountId = props.accountId;
const blockHeight = props.blockHeight;
const postType = props.postType ?? "post";
const link = props.link;

return (
  <div className="d-flex flex-row align-items-center">
    <div className="flex-grow-1 text-truncate">
      <a
        className="text-dark text-decoration-none text-truncate"
        href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
      >
        <Widget
          src="mob.near/widget/Profile.ShortInlineBlock"
          props={{ accountId, tooltip: true }}
        />
      </a>
    </div>
  </div>
);
