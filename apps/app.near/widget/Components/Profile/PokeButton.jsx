const { Button } = VM.require("app.near/widget/Components") || {
  Button: () => <></>,
};

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
  <Button
    force
    onClick={() =>
      Social.set(data, {
        force: true,
      })
    }
  >
    <span role="img" aria-label="poke">
      👉
    </span>{" "}
    {props.back ? "Poke back" : "Poke"}
  </Button>
);
