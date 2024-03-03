const creatorId = props.creatorId || context.accountId;
const blockHeight = props.blockHeight || "final";
const thingId = props.thingId || "**";

const value = Social.get(`${creatorId}/thing/${thingId}`, blockHeight);
const keys = Object.keys(value);

const renderThing = (key) => {
  const path = `${creatorId}/thing/${key}`;
  return <Widget src="efiz.near/widget/Thing" props={{ path, blockHeight }} />;
};

return (
  <div>
    {keys.map((it) => {
      return <div>{renderThing(it)}</div>;
    })}
  </div>
);
