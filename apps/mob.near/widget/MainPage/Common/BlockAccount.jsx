if (!context.accountId) {
  return false;
}
const blockAccountId = props.blockAccountId;
if (!blockAccountId) {
  return "props.blockAccountId required";
}

return (
  <CommitButton
    className={props.className ?? "btn btn-outline-dark dropdown-item"}
    data={{
      graph: {
        block: {
          [blockAccountId]: "",
        },
      },
    }}
    onCommit={() => {
      State.update({ blocked: true });
    }}
  >
    {state.blocked ? (
      <i className="bi bi-check-lg" />
    ) : (
      <i className="bi bi-person-slash" />
    )}
    {state.blocked
      ? props.blockedLabel ?? "Blocked"
      : props.label ?? (
          <>
            Block{" "}
            <Widget
              src="mob.near/widget/ProfileLine"
              props={{
                accountId: blockAccountId,
                link: false,
                hideAccountId: true,
                hideImage: true,
              }}
            />
          </>
        )}
  </CommitButton>
);
