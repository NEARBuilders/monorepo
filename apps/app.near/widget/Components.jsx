const { Button } = VM.require("app.near/widget/Components.Button") || {
  Button: () => <></>,
};

const { LinkTree } = VM.require(
  "app.near/widget/Components.Profile.LinkTree",
) || {
  LinkTree: () => <></>,
};

const { FollowStats } = VM.require(
  "app.near/widget/Components.Profile.FollowStats",
) || {
  FollowStats: () => <></>,
};

const { Hashtag } = VM.require("app.near/widget/Components.Hashtag") || {
  Hashtag: () => <></>,
};

return {
  Button,
  LinkTree,
  FollowStats,
  Hashtag,
};
