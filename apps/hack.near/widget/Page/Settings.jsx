const accountId = context.accountId;

if (!accountId) {
  return "Please connect your NEAR account :)";
}

const defaultPage = "hack.near/widget/ForkThis";

const page = Social.get(`${accountId}/settings/near.social/page`);

if (page === null) {
  return "Loading...";
}

State.init({
  page: page ?? defaultPage,
});

const resetPage = () => {
  state.page = defaultPage;
  State.update();
};

const yourPageUrl = `${accountId}.social`;

return (
  <div>
    <div>
      <h4>Edit Your Page</h4>
      <p className="mb-2 mt-2">Abbreviated URL</p>
      <input disabled value={yourPageUrl} onChange={null} />
      <p className="mb-2 mt-2">Default widget path:</p>
      <input type="text" value={state.page} placeholder={defaultPage} />
    </div>
    <div className="mb-2 mt-3">
      <CommitButton
        data={{ settings: { "near.social": { page: state.page } } }}
      >
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
      <Widget src={state.page} props={{ accountId }} />
    </div>
  </div>
);
