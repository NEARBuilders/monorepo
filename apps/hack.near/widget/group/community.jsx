const accountId = props.accountId ?? context.accountId;
const groupId = props.groupId ?? "526fb256e74eelmf0nw3n5909bc189c13d";
const creatorId = props.creatorId ?? "devs.near";

if (!accountId) {
  return "";
}

let community = Social.keys(`${accountId}/graph/${groupId}/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

if (community === null) {
  return "Loading...";
}

community = Object.entries(community[accountId].graph[groupId] || {});
community.sort((a, b) => b[1] - a[1]);

return (
  <>
    {community.map(([accountId], i) => (
      <div key={i} className="d-flex justify-content-between mb-3">
        <div className="me-4">
          <Widget src="mob.near/widget/Profile" props={{ accountId }} />
        </div>
        <div className="mt-1">
          <Widget src="hack.near/widget/FollowButton" props={{ accountId }} />
        </div>
      </div>
    ))}
  </>
);
