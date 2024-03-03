const accountId = props.accountId ?? context.accountId;

return (
  <>
    <Widget
      src="hack.near/widget/multi.page"
      props={{
        accountId,
        daoId: "buidl.near",
        h1: "ETHDenver",
        h2: "Builder House",
        tagline: "February 25 - March 4, 2024",
      }}
    />
  </>
);
