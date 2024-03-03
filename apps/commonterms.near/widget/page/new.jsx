const { InputField, Button } = VM.require(
  "buildhub.near/widget/components"
) || {
  InputField: () => <></>,
  Button: () => <></>,
};

const [startTime, setStartTime] = useState("");
const [endTime, setEndTime] = useState("");
const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [theme, setTheme] = useState("");
const [onClickCode, setOnClickCode] = useState("");

const createButton = () => {
  Social.set(
    {
      widget: {
        evaporation: {
          "": 'return <button onClick={() => console.log("do something")}>click</button>;',
        },
      },
    },
    { force }
  );
};

return (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <label>Start Time</label>
    <InputField
      value={startTime}
      type="time"
      onChange={(e) => setStartTime(e.target.value)}
    />
    <label>End Time</label>
    <InputField
      value={endTime}
      type="time"
      onChange={(e) => setEndTime(e.target.value)}
    />
    <div>
      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>
    <div>
      <label htmlFor="theme">Theme</label>
      <textarea
        id="theme"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
      />
    </div>
    <div>
      <label htmlFor="onClick">onClick</label>
      <textarea
        id="onClick"
        value={onClickCode}
        onChange={(e) => setOnClickCode(e.target.value)}
      />
    </div>
    <div style={{ marginTop: "10px" }}>
      <Button onClick={createButton}>create</Button>
    </div>
  </div>
);
