/*
---props---

props.widgetPath?: string,

*/

// How can I access the widget path dynamically?
const initWidgetPath = "efiz.near/widget/Create";

State.init({
  widgetPath: initWidgetPath,
  color: "",
  brand: "",
  size: "",
  material: "",
});

// START GET THE WIDGET COMMIT
const historyBlocksRequest = Social.keys(`${initWidgetPath}`, "final", {
  return_type: "History",
});

if (historyBlocksRequest === null) return "loading...";

const [widgetAccountId, _, widgetName] = initWidgetPath.split("/");

let blocksChanges =
  historyBlocksRequest[widgetAccountId]?.["widget"]?.[widgetName];

// Latest commit sits at blocksChanges[0]
// How do we know this is the one they are using though?
// END GET THE WIDGET COMMIT

const composeData = () => {
  const data = {
    thing: {
      main: JSON.stringify({
        color: state.color,
        brand: state.brand,
        size: state.size,
        material: state.material,
        commit: blocksChanges[0],
      }),
    },
    index: {
      thing: JSON.stringify({
        key: "main",
        value: {
          type: "thing",
        },
      }),
    },
  };

  return data;
};

return (
  <div>
    <h1 class="text-center">Thing</h1>

    <div class="input-group mb-3">
      <input
        class="form-control"
        placeholder={"color"}
        onChange={({ target }) => State.update({ color: target.value })}
      />
      <input
        class="form-control"
        placeholder={"brand"}
        onChange={({ target }) => State.update({ brand: target.value })}
      />
      <input
        class="form-control"
        placeholder={"size"}
        onChange={({ target }) => State.update({ size: target.value })}
      />
      <input
        class="form-control"
        placeholder={"material"}
        onChange={({ target }) => State.update({ material: target.value })}
      />
    </div>
    <div>
      <div className={"list-group-item list-group-item-action "}>
        #{blocksChanges[0]}
      </div>
      <div className={"list-group-item list-group-item-action "}>
        {state.color}
      </div>
      <div className={"list-group-item list-group-item-action "}>
        {state.brand}
      </div>
      <div className={"list-group-item list-group-item-action "}>
        {state.size}
      </div>
      <div className={"list-group-item list-group-item-action "}>
        {state.material}
      </div>
    </div>
    <CommitButton
      disabled={false}
      force
      className="btn btn-dark rounded-3"
      data={composeData}
    >
      Create
    </CommitButton>
  </div>
);
