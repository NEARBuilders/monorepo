const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet to edit your page";
}

const defaultPage = "mob.near/widget/ProfilePage";

const page = Social.get(`${accountId}/settings/near.social/MyPage`);

if (page === null) {
  return "Loading";
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
      <h4>Edit your page</h4>
      Your short URL:
      <input disabled value={yourPageUrl} onChange={null} />
    </div>
    <div className="mb-2">
      Widget:
      <input type="text" value={state.page} placeholder={defaultPage} />
    </div>
    <div className="mb-2">
      <CommitButton
        data={{ settings: { "near.social": { MyPage: state.page } } }}
      >
        Save your page
      </CommitButton>
      {state.page !== defaultPage && (
        <button className="btn btn-outline-primary ms-2" onClick={resetPage}>
          Reset your page
        </button>
      )}
      {page === state.page && (
        <a className="btn btn-outline-primary ms-2" href={`#/`}>
          Open your page
        </a>
      )}
    </div>
    <hr />
    <div className="mb-2">
      <Widget src={state.page} props={{ accountId }} />
    </div>
  </div>
);
