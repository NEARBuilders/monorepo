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
      src="hack.near/widget/Everything.Template"
      props={{
        accountId: "hack.near",
        font: "Courier",
        type: "everything",
        text: "ABC",
        domain: "abc",
      }}
    />
  </div>
);
