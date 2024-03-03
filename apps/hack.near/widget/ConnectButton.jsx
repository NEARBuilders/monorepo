if (
  !props.accountId ||
  !context.accountId ||
  context.accountId === props.accountId
) {
  return "";
}

const connectEdge = Social.keys(
  `${context.accountId}/graph/connect/${props.accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const inverseEdge = Social.keys(
  `${props.accountId}/graph/connect/${context.accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const loading = connectEdge === null || inverseEdge === null;
const connect = connectEdge && Object.keys(connectEdge).length;
const inverse = inverseEdge && Object.keys(inverseEdge).length;

const type = connect ? "undo" : "connect";

const data = {
  graph: { connect: { [props.accountId]: connect ? null : "" } },
  index: {
    graph: JSON.stringify({
      key: "connect",
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
  <CommitButton
    disabled={loading}
    className={`btn btn-sm ${
      loading || connect ? "btn-secondary" : "btn-outline-light"
    }`}
    data={data}
  >
    {loading ? "" : connect ? "Connected" : "Connect"}
  </CommitButton>
);
