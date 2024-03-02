
return (
  <div className="m-2">
    <h5>Preview</h5>
    <hr />
    <Widget
      src="every.near/widget/app.view"
      props={{
        config: {
          type: "every.near/type/app",
          router: {
            param: "tab",
            routes: routesConfigObject,
          },
          blocks: {
            Header: () => (
              <Widget
                src="${config/account}/widget/components.Navbar"
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
);
