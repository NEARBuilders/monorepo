let accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet";
}

const memo = socialGet(`${accountId}/memo`);

if (memo === null) {
  return "Loading";
}

initState({ memo });

return (
  <div className="container row">
    <div>
      Memo:
      <input type="text" value={state.memo} />
    </div>
    <div className="mt-2">
      <CommitButton data={state}>Save memo</CommitButton>
    </div>
  </div>
);
