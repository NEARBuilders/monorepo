const options = [
  { text: "idea", value: "idea" },
  { text: "project", value: "project" },
  { text: "organization", value: "organization" },
  { text: "community", value: "community" },
  { text: "hub", value: "hub" },
];

return (
  <Widget
    src="hack.near/widget/form.select"
    props={{
      label: "phase *",
      noLabel: props.noLabel,
      placeholder: "select",
      options,
      value: props.dev,
      onChange: (dev) => props.update(dev),
      validate: () => {
        if (!props.dev) {
          props.setError("select a development phase");
        }

        if (!options.find(({ value }) => props.dev.value === value)) {
          props.setError("select a valid development phase");
        }
      },
      error: props.error,
    }}
  />
);
