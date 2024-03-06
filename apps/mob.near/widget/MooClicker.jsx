let index = state.index ?? Storage.get("index");
if (index !== null) {
  index = index || [];

  const lastBlockHeight = index[0].blockHeight || 0;

  const newIndex = Social.index("moo", "moo-click", {
    order: "asc",
    from: lastBlockHeight + 1,
    subscribe: true,
  });

  if (newIndex !== null && newIndex.length > 0) {
    index = [...newIndex.reverse(), ...index];
    Storage.set("index", index);
  }

  if ((state.index.length || 0) < (index.length || 0)) {
    State.update({
      index,
    });
  }
}

if (!state.mooSound) {
  State.update({
    mooSound:
      "https://ipfs.near.social/ipfs/bafkreie3wfnaprino6mhcauo7jwlgvpj4urfn2ff4jv4b6jmu5pgxidx4q",
  });
  new Audio(state.mooSound);
}

const moos = index;

const counter = {};
const uniqueMoos = {};

if (moos) {
  moos.forEach(({ accountId, value }) => {
    const key = JSON.stringify({ accountId, value });
    if (key in uniqueMoos) {
      return;
    }
    counter[accountId] = (counter[accountId] || 0) + 1;
    uniqueMoos[key] = true;
  });
}

const top = Object.entries(counter);
top.sort((a, b) => b[1] - a[1]);

const flyAnimation = styled.keyframes`
 0% { left: max(-20vh, -20vw);  font-size: min(20vh, 20vw); }
 50% {  font-size: min(70vh, 70vw); }
 100% { left: calc(100vw + min(20vh, 20vw)); font-size: min(20vh, 20vw); }
`;

const Cow = styled.div`
  z-index: 900;
  left: max(-20vh, -20vw);
  font-size: min(20vh, 20vw);
  display: inline-block;
  position: fixed;
  top: 50vh;
  transform: translate(-50%, -50%);
  animation-name: ${flyAnimation};
  animation-timing-function: linear;
  animation-duration: 3s;
  animation-iteration-count: 1;
`;

function renderMoos(accountIds) {
  return (
    <div className="d-flex flex-wrap gap-3">
      {accountIds &&
        accountIds.map((accountId, i) => {
          return (
            <div className="position-relative" key={i}>
              <a
                href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
                className="text-decoration-none"
              >
                <Widget
                  src="mob.near/widget/ProfileImage"
                  props={{
                    accountId,
                    className: "d-inline-block overflow-hidden",
                  }}
                />
              </a>
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success"
                style={{ zIndex: 1, border: "1px solid rgb(15,81,51)" }}
              >
                {counter[accountId]}
              </span>
            </div>
          );
        })}
    </div>
  );
}

return (
  <div>
    <div className="mb-4">
      <CommitButton
        className="btn btn-lg btn-success"
        onClick={() => {
          const sound = new Audio(state.mooSound);
          sound.play();
          State.update({
            lastMoo: Date.now(),
          });
        }}
        onCommit={() => {
          State.update({
            lastMoo: null,
          });
        }}
        onCancel={() => {
          State.update({
            lastMoo: null,
          });
        }}
        data={() => ({
          index: {
            moo: JSON.stringify({
              key: "moo-click",
              value: Date.now(),
            }),
          },
        })}
      >
        Moo 🐮
      </CommitButton>
    </div>
    <div className="mb-4">
      <h4>Top 10</h4>
      <div>{renderMoos(top.slice(0, 10).map((a) => a[0]))}</div>
    </div>
    <div className="mb-4">
      <h4>Last 10 </h4>
      <div>{moos && renderMoos(moos.slice(0, 10).map((a) => a.accountId))}</div>
    </div>
    {state.lastMoo && <Cow key={`moo-${state.lastMoo}`}>🐮</Cow>}
  </div>
);
