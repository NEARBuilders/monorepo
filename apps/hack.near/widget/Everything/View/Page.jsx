const accountId = props.accountId ?? "create.near";
const domain = props.domain ?? "builders";

return (
  <>
    <div className="mb-3">
      <Widget
        src="miraclx.near/widget/Attribution"
        props={{
          dep: true,
          authors: [accountId],
        }}
      />
    </div>
    <Widget src="hack.near/widget/Components" props={{ domain, accountId }} />
  </>
);
