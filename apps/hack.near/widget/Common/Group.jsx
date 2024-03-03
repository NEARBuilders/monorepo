const hashtag = props.hashtag ?? "dev";

return (
  <div>
    <Widget
      src="mob.near/widget/LastProfilesImages"
      props={{ tag: hashtag, limit: 24 }}
    />
  </div>
);
