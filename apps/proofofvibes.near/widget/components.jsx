return {
  Button: ({ disabled, onClick, children }) => (
    <button className="button" disabled={disabled} onClick={onClick}>
      {children}
    </button>
  ),
  Input: ({ value, onChange, placeholder }) => (
    <input
      className="input"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  ),
  Container: ({ children }) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
      className="container"
    >
      {children}
    </div>
  ),
  Layout: ({ variant, blocks, children }) => {
    switch (variant) {
      case "standard": {
        const { Header, Footer } = blocks;
        return (
          <div
            className="layout"
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100%",
            }}
          >
            <Header />
            <div
              className="content"
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              {children}
            </div>
            <Footer />
          </div>
        );
      }
    }
  },
  Router: ({ active, routes }) => {
    const routeParts = active.split(".");

    let currentRoute = routes;
    let src = "";
    let defaultProps = {};

    for (let part of routeParts) {
      if (currentRoute[part]) {
        currentRoute = currentRoute[part];
        src = currentRoute.path;

        if (currentRoute.init) {
          defaultProps = { ...defaultProps, ...currentRoute.init };
        }
      } else {
        // Handle 404 or default case for unknown routes
        return <p>404 Not Found</p>;
      }
    }

    return (
      <div key={active}>
        <Widget
          src={src}
          props={{
            currentPath: `/${config/account}/widget/app?page=${page}`,
            page: tab,
            ...passProps,
            ...defaultProps,
          }}
        />
      </div>
    );
  },
};
