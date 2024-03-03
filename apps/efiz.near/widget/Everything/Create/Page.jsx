const accountId = context.accountId;
const typeTag = props.typeTag;
const template = props.template;

State.init({
  hashtag: "",
});

const createThing = () => {
  // Replace the widget below with the
  Social.set(
    {
      widget: {
        [`${state.hashtag}.View.Page`]: {
          "": `return (<Widget src="${template}" props={{hashtag: props.hashtag}} />);`,
          metadata: {
            tags: {
              page: "",
              [typeTag]: "",
            },
          },
        },
      },
    },
    {
      force: true,
    }
  );
};

return (
  <div>
    <Widget
      src="contribut3.near/widget/Inputs.Text"
      props={{
        label: "Hashtag",
        placeholder: "ABC",
        value: state.hashtag,
        onChange: (hashtag) => State.update({ hashtag }),
      }}
    />
    <div>
      <button onClick={createThing} disabled={state.hashtag === ""}>
        Create Page
      </button>
    </div>
  </div>
);
