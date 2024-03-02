State.init({
  answer: "",
  showOptions: false,
  optionA: "",
  optionB: "",
});

const handleAnswer = (selectedAnswer) => {
  State.update({
    answer: selectedAnswer,
    showOptions: true,
  });
};

const handleOptionA = (selectedOption) => {
  State.update({
    answer: selectedOption,
    showOptions: false,
  });
};

const handleOptionB = (selectedOption) => {
  State.update({
    answer: selectedOption,
    showOptions: false,
  });
};

return (
  <div>
    <h1>Questionnaire</h1>
    <p>Please answer the following question:</p>
    <p>Do you prefer option A or option B?</p>
    <div>
      <button onClick={() => handleAnswer("A")}>Option A</button>
      <button onClick={() => handleAnswer("B")}>Option B</button>
    </div>
    {state.showOptions && (
      <div>
        {state.answer === "A" && (
          <div>
            <p>Option A selected. Please choose one:</p>
            <button onClick={() => handleOptionA("Option A1")}>
              Option A1
            </button>
            <button onClick={() => handleOptionA("Option A2")}>
              Option A2
            </button>
          </div>
        )}
        {state.answer === "B" && (
          <div>
            <p>Option B selected. Please choose one:</p>
            <button onClick={() => handleOptionB("Option B1")}>
              Option B1
            </button>
            <button onClick={() => handleOptionB("Option B2")}>
              Option B2
            </button>
          </div>
        )}
      </div>
    )}
  </div>
);
