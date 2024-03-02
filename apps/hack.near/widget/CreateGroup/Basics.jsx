const { formState, errors, renderFooter } = props;

const initialAnswers = {
  name: formState.name,
  description: formState.description,
  links: formState.links.length > 0 ? formState.links : [""],
};

State.init({
  answers: initialAnswers,
});

const onValueChange = (key, value) => {
  State.update({
    answers: {
      ...state.answers,
      [key]: value,
    },
  });
};

const onAddLink = () => update("links", [...state.answers.links, ""]);

const onLinkChange = (index, value) => {
  const newLinks = [...state.answers.links];
  newLinks[index] = value;
  update("links", newLinks);
};

const onRemoveLink = (index) => {
  const newLinks = [...state.answers.links];
  newLinks[index] = null;
  update("links", newLinks);
};

const Error = styled.span`
  display: inline-block;
  font-style: normal;
  font-weight: 400;
  font-size: 0.875em;
  line-height: 1.25em;
  color: #ff4d4f;
  height: 0;
  overflow: hidden;
  transition: height 0.3s ease-in-out;

  &.show {
    height: 1.25em;
  }
`;

return (
  <div className="mt-4 ndc-card p-4">
    <div className="d-flex flex-column gap-4">
      <h2 className="h5 fw-bold">
        <span
          className="rounded-circle d-inline-flex align-items-center justify-content-center fw-bolder h5 me-2"
          style={{
            width: "48px",
            height: "48px",
            border: "1px solid #82E299",
          }}
        >
          1
        </span>
        Basics
      </h2>
      <Widget
        src="nearui.near/widget/Input.ExperimentalText"
        props={{
          label: "Name",
          placeholder: `What should it be called?`,
          size: "md",
          inputProps: {
            name: "name",
            defaultValue: state.answers.name,
          },
          error: errors["name"],
        }}
      />
      <Widget
        src="nearui.near/widget/Input.ExperimentalText"
        props={{
          label: "Description",
          placeholder: "What is the group about?",
          size: "md",
          textarea: true,
          inputProps: {
            rows: 5,
            name: "description",
            defaultValue: state.answers.description,
          },
          onChange: (v) => onValueChange("description", v),
          error: errors["description"],
        }}
      />
      {renderFooter(state.answers)}
    </div>
    <br />
    <div>
      <div className="d-flex gap-2 justify-content-between">
        <h2 className="h5 fw-bold">
          Links <span className="text-black-50 fw-light small">~ optional</span>
        </h2>
        <Widget
          src="nearui.near/widget/Input.Button"
          props={{
            children: <i className="bi bi-plus-lg" />,
            variant: "icon info outline",
            size: "lg",
            onClick: onAddLink,
          }}
        />
      </div>
      <p className="text-black-50 fw-light small">add up to 10 urls</p>
    </div>

    {state.answers.links.map((l, i) => (
      <div
        className={[
          "d-flex align-items-center gap-2",
          l === null && "d-none",
        ].join(" ")}
      >
        <Widget
          src="nearui.near/widget/Input.ExperimentalText"
          props={{
            placeholder: "https://",
            size: "lg",
            onChange: (v) => onLinkChange(i, v),
            inputProps: {
              name: `link-${i}`,
              defaultValue: l,
            },
          }}
        />
        <Widget
          src="nearui.near/widget/Input.Button"
          props={{
            children: <i className="bi bi-trash" />,
            variant: "icon danger outline",
            size: "lg",
            onClick: () => onRemoveLink(i),
          }}
        />
      </div>
    ))}
    {errors.links && (
      <Error className={errors.links ? "show" : ""} size={size}>
        {errors.links}
      </Error>
    )}

    {renderFooter({
      links: state.answers.links.filter((l) => l !== null && l !== ""),
    })}
  </div>
);
