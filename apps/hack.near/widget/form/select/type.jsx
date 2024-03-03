/** @type {{text:string;value:string}[]} */
const options = [
  { text: "onboarding", value: "onboarding" },
  { text: "activity", value: "activity" },
  { text: "library", value: "library" },
  { text: "community", value: "community" },
  { text: "project", value: "project" },
];

/**
 * @param {string} value
 *
 * @returns {{text:string;value:string}}
 * */
const mapValueToOption = (value) => {
  const option = options.find((option) => option.value === value);
  return (
    option ?? {
      text: value.charAt(0).toUpperCase() + value.substring(1),
      value,
    }
  );
};

/**
 * @param {{text:string;value?:string;customOption?:boolean;}} option
 * @returns {string}
 * */
const mapOptionToValue = (option) => {
  return option.customOption ? option.text.toLowerCase() : option.value;
};

return (
  <Widget
    src="hack.near/widget/form.select"
    props={{
      label: "type *",
      noLabel: props.noLabel,
      placeholder: "community",
      options,
      labelKey: "text",
      value: props.pageType.map(mapValueToOption),
      onChange: (pageType) => props.update(pageType.map(mapOptionToValue)),
      validate: () => {
        if (!props.pageType) {
          props.setError("please choose a type");
        }
        if (
          !props.pageType.every((pageType) =>
            options.find(({ value }) => pageType === value)
          )
        ) {
          props.setError("please choose a valid type");
        }
      },
      error: props.error,
    }}
  />
);
