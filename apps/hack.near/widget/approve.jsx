const accountId = props.accountId ?? "build.sputnik-dao.near";
const groupId = props.groupId ?? "f8ad9d1a76259lmdpjnd74e69162a0a014";
const creatorId = props.creatorId ?? "hack.near";

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

const type = join ? "approve" : "reject";

const handleApprove = () => {
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
        key: accountId,
        value: {
          type,
          groupId,
          message: "request approved",
        },
      }),
    },
  });
};
return (
  <>
    {creatorId === context.accountId && (
      <span>
        {member ? (
          <button
            disabled={memberEdge}
            className="btn btn-success"
            onClick={handleApprove}
          >
            Approved
          </button>
        ) : (
          <button
            disabled={!context.accountId}
            className="btn btn-success"
            onClick={handleApprove}
          >
            Approve
          </button>
        )}
      </span>
    )}
  </>
);
