if (!context.accountId) {
  return <></>;
}

const item = props.item;
if (!item) {
  return "props.item required";
}

return (
  <CommitButton
    className={props.className ?? "btn btn-outline-dark dropdown-item"}
    data={{
      index: {
        flag: JSON.stringify({
          key: "main",
          value: item,
        }),
      },
    }}
    onCommit={() => {
      State.update({ flagged: true });
    }}
  >
    {state.flagged ? (
      <i className="bi bi-check-lg" />
    ) : (
      <i className="bi bi-flag" />
    )}
    {state.flagged
      ? props.flaggedLabel ?? "Flagged"
      : props.label ?? "Flag content"}
  </CommitButton>
);
