const store = Storage.get("events-app-creator");


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
            v: "2",
            param: "tab",
            routes: store.router?.routes,
          },
          layout: {
            src: "devs.near/widget/Layout",
            props: {
              variant: "standard",
            },
          },
          blocks: {
            Header: () => (
              <Widget
                src="${config/account}/widget/components.Navbar"
                props={{
                  routes: store.router?.routes,
                  image: store.metadata?.image,
                }}
              />
            ),
            Footer: () => (
              <Widget
                src="hack.near/widget/Footer.preview"
                props={{
                  creatorId: accountId,
                  appId: projectId,
                  twitter: store.metadata?.twitter,
                  telegram: store.metadata?.telegram,
                  github: store.metadata?.github,
                }}
              />
            ),
          },
        },
      }}
    />
  </div>
);
