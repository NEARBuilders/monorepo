const $ = VM.require("sdks.near/widget/Loader");
const { StatefulDependency } = $("@sdks/abstracts");

const RoutesManager = (Store, status, routes, { page }) => {
  const Router = {
    ...StatefulDependency(Store, status, "Router"),
    name: "Router",
    init: () => {
      Router.initDependency({
        state: {
          routes,
          currentRoute: Router.getDefaultRoute(),
          currentView: routes[Router.getDefaultRoute()],
        },
      });

      return {
        Router,
        RouterView: () => Router.get("state").currentView || null,
        Route: (props) => {
            let search = (obj, index) => {
                return index in obj ? search(obj[index], index) : obj;
            };
            let params = search(props, "props");

            return <a href="#" onClick={() => Router.changeRoute(params.to)}>
                {props.children}
            </a>;
        },
      };
    },
    changeRoute: (route) => {
      Router.set("state", {
        ...Router.get("state"),
        currentRoute: route in routes ? route : "home",
        currentView: route in routes ? routes[route] : routes["home"],
      });

      return Router.get("state").currentRoute;
    },
    getCurrentRoute: () => {
      return Router.get("state").currentRoute || null;
    },
    getView: () => {
      return Router.get("state").currentView || null;
    },
    getDefaultRoute: () => {
      return page || (routes["fallback"] ? "fallback" : null) || "home";
    },
  };

  return Router.init();
};

return RoutesManager;
