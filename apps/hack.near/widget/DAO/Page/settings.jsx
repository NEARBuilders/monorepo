const accountId = context.accountId;

if (!accountId) {
  return "NEAR account is required to edit your page";
}

const defaultPage = "build.sputnik-dao.near/widget/community";

const page = Social.get(`${accountId}/settings/dao/page`);

if (page === null) {
  return "Loading...";
}

initState({
  page: page ?? defaultPage,
});

const resetPage = () => {
  state.page = defaultPage;
  State.update();
};

return (
  <div>
    <div>
      <h3>DAO Page Settings</h3>
    </div>
    <div className="mb-2">
      <h5>input any widget path:</h5>
      <input type="text" value={state.page} placeholder={defaultPage} />
    </div>
    <div className="mb-2">
      <CommitButton data={{ settings: { dao: { page: state.page } } }}>
        Save
      </CommitButton>
      {state.page !== defaultPage && (
        <button className="btn btn-outline-primary ms-2" onClick={resetPage}>
          Reset
        </button>
      )}
      {page === state.page && (
        <a className="btn btn-outline-primary ms-2" href={`#/`}>
          Open
        </a>
      )}
    </div>
    <hr />
    <div className="mb-2">
      <Widget src={state.page} />
    </div>
  </div>
);
