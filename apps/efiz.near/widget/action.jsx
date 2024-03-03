const accountId = context.accountId;
const focus = props.focus;

if (focus) {
  const parts = focus.split("/");
  if (parts.length) {
    return (
      <Widget
        src="miraclx.near/widget/Attribution"
        props={{ dep: true, authors: [parts[0]] }}
      />
    );
  }
}

const action = accountId
  ? Social.get(`${accountId}/settings/every/action`)
  : undefined;

if (action === null) {
  return "Loading";
}

const Button = styled.button``;

return (
  <div>
    <Button
      onClick={() => Social.set({ settings: { every: { action: null } } })}
    >
      reset
    </Button>
    <Widget src={action ?? "efiz.near/widget/action.default"} />
  </div>
);
