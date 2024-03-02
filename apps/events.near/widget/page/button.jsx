const { Button } = VM.require("buildhub.near/widget/components") || {
  Button: () => <></>,
};

const accountId = context.accountId;

if (!accountId) {
  return <div>Please login</div>;
}

const [id, setId] = useState("");
const [label, setLabel] = useState("Button Label");
const [onClick, setOnClick] = useState('() => { console.log("Hello World"); }');
const [code, setCode] = useState("");
const [showWidget, setShowWidget] = useState(false);

const preview = useMemo(() => {
  setCode(`const { Button } = VM.require("buildhub.near/widget/components") || { Button: () => <></> };

  return <Button onClick={${onClick}} variant="primary">
    ${label}
  </Button>`);
  setShowWidget(false);
}, [label, onClick]);

const handleOnClick = () => {
  Social.set(
    {
      widget: {
        [`Event-${id}-Button`]: {
          "": code,
        },
      },
    },
    {
      onCommit: () => setShowWidget(true),
    }
  );
};

const [srcOrCode, setSrcOrCode] = useState(true);

return (
  <div>
    <h1>Event Custom Button Creator</h1>
    <div className="form-group mb-3">
      <label>Button Id</label>
      <input
        className="form-control"
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
    </div>
    <div className="form-group mb-3">
      <label>Button Label</label>
      <input
        className="form-control"
        type="text"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />
    </div>
    <div className="form-group mb-3">
      <label>On Click</label>
      {srcOrCode ? (
        <input
          className="form-control"
          type="text"
          value={onClick}
          onChange={(e) => setOnClick(e.target.value)}
        />
      ) : (
        <textarea
          className="form-control"
          type="text"
          value={onClick}
          onChange={(e) => setOnClick(e.target.value)}
        />
      )}
      <button onClick={() => setSrcOrCode(!srcOrCode)} className="btn">{srcOrCode ? "code" : "src"}</button>
    </div>
    <div className="mb-3">
      <Button disabled={!id} onClick={handleOnClick} variant="primary">
        Launch
      </Button>
    </div>
    {showWidget && (
      <div class="alert alert-primary" role="alert">
        Button Widget Link: {`${accountId}/widget/Event-${id}-Button`}
      </div>
    )}
    <div>
      <h2>Preview</h2>
      <Widget code={code} />
    </div>
  </div>
);
