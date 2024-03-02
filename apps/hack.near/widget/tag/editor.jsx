// adapted from the `PublicTagEditor` widget by zavodil.near

const creatorId = props.creatorId ?? "hack.near";
const namespace = props.namespace ?? "widget";
const thingId = props.thingId ?? "every";
const accountId = context.accountId;
const debug = props.debug ?? false;

State.init({ path });

const tags = Social.getr(`*/graph/context/${state.path}/tags/**`, "final");

const pattern = `*/graph/context/*/*/*/tags/*`;

return (
  <div className="row m-2">
    <div className="col-lg-6">
      <div>
        <h4>Contextualizer</h4>
      </div>
      <div className="mb-2">
        <p className="mb-1">SocialDB Path of Anything:</p>
        <input
          type="text"
          value={state.path}
          onChange={(event) =>
            State.update({ path: event.target.value.toLowerCase() })
          }
        />
      </div>
      <div className="mb-2" style={{ minHeight: "62px" }}>
        {tags !== null ? (
          <Widget
            src={"devs.near/widget/MetadataEditor"}
            props={{
              initialMetadata: tags,
              onChange: (tags) => {
                State.update({ tags });
              },
              options: {
                tags: {
                  pattern,
                  placeholder: "dev, art, gov, edu, social, near",
                },
              },
            }}
          />
        ) : (
          "Loading..."
        )}
      </div>
      <div className="mb-2">
        <CommitButton
          disabled={tags === null}
          data={{
            graph: {
              context: {
                [creatorId]: {
                  [namespace]: {
                    [thingId]: {
                      tags: state.tags,
                    },
                  },
                },
              },
            },
          }}
        >
          Save
        </CommitButton>

        <button
          class="btn btn-outline-secondary m-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          Guide
        </button>
      </div>

      <div className="collapse" id="collapseExample">
        <div class="card card-body">
          <h5>Best Practices:</h5>
          <ul>
            <li>Keep tags concise and simple</li>
            <li>Put "-" (minus) instead of a space</li>
            <li>English words recommended</li>
            <li>Do not create unnecessary tags</li>
            <li>Be nice to everyone #community</li>
          </ul>
        </div>
      </div>
    </div>
    <div className="p-2 col-lg-6">
      <div className="mb-2 card">
        <div className="card-body">
          <div className="text-truncate mb-3">
            <Widget
              src="hack.near/widget/thing.block"
              props={{ creatorId, namespace, thingId }}
            />
          </div>
          <Widget
            src="hack.near/widget/tags"
            props={{
              path: state.path,
            }}
          />
        </div>
      </div>
    </div>
  </div>
);
