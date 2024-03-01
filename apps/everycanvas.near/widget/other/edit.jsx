const { value, onChange, onSubmit, onCancel } = props;

const indices = Social.index(
  "post",
  {
    // thing
    type: "thing",
    path: "efiz.near/thing/draw", // this is the page??
  },
  {
    order: "desc",
    limit: 100, // this needs to adjust based on slider
    // accountId: props.accounts, // undefined
  }
);

if (!indices) {
  return <p>Loading...</p>;
}

const drawings = indices
  .map((it) => {
    const path = `${it.accountId}/post/main`;
    const blockHeight = it.blockHeight;

    const val = JSON.parse(Social.get(path, blockHeight) || "null");
    return val.content.shapes ? val.content.shapes : [];
  })
  .flat();

return (
  <Widget
    src="everycanvas.near/widget/canvas.core"
    props={{ initialShapes: drawings }}
  />
);
