const accountId = context.accountId || null;
const onChange = props.onChange;

if (accountId === null) {
  return "please login to a near account";
}

const Button = styled.button`
  margin-left: 5px;
`;

State.init({
  components: [],
});

function handleSaveDocument() {
  const thing = {};
  const blocks = [];

  state.components?.forEach((entry) => {
    if (entry.type !== "embed") {
      const entryId = Math.random();
      thing[entryId] = JSON.stringify({
        data: entry.value,
        type: entry.type,
      });
      blocks.push(`${accountId}/thing/${entryId}`);
    } else {
      blocks.push(entry.value);
    }
  });
  if (onChange) {
    onChange(blocks, thing);
  } else {
    console.log(blocks);
  }
}

function handleTypeClick(type) {
  State.update({ components: [...state.components, { type }] });
}

function handleDeleteClick(index) {
  const updatedComponents = [...state.components];
  updatedComponents.splice(index, 1);
  State.update({ components: updatedComponents });
}

function handleMoveUpClick(index) {
  if (index > 0) {
    const updatedComponents = [...state.components];
    const component = updatedComponents[index];
    updatedComponents.splice(index, 1);
    updatedComponents.splice(index - 1, 0, component);
    State.update({ components: updatedComponents });
  }
}

function handleMoveDownClick(index) {
  if (index < state.components.length - 1) {
    const updatedComponents = [...state.components];
    const component = updatedComponents[index];
    updatedComponents.splice(index, 1);
    updatedComponents.splice(index + 1, 0, component);
    State.update({ components: updatedComponents });
  }
}

function RenderComponent({ component, index }) {
  const isTop = index === 0;
  const isBottom = index === state.components.length - 1;
  let widgetSrc;
  if (component.type === "embed") {
    widgetSrc = "efiz.near/widget/Every.Thing.Embed";
  } else {
    const type = JSON.parse(Social.get(component.type, "final") || "null");
    widgetSrc = type.widgets?.create;
  }

  const handleComponentChange = (value) => {
    const updatedComponents = [...state.components];
    updatedComponents[index] = {
      ...updatedComponents[index],
      value,
    };
    State.update({ components: updatedComponents });
  };

  return (
    <div>
      <Widget
        src={widgetSrc}
        props={{
          data: state.components[index].value,
          onChange: handleComponentChange,
        }}
      />
      <Button onClick={() => handleDeleteClick(index)}>Delete</Button>
      <Button onClick={() => handleMoveUpClick(index)} disabled={isTop}>
        &uarr;
      </Button>
      <Button onClick={() => handleMoveDownClick(index)} disabled={isBottom}>
        &darr;
      </Button>
    </div>
  );
}

return (
  <div>
    <Button onClick={() => handleTypeClick("efiz.near/type/Image")}>
      Add Image
    </Button>
    <Button onClick={() => handleTypeClick("efiz.near/type/markdown")}>
      Add Markdown
    </Button>
    <Button onClick={() => handleTypeClick("efiz.near/type/feed")}>
      Add Feed
    </Button>
    <Button onClick={() => handleTypeClick("embed")}>Embed Thing</Button>
    {state.components.map((component, index) => (
      <RenderComponent key={index} component={component} index={index} />
    ))}
    <Button onClick={handleSaveDocument}>save</Button>
  </div>
);
