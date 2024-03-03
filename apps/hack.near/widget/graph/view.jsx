const accountId = props.accountId ?? context.accountId;

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

State.init({
  accounts: ["every.near", context.accountId],
  newAccount: "",
  thing: thingId,
});

function addAccount(newAccount) {
  state.accounts.push(newAccount);

  State.update({
    accounts: state.accounts,
  });
}

function removeAccount(accountKey) {
  const updatedAccounts = state.accounts.filter(
    (account) => account !== accountKey
  );

  State.update({
    accounts: updatedAccounts,
  });
}

return (
  <div>
    <div>
      <h3>Explore</h3>
    </div>
    <div className="mb-2">
      <h5>Graph ID</h5>
      <input type="text" value={state.thing} placeholder={defaultThing} />
    </div>
    <div>
      <h5>Nodes</h5>
      <input
        placeholder="<example>.near"
        onChange={(e) => State.update({ newAccount: e.target.value })}
      />
      <div className="d-flex align-items-center mt-2">
        <button
          className="btn btn-primary m-2"
          onClick={() => addAccount(state.newAccount)}
        >
          add
        </button>
      </div>
    </div>
    <div>
      {state.accounts.map((a) => {
        return (
          <div className="d-flex m-2 p-2 justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <Widget src="mob.near/widget/Profile" props={{ accountId: a }} />
            </div>
            <button
              className="btn btn-danger m-1"
              onClick={() => removeAccount(a)}
            >
              remove
            </button>
          </div>
        );
      })}
    </div>
    <hr />
    {state.accounts.length > 1 ? (
      <div className="mb-2">
        <Widget
          src="hack.near/widget/SocialGraph"
          props={{
            accountIds: state.accounts,
            thingId: state.thing,
          }}
        />
      </div>
    ) : (
      <div className="mb-2">
        <h5>input 2+ accounts</h5>
      </div>
    )}
  </div>
);
