const block = props.block;
const type = props.type;

if (type === "social") {
  const parts = block.value.path.split("/");
  if (parts.length) {
    if (parts[2] === "main") {
      return (
        <div key={JSON.stringify(a)} className="mb-3">
          <Widget
            src="near/widget/Posts.Post"
            props={{ accountId: a.accountId, blockHeight: a.blockHeight }}
          />
        </div>
      );
    }
    if (parts[2] === "comment") {
      return (
        <div key={JSON.stringify(a)} className="mb-3">
          <Widget
            src="mob.near/widget/MainPage.Comment.Post"
            props={{ accountId: a.accountId, blockHeight: a.blockHeight }}
          />
        </div>
      );
    }
  }
}
if (type === "md") {
  return (
    <Post className="post" key={JSON.stringify(a)}>
      <Widget
        src="near/widget/Posts.Post"
        props={{ accountId: a.accountId, blockHeight: a.blockHeight }}
      />
    </Post>
  );
}

console.log(
  `block of type ${type} did not match any render condition: ${block}`
);
