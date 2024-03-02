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

const [pageId, setPageId] = useState("");
const [buttonText, setButtonText] = useState(pageId);
const [routePath, setRoutePath] = useState("");
const [routes, setRoutes] = useState(props.routes ?? defaultRoutes);
const isValid = Social.get(`${routePath}/**`);

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

return (
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
  </div>
);
