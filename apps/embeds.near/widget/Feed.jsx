const { Feed } = VM.require("devs.near/widget/Module.Feed");

Feed = Feed || (() => <></>); // make sure you have this or else it can break

const [filterAccountId, setFilterAccountId] = useState(context.accountId);

return (
  <>
    <input
      value={filterAccountId}
      onChange={(e) => setFilterAccountId(e.target.value)}
    />
    <Feed
      index={{
        action: "post",
        key: "main",
        options: {
          limit: 10,
          order: "desc",
          accountId: [filterAccountId],
        },
      }}
      Item={(p) => {
        return (
          <Widget
            key={JSON.stringify(p)}
            src="embeds.near/widget/Post.Index"
            loading={<div style={{ height: "200px" }} />}
            props={{ accountId: p.accountId, blockHeight: p.blockHeight }}
          />
        );
      }}
    />
  </>
);
