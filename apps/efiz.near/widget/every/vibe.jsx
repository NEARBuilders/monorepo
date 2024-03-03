const location = props.location || "Paris";
const hashtag = props.hashtag || "ProofOfVibes";
const hashtags = hashtag && hashtag.split(",")?.map((it) => it.trim());
hashtags.push(location);

const mention = props.mention || "";
const mentions = mention && mention.split(",")?.map((it) => it.trim());

return (
  <Widget
    src="efiz.near/widget/every.feed.view"
    props={{
      data: {
        hashtagWhitelist: hashtags,
        typeWhitelist: ["md"],
        embedMentions: mentions,
        postTemplate: "efiz.near/widget/every.vibe.view",
        composeTemplate: "efiz.near/widget/every.vibe.create",
      },
    }}
  />
);
