const accountId = context.accountId;

const CurrentView = accountId
  ? "hack.near/widget/start"
  : "buildhub.near/widget/login";

return (
  <div className="h-100">
    {props.signedIn && (
      <div
        className="position-absolute z-2"
        style={{ top: "3rem", right: "3rem" }}
      >
        <UserDropdown {...props} />
      </div>
    )}
    <Widget
      src={CurrentView}
      props={{
        ...props,
      }}
    />
  </div>
);
