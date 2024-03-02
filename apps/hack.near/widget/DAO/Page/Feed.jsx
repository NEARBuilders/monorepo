const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "build.sputnik-dao.near";

const groupId = props.groupId ?? "council";

const tags = accountId
  ? Social.get(`${accountId}/settings/dao/feed.tags`)
  : undefined;

const domain = accountId
  ? Social.get(`${accountId}/settings/dao/main`)
  : undefined;

const feed = accountId
  ? Social.get(`${accountId}/settings/dao/feed`)
  : undefined;

if (feed === null) {
  return "Loading...";
}

const policy = Near.view(daoId, "get_policy");
const group = policy.roles
  .filter((role) => role.name === groupId)
  .map((role) => {
    const group = role.kind.Group;

    return group;
  });

const hashtags = [
  { name: "dev", required: true },
  { name: "bos", required: true },
];

return (
  <>
    <Widget
      src={feed ?? "efiz.near/widget/Community.Posts"}
      props={{
        communityHashtags: tags ?? hashtags,
        communityDomain: domain,
        communityMembers: group[0],
        exclusive: true,
        allowPublicPosting: true,
      }}
    />
  </>
);
