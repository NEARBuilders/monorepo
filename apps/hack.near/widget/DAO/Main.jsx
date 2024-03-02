let daoId = state.daoId ?? props.daoId ?? "multi.sputnik-dao.near";

if (daoId === undefined) {
  daoId = Storage.privateGet("daoId");
}

function updateDao(daoId) {
  if (state.daoId !== daoId) {
    State.update({
      daoId,
    });
    if (daoId !== undefined) {
      Storage.privateSet("daoId", daoId);
    }
  }
}

return (
  <div>
    <div>
      <h3>dao.main</h3>
      <h5>explore accounts:</h5>

      <input value={daoId} onChange={(e) => updateDao(e.target.value)} />
    </div>
    <div className="mt-3">
      <Widget src="hack.near/widget/dao.groups" props={{ daoId }} />
    </div>
  </div>
);
