const { Button } = VM.require("buildhub.near/widget/components");
const accountId = props.accountId ?? context.accountId ?? "hack.near";
const [appId, setAppId] = useState("app");
const imageUrl =
  props.imageUrl ??
  JSON.stringify(state.image.url) ??
  "https://builders.mypinata.cloud/ipfs/QmQmKGGJXhkhGrTbE4MgJ3G1wUUu8eo7mNKwRSCB5tihCw";

const defaultRoutes = Social.get(`${accountId}/project/${appId}/config`) ?? {
  main: {
    path: "hack.near/widget/page.index",
    blockHeight: "final",
    init: {
      name: "App",
    },
  },
  social: {
    path: "hack.near/widget/page.feed",
    blockHeight: "final",
    init: {
      name: "Discussion",
    },
  },
  docs: {
    path: "hack.near/widget/page.docs",
    blockHeight: "final",
    init: {
      name: "Guide",
    },
  },
};

const [routes, setRoutes] = useState(props.routes ?? defaultRoutes);
const [routePath, setRoutePath] = useState("");
const [activeRouteKey, setActiveRouteKey] = useState("main");
const [theme, setTheme] = useState({ "": ""});
const [pageId, setPageId] = useState("");
const [buttonText, setButtonText] = useState(pageId);
const [projectId, setProjectId] = useState("");
const [projectName, setProjectName] = useState("");
const [twitter, setTwitter] = useState("");
const [github, setGitHub] = useState("");
const [telegram, setTelegram] = useState("");

State.init({
  image,
});

const isValid = Social.get(`${routePath}/**`);

const routesConfigObject = Object.keys(routes).reduce((obj, routeKey) => {
  const route = routes[routeKey];
  obj[routeKey] = {
    path: route.path,
    blockHeight: route.blockHeight,
    init: route.init,
  };
  return obj;
}, {});

const handleCreate = () => {
  Social.set({
    widget: {
      [projectId]: {
        "": Social.get("every.near/widget/app"),
      },
    },
    project: {
      [projectId]: {
        metadata: {
          name: projectName,
          image: state.image,
          tags: {
            build: "",
          },
        },
        config: {
          type: "app",
          theme,
          routes: routesConfigObject,
        },
      },
    },
  });
};

const addRoute = (newRouteKey, newRouteData) => {
  setRoutes((prevRoutes) => ({
    ...prevRoutes,
    [newRouteKey]: newRouteData,
  }));
};

const removeRoute = (routeKey) => {
  setRoutes((prevRoutes) => {
    const updatedRoutes = { ...prevRoutes };
    delete updatedRoutes[routeKey];
    return updatedRoutes;
  });
};

const routeData = {
  [state.pageId]: {
    path: [state.routePath],
    blockHeight: "final",
    init: {
      name: [state.buttonText ?? state.pageId],
    },
  },
};

const handleRouteChange = (selectedRouteKey) => {
  setActiveRouteKey(selectedRouteKey);
};

const Container = styled.div`
  width: 100%;
  position: relative;

  padding: 9.375rem 3rem;

  @media screen and (max-width: 768px) {
    padding: 9.375rem 1.5rem;
  }
`;

const Logo = styled.img`
  height: 55px;
  object-fit: cover;
  margin: 8px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  margin: 0 auto;
`;

return (
  <>
    <div className="row justify-content-between m-1 p-1">
      <div className="col m-2 p-1">
        <h3>App Creator</h3>
        <Widget
          src="mob.near/widget/N.ProfileLine"
          props={{ accountId: "every.near", hideAccountId: true }}
        />
      </div>
      <div className="col m-2 p-1">
        <h4>Name</h4>
        <input
          type="text"
          placeholder="project"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </div>
    </div>
    <div className="row m-1 p-1">
      <div className="col-5">
        <div className="m-2">
          <h5 className="mb-2">ID</h5>
          <div className="mb-2 p-1">
            <input
              type="text"
              placeholder="example"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value.replace(/\s+/g, ""))}
            />
          </div>
          <h5 className="mb-2">Logo</h5>
          <div className="p-1 mb-3">
            <Widget
              src="mob.near/widget/ImageEditorTabs"
              props={{
                image: state.image,
                onChange: (image) => State.update({ image }),
              }}
            />
          </div>
          <h2>Theme</h2>
          <div>
            {theme && Object.entries(theme).map(([key, value]) => (
              <div key={key}>
                <label>{key}:</label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) =>
                    setTheme({ ...theme, [key]: e.target.value })
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="col-7">
        <div className="m-2">
          <h5 className="m-1">Routes</h5>
          <div className="d-flex flex-row gap-3 p-1">
            <input
              type="text"
              placeholder="new page id"
              value={pageId}
              onChange={(e) => setPageId(e.target.value)}
            />
            <input
              type="text"
              placeholder="button text"
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
            />
          </div>
          <div className="d-flex flex-row gap-3 p-1">
            <input
              type="text"
              placeholder="widget source path"
              value={routePath}
              onChange={(e) => setRoutePath(e.target.value)}
            />
            <button
              className="btn btn-dark"
              disabled={!isValid || pageId === ""}
              onClick={() => {
                const newRouteData = {
                  path: routePath,
                  blockHeight: "final",
                  init: {
                    name: buttonText || pageId,
                  },
                };
                addRoute(pageId, newRouteData);
              }}
            >
              +
            </button>
          </div>
        </div>
        <div>
          {Object.keys(routes).map((key) => {
            const route = routes[key];
            return (
              <div className="d-flex m-2 p-1 justify-content-between align-items-center">
                <Widget
                  src="hack.near/widget/template.inline"
                  props={{ src: route.path, hideDescription: true }}
                />
                <button
                  className="btn btn-outline-danger"
                  onClick={() => removeRoute(key)}
                >
                  X
                </button>
              </div>
            );
          })}
        </div>

        <div className="m-2 mt-3">
          <h5 className="m-1">Links</h5>

          <div className="gap-3 p-1">
            <input
              type="text"
              placeholder="https://twitter.com/nearbuilders"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
            />
          </div>
          <div className="gap-3 p-1">
            <input
              type="text"
              placeholder="https://github.com/nearbuilders"
              value={github}
              onChange={(e) => setGitHub(e.target.value)}
            />
          </div>
          <div className="gap-3 p-1">
            <input
              type="text"
              placeholder="https://t.me/+0yT1bqsQHxkzMDkx"
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
            />
          </div>
        </div>
      </div>
      <button
        className="btn btn-success m-2 mb-3"
        disabled={!projectId ?? !context.accountId}
        onClick={handleCreate}
      >
        Launch
      </button>
    </div>
    <div className="m-2">
      <h5>Preview</h5>
      <hr />
      <Widget
        src="every.near/widget/app.view"
        props={{
          config: {
            type: "every.near/type/app",
            router: {
              param: "page",
              routes: routesConfigObject,
            },
            blocks: {
              Header: () => (
                <Widget
                  src="hack.near/widget/Navbar.preview"
                  props={{
                    routes: routesConfigObject,
                    image: state.image,
                  }}
                />
              ),
              Footer: () => (
                <Widget
                  src="hack.near/widget/Footer.preview"
                  props={{
                    creatorId: accountId,
                    appId: projectId,
                    twitter,
                    telegram,
                    github,
                  }}
                />
              ),
            },
          },
        }}
      />
    </div>
  </>
);
