const data = props.data;

return (
  <>
    <h1>{data.title}</h1>
    <Widget
      src="efiz.near/widget/Every.Thing.View"
      props={{ path: data.overview }}
    />
    <Widget
      src="efiz.near/widget/Every.Thing.View"
      props={{ path: data.feed }}
    />
  </>
);
