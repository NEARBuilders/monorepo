const accountId = props.accountId ?? context.accountId;

let tag = props.tag ?? "*";

State.init({ path: props.path ?? "every.near/thing/core" });

const data = Social.keys(`*/graph/context/*/*/*/tags/${tag}`, "final");

if (!data) {
  return "Loading...";
}

function extractThings(data) {
  const uniqueKeys = new Set();
  const things = [];

  Object.keys(data).forEach((curatorId) => {
    const context = data[curatorId]?.graph?.context;

    if (context) {
      Object.keys(context).forEach((creatorId) => {
        const namespaces = context[creatorId];

        if (namespaces) {
          Object.keys(namespaces).forEach((namespace) => {
            const thingData = namespaces[namespace];

            if (thingData) {
              Object.keys(thingData).forEach((thingId) => {
                const key = `${creatorId}-${namespace}-${thingId}`;

                if (!uniqueKeys.has(key)) {
                  uniqueKeys.add(key); // Add the key to the set

                  things.push(
                    <div key={key} className="m-3 mt- card">
                      <div className="card-body m-2 p-1 row">
                        <div className="col m-1 p-2 text-truncate">
                          <Widget
                            src="hack.near/widget/thing.block"
                            props={{
                              path: `${creatorId}/${namespace}/${thingId}`,
                            }}
                          />
                        </div>
                        <div className="col m-1 p-1">
                          <div className="card-body m-2 p-1 row">
                            <div className="col-9 m-1 ">
                              <Widget
                                src="hack.near/widget/tags"
                                props={{
                                  path: `${creatorId}/${namespace}/${thingId}`,
                                }}
                              />
                            </div>
                            <div className="col-2 m-1 ">
                              <Widget
                                src="hack.near/widget/star.button"
                                props={{
                                  path: `${creatorId}/${namespace}/${thingId}`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              });
            }
          });
        }
      });
    }
  });

  return things;
}

const [creatorId, namespace, thingId] = state.path.split("/");

const exists = Social.get(state.path);

return (
  <>
    <div className="mb-2 row">
      <div className="mb-1 col">
        <h5 className="mt-2 mb-3">SocialDB path of anything:</h5>
        <input
          type="text"
          value={state.path}
          onChange={(event) =>
            State.update({ path: event.target.value.toLowerCase() })
          }
        />
        <br />
        <div className="m-1 d-flex">
          <div className="m-2">
            <button
              className="btn btn-outline-secondary"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              Guide
            </button>
          </div>
          <div className="m-2">
            <Widget
              src="hack.near/widget/FollowButton"
              props={{ accountId: creatorId }}
            />
          </div>
        </div>
      </div>
      <div className="mb-2 col">
        <Widget
          src="hack.near/widget/meta.editor"
          props={{ path: state.path }}
        />
      </div>
      <div className="collapse" id="collapseExample">
        <div className="card card-body m-3" style={{ background: "#f8f8f8" }}>
          <h5>Good Practices:</h5>
          <ul>
            <li>Keep tags concise and simple</li>
            <li>Use "-" instead of spaces</li>
            <li>English words recommended</li>
            <li>Don't save irrelevant context</li>
            <li>Be kind to everyone</li>
          </ul>
        </div>
      </div>
    </div>
    <br />

    {tag !== "*" ? (
      <>
        <h5 className="ms-2">Filtered by Tag:</h5>

        <h4 className="ms-3">
          <span className="badge rounded-pill bg-primary">{tag}</span>
        </h4>
      </>
    ) : (
      <h5 className="ms-3">Every Context</h5>
    )}

    {extractThings(data)}
  </>
);
