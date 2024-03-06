const { Button } = VM.require("buildhub.near/widget/components") || {
  Button: () => <></>,
};

const { Card } = VM.require("events.efiz.near/widget/events.Card") || {
  Card: () => <></>,
};

const accountId = context.accountId;

if (!accountId) {
  return <div>Please login</div>;
}

const [id, setId] = useState("");
const [label, setLabel] = useState("Button Label");
const [onClick, setOnClick] = useState('() => { console.log("Hello World"); }');
const [code, setCode] = useState("");

const preview = useMemo(() => {
  setCode(`const { Button } = VM.require("buildhub.near/widget/components") || { Button: () => <></> };

  return <Button onClick={${onClick}} variant="primary">
    ${label}
  </Button>`);
}, [label, onClick]);


return (
  <div>
    <h1>Event Custom Button Creator</h1>
    <p>
      Each event has it's own button. What would you like this button to do?
    </p>
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
      <textarea
        className="form-control"
        type="text"
        value={onClick}
        onChange={(e) => setOnClick(e.target.value)}
      />
    </div>
    <div>
      <h2>Preview</h2>
      <Card
        event={{
          title: "Open Web Study Group",
          description:
            "Join this virtual meeting to connect with fellow builders and learn how to create open web apps!\n\nWe provide a safe space for participants to ask questions, collaborate, and level up as builders.",
          url: "https://meet.google.com/otd-aiar-cfe",
          start: "2024-03-05T17:00:00.000Z",
          end: "2024-03-05T18:00:00.000Z",
          extendedProps: {
            customButtonCode: code,
            organizers: [
              {
                customOption: true,
                organizer: "nearbuilders.near",
                id: "new-id-1",
              },
              {
                customOption: true,
                organizer: "dawnkelly.near",
                id: "new-id-2",
              },
              {
                customOption: true,
                organizer: "flowscience.near",
                id: "new-id-3",
              },
            ],
            location: "Online",
            hashtags: [
              "build",
              {
                customOption: true,
                hashtags: "study",
                id: "new-id-4",
              },
              {
                customOption: true,
                hashtags: "learn",
                id: "new-id-5",
              },
              {
                customOption: true,
                hashtags: "js",
                id: "new-id-6",
              },
              {
                customOption: true,
                hashtags: "near",
                id: "new-id-7",
              },
            ],
            cover: {
              ipfs_cid:
                "bafybeib3yifjzmjuqp2rmxtgus636qs4x7lswiort4zywera6yajil5d6q",
            },
          },
          key: "james.near/every/event/61806278-da18-cfd8-980a-c18b4b09ab11",
        }}
        startTime="2024-03-05T17:00:00.000Z"
        organizerProfile={{
          name: "Elliot",
          image:
            "https://ipfs.near.social/ipfs/bafkreihbwho3qfvnu4yss3eh5jrx6uxhrlzdgtdjyzyjrpa6odro6wdxya",
        }}
        eventAuthor="james.near"
        hashtags={["build", "study", "learn", "js", "near"]}
      />
    </div>
  </div>
);
