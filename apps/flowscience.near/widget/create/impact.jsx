const accountId = props.accountId ?? context.accountId;

const template = Social.get(`${accountId}/settings/dev/src`);

if (template === null) {
  return "Loading...";
}

const src = "flowscience.near/widget/hypercert.page";

State.init({
  h1,
  h2,
  description,
  communityId,
  contractId,
  buttonText,
  link,
  mainColor,
  name,
});

const handleCreate = () =>
  Social.set({
    widget: {
      [`${state.name}`]: {
        "": `const accountId = props.accountId ?? context.accountId; const ownerId = props.ownerId ?? "hack.near"; const pageId = props.pageId ?? "community.page"; return <Widget src="hack.near/widget/community.page" props={{ accountId, communityId: "${state.communityId}", contractId: "${state.contractId}", h1: "${state.h1}",
        h2: "${state.h2}", description: "${state.description}", mainColor: "${state.mainColor}", buttonText: "${state.buttonText}", link: "${state.link}" }} />`,
        metadata: {
          tags: {
            build: "",
          },
        },
      },
    },
  });

return (
  <>
    <h3>Publish an Impact Certificate</h3>
    <p>
      <i>
        ↳ read the{" "}
        <a href="https://github.com/open-cann/hypercerts-on-bos">
          documentation
        </a>
        about hypercerts
      </i>
    </p>
    <hr />
    <div className="mt-3">
      <div>
        <h5>Name Your Impact</h5>
        <input
          type="text"
          placeholder="My Impact Initiative"
          value={state.h1}
        />
      </div>
    </div>
    <div className="mt-3">
      <h5>h2</h5>
      <input type="text" placeholder="DAO" value={state.h2} />
    </div>
    <div className="mt-3">
      <h5>Project Name</h5>
      <input type="text" placeholder="My Community" value={state.name} />
    </div>
    <div className="mt-3">
      <h5>Project Account ID</h5>
      <input type="text" placeholder={accountId} value={state.communityId} />
    </div>
    <div className="mt-3">
      <h5>Contract ID (for an NFT gate)</h5>
      <input
        type="text"
        placeholder="mint.sharddog.near"
        value={state.contractId}
      />
    </div>
    <div className="mt-3">
      <h5>Description</h5>
      <input
        type="text"
        placeholder="Reward impact with Hypercerts!"
        value={state.description}
      />
    </div>
    <div className="mt-3">
      <h5>Call To Action</h5>
      <input type="text" placeholder="Create Impact" value={state.buttonText} />
    </div>
    <div className="mt-3">
      <h5>Proof of Impact</h5>
      <input
        type="text"
        placeholder="https://everything.dev"
        value={state.link}
      />
    </div>
    <div className="mt-3">
      <h5>Theme Color</h5>
      <input type="text" placeholder="#000000" value={state.mainColor} />
    </div>
    <div className="mt-3">
      <button
        disabled={
          !state.name ??
          !state.h1 ??
          !state.h2 ??
          !state.description ??
          !state.buttonText ??
          !state.link ??
          !state.mainColor ??
          !state.name
        }
        className="btn btn-success mx-1"
        onClick={handleCreate}
      >
        Publish Your Impact
      </button>
    </div>
    <hr />
    <h3>Preview</h3>
    <div className="mb-2">
      <Widget
        src={src}
        props={{
          h1: state.h1,
          h2: state.h2,
          description: state.description,
          communityId: state.communityId,
          contractId: state.contractId,
          buttonText: state.buttonText,
          link: state.link,
          mainColor: state.mainColor,
          name: state.name,
        }}
      />
    </div>
  </>
);
