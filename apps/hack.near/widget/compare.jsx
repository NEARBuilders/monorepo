if (!props.update) return "";

const update = Social.get(`${props.update}`);

if (update === null) return "Loading...";

if (!props.src) return "";

const src = Social.get(`${props.src}`);

if (src === null) return "Loading...";

return (
  <Widget
    src="bozon.near/widget/CodeDiff"
    props={{ currentCode: update, prevCode: src, ...props }}
  />
);
