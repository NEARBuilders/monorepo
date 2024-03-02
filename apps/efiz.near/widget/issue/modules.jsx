const { Grid } = VM.require("efiz.near/widget/every.module");

const things = Social.index("post", "main", {
  limit: 10,
});

if (!things) {
  return <p>Loading...</p>;
}

return (
  <div>
    <button onClick={() => State.update({ test: "test" })}>break me!</button>
    <Grid>
      {things?.map((it) => (
        <p>{JSON.stringify(it)}</p>
      ))}
    </Grid>
  </div>
);
