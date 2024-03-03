const data = props.data;
const paths = data.path;
const thingTemplate = data.thingTemplate || "efiz.near/widget/docs.card";

if (!paths) {
  return <>Loading</>;
}

return (
  <div>
    {paths?.map((it) => {
      return <Widget src={thingTemplate} props={{ path: it }} />;
    })}
  </div>
);
