const accountId = props.accountId ?? "hack.near";

if (!accountId) {
  return "";
}

const connections = Social.keys(`${accountId}/graph/connect/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

const connected = Social.keys(`*/graph/connect/${accountId}`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

const numConnections = connections
  ? Object.keys(connections[accountId].graph.connect || {}).length
  : null;
const numConnected = connected ? Object.keys(connected || {}).length : null;

return (
  <div>
    <div className="d-flex flex-row">
      <div className="me-4">
        <a
          href={`#/hack.near/widget/trust.page?accountId=${accountId}&tab=trusting`}
          className="text-dark"
        >
          {numConnections !== null ? (
            <span className="fw-bolder">{numConnections}</span>
          ) : (
            "?"
          )}{" "}
          <span className="text-muted">
            connection{numConnections !== 1 && "s"}
          </span>
        </a>
      </div>
    </div>
  </div>
);
