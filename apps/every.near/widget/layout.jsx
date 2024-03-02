return {
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
      case "grid": {
        const { Header, Footer } = blocks;
        return (
          <div
            className="layout"
            style={{
              display: "grid",
              gridTemplateRows: "auto 1fr auto", 
              height: "100%",
            }}
          >
            <Header />
            <div
              className="content"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "1rem",
                padding: "1rem",
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
};
