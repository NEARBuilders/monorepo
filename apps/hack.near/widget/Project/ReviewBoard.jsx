const { Feed } = VM.require("efiz.near/widget/Module.Feed");
const { Card } = VM.require("discover.near/widget/Project.Module");

if (!Feed) {
  return <div>Loading modules...</div>;
}

const projectRegistry = Social.getr(
  "efiz.near/thing/project-registry",
  "final"
);

if (!projectRegistry) {
  return <div>Loading project registry...</div>;
}

const featured = JSON.parse(projectRegistry.featured) || [];
const hidden = JSON.parse(projectRegistry.hidden) || [];

const toggleFeatureProject = (projectPath) => {
  const _featured = JSON.parse(JSON.stringify(featured));
  if (_featured.includes(projectPath)) {
    _featured = _featured.filter((p) => p !== projectPath);
  } else {
    _featured.push(projectPath);
  }
  Social.set({
    thing: {
      "project-registry": {
        featured: JSON.stringify(_featured),
      },
    },
  });
};
const toggleHideProject = (projectPath) => {
  const _hidden = JSON.parse(JSON.stringify(hidden));
  if (_hidden.includes(projectPath)) {
    _hidden = _hidden.filter((p) => p !== projectPath);
  } else {
    _hidden.push(projectPath);
    if (featured.includes(projectPath)) {
      featured = featured.filter((p) => p !== projectPath);
    }
  }
  Social.set({
    thing: {
      "project-registry": {
        featured: JSON.stringify(featured),
        hidden: JSON.stringify(_hidden),
      },
    },
  });
};

return (
  <div className="row">
    <div className="col">
      <h3>All Projects</h3>
      <Feed
        index={{
          action: "notify",
          key: "discover.near", // TODO: change to project
          options: {
            limit: 10,
            order: "desc",
            accountId: undefined,
            subscribe: true,
          },
        }}
        Item={(p) => {
          if (p.value.type === "request" && p.value.data.type === "featured") {
            const projectPath = p.value.data.src;
            if (projectPath) {
              return (
                <div key={p}>
                  <Widget
                    src="discover.near/widget/Project.Provider"
                    props={{
                      View: Card,
                      path: projectPath,
                    }}
                  />
                  <div className="d-flex gap-2">
                    {featured.includes(projectPath) ? (
                      <button onClick={() => toggleFeatureProject(projectPath)}>
                        Unfeature
                      </button>
                    ) : (
                      <button onClick={() => toggleFeatureProject(projectPath)}>
                        Feature
                      </button>
                    )}

                    {hidden.includes(projectPath) ? (
                      <button onClick={() => toggleHideProject(projectPath)}>
                        Unhide
                      </button>
                    ) : (
                      <button onClick={() => toggleHideProject(projectPath)}>
                        Hide
                      </button>
                    )}
                  </div>
                </div>
              );
            }
          }
        }}
        Layout={Flex}
      />
    </div>
    <div className="col">
      <h3>Featured Projects</h3>
      {featured.map((projectPath) => (
        <div key={projectPath}>
          <Widget
            src="discover.near/widget/Project.Provider"
            props={{
              View: Card,
              path: projectPath,
            }}
          />
          <div className="d-flex gap-2">
            <button onClick={() => toggleFeatureProject(projectPath)}>
              Unfeature
            </button>
          </div>
        </div>
      ))}
    </div>
    <div className="col">
      <h3>Hidden Projects</h3>
      {hidden.map((projectPath) => (
        <div key={projectPath}>
          <Widget
            src="discover.near/widget/Project.Provider"
            props={{
              View: Card,
              path: projectPath,
            }}
          />
          <div className="d-flex gap-2">
            <button onClick={() => toggleHideProject(projectPath)}>
              Unhide
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
