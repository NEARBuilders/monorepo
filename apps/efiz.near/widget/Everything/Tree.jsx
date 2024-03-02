const rootPath = props.rootPath || context.accountId || "evrything.near";
const type = props.type || "account";

State.init({
  path: rootPath,
  type,
  history: [rootPath],
});

function setPath(path) {
  State.update({ path });
}

function setHistory(history) {
  State.update({ history });
}

function getNode(path) {
  const parts = path.split("/");

  if (state.type === "account") {
    if (parts[0] !== "*") {
      // Otherwise will crash cuz it'll grab all accounts
      parts.push("**");
    }
    const value = Social.get(parts.join("/"), "final");
    return value;
  } else if (parts.length === 2) {
    // STANDARD LEVEL //
    parts.push("**");
    const value = Social.get(parts.join("/"), "final");
    return value;
  } else if (parts.length > 2) {
    // This is to refetch the data necessary for the route
    const standard = parts[1];
    let value = {};
    let type = standard;
    if (standard === "graph") {
      if (parts.length > 3) {
        if (parts[2] === "follow") {
          setPath(parts[3]);
          setHistory([...history, parts[3]]);
        }
      } else {
        parts.push("**");
        value = Social.get(parts.join("/"), "final");
      }
    } else if (standard === "profile") {
      value = Social.get(parts.join("/"), "final");
    } else if (standard === "post") {
      value = path;
    } else {
      value = Social.get(parts.join("/"), "final");
      value = JSON.parse(value);
    }
    return value;
  }
}

const node = getNode(state.path);

return (
  <Widget
    src="efiz.near/widget/Everything.Node"
    props={{
      label: state.path,
      node,
      type: state.type,
      path: state.path,
      setPath: setPath,
      history: state.history,
      setHistory: setHistory,
      isRoot: true,
    }}
  />
);
