const hashtag = props.hashtag;
if (!hashtag) {
  return "props.hashtag is required";
}

const index = {
  action: "hashtag",
  key: hashtag.toLowerCase(),
  options: {
    limit: 10,
    order: "desc",
    accountId: props.accounts,
  },
  cacheOptions: {
    ignoreCache: true,
  },
};

const renderItem = (a) =>
  (a.value.type === "social" && `${a.accountId}/post/main` === a.value.path && (
    <div key={JSON.stringify(a)}>
      <Widget
        src="mob.near/widget/MainPage.N.Post"
        props={{ accountId: a.accountId, blockHeight: a.blockHeight }}
      />
    </div>
  )) ||
  (a.value.type === "social" &&
    `${a.accountId}/post/comment` === a.value.path && (
      <div key={JSON.stringify(a)}>
        <Widget
          src="mob.near/widget/MainPage.N.Comment.Post"
          props={{ accountId: a.accountId, blockHeight: a.blockHeight }}
        />
      </div>
    ));

return (
  <Widget
    src="mob.near/widget/FilteredIndexFeed"
    props={{ index, renderItem, threshold: 800 }}
  />
);
