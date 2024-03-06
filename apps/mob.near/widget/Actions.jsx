const [accountId, setAccountId] = useState(
  props.accountId || context.accountId || "wrap.near"
);
const [inputActionId, setInputActionId] = useState(accountId);

const actionWidgetSrc =
  props.actionWidgetSrc || "mob.near/widget/Actions.Action";

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
    <Widget
      src="mob.near/widget/ActionsInner"
      props={{ accountId, actionWidgetSrc }}
    />
  </div>
);
