const accountId = props.accountId;
const userId = context.accountId;

if (!accountId) {
  return "";
}

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

const accounts = Social.keys(`*/graph/follow/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

let followingsPerAccount = Object.keys(accounts).reduce(
  (res, id) => ({
    ...res,
    [id]: Object.keys(accounts[id].graph.follow).filter((x) => x !== accountId),
  }),
  {}
);

const myTags = Social.getr(`${userId}/profile/tags`, "final") || [];
const profileVisitedTags =
  Social.getr(`${accountId}/profile/tags`, "final") || [];

const myFriends = followingsPerAccount[userId] || [];

const findFriendsInCommon = (accountId) => {
  return myFriends.filter((a) => followingsPerAccount[accountId].includes(a));
};

const friendsInCommon = findFriendsInCommon(accountId);
const tagsInCommon = () => {
  return myTags.filter(
    (a) => profileVisitedTags.length > 0 && profileVisitedTags.includes(a)
  );
};

return (
  <div>
    <div className="d-flex flex-row">
      <div className="me-4">
        <a
          href={`#/mob.near/widget/FollowPage?accountId=${accountId}&tab=following`}
          className="text-dark"
          target="_blank"
        >
          {numFollowing !== null ? (
            <span className="fw-bolder">{numFollowing}</span>
          ) : (
            "?"
          )}{" "}
          <span className="text-muted">Following</span>
        </a>
      </div>
      <div>
        <a
          href={`#/mob.near/widget/FollowPage?accountId=${accountId}&tab=followers`}
          className="text-dark"
          target="_blank"
        >
          {numFollowers !== null ? (
            <span className="fw-bolder">{numFollowers}</span>
          ) : (
            "?"
          )}{" "}
          <span className="text-muted">
            Follower{numFollowers !== 1 && "s"}
          </span>
        </a>
      </div>
    </div>
    {userId && (
      <div>
        {friendsInCommon.length > 0 && (
          <OverlayTrigger
            placement="auto"
            overlay={
              <Tooltip>
                <span> You both follow </span>
                <br />
                <br />
                {friendsInCommon.map((friendsInCommon) => {
                  return (
                    <li className={`list-group-item`}>{friendsInCommon}</li>
                  );
                })}
              </Tooltip>
            }
          >
            <span
              className="badge rounded-pill bg-primary"
              title={`${friendsInCommon.length} followers in common`}
            >
              {friendsInCommon.length} friends in common
            </span>
          </OverlayTrigger>
        )}
        {tagsInCommon.length > 0 && (
          <OverlayTrigger
            placement="auto"
            overlay={
              <Tooltip>
                {tagsInCommon.map((tag) => {
                  return <li className={`list-group-item`}>{tag}</li>;
                })}
              </Tooltip>
            }
          >
            <span
              className="badge rounded-pill bg-primary"
              title={`${tagsInCommon.length} tags in common`}
            >
              {tagsInCommon.length} common tags
            </span>
          </OverlayTrigger>
        )}
      </div>
    )}
  </div>
);
