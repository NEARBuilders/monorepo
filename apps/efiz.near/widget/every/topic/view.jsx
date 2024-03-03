const data = props.data;

return (
  <>
    <h1>{data.title}</h1>
    <p>{data.description}</p>
    <Widget
      src="efiz.near/widget/Every.Thing.View"
      props={{ path: data.feed }}
    />
  </>
);

// return (
//   <>
//     <Widget
//       src="efiz.near/widget/Every.Post.Create"
//       props={{ type: "efiz.near/type/markdown", key: "test" }}
//     />
//     <Widget
//       src="efiz.near/widget/Every.Post"
//       props={{ typeWhitelist: typeWhitelist, key: "test" }}
//     />
//   </>
// );
