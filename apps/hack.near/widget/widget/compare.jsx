if (!props.updatedWidget) return "";

const newCode = props.newCode ?? Social.get(`${props.updatedWidget}`);

if (newCode === null) return "Loading...";

if (!props.widgetPath) return "";

const baseCode = props.baseCode ?? Social.get(`${props.widgetPath}`);

if (baseCode === null) return "Loading...";

return (
  <Widget
    src="bozon.near/widget/CodeDiff"
    props={{ currentCode: newCode, prevCode: baseCode, ...props }}
  />
);
