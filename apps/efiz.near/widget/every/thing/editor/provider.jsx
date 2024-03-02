const path = props.path;
const blockHeight = props.blockHeight || "final";

const jThing = Social.get(path, blockHeight);
const thing = JSON.parse(jThing);

const jType = Social.get(thing.type, "final");

const jWidget = Social.get(thing.template.src, "final");

if (!jThing || !jType || !jWidget) {
  return <></>;
}

const files = [
  {
    path: props.path,
    language: "json",
    code: JSON.stringify(JSON.parse(jThing), null, 2),
  },
  {
    path: thing.type,
    language: "json",
    code: JSON.stringify(JSON.parse(jType), null, 2),
  },
  {
    path: thing.template.src,
    language: "javascript",
    code: jWidget,
  },
];

return (
  <Widget
    src={"efiz.near/widget/every.thing.editor"}
    props={{
      files,
    }}
  />
);
