return (
  <div className="d-flex flex-column">
    <div className="mt-auto py-3">
      <div className="container">
        <div className="d-flex justify-content-end">
          <a href={"/#/evrything-docs.near/widget/Everything.Documentation"}>
            documentation
          </a>
        </div>
      </div>
    </div>
    <Widget
      src="evrything.near/widget/Everything.Template"
      props={{
        accountId: "evrything.near",
        font: "Times New Roman",
        type: "everything",
        text: "everything",
        domain: "everything",
      }}
    />
  </div>
);
