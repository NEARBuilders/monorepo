const accountId = props.accountId ?? context.accountId;

State.init({
  path: props.path ?? "",
});

const exists = Social.getr(state.path) ?? Social.get(state.path);

return (
  <>
    <h5 className="m-2">Attestify</h5>
    <p className="m-2 mt-1">input source path of anything:</p>
    <div className="m-2">
      <input
        defaultValue={state.path}
        onChange={(e) => {
          State.update({
            path: e.target.value,
          });
        }}
      />
    </div>
    {exists ? (
      <div className="m-2 mt-3">
        <Widget
          src="hack.near/widget/AttestButton"
          props={{ item: state.path }}
        />
      </div>
    ) : (
      <div className="m-2 mt-3">
        <i>↳ nothing found</i>
      </div>
    )}
  </>
);
