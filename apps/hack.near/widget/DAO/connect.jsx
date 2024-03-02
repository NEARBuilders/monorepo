const accountId = context.accountId;
const daoId = props.daoId ?? "build.sputnik-dao.near";

if (!accountId || accountId === daoId) {
  return "";
}

const connectEdge = Social.keys(
  `${accountId}/graph/connect/${daoId}`,
  undefined,
  {
    values_only: true,
  }
);

const inverseEdge = Social.keys(
  `${daoId}/graph/connect/${accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const loading = connectEdge === null || inverseEdge === null;
const connect = connectEdge && Object.keys(connectEdge).length;
const inverse = inverseEdge && Object.keys(inverseEdge).length;

const type = connect ? "disconnect" : "connect";

const data = {
  graph: { connect: { [daoId]: connect ? null : "" } },
  index: {
    graph: JSON.stringify({
      key: "connect",
      value: {
        type,
        accountId: daoId,
      },
    }),
  },
};

return (
  <CommitButton
    disabled={loading}
    className="btn btn-success m-1 rounded-5"
    data={data}
  >
    {loading ? "Loading" : connect ? "Connected" : "Connect"}
  </CommitButton>
);
