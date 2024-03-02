/**
 * Configure your community feed.
 */
const daoId = "liberty.sputnik-dao.near"; // restrict posting to members of a DAO (Optional)
const groupId = "community"; // which group can post?

const policy = Near.view(daoId, "get_policy");
const group = policy.roles
  .filter((role) => role.name === groupId)
  .map((role) => {
    const group = role.kind.Group;

    return group;
  });

const hashtags = ["nyc"];

return (
  <Widget
    src="efiz.near/widget/Community.Posts"
    props={{
      communityHashtags: hashtags,
      communityDomain: "nycdao.near",
      communityMembers: group[0],
      exclusive: false,
    }}
  />
);
