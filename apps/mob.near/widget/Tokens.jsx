const [accountId, setAccountId] = useState(
  props.accountId || context.accountId || "root.near"
);
const [inputActionId, setInputActionId] = useState(accountId);

return (
  <div>
    <div className="input-group mb-3">
      <input
        className="form-control"
        value={inputActionId}
        onChange={(e) => setInputActionId(e.target.value)}
      />
      <button
        className={`btn ${
          accountId === inputActionId ? "btn-outline-secondary" : "btn-primary"
        }`}
        onClick={() => setAccountId(inputActionId)}
        type="button"
      >
        Apply
      </button>
    </div>
    <Widget src="mob.near/widget/Tokens.Inner" props={{ accountId }} />
  </div>
);
