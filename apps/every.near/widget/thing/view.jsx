const path = props.path; // every piece of data on social contract has a path
const blockHeight = props.blockHeight || "final"; // and a blockHeight (~version)
const options = props.options;
if (!path) {
  return <p>No path provided.</p>;
}

// split the path
const parts = path.split("/");
const creatorId = parts[0];

let type;
if (parts.length === 1) {
  // every root of a path is an account
  type = "account";
} else {
  // otherwise the "standard" is the type (widget, post, type, thing...)
  // for thing, we'll extract the actual "Type" later
  type = parts[1];
}


  return (
    <Widget
      src="efiz.near/widget/Common.Dropdown"
      props={{
        renderIcon: renderIcon,
        elements:
          type === "widget"
            ? [jutsu()]
            : Object.keys(plugins)?.map((it) => createButton(it, plugins[it])),
      }}
    />
  );
}

function Thing() {
  // Renders the path according to type
  switch (type) {
    case "thing": {
      // get the thing data
      const thing = JSON.parse(Social.get(path, blockHeight) || "null");
      type = thing.type || null;
      // get the type data
      const typeObj = JSON.parse(Social.get(type, blockHeight) || "null");
      if (typeObj === null) {
        console.log(
          `edge case: thing ${path} had an invalid type: ${thingType}`
        );
        typeObj = {
          widgets: {
            view: "every.near/widget/app", // this is temp cuz I know it's the app type
          },
        };
      }
      // const { get } = VM.require(thing.adapter || (() => {}));

      // if (get) {
      //   const passProps = get(thing.reference);
      //   console.log("passProps", passProps);
      //   return (<Widget src={widgetSrc} props={passProps} />);
      // }
      // determine the widget to render this thing (is there a default view?)
      const widgetSrc =
        options?.templateOverride ||
        thing.template?.src ||
        typeObj?.widgets?.view;
      // Template
      if (!widgetSrc) {
        return (
          <Widget
            src="efiz.near/widget/MonacoEditor"
            props={{
              code: JSON.stringify(thing),
              path,
              language: "javascript",
            }}
          />
        );
      }
      return (
        <Widget src={widgetSrc} props={{ data: thing, path, blockHeight }} />
      );
    }
    case "post": {
      return (
        <Widget
          src="every.near/widget/every.post.view"
          props={{
            path,
            blockHeight: a.blockHeight,
          }}
        />
      );
    }
    case "widget": {
      return <Widget src={path} props={props} />;
    }
    case "account": {
      return (
        <Widget src="mob.near/widget/ProfilePage" props={{ accountId: path }} />
      );
    }
    case "settings": {
      // Standardize path to {accountId}/settings/**
      parts.splice(2);
      parts.push("**");
      path = parts.join("/");
      return (
        <Widget
          src="efiz.near/widget/Every.Setting"
          props={{ path, blockHeight }}
        />
      );
    }
    case "type": {
      return (
        <Widget
          src="every.near/widget/every.type.create"
          props={{ typeSrc: path }}
        />
      );
    }
  }
  // DEFAULT:
  // if it is a 
  return <p>The type: {type} is not yet supported.</p>;
}

function Plugin() {
  const plugin = plugins[state.view];
  return (
    <Container>
      <Header style={{ justifyContent: "flex-start" }}>
        <Button
          onClick={() => {
            State.update({ view: "THING" });
          }}
        >
          back
        </Button>
      </Header>
      <Widget src={plugin.src} props={{ path, blockHeight }} />
    </Container>
  );
}

return (
  <Container id={path}>
    <Header>
      <ButtonRow>
        <Modifier />
      </ButtonRow>
    </Header>
    <Content>{state.view === "THING" ? <Thing /> : <Plugin />}</Content>
  </Container>
);
