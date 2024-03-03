const options = [
  { text: "Africa", value: "africa" },
  { text: "Asia", value: "asia" },
  { text: "Australia", value: "australia" },
  { text: "Europe", value: "europe" },
  { text: "North America", value: "north-america" },
  { text: "South America", value: "south-america" },
];

return (
  <Widget
    src="hack.near/widget/form.select"
    props={{
      label: "continent *",
      noLabel: props.noLabel,
      placeholder: "select one",
      options,
      value: props.integration,
      onChange: (integration) => props.update(integration),
      validate: () => {
        if (!props.integration) {
          props.setError("pick a continent");
        }

        if (!options.find(({ value }) => props.integration.value === value)) {
          props.setError("pick a valid continent");
        }
      },
      error: props.error,
    }}
  />
);
