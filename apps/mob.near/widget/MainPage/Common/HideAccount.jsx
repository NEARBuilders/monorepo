if (!context.accountId) {
  return <></>;
}
const accountId = props.accountId;
if (!accountId) {
  return "props.accountId required";
}

return (
  <CommitButton
    className={props.className ?? "btn btn-outline-dark dropdown-item"}
    data={{
      graph: {
        hide: {
          [accountId]: "",
        },
      },
    }}
    onCommit={() => {
      State.update({ hidden: true });
    }}
  >
    {state.hidden ? (
      <i className="bi bi-check-lg" />
    ) : (
      <i className="bi bi-person-slash" />
    )}
    {state.hidden
      ? props.hiddenLabel ?? "Hidden"
      : props.label ?? (
          <>
            Hide{" "}
            <Widget
              src="mob.near/widget/ProfileLine"
              props={{
                accountId,
                link: false,
                hideAccountId: true,
                hideImage: true,
              }}
            />
          </>
        )}
  </CommitButton>
);
