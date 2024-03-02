/**
 * Forked from near/widget/Posts.Feed
 *
 * Takes in a hashtag filter or a domain filter
 */
const hashtagsFilter = props.hashtagsFilter || [];
const domainsFilter = props.domainsFilter || ["post"];

let index = [];

if (hashtagsFilter.length) {
  // either grab all posts matching this hashtag
  // and filter them out in "renderItem"
  index = hashtagsFilter.map((it) => ({
    action: "hashtag",
    key: it.toLowerCase(),
    options: {
      limit: 10,
      order: "desc",
      accountId: props.accounts,
    },
  }));
} else {
  index = domainsFilter.map((it) => ({
    action: it,
    key: "main",
    options: {
      limit: 10,
      order: "desc",
      accountId: props.accounts,
    },
  }));
}

const Post = styled.div`
  border-bottom: 1px solid #eceef0;
  padding: 24px 0 12px;

  @media (max-width: 1200px) {
    padding: 12px 0 0;
  }
`;

const renderItem = (a) => {
  if (domainsFilter.length) {
    for (let i = 0; i < domainsFilter.length; i++) {
      const domain = domainsFilter[i];
      if (hashtagsFilter.length) {
        if (
          a.value.type === "social" &&
          `${a.accountId}/${domain}/main` === a.value.path
        ) {
          return (
            <div key={JSON.stringify(a)} className="mb-3">
              <Widget
                src="near/widget/Posts.Post"
                props={{ accountId: a.accountId, blockHeight: a.blockHeight }}
              />
            </div>
          );
        } else if (
          a.value.type === "social" &&
          `${a.accountId}/${domain}/comment` === a.value.path
        ) {
          return (
            <div key={JSON.stringify(a)} className="mb-3">
              <Widget
                src="mob.near/widget/MainPage.Comment.Post"
                props={{ accountId: a.accountId, blockHeight: a.blockHeight }}
              />
            </div>
          );
        }
      } else {
        if (a.value.type === "md") {
          return (
            <Post className="post" key={JSON.stringify(a)}>
              <Widget
                src="near/widget/Posts.Post"
                props={{ accountId: a.accountId, blockHeight: a.blockHeight }}
              />
            </Post>
          );
        }
      }
    }
  }
};

return (
  <Widget
    src="efiz.near/widget/MergedIndexFeed"
    props={{ index, renderItem, disableCaching: true }}
  />
);
