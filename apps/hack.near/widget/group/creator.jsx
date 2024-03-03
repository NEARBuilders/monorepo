const { typeToEmptyData, validateType, types } = props;

const initialFormState = typeToEmptyData(types["hack.near/type/community"]);

// Set default values here
initialFormState.profileImage =
  "https://ipfs.near.social/ipfs/bafkreiad5c4r3ngmnm7q6v52joaz4yti7kgsgo6ls5pfbsjzclljpvorsu";
initialFormState.coverImage =
  "https://ipfs.near.social/ipfs/bafkreicd7wmjfizslx72ycmnsmo7m7mnvfsyrw6wghsaseq45ybslbejvy";

State.init({
  step: 0,
  form: initialFormState,
  errors: null,
});

const handleStepComplete = (value) => {
  const stepValid = true;
  Object.keys(value).forEach((key) => {
    const properties = types[
      "astraplusplus.ndctools.near/type/dao"
    ].properties.find((p) => p.name === key);
    const validation = validateType(properties.type, value[key], properties);
    if (validation) {
      State.update({
        errors: {
          ...state.errors,
          [key]: validation,
        },
      });
      stepValid = false;
    } else {
      State.update({
        errors: {
          ...state.errors,
          [key]: null,
        },
      });
    }
  });

  if (!stepValid) return;

  if (state.step === 5) {
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
    name: value.account.replaceAll(".sputnik-dao.near", ""),
    // encode args to base64
    args: {
      description:
        typeof value.description === "string" ? value.description : "",
      policy: {
        roles: value.policy.roles,
        default_vote_policy: {
          quorum: "0",
          threshold: [1, 2],
        },
        proposal_bond: "100000000000000000000000",
        proposal_period: "604800000000000",
      },
      config: {
        description:
          typeof value.description === "string" ? value.description : "",
        account: value.account,
        metadata: {
          links: Array.isArray(value.links) ? value.links : [],
          backgroundImage:
            typeof value.coverImage === "string" ? value.coverImage : "",
          image:
            typeof value.profileImage === "string" ? value.profileImage : "",
          name: typeof value.name === "string" ? value.name : "",
        },
      },
    },
  });
}

const steps = [
  {
    title: "About",
    active: state.step === 0,
    icon: state.step > 0 ? <i className="bi bi-check2"></i> : undefined,
    className: state.step > 0 ? "active-outline" : undefined,
  },
  {
    title: "Links",
    active: state.step === 1,
    icon: state.step > 1 ? <i className="bi bi-check2"></i> : undefined,
    className: state.step > 1 ? "active-outline" : undefined,
  },
  {
    title: "Policy",
    active: state.step === 2,
    icon: state.step > 2 ? <i className="bi bi-check2"></i> : undefined,
    className: state.step > 2 ? "active-outline" : undefined,
  },
  {
    title: "Members",
    active: state.step === 3,
    icon: state.step > 3 ? <i className="bi bi-check2"></i> : undefined,
    className: state.step > 3 ? "active-outline" : undefined,
  },
  {
    title: "Roles",
    active: state.step === 4,
    icon: state.step > 4 ? <i className="bi bi-check2"></i> : undefined,
    className: state.step > 4 ? "active-outline" : undefined,
  },
];

return (
  <>
    <h1 className="h3 fw-bold mb-4">create a group</h1>
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
