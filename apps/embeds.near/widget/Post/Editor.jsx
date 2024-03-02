const { item } = props;
const [text, setText] = useState(props.text);

return (
  <>
    <textarea
      style={{
        width: "100%",
      }}
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
    <button
      onClick={() =>
        Social.set({
          index: {
            modify: JSON.stringify({
              key: item,
              value: {
                type: "edit",
                value: {
                  text,
                },
              },
            }),
          },
        })
      }
    >
      Save
    </button>
  </>
);
