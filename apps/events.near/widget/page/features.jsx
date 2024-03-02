const store = VM.require("${config/account}/widget/store") || {
  set: () => console.log("no set"),
  get: () => console.log("no get"),
};

const defaultRoutes = Social.get(`${accountId}/project/${appId}/config`) ?? {
  home: {
    // maybe this can be the canvas
    init: {
      name: "Home",
    },
    required: true,
  },
  events: {
    path: "events.near/widget/events.Calendar",
    blockHeight: "final",
    init: {
      name: "Calendar",
    },
    required: true,
  },
  social: {
    path: "hack.near/widget/page.feed",
    blockHeight: "final",
    init: {
      name: "Social",
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

const [routeKey, setRouteKey] = useState("");
const [buttonText, setButtonText] = useState(route);
const [routePath, setRoutePath] = useState("");
const [routes, setRoutes] = useState(props.routes ?? defaultRoutes);
const [initialProps, setInitialProps] = useState("");
const [createBlankPage, setCreateBlankPage] = useState(false);
const isValid = Social.get(`${routePath}/**`);

const addRoute = (newRouteKey, newRouteData) => {
  setRoutes((prevRoutes) => ({
    ...prevRoutes,
    [newRouteKey]: newRouteData,
  }));
  Storage.set("data", "hello");
};

const removeRoute = (routeKey) => {
  setRoutes((prevRoutes) => {
    const updatedRoutes = { ...prevRoutes };
    delete updatedRoutes[routeKey];
    return updatedRoutes;
  });
};

return (
  <div className="row">
    <div className="col-7">
      <div className="border p-3">
        <button onClick={() => console.log(Storage.get("data"))}>get</button>
        <h5 className="m-1">Create Route</h5>
        <div className="m-2 d-flex flex-column gap-3">
          <div className="d-flex flex-row gap-3">
            <div className="p-1">
              <label htmlFor="routeKey">Key:</label>
              <input
                id="routeKey"
                type="text"
                placeholder="Enter route key"
                value={routeKey}
                onChange={(e) => setRouteKey(e.target.value)}
              />
            </div>
            <div className="p-1">
              <label htmlFor="buttonText">Navbar Item Text:</label>
              <input
                id="buttonText"
                type="text"
                placeholder="Enter navbar item text"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
              />
            </div>
            <div className="p-1">
              <button
                className="btn btn-dark"
                disabled={!isValid || routeKey === ""}
                onClick={() => {
                  const newRouteData = {
                    path: routePath,
                    blockHeight: "final",
                    init: {
                      name: buttonText || routeKey,
                    },
                  };
                  addRoute(routeKey, newRouteData);
                }}
              >
                Add Route
              </button>
            </div>
          </div>
          <div className="p-1">
            <label htmlFor="routePath">Path:</label>
            <input
              id="routePath"
              type="text"
              placeholder="Enter widget source path"
              value={routePath}
              onChange={(e) => setRoutePath(e.target.value)}
              disabled={createBlankPage}
            />
            <div className="form-check">
              <input
                id="createBlankPage"
                className="form-check-input"
                type="checkbox"
                checked={createBlankPage}
                onChange={(e) => setCreateBlankPage(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="createBlankPage">
                Create Blank Page
              </label>
            </div>
          </div>
        </div>
        <div className="m-2">
          <h5 className="m-1">Initial Props</h5>
          <textarea
            className="form-control"
            rows="5"
            value={initialProps}
            onChange={(e) => setInitialProps(e.target.value)}
            onBlur={() => {
              try {
                const parsedProps = JSON.parse(initialProps);
                setInitialProps(JSON.stringify(parsedProps, null, 2));
              } catch (error) {
                console.error("Error parsing initial props JSON:", error);
                // Optionally handle error here
              }
            }}
            placeholder="Enter initial props JSON..."
          />
        </div>
      </div>
    </div>

    <div className="col-5">
      {Object.keys(routes).map((key) => (
        <div
          key={key}
          className="d-flex m-2 p-1 justify-content-between align-items-center"
        >
          <Widget
            src="hack.near/widget/template.inline"
            props={{ src: routes[key].path, hideDescription: true }}
          />
          <button
            className="btn btn-outline-danger"
            onClick={() => removeRoute(key)}
          >
            X
          </button>
        </div>
      ))}
    </div>
  </div>
);
