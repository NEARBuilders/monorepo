const accountId = props.accountId ?? context.accountId;
const groupId = props.groupId ?? "526fb256e74eelmf0nw3n5909bc189c13d";
const creatorId = props.creatorId ?? "devs.near";

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
  `${creatorId}/graph/${groupId}/${accountId}`,
  undefined,
  {
    values_only: true,
  }
);

const loading = joinEdge === null || memberEdge === null;
const join = joinEdge && Object.keys(joinEdge).length;
const member = memberEdge && Object.keys(memberEdge).length;

const type = member ? "accept" : "reject";

const handleAccept = () => {
  Social.set({
    graph: { [groupId]: { [accountId]: "" } },
    index: {
      graph: JSON.stringify({
        key: groupId,
        value: {
          type,
          accountId,
        },
      }),
      notify: JSON.stringify({
        key: creatorId,
        value: {
          type,
          accountId,
          groupId,
          message: "request accepted",
        },
      }),
    },
  });
};

return (
  <>
    <span>
      {!join ? (
        <button
          disabled={!context.accountId}
          className="btn btn-success"
          onClick={handleAccept}
        >
          Accept
        </button>
      ) : (
        <button
          disabled={joinEdge}
          className="btn btn-success"
          onClick={handleAccept}
        >
          Accepted
        </button>
      )}
    </span>
  </>
);
