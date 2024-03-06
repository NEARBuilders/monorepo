const index = {
  action: "flag",
  key: "main",
  options: {
    limit: 10,
    order: "desc",
  },
};

const renderItem = (a) => {
  const item = a.value;
  if (!item || item.type !== "social" || !item.path) {
    return <></>;
  }
  const accountId = item.path.split("/")[0];
  return (
    <div key={JSON.stringify(a)} className="mb-3">
      <div className="d-flex flex-row align-items-center">
        <div className="flex-grow-1 text-truncate">
          Reported by{" "}
          <Widget
            src="mob.near/widget/ProfileLine"
            props={{ accountId: a.accountId, hideAccountId: true }}
          />
        </div>
        <div>
          <Widget
            src="mob.near/widget/TimeAgo"
            props={{ blockHeight: a.blockHeight }}
          />
        </div>
      </div>
      {(`${accountId}/post/main` === item.path && (
        <Widget
          src="mob.near/widget/MainPage.Post"
          props={{ accountId, blockHeight: item.blockHeight }}
        />
      )) ||
        (`${accountId}/post/comment` === item.path && (
          <Widget
            src="mob.near/widget/MainPage.Comment.Post"
            props={{ accountId, blockHeight: item.blockHeight }}
          />
        ))}
    </div>
  );
};

return (
  <div>
    <Widget src="mob.near/widget/IndexFeed" props={{ index, renderItem }} />
  </div>
);
