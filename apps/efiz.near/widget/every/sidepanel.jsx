const accountId = context.accountId;

const sidepanel = accountId
  ? Social.get(`${accountId}/settings/every/sidepanel`)
  : undefined;

if (sidepanel === null) {
  return "Loading";
}

return (
  <Widget
    src={sidepanel ?? "efiz.near/widget/every.sidepanel.default"}
    props={props}
  />
);

// return (
//   <>
//     {accountId ? (
//       <p>Logged in</p>
//     ) : (
//       <button onClick={() => requestSignIn()}>Hello World</button>
//     )}
//   </>
// );

// const accountId = context.accountId;

// const homepage = accountId
//   ? Social.get(`${accountId}/settings/every/homepage`)
//   : undefined;

// return <Widget src={homepage ?? "mob.near/widget/Welcome"} props={props} />;
