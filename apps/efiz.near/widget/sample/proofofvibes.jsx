const hashtag = props.hashtag || "";
const hashtags = hashtag.split(",")?.map((it) => it.trim());

const mention = props.mention || "";
const mentions = mention.split(",")?.map((it) => it.trim());

return (
  <Widget
    src="efiz.near/widget/every.feed.view"
    props={{
      data: {
        hashtagWhitelist: hashtags,
        typeWhitelist: ["md"],
        embedMentions: mentions,
        // postTemplate: "efiz.near/widget/placeholder",
      },
    }}
  />
);
