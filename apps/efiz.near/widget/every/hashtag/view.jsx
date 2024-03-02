let hashtag = ["build"];
if (props.hashtag) {
  hashtag = props.hashtag.split(",");
}

return (
  <Widget
    src="efiz.near/widget/every.feed.view"
    props={{
      data: { hashtagWhitelist: hashtag, typeWhitelist: ["md"] },
    }}
  />
);
