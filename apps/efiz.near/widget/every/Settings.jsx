const accountId = props.accountId || context.accountId;
const blockHeight = props.blockHeight || "final";
const thingId = props.thingId || "**";

const value = Social.get(`${accountId}/settings/**`, blockHeight);

const FormContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  margin-top: 20px;
`;

const SectionContainer = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 18px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
`;

const Button = styled.button`
  margin-left: 5px;
`;

State.init({
  formData: value,
});

const handleInputChange = (section, key, index, value) => {
  const updatedData = { ...state.formData };
  if (Array.isArray(JSON.parse(updatedData[section][key]))) {
    try {
      const inputs = JSON.parse(updatedData[section][key]);
      inputs[index].src = value;
      updatedData[section][key] = JSON.stringify(inputs);
      State.update({ formData: updatedData });
    } catch (error) {
      console.log(
        `Error updating input value for ${section}/${key}/${index}:`,
        error
      );
    }
  } else {
    updatedData[section][key] = value;
    State.update({ formData: updatedData });
  }
};

const moveInputUp = (section, key, index) => {
  const updatedData = { ...state.formData };

  try {
    const inputs = JSON.parse(updatedData[section][key]);

    if (index > 0) {
      const temp = inputs[index];
      inputs[index] = inputs[index - 1];
      inputs[index - 1] = temp;
      updatedData[section][key] = JSON.stringify(inputs);
      State.update({ formData: updatedData });
    }
  } catch (error) {
    console.log(`Error moving input up for ${section}/${key}/${index}:`, error);
  }
};

const moveInputDown = (section, key, index) => {
  const updatedData = { ...state.formData };

  try {
    const inputs = JSON.parse(updatedData[section][key]);

    if (index < inputs.length - 1) {
      const temp = inputs[index];
      inputs[index] = inputs[index + 1];
      inputs[index + 1] = temp;
      updatedData[section][key] = JSON.stringify(inputs);
      State.update({ formData: updatedData });
    }
  } catch (error) {
    console.log(
      `Error moving input down for ${section}/${key}/${index}:`,
      error
    );
  }
};
return (
  <FormContainer>
    <h1>Settings</h1>
    {Object.entries(state.formData).map(([section, values]) => (
      <SectionContainer key={section}>
        <SectionTitle>{section}</SectionTitle>
        {Object.entries(values).map(([key, input]) => {
          let parsedInput = JSON.parse(input);
          if (parsedInput === null) {
            parsedInput = input;
          }
          return (
            <FormGroup key={key}>
              <Label>{key}</Label>
              {Array.isArray(parsedInput) ? (
                parsedInput.map((item, index) => (
                  <InputContainer key={index}>
                    <Input
                      type="text"
                      value={item.src}
                      onChange={(e) =>
                        handleInputChange(section, key, index, e.target.value)
                      }
                    />
                    <Button
                      onClick={() => moveInputUp(section, key, index)}
                      disabled={index === 0}
                    >
                      &uarr;
                    </Button>
                    <Button
                      onClick={() => moveInputDown(section, key, index)}
                      disabled={index === parsedInput.length - 1}
                    >
                      &darr;
                    </Button>
                  </InputContainer>
                ))
              ) : (
                <InputContainer>
                  <Input
                    type="text"
                    value={parsedInput}
                    onChange={(e) =>
                      handleInputChange(section, key, 0, e.target.value)
                    }
                  />
                </InputContainer>
              )}
            </FormGroup>
          );
        })}
      </SectionContainer>
    ))}
  </FormContainer>
);
