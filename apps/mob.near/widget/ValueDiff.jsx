const fetchCode = (src) => {
  const parts = src.split("@", 2);
  return Social.get(parts[0], parts[1]);
};

const oldCode = fetchCode(props.oldSrc) || "";
const newCode = fetchCode(props.newSrc) || "";

return (
  <Diff
    oldValue={oldCode}
    newValue={newCode}
    splitView={true}
    compareMethod={"WORDS"}
  />
);
