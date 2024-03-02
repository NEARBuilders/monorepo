const accountId = props.accountId ?? context.accountId;
const groupId = props.groupId ?? "526fb256e74eelmf0nw3n5909bc189c13d";
const curatorId = props.curatorId ?? "hack.near";

if (!props.accountId && !context.accountId) {
  return "";
}

const joinEdge = Social.keys(
  `${accountId}/graph/${groupId}/${accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const memberEdge = Social.keys(
  `${curatorId}/graph/${groupId}/${accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const loading = joinEdge === null || memberEdge === null;
const join = joinEdge && Object.keys(joinEdge).length;
const inverse = memberEdge && Object.keys(memberEdge).length;

const type = join ? "leave" : "join";

const handleJoin = () => {
  Social.set({
    graph: { [groupId]: { [accountId]: join ? null : "" } },
    index: {
      graph: JSON.stringify({
        key: groupId,
        value: {
          type,
          accountId,
        },
      }),
      notify: JSON.stringify([
        {
          key: curatorId,
          value: {
            type,
            accountId,
          },
        },
      ]),
    },
  });
};

return (
  <>
    <button
      disabled={loading}
      className={`btn ${
        loading || join ? "btn-outline-secondary" : "btn-outline-dark"
      }`}
      onClick={handleJoin}
    >
      {join ? "Leave" : "Join"}
    </button>
  </>
);
