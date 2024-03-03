const routes = props.routes ?? {
  main: {
    path: "hack.near/widget/page.index",
    blockHeight: "final",
    init: {
      name: "Home",
    },
  },
};

const { App } = VM.require("hack.near/widget/App");

const Theme = styled.div`
  position: relative;
`;

return (
  <Theme>
    <App
      {...props}
      routes={routes}
      debug={false}
      defaultPage="main"
      basePath={context.widgetSrc ?? `${context.accountId}/widget/app`}
      Layout={({ children, navigate, Outlet, ...p }) => {
        const { AppLayout } = VM.require("hack.near/widget/App") || {
          AppLayout: () => <></>,
        };
        return (
          <AppLayout
            Header={({ page }) => {
              return <Widget src="hack.near/widget/src.navbar" />;
            }}
            Footer={() => {
              return <Widget src="hack.near/widget/src.footer" />;
            }}
            {...p}
          >
            <Outlet page={page} {...p} />
          </AppLayout>
        );
      }}
      Provider={({ children }) => children}
    />
  </Theme>
);
