const accountId = props.accountId ?? context.accountId;

const template = Social.get(`${accountId}/settings/dev/src`);

if (template === null) {
  return "Loading...";
}

const src = "hack.near/widget/page.common";

State.init({
  h1,
  h2,
  tagline,
  communityId,
  contractId,
  buttonText,
  link,
  bgColor,
  name,
});

const handleCreate = () =>
  Social.set({
    widget: {
      [`page.${state.name}`]: {
        "": `const accountId = props.accountId ?? context.accountId; const creatorId = props.creatorId ?? context.accountId ?? "every.near"; const pageId = props.pageId ?? "page.index"; return <Widget src="hack.near/widget/page.common" props={{ accountId, h1: "${
          state.h1
        }",
        h2: "${state.h2}", tagline: "${state.tagline}", bgColor: "${
          state.bgColor ?? "#000"
        }", buttonText: "${state.buttonText}", link: "${state.link}" }} />`,
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
    <h3>Create Page</h3>
    <p>
      <i>
        This no-code builder tool can help anyone launch their own project page
        with a basic app structure and template, courtesy of
        <a href="https://everything.dev">everything.dev</a> and open web
        contributors worldwide.
      </i>
    </p>
    <br />
    <div className="row">
      <div className="col-lg-6">
        <h5>Heading</h5>
        <input type="text" placeholder="H1" value={state.h1} />
        <div className="mt-3">
          <h5></h5>
          <input type="text" placeholder="H2" value={state.h2} />
        </div>
        <div className="mt-3">
          <h5>Tagline</h5>
          <input
            type="text"
            placeholder="< write yours here >"
            value={state.tagline}
          />
        </div>
        <div className="mt-3">
          <h5>Button</h5>
          <input
            type="text"
            placeholder="< call to action >"
            value={state.buttonText}
          />
        </div>
        <div className="mt-3">
          <input
            type="text"
            placeholder="< redirect url >"
            value={state.link}
          />
        </div>
        <div className="mt-3">
          <h5>Route Name</h5>
          <input type="text" placeholder="community" value={state.name} />
        </div>
        <div className="mt-3">
          <button
            disabled={
              !state.name ??
              !state.h1 ??
              !state.h2 ??
              !state.tagline ??
              !state.buttonText ??
              !state.link ??
              !state.mainColor ??
              !state.name
            }
            className="btn btn-success mx-1"
            onClick={handleCreate}
          >
            Create
          </button>
          <a
            className="btn btn-outline-success mx-1"
            href="#/edit/hack.near/widget/page.common"
          >
            Edit Template
          </a>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="mb-2">
          <Widget
            src={src}
            props={{
              h1: state.h1,
              h2: state.h2,
              tagline: state.tagline,
              communityId: state.communityId,
              contractId: state.contractId,
              buttonText: state.buttonText,
              link: state.link,
              bgColor: state.bgColor,
              name: state.name,
            }}
          />
        </div>
      </div>
    </div>
  </>
);
