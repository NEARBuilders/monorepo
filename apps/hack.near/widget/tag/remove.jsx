const path = props.path ?? "hack.near/widget/every";

if (!path) {
  return "";
}

State.init({
  path,
  tag: "",
});

const [creatorId, namespace, thingId] = state.path.split("/");

const tags = Social.get("*/graph/context/**");

const tagsByUsers = {};
const taggedThings = Object.keys(tagsByUsers);
const tagCount = taggedThings.length;

const removeTag = () => {
  const data = {
    graph: {
      context: {
        [creatorId]: {
          [namespace]: {
            [thingId]: {
              tags: {
                [state.tag]: null,
              },
            },
          },
        },
      },
    },
  };
  Social.set(data);
};

return (
  <div>
    <div className="m-2">
      <h5 className="mb-2">path:</h5>
      <input
        onChange={(e) => {
          State.update({
            path: e.target.value,
          });
        }}
      />
    </div>

    <div className="m-2">
      <h5 className="mb-2">tag:</h5>
      <input
        onChange={(e) => {
          State.update({
            tag: e.target.value,
          });
        }}
      />
    </div>
    <button
      disabled={state.tag === ""}
      className="btn btn-danger m-2"
      onClick={removeTag}
    >
      remove
    </button>
  </div>
);
