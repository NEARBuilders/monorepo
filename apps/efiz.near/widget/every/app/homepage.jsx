const accountId = context.accountId;

const homepage = accountId
  ? Social.get(`${accountId}/settings/every/homepage`)
  : undefined;

if (homepage === null) {
  return "Loading";
}

if (homepage) {
  return <Widget src={homepage} props={props} />;
} else {
  return (
    <Widget
      src="every.near/widget/every.thing.view"
      props={{ path: "every.near/thing/post" }}
    />
  );
}
