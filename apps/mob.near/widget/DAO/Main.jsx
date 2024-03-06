let daoId = state.daoId ?? props.daoId;

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
      <label>DAO account ID</label>
      <input value={daoId} onChange={(e) => updateDao(e.target.value)} />
    </div>
    <div className="mt-3">
      <Widget src="mob.near/widget/DAO.Proposals" props={{ daoId }} />
    </div>
  </div>
);
