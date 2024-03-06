// Social.get(`${accountId}/project/${appId}/config`) ??
const defaultRoutes = {
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

const persistance = Storage.privateGet("newRoute") || {
  routeKey: "",
  buttonText: "",
  routePath: "",
  initialProps: "",
  createBlankPage: false,
};

const store = Storage.get("events-app-creator");
const storeKey = "router";

const initState = store[storeKey] ?? {
  routes: props.routes ?? defaultRoutes,
  param: "page",
};

State.init({ ...initState, ...persistance });

const set = (k, v) => {
  State.update({ [k]: v });
  Storage.set("events-app-creator", { ...store, [storeKey]: state });
};

const persist = (k, v) => {
  State.update({ [k]: v });
  Storage.privateSet("newRoute", { ...state, [k]: v });
};

const [routeKey, setRouteKey] = useState("");
const [buttonText, setButtonText] = useState("");
const [initialProps, setInitialProps] = useState("");
const [createBlankPage, setCreateBlankPage] = useState(false);
const isValid = Social.get(`${state.routePath}/**`);

const addRoute = (newRouteKey, newRouteData) => {
  State.update({ routes: { ...state.routes, [newRouteKey]: newRouteData } });
  set("routes", { ...state.routes, [newRouteKey]: newRouteData });
};

const removeRoute = (routeKey) => {
  const updatedRoutes = { ...state.routes };
  delete updatedRoutes[routeKey];

  State.update({
    routes: updatedRoutes,
  });
  set("routes", updatedRoutes);
};

return (
  <div className="row">
    <h3>configure your routes</h3>
    <div className="col-7">
      <div className="border p-3">
        <h5 className="m-1">Create Route</h5>
        <div className="m-2 d-flex flex-column gap-3">
          <div className="d-flex flex-row gap-3">
            <div className="p-1">
              <label htmlFor="routeKey">Key:</label>
              <input
                id="routeKey"
                type="text"
                placeholder="Enter route key"
                value={state.routeKey}
                onChange={(e) => persist("routeKey", e.target.value)}
              />
            </div>
            <div className="p-1">
              <label htmlFor="buttonText">Navbar Item Text:</label>
              <input
                id="buttonText"
                type="text"
                placeholder="Enter navbar item text"
                value={state.buttonText}
                onChange={(e) => persist("buttonText", e.target.value)}
              />
            </div>
            <div className="p-1">
              <button
                className="btn btn-dark"
                disabled={(!isValid && state.createBlankPage) || state.routeKey === ""}
                onClick={() => {
                  const newRouteData = {
                    path: state.routePath,
                    blockHeight: "final",
                    init: {
                      name: state.buttonText || state.routeKey,
                      ...(JSON.parse(state.initialProps) || {}),
                    },
                  };
                  addRoute(state.routeKey, newRouteData);
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
              value={state.routePath}
              onChange={(e) => persist("routePath", e.target.value)}
              disabled={state.createBlankPage}
            />
            <div className="form-check">
              <input
                id="createBlankPage"
                className="form-check-input"
                type="checkbox"
                checked={state.createBlankPage}
                onChange={(e) => persist("createBlankPage", e.target.checked)}
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
            value={state.initialProps}
            onChange={(e) => State.update({ initialProps: e.target.value })}
            onBlur={() => {
              try {
                const parsedProps = JSON.parse(state.initialProps);
                persist("initialProps", JSON.stringify(parsedProps, null, 2));
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
      {Object.keys(state.routes).map((key) => (
        <div
          key={key}
          className="d-flex m-2 p-1 justify-content-between align-items-center"
        >
          <Widget
            src="hack.near/widget/template.inline"
            props={{ src: state.routes[key].path, hideDescription: true }}
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
