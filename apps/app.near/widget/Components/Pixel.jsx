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
  Button,
  Hashtag,
  LinkTree,
};
