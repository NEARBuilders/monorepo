const action = props.action;
const key = props.key;
const { Grid } = VM.require("efiz.near/widget/every.module");

const things = Social.index("post", "main", {
  limit: 10,
  order: "asc",
  accounts: undefined,
});

return (
  <div>
    <Widget
      src="efiz.near/widget/every.placeholder.view"
      props={{ note: "featured widgets" }}
    />
    <Grid>
      {things?.map((it) => (
        <p>{JSON.stringify(it)}</p>
      ))}
    </Grid>
  </div>
);
