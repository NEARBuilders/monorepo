const data = props.data;
const blockHeight = props.blockHeight || "final";

return (
  <>
    {data?.map((it) => (
      <Widget
        src={"efiz.near/widget/Every.Thing.View"}
        props={{ path: it, blockHeight }}
      />
    ))}
  </>
);
