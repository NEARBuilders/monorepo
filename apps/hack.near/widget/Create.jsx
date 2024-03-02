const accountId = context.accountId;

return (
  <div className="d-flex flex-column">
    <div className="mt-auto py-3">
      <div className="container">
        <div className="d-flex justify-content-end">
          <a href={"/#/evrything-docs.near/widget/Everything.Documentation"}>
            docs
          </a>
        </div>
      </div>
    </div>
    <Widget
      src="evrything.near/widget/Everything.Template"
      props={{
        accountId: accountId,
        font: "Courier",
        type: "everything",
        text: "multi",
        domain: "abc",
      }}
    />
  </div>
);
