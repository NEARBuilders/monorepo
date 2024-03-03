const hashtag = props.hashtag;

return (
  <>
    {context.accountId && (
      <div className="mb-3">
        <Widget src="hack.near/widget/Page.Compose" props={{ hashtag }} />
      </div>
    )}
    <Widget src="hack.near/widget/Hashtag.Feed" props={{ hashtag }} />
  </>
);
