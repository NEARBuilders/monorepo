/** @type {{text:string;value:string}[]} */
const options = [
  { text: "community", value: "community" },
  { text: "business", value: "business" },
  { text: "education", value: "education" },
  { text: "sports", value: "sports" },
  { text: "news", value: "news" },
  { text: "art", value: "art" },
  { text: "charity", value: "charity" },
  { text: "social", value: "social" },
  { text: "project", value: "project" },
  { text: "event", value: "event" },
  { text: "tech", value: "tech" },
  // { text: "Other", value: "other" },
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
      label: "categories *",
      noLabel: props.noLabel,
      placeholder: "select",
      options,
      labelKey: "text",
      value: props.categories
        .reduce((acc, value) => [...acc, ...mapOldToNew(value)], [])
        .map(mapValueToOption),
      onChange: (categories) => props.update(categories.map(mapOptionToValue)),
      validate: () => {
        if (!props.categories) {
          props.setError("please select a category");
        }
        if (
          !mapOldToNew(props.categories).every((category) =>
            options.find(({ value }) => category === value)
          )
        ) {
          props.setError("please select a valid category");
        }
      },
      error: props.error,
    }}
  />
);
