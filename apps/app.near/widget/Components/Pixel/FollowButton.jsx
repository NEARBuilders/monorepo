const { Button } = VM.require("app.near/widget/Components.Pixel") || {
  Button: () => <></>,
};

if (
  !props.accountId ||
  !context.accountId ||
  context.accountId === props.accountId
) {
  return "";
}

const followEdge = Social.keys(
  `${context.accountId}/graph/follow/${props.accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const inverseEdge = Social.keys(
  `${props.accountId}/graph/follow/${context.accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const loading = followEdge === null || inverseEdge === null;
const follow = followEdge && Object.keys(followEdge).length;
const inverse = inverseEdge && Object.keys(inverseEdge).length;

const type = follow ? "unfollow" : "follow";

const data = {
  graph: { follow: { [props.accountId]: follow ? null : "" } },
  index: {
    graph: JSON.stringify({
      key: "follow",
      value: {
        type,
        accountId: props.accountId,
      },
    }),
    notify: JSON.stringify({
      key: props.accountId,
      value: {
        type,
      },
    }),
  },
};

return (
  <Button
    disabled={loading}
    variant={`${loading || follow ? "" : "primary"}`}
    onClick={() => Social.set(data)}
  >
    {loading
      ? "Loading"
      : follow
        ? "Following"
        : inverse
          ? "Follow back"
          : "Follow"}
  </Button>
);
