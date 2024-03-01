const { Input, Button } = VM.require(
  "${config/account}/widget/components"
) || {
  Input: () => <></>,
  Button: () => <></>,
};

const [theme, setTheme] = useState("dark");
const [name, setName] = useState("");

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
    <label>Game Theme</label>
    <Input value={theme} onChange={(e) => setTheme(e.target.value)} />
    <label>Button Name</label>
    <Input value={name} onChange={(e) => setName(e.target.value)} />
    <div style={{ marginTop: "10px" }}>
      <Button onClick={createButton}>create</Button>
    </div>
  </div>
);
