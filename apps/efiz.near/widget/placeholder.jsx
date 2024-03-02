const requestSignIn = props.requestSignIn;
const accountId = context.accountId;
return (
  <>
    {accountId ? (
      <p>Logged in</p>
    ) : (
      <button onClick={() => requestSignIn()}>Hello World</button>
    )}
  </>
);
