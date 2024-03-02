const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "build.sputnik-dao.near";

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

const widget = Social.get(`${daoId}/settings/dao/widget`);

if (widget === null) {
  return "Loading...";
}

State.init({
  widget,
});

const widget_args = JSON.stringify({
  data: {
    [daoId]: {
      settings: {
        dao: {
          widget: state.widget,
        },
      },
    },
  },
});

const proposal_args = Buffer.from(widget_args, "utf-8").toString("base64");

const handleProposal = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "update featured widget",
          kind: {
            FunctionCall: {
              receiver_id: "social.near",
              actions: [
                {
                  method_name: "set",
                  args: proposal_args,
                  deposit: "50000000000000000000000",
                  gas: "200000000000000",
                },
              ],
            },
          },
        },
      },
      deposit: "100000000000000000000000",
      gas: "200000000000000",
    },
  ]);
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const H1 = styled.h1`
  font-weight: 600;
  font-size: 32px;
  line-height: 39px;
  color: #11181c;
  margin: 0;
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 23px;
`;

const Item = styled.div``;

const Div = styled.div`
  position: relative;
  @media (hover: hover) {
    > .edit-link {
      display: none;
    }
  }
  &:hover {
    > .edit-link {
      display: inline;
    }
  }
`;

const addWidget = ({ widgetPath: widget, onHide }) => {
  return (
    <button
      className="btn btn-primary"
      onClick={() => {
        State.update({
          widget,
        });
        onHide();
      }}
    >
      <i className="bi bi-plus-lg" /> Add
    </button>
  );
};

return (
  <div>
    <Wrapper>
      <Header>
        <H1>Featured Widget</H1>
        <Widget
          src="miraclx.near/widget/Attribution"
          props={{
            dep: true,
            authors: [daoId],
          }}
        />
        <div>
          <p className="mb-1">
            <b>INPUT NEW SOURCE PATH:</b>
          </p>
          <input
            type="text"
            value={state.widget}
            placeholder="account.near/widget/Example"
          />
        </div>
        <div className="mb-1">
          {context.accountId && (
            <button
              key="edit"
              onClick={handleProposal}
              disabled={state.widget === widget}
              className="btn btn-success me-2 mt-1"
            >
              <i class="bi bi-patch-plus" /> Submit Proposal
            </button>
          )}
        </div>
        <div className="mt-2">
          <Widget
            src="hack.near/widget/dev.Widget.Search"
            props={{ extraButtons: addWidget }}
          />
        </div>
        <hr />
        <Items>
          <Item>
            <Widget
              src="adminalpha.near/widget/ComponentSummary"
              props={{
                src: `${state.widget}`,
              }}
            />
          </Item>
        </Items>
      </Header>
      <div className="mt-3">
        <Widget src={state.widget} props={{ accountId, daoId }} />
      </div>
    </Wrapper>
  </div>
);
