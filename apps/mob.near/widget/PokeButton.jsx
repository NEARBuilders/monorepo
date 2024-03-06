if (
  !props.accountId ||
  !context.accountId ||
  context.accountId === props.accountId
) {
  return "";
}

const data = {
  index: {
    graph: JSON.stringify({
      key: "poke",
      value: {
        accountId: props.accountId,
      },
    }),
    notify: JSON.stringify({
      key: props.accountId,
      value: {
        type: "poke",
      },
    }),
  },
};

return (
  <CommitButton
    force
    className={`btn btn btn-dark text-nowrap rounded-5`}
    data={data}
  >
    <Widget
      src="mob.near/widget/ProfileImage"
      props={{
        accountId: props.accountId,
        style: { width: "1.5rem", height: "1.5rem" },
        imageClassName: "rounded-5 w-100 h-100 align-bottom",
      }}
    />
    <span role="img" aria-label="poke">
      👈
    </span>{" "}
    {props.back ? "Poke back" : "Poke"}
  </CommitButton>
);
