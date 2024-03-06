const { daoId, policy, proposal } = props;

const bgClassname =
  proposal.status === "InProgress"
    ? ""
    : proposal.status === "Approved"
    ? "bg-success bg-opacity-10"
    : "bg-danger bg-opacity-10";

function mapVote(vote) {
  return vote === "Approve" ? (
    <span className="text-success">Approve</span>
  ) : vote === "Reject" ? (
    <span className="text-danger">Reject</span>
  ) : vote === "Remove" ? (
    <span className="text-warning">Spam</span>
  ) : (
    "???"
  );
}

function vote(action) {
  return Near.call(daoId, "act_proposal", {
    id: proposal.id,
    action,
  });
}

function decodeArgs() {
  try {
    const args64 = proposal.kind["FunctionCall"].actions[0].args;
    const jsonArgs = JSON.parse(
      Buffer.from(args64, "base64").toString("utf-8")
    );
    return JSON.stringify(jsonArgs, undefined, 2);
  } catch {
    return "failed to deserialize";
  }
}

return (
  <div className={`border p-2 ${bgClassname}`}>
    <div className="mb-2">
      <h4 className="d-inline">
        #{proposal.id}{" "}
        <span className="text-muted small">({proposal.status})</span>
      </h4>
      <div className="float-end">
        {new Date(parseFloat(proposal.submission_time) / 1e6).toLocaleString()}
      </div>
    </div>
    <div className="mb-2">
      <label className="text-muted">Proposer</label>
      <div>
        <Widget
          src="mob.near/widget/Profile.ShortInlineBlock"
          props={{ accountId: proposal.proposer }}
        />
      </div>
    </div>
    <div className="mb-2">
      <label className="text-muted">Description</label>
      <div>{proposal.description}</div>
    </div>
    <div className="mb-2">
      <label className="text-muted">Action</label>
      <pre>{JSON.stringify(proposal.kind, undefined, 2)}</pre>
      {"FunctionCall" in proposal.kind && (
        <div className="mt-2">
          <label className="text-muted">JSON args</label>
          <pre>{decodeArgs()}</pre>
        </div>
      )}
    </div>
    <div className="mb-2">
      <label className="text-muted">Votes</label>
      <div>
        {Object.entries(proposal.votes).map(([accountId, vote]) => (
          <div key={accountId} className="mb-1 d-flex flex-row gap-2">
            <div className="m-auto text-center" style={{ minWidth: "5em" }}>
              {mapVote(vote)}
            </div>
            <div className="flex-grow-1">
              <Widget
                src="mob.near/widget/Profile.ShortInlineBlock"
                props={{ accountId }}
              />
            </div>
          </div>
        ))}
      </div>
      {context.accountId && proposal.status === "InProgress" && (
        <div className="mt-2 d-flex flex-row gap-2">
          <button
            className="btn flex-fill btn-success"
            onClick={() => vote("VoteApprove")}
          >
            Approve
          </button>
          <button
            className="btn flex-fill btn-danger"
            onClick={() => vote("VoteReject")}
          >
            Reject
          </button>
          <button
            className="btn flex-fill btn-warning"
            onClick={() => vote("VoteRemove")}
          >
            Spam
          </button>
        </div>
      )}
    </div>
  </div>
);
