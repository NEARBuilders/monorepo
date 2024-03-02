const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}

const page = props.page ?? Social.getr(`${accountId}/page`);

if (page === null) {
  return "Loading";
}

return (
  <div className="py-1 px-1">
    <div className="mx-auto">
      <Widget
        src="hack.near/widget/Page.Summary"
        props={{
          accountId,
          page,
          link: true,
          showEditButton: !props.page,
        }}
      />

      <div className="mt-3">
        <Widget src="hack.near/widget/Page.Tabs" props={{ accountId, page }} />
      </div>
    </div>
  </div>
);
