const src = props.widgetPath;

if (!src) {
  return "";
}

return <Widget src={src} />;
