return (props) => (
  <iframe
    srcDoc={props.code}
    style={{ display: "none" }}
    onMessage={(data) => props.onUpdate(data)}
  />
);