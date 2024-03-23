const { FollowStats } = VM.require(
  "app.near/widget/Components.Pixel.FollowStats",
) || {
  FollowStats: () => <></>,
};

const { Button } = VM.require("app.near/widget/Components.Pixel.Button") || {
  Button: () => <></>,
};

const { Hashtag } = VM.require("app.near/widget/Components.Pixel.Hashtag") || {
  Hashtag: () => <></>,
};

const { LinkTree } = VM.require(
  "app.near/widget/Components.Pixel.LinkTree",
) || {
  LinkTree: () => <></>,
};

return {
  FollowStats,
  Button,
  Hashtag,
  LinkTree,
};
