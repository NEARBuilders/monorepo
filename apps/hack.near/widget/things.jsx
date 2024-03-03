const listId = props?.listId ?? "everything";
const accountId = props?.accountId ?? context.accountId ?? "hack.near";
const isCurator = accountId === context.accountId;

State.init({
  things: [],
  newThing: "",
});

function addThing(newThing) {
  state.things.push(newThing);

  State.update({
    things: state.things,
  });
}

function removeThing(thingKey) {
  const updatedThings = state.things.filter((thing) => thing !== thingKey);

  State.update({
    things: updatedThings,
  });
}

const handleSave = () => {
  const data = {
    things: {
      listId: state.things,
    },
  };

  Social.set(data, {
    onCommit: () => {},
    onCancel: () => {},
  });
};

const path = `${accountId}/things/${listId}`;
const things = Social.get(path, "optimistic", {
  subscribe: true,
});

const items = things ? JSON.parse(things) : [];

return (
  <div className="d-flex flex-column gap-2">
    <div>
      <h3>
        <strong>id:</strong> {listId}
      </h3>
    </div>
    <h5>
      <i>curated by {accountId}</i>
    </h5>
    <hr />
    <div>
      {isCurator ? (
        <h4 className="mb-3">update list</h4>
      ) : (
        <h4 className="mb-3">propose changes</h4>
      )}
      <input
        placeholder="input bos path of anything"
        onChange={(e) => State.update({ newThing: e.target.value })}
      />
      <div className="d-flex align-items-center mt-2">
        <button
          className="btn btn-primary m-2"
          onClick={() => addThing(state.newThing)}
        >
          add
        </button>
        {Object.keys(state.things).length > 0 && (
          <div className="ml-3">
            {JSON.stringify(things) !== JSON.stringify(state.things) && (
              <button className="btn btn-success m-2" onClick={handleSave}>
                save
              </button>
            )}
          </div>
        )}
      </div>
    </div>
    <div className="m-2">
      {state.things.length ? (
        <div>
          {state.things.map((thing, i) => {
            const thingData = Social.get(`${thing}`);
            return (
              <div className="d-flex m-2 p-2">
                <Widget
                  key={i}
                  src="hack.near/widget/thing.card"
                  props={{
                    data: thingData,
                  }}
                />
                <button
                  className="btn btn-danger m-1"
                  onClick={() => removeThing(thing)}
                >
                  remove
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <i>nothing found</i>
        </div>
      )}
    </div>
  </div>
);
