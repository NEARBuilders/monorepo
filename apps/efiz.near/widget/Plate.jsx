const editableProps = {
  spellCheck: false,
  autoFocus: false,
  placeholder: "Type…",
};

const initialValue = [
  {
    type: "p",
    children: [
      {
        text: "This is editable plain text with react and history plugins, just like a <textarea>!",
      },
    ],
  },
];

function onChange(newValue) {
  console.log(newValue);
}

return (
  <Plate
    editableProps={editableProps}
    // initialValue={initialValue}
    debug={false}
    onChange={onChange}
  />
);
