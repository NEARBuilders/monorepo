function flattenObject(obj, parentKey) {
  parentKey = parentKey ?? "";
  let paths = [];

  Object.keys(obj).forEach((key) => {
    const currentPath = parentKey ? `${parentKey}/${key}` : key;

    if (typeof obj[key] === "object") {
      paths = paths.concat(flattenObject(obj[key], currentPath));
    } else {
      // paths.push(`${currentPath}@${obj[key]}`); // if we want blockHeight
      paths.push(currentPath);
    }
  });

  return paths;
}

const keys = Social.keys("*/widget/evaporation", "final");

if (!keys) {
  return "Loading...";
}

const buttons = flattenObject(keys);

return <p>{buttons && buttons.map((it) => <Widget src={it} />)}</p>;
