const handleFilter = props.handleFilter;

State.init({
  accountId: props.accountId || "",
  tag: props.tag || "",
});

function applyAccountFilter(val) {
  State.update({ accountId: val });
  handleFilter({
    accountId: val,
  });
}

function applyTagFilter(val) {
  State.update({ tag: val });
  handleFilter({
    tag: val,
  });
}

return (
  <div className="mb-2 d-flex align-items-baseline gap-2">
    Filter:
    {state.accountId ? (
      <a className="btn btn-outline-primary">
        <Widget
          src="mob.near/widget/ProfileLine"
          props={{ accountId: state.accountId, link: false }}
        />
        <i
          className="bi bi-x-square"
          onClick={() => applyAccountFilter(null)}
        ></i>
      </a>
    ) : (
      <>
        <input
          className="form-control d-inline-block w-auto"
          placeholder={"accountId"}
          value={state.accountIdVal}
          onChange={(e) =>
            State.update({
              accountIdVal: e.target.value,
            })
          }
        />
        <button onClick={() => applyAccountFilter(state.accountIdVal)}>
          apply
        </button>
      </>
    )}
    {state.tag ? (
      <a className="btn btn-outline-primary">
        <span className="badge text-bg-secondary">#{state.tag}</span>
        <i className="bi bi-x-square" onClick={() => applyTagFilter(null)}></i>
      </a>
    ) : (
      <>
        <input
          className="form-control d-inline-block w-auto"
          placeholder={"tag"}
          value={state.tagVal}
          onChange={(e) =>
            State.update({
              tagVal: e.target.value,
            })
          }
        />
        <button onClick={() => applyTagFilter(state.tagVal)}>apply</button>
      </>
    )}
  </div>
);
