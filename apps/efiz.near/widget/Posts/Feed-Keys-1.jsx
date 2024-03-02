const keys = props.keys;
let index;
if (keys && keys.length > 0) {
  index = keys.map((it) => ({
    action: "post",
    key: it,
    options: {
      limit: 10,
      order: "desc",
      accountId: props.accounts,
    },
  }));
} else {
  index = {
    action: "post",
    key: "main",
    options: {
      limit: 10,
      order: "desc",
      accountId: props.accounts,
    },
  };
}

const Post = styled.div`
  border-bottom: 1px solid #eceef0;
  padding: 24px 0 12px;

  @media (max-width: 1200px) {
    padding: 12px 0 0;
  }
`;

const renderItem = (a) =>
  a.value.type === "md" && (
    <Post className="post" key={JSON.stringify(a)}>
      <Widget
        src="efiz.near/widget/Posts.Post-Keys-1"
        props={{ accountId: a.accountId, blockHeight: a.blockHeight, keys }}
      />
    </Post>
  );

return (
  <Widget src="mob.near/widget/MergedIndexFeed" props={{ index, renderItem }} />
);
