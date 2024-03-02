const accountId = props.accountId ?? context.accountId;

State.init({
  step: 0,
  form: initialFormState,
  errors: null,
});

function generateUID() {
  return (
    Math.random().toString(16).slice(2) +
    Date.now().toString(36) +
    Math.random().toString(16).slice(2)
  );
}

const groupId = props.groupId ?? generateUID();

const handleStepComplete = (value) => {
  if (state.step === 3) {
    const finalAnswers = {
      ...state.form,
      ...value,
    };

    State.update({
      step: state.step,
      form: finalAnswers,
    });
    handleFormComplete(finalAnswers);
    return;
  }
  State.update({
    step: state.step + 1,
    form: {
      ...state.form,
      ...value,
    },
  });
};

function handleFormComplete(value) {
  Social.set({
    thing: {
      [groupId]: {
        description:
          typeof value.description === "string" ? value.description : "",
      },
    },
    graph: {
      [groupId]: {
        ...state.members,
      },
    },
  });
}

const steps = [
  {
    title: "Basics",
    active: state.step === 0,
    icon: state.step > 0 ? <i className="bi bi-check2"></i> : undefined,
    className: state.step > 0 ? "active-outline" : undefined,
  },
  {
    title: "Membership",
    active: state.step === 1,
    icon: state.step > 1 ? <i className="bi bi-check2"></i> : undefined,
    className: state.step > 1 ? "active-outline" : undefined,
  },
  {
    title: "Create",
    active: state.step === 2,
    icon: state.step > 2 ? <i className="bi bi-check2"></i> : undefined,
    className: state.step > 2 ? "active-outline" : undefined,
  },
];

return (
  <>
    <h1 className="h3 fw-bold mb-4">Create Group</h1>
    <Widget
      src={`nearui.near/widget/Navigation.Steps`}
      props={{
        steps: steps,
        onClick: (i) => {
          if (i > state.step) return;
          State.update({
            step: i,
          });
        },
      }}
    />
    <Widget
      src={`hack.near/widget/CreateGroup.Step${state.step + 1}`}
      props={{
        formState: state.form,
        onComplete: handleStepComplete,
        errors: state.errors,
        renderFooter: (stepState, otherProps) => (
          <Widget
            src={`hack.near/widget/CreateGroup.Footer`}
            props={{
              isLast: state.step >= steps.length - 1,
              hasPrevious: state.step > 0,
              onNext: () => {
                handleStepComplete(stepState);
              },
              onPrevious: () => {
                State.update({
                  step: state.step - 1,
                });
              },
              onReset: () => {
                State.update({
                  step: 0,
                  form: initialFormState,
                  errors: null,
                });
              },
              ...otherProps,
            }}
          />
        ),
      }}
    />
  </>
);
