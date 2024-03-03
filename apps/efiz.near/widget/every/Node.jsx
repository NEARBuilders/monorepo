const key = props.key;
const label = props.label;
const path = props.path;
const setPath = props.setPath;
const history = props.history;
const setHistory = props.setHistory;
const isRoot = props.isRoot;

/**
 * Navigate into a Node
 */
function handleInto() {
  setPath(path);
  setHistory([...history, path]);
}

/**
 * Navigate back in history
 */
function handleBack() {
  const newPath = history[history.length - 2] || "";
  setPath(newPath);
  setHistory(history.slice(0, -1));
}

const Button = styled.button`
  text-transform: lowercase !important;
`;

const ButtonRow = styled.div`
//   display: flex;
//   flex-direction: row;
//   flex-wrap: wrap;
//   gap: 4px;
`;

function getType(path) {
  const parts = path.split("/");
  console.log(parts.length);
  if (parts.length === 1) {
    return "account";
  } else if (parts.length === 2) {
    return parts[1];
  } else {
    const standard = parts[1];
    if (standard === "thing") {
      // We're gonna grab the type from the thing itself
    }
    console.log(standard);
    return standard;
  }
}

const type = getType(path);

// WHEN A NEW ROOT IS SET //
// GET DATA AT THIS PATH //
function getNode(path, type) {
  const parts = path.split("/");
  let value = {};

  // ACCOUNT //
  if (type === "account") {
    if (parts.length > 1) {
      // GRAPH // FOLLOW // BACK TO ACCOUNT : WORKING
      //   setRoot(parts[3], "account");
    } else {
      if (parts[0] !== "*") {
        parts.push("**");
      }
      value = Social.get(parts.join("/"), "final");
      return value;
    }
    // THING //
  } else if (type === "thing") {
    // path: "everything"
    // type: "thing"
    return rootNode; // Or should "everything" be "*"?
    // PROFILE //
  } else if (type === "profile") {
    value = Social.get(parts.join("/"), "final");
    // POST : WIP //
  } else if (type === "post") {
    value = path;
    // NAMETAG : WIP //
  } else if (type === "nametag") {
    if (parts.length > 2) {
      if (parts.length === 3) {
        // BACK TO ACCOUNT
        // setRoot(parts[3], "account");
      } else if (parts.length === 4) {
        // ALL TAGS BY ACCOUNT
        value = Social.keys(`${parts[0]}/profile/tags/*`, "final");
      } else {
        // THIS TAG
        value = parts[5];
      }
    }
  } else {
    parts.push("**");
    value = Social.get(parts.join("/"), "final");
    return value;
  }
}
let node = {};
if (isRoot) {
  node = getNode(path, type);
}

// function renderEdges(edges) {
//   console.log(`edges: ${JSON.stringify(edges)}`);
//   return (
//     <ButtonRow>
//       {edges?.map((it) => (
//         <Widget
//           src="efiz.near/widget/Every.Node"
//           props={{
//             label: it.label,
//             path: it.path,
//             setPath: setPath,
//             history,
//             setHistory: setHistory,
//             isRoot: false,
//           }}
//         />
//       ))}
//     </ButtonRow>
//   );
// }

return (
  <div>
    <div>
      {isRoot ? (
        <>
          {/** render root view, is there a way to make the label better? get it from a map? */}
          <div
            style={{
              fontFamily: "Times New Roman",
              fontSize: "4em",
              lineHeight: "1.25",
              fontWeight: 400,
              cursor: "pointer",
            }}
          >
            {label}
          </div>
        </>
      ) : (
        <Button onClick={handleInto}>{label}</Button>
      )}
      {history.length > 1 && isRoot && (
        <Button onClick={handleBack}>back</Button>
      )}
      <ButtonRow>
        {/** EDGES */}
        {node && typeof node === "object"
          ? Object.entries(node)?.map(([key, val]) => (
              <Widget
                src="efiz.near/widget/Node"
                props={{
                  key,
                  label: key,
                  node: val,
                  path: `${path}/${key}`,
                  setPath: setPath,
                  history,
                  setHistory: setHistory,
                  isRoot: false,
                }}
              />
            ))
          : null}
      </ButtonRow>
    </div>
  </div>
);
