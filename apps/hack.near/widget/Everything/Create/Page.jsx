const ERROR_WIDGET = "evrything.near/widget/Everything.Error";

const Header = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.div`
    font-size: 24px;
    line-height: 33.6px;
`;

const Form = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const Input = styled.input`
    width: 100%;
`;

const TextArea = styled.textarea`
    width: 100%;
`;

const ButtonRow = styled.div`
    display: flex;
    flex-direction: row;
    gap: 4px;
`;

const Button = styled.button`
    padding: 8px 20px;
    max-width: 90px;
`;

const Caption = styled.div`
    font-size: 12px;
    line-height: 15.6px;
    color: #A6A6A6;
`;

State.init({
  type: "",
  accountId: "",
  domain: "",
  res: null,
  loading: false,
});

const createThing = () => {
  State.update({
    loading: true,
  });
  asyncFetch(type.mutations?.create.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: type.mutations?.create.query,
      variables: {
        type: props.type,
        accountId: state.accountId,
        domain: state.domain,
      },
    }),
  }).then((res) => {
    State.update({
      res: res,
      loading: false,
    });
  });
};

const resetThing = () => {
  State.update({
    type: "",
    accountId: "",
    domain: "",
    res: null,
    loading: false,
  });
};

return (
  <div>
    <Widget
      src="contribut3.near/widget/Inputs.Text"
      props={{
        label: "Type",
        placeholder: "What kind of page?",
        value: state.type,
        onChange: (type) => State.update({ type }),
      }}
    />
    <Widget
      src="contribut3.near/widget/Inputs.AccountId"
      props={{
        label: "Account ID",
        placeholder: "example.near",
        value: state.accountId,
        onChange: (accountId) => State.update({ accountId }),
      }}
    />
    <Widget
      src="contribut3.near/widget/Inputs.Text"
      props={{
        label: "Domain",
        placeholder: "ABC",
        value: state.domain,
        onChange: (domain) => State.update({ domain }),
      }}
    />
    <div>
      <Widget
        src="contribut3.near/widget/Buttons.Green"
        props={{
          onClick: () => {
            Social.set({
              thing: {
                main: JSON.stringify({
                  type: state.type,
                  accountId: state.accountId,
                  domain: state.domain,
                }),
              },
              index: {
                abc: JSON.stringify({
                  key: "main",
                  value: {
                    type: "hack.near/type/Page",
                  },
                }),
              },
            });
          },
          text: "Create Page",
        }}
      />
    </div>
  </div>
);
