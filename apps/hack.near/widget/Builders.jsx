const data = Social.keys("*/widget", "final", {
  return_type: "BlockHeight",
});

if (!data) {
  return "Loading...";
}

State.init({
  when: 102345888,
  inverse: false,
});

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  a {
    width: 3em;
    height: 3em;
    display: inline-block;
    overflow: hidden;

    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const builders = new Set([...Object.keys(data)]);

const accounts = Object.keys(data)
  .filter((accountId) => builders.has(accountId))
  .filter((accountId) => data[accountId].widget > state.when)
  .map((accountId) => (
    <a
      title={accountId}
      href={`/mob.near/widget/ProfilePage?accountId=${accountId}`}
    >
      <img
        loading="lazy"
        src={`https://i.near.social/magic/thumbnail/https://near.social/magic/img/account/${accountId}`}
        alt={accountId}
      />
    </a>
  ));

const accountsInverse = Object.keys(data)
  .filter((accountId) => builders.has(accountId))
  .filter((accountId) => data[accountId].widget < state.when)
  .map((accountId) => (
    <a
      title={accountId}
      href={`/mob.near/widget/ProfilePage?accountId=${accountId}`}
    >
      <img
        loading="lazy"
        src={`https://i.near.social/magic/thumbnail/https://near.social/magic/img/account/${accountId}`}
        alt={accountId}
      />
    </a>
  ));

let blockHeight = state.when;

const block = Near.block(blockHeight);

const timestampNanosec = block.header.timestamp_nanosec;

const timeMs = parseFloat(timestampNanosec) / 1e6;
const date = new Date(timeMs);

return (
  <Wrapper>
    {state.inverse ? (
      <div className="m-3">
        <div className="row align-items-center">
          <div className="col-5">
            <h4>{accountsInverse.length} Active Builders</h4>
            <p>
              <i class="bi bi-clock-history px-2"></i>
              before {block && <b>{date.toDateString()}</b>}
            </p>
          </div>
          <div className="col-5 mb-2">
            <h5>blockHeight:</h5>
            <input
              type="number"
              value={state.when}
              onChange={(e) => State.update({ when: e.target.value })}
            />
          </div>
          <div className="col-2">
            <button
              className="btn btn-primary mt-4"
              onClick={() => State.update({ inverse: !state.inverse })}
            >
              {state.inverse ? "After" : "Before"}
            </button>
          </div>
        </div>
        <hr />
        <div>{accountsInverse}</div>
      </div>
    ) : (
      <div className="m-3">
        <div className="row align-items-center">
          <div className="col-5">
            <h4>{accounts.length} Active Builders</h4>
            <p>
              <i class="bi bi-clock-history px-2"></i>
              after {block && <b>{date.toDateString()}</b>}
            </p>
          </div>
          <div className="col-5 mb-2">
            <h5>blockHeight:</h5>
            <input
              type="number"
              value={state.when}
              onChange={(e) => State.update({ when: e.target.value })}
            />
          </div>
          <div className="col-2">
            <button
              className="btn btn-primary mt-4"
              onClick={() => State.update({ inverse: !state.inverse })}
            >
              {state.inverse ? "After" : "Before"}
            </button>
          </div>
        </div>

        <hr />
        <div>{accounts}</div>
      </div>
    )}
  </Wrapper>
);
