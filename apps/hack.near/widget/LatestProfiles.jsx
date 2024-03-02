const limit = props.limit ?? 100;

State.init({
  limit,
});

const onChangeLimit = (limit) => {
  State.update({
    limit,
  });
};

return (
  <div>
    <h5>Latest Profiles</h5>
    <p>
      <i>input limit below</i>
    </p>
    <input
      type="number"
      value={state.limit}
      onChange={(e) => onChangeLimit(e.target.value)}
    ></input>
    <br />
    <Widget
      src="hack.near/widget/RecentProfiles"
      props={{ limit: state.limit }}
    />
  </div>
);
