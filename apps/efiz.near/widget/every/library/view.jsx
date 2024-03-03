const data = props.data;
const lists = data.list;

if (!lists) {
  return <>Loading</>;
}

return (
  <div>
    {lists?.map((it) => {
      return (
        <Widget
          src={"efiz.near/widget/every.list.view"}
          props={{ data: { path: it.path } }}
        />
      );
    })}
  </div>
);
