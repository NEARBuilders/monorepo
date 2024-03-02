const hashtags = [{ name: "news", required: true }];

return (
  <Widget
    src="efiz.near/widget/Community.Posts"
    props={{
      communityHashtags: hashtags,
      communityDomain: "nearweek",
      exclusive: false,
      allowPublicPosting: true,
    }}
  />
);
