const { inputs } = props;

const Section = styled.div`
  margin-bottom: 5px;
`;

const widgets = {
  styledComponents: "nomination.ndctools.near/widget/NDC.StyledComponents",
};

return (
  <>
    {inputs.map((input, i) => (
      <Section key={i}>
        <Widget
          src={widgets.styledComponents}
          props={{
            TextArea: {
              label: input.label,
              placeholder: input.placeholder,
              maxLength: 100,
              value: input.value,
              handleChange: input.handleChange,
              inputType: "text",
            },
          }}
        />
      </Section>
    ))}
  </>
);
