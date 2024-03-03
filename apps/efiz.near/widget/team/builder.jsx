State.init({
  elements: {},
  inputVal: "",
});

function addElement(newElement) {
  State.update({
    elements: { ...state.elements, [newElement]: "" },
  });
}

function Element({ val }) {
  return <div>{val}</div>;
}

function generateUID() {
  return (
    Math.random().toString(16).slice(2) +
    Date.now().toString(36) +
    Math.random().toString(16).slice(2)
  );
}

const handleCreateTeam = () => {
  const teamId = generateUID();

  const data = {
    // thing: { // We can create the thing later, just remember to save the UUID in your notes
    //   [teamId]: {
    //     ...
    //   },
    // },
    graph: {
      [teamId]: state.elements,
    },
    index: {
      // should probably create notifications like follow does?
    },
  };

  Social.set(data, {
    onCommit: () => {},
    onCancel: () => {},
  });
};

return (
  <>
    <div>
      <input onChange={(e) => State.update({ inputVal: e.target.value })} />
      <button onClick={() => addElement(state.inputVal)}>add</button>
    </div>
    <div>
      {Object.keys(state.elements).map((it) => {
        return <Element val={it} />;
      })}
    </div>
    <button onClick={handleCreateTeam}>create</button>
  </>
);
