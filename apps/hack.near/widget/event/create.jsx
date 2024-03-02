const accountId = context.accountId;
const daoId = props.daoId ?? "build.sputnik-dao.near";
if (!accountId) {
  return "Please connect your NEAR account :)";
}

const today = Math.floor((Date.now() + 0) / 86400000) * 86400000;
const tomorrow = today + 86400000;

State.init({
  participants: "",
  date,
  time,
});

const policy = Near.view(daoId, "get_policy");

const deposit = policy.proposal_bond;

const event_args = JSON.stringify({
  data: {
    [state.daoId]: {
      event: {
        [state.eventId]: state.event,
      },
    },
  },
});

const proposal_args = Buffer.from(event_args, "utf-8").toString("base64");

const handleProposal = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "proposing an event",
          kind: {
            FunctionCall: {
              receiver_id: "social.near",
              actions: [
                {
                  method_name: "set",
                  args: proposal_args,
                  deposit: "80000000000000000000000",
                  gas: "300000000000000",
                },
              ],
            },
          },
        },
      },
      deposit: deposit,
      gas: "300000000000000",
    },
  ]);
};

return (
  <>
    <div className="row">
      <div className="col-lg-6">
        <div className="m-2">
          <h3>
            <b>create an event page</b>
          </h3>
          <hr />
          <div className="mb-3">
            <CommitButton
              data={{
                event: {
                  [state.eventId]: state.event,
                },
              }}
            >
              save
            </CommitButton>
            <a
              className="btn btn-outline-success ms-2"
              onClick={handleProposal}
            >
              propose
            </a>
            <a
              className="btn btn-outline-primary ms-2"
              href={`#/hack.near/widget/event.page?accountId=${accountId}`}
            >
              view
            </a>
            <a
              className="btn btn-outline-primary ms-2"
              href={`#/hack.near/widget/events`}
            >
              explore
            </a>
          </div>
          <div className="mb-2">
            <h5>id</h5>
            <input
              type="text"
              value={state.eventId}
              onChange={(e) => {
                State.update({ eventId: e.target.value });
              }}
            />
          </div>
          <h5 className="mt-3">metadata</h5>
          <Widget
            src="hack.near/widget/event.editor"
            props={{
              initialMetadata: event,
              onChange: (event) => State.update({ event }),
              options: {
                name: { placeholder: "title" },
                date: { label: "date" },
                time: { label: "time" },
                image: { label: "logo" },
                backgroundImage: { label: "image" },
                description: { label: "description" },
                tags: {
                  label: "tags",
                  tagsPattern: "*/community/*/tags/*",
                  placeholder:
                    "rust, engineer, artist, humanguild, nft, learner, founder",
                },
                linktree: {
                  links: [
                    {
                      label: "Twitter",
                      prefix: "https://twitter.com/",
                      name: "twitter",
                    },
                    {
                      label: "Github",
                      prefix: "https://github.com/",
                      name: "github",
                    },
                    {
                      label: "Telegram",
                      prefix: "https://t.me/",
                      name: "telegram",
                    },
                    {
                      label: "Website",
                      prefix: "https://",
                      name: "website",
                    },
                  ],
                },
              },
            }}
          />
        </div>
      </div>
      <div className="col-lg-6">
        <Widget
          src="hack.near/widget/event.view"
          props={{ accountId, eventId: state.eventId }}
        />
      </div>
    </div>
  </>
);
