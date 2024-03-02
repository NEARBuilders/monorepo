const userId = context.accountId;

if (!userId) {
  return "Please connect your NEAR account :)";
}

const accounts = Social.keys(`*/graph/trust/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

if (accounts === null) {
  return "Loading...";
}

const trustingData = Social.keys(`${userId}/graph/trust/*`, "final");
if (trustingData === null) {
  return "Loading...";
}

const trusting = trustingData[userId]["graph"]["trust"] ?? {};

State.init({
  trusting,
});

let trustGraph = [];
Object.keys(accounts).forEach((accountId) => {
  Object.keys(accounts[accountId].graph.trust).forEach((trustingAccountId) => {
    trustGraph[trustingAccountId] = (trustGraph[trustingAccountId] ?? 0) + 1;
  });
});

let trustRank = Object.keys(trustGraph).sort(
  (a, b) => trustGraph[b] - trustGraph[a]
);

let handleChange = (accountId) => {
  let trusting = state.trusting;
  trusting[accountId] = !trusting[accountId];
  State.update({ trusting });
};

let trustBlocks = trustRank.map((accountId) => (
  <li
    className={`list-group-item ${
      state.trusting[accountId] ? "list-group-item-success" : ""
    }`}
  >
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        value={accountId}
        disabled={accountId == userId}
        id={`trust-${accountId}`}
        name={`trust-${accountId}`}
        onChange={() => handleChange(accountId)}
        checked={state.trusting[accountId] ?? false}
      />
      <label className="form-check-label" for={`trust-${accountId}`}>
        <Widget
          src="near/widget/AccountProfile"
          props={{
            accountId,
          }}
        />{" "}
        <span
          className="badge rounded-pill bg-primary"
          title={`${trustGraph[accountId]}`}
        >
          {trustGraph[accountId]}
        </span>
        <a
          className="btn btn-sm btn-outline-secondary border-0"
          href={`#/hack.near/widget/trusted.profile?accountId=${accountId}`}
          target="_blank"
        >
          <i className="bi bi-window-plus me-1" title="Open in new tab"></i>
        </a>
      </label>
    </div>
  </li>
));

let dataTrust = {};
Object.keys(state.trusting).map((accountId) => {
  if (accountId !== userId) {
    let trust = !!state.trusting[accountId];
    dataTrust[accountId] = trust ? "" : null;
  }
});

let dataGraph = [];
let dataNotify = [];

Object.keys(state.trusting).map((accountId) => {
  if (trusting[accountId] != state.trusting[accountId]) {
    let trust = !!state.trusting[accountId];
    dataGraph.push({
      key: "trust",
      value: {
        type: trust ? "trust" : "block",
        accountId,
      },
    });

    dataNotify.push({
      key: accountId,
      value: {
        type: trust ? "trust" : "block",
      },
    });
  }
});

const data = {
  graph: {
    trust: dataTrust,
  },
  index: {
    graph: JSON.stringify(dataGraph),
    notify: JSON.stringify(dataNotify),
  },
};

return (
  <>
    <h3 className="text-center">Open Web of Trust</h3>
    <p className="text-center">Connect with people you know!</p>
    <br />
    <Widget src="hack.near/widget/trust.web" />
    <hr />
    <h5>Expand Your Network</h5>
    <div className="mb-3">
      <CommitButton
        disabled={context.loading}
        className={`btn ${
          context.loading ? "btn-outline-dark" : "btn-outline-success"
        }`}
        data={data}
      >
        {context.loading ? "Loading..." : "Save Connections"}
      </CommitButton>
    </div>
    <ul className="list-group">{trustBlocks}</ul>

    <div className="mt-3 mb-3">
      <CommitButton
        disabled={context.loading}
        className={`btn ${
          context.loading ? "btn-outline-dark" : "btn-outline-success"
        }`}
        data={data}
      >
        {context.loading ? "Loading..." : "Save Connections"}
      </CommitButton>
    </div>
  </>
);
