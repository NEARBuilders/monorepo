const options = [
  { text: "English", value: "english" },
  { text: "Mandarin", value: "chinese" },
  { text: "Hindi", value: "hindi" },
  { text: "Spanish", value: "spanish" },
  { text: "French", value: "french" },
  { text: "Arabic", value: "arabic" },
  { text: "Bengali", value: "bengali" },
  { text: "Russian", value: "russian" },
  { text: "Portuguese", value: "portuguese" },
  { text: "Urdu", value: "urdu" },
  { text: "Indonesian", value: "indonesian" },
  { text: "German", value: "german" },
  { text: "Japanese", value: "japanese" },
  { text: "Pidgin", value: "pidgin" },
  { text: "Turkish", value: "turkish" },
  { text: "Vietnamese", value: "vietnamese" },
];

return (
  <Widget
    src="hack.near/widget/form.select"
    props={{
      label: "language",
      noLabel: props.noLabel,
      placeholder: "select",
      options,
      value: options.find(({ value }) => value === props.language),
      onChange: (language) => props.update(language),
      validate: () => {
        if (!props.language) {
          props.setError("please select a valid option");
        }

        if (!options.find(({ value }) => props.language.value === value)) {
          props.setError("please select a valid option");
        }
      },
      error: props.error,
    }}
  />
);
