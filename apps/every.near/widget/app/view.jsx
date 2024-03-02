const { Layout } = VM.require("commonterms.near/widget/components") || {
  // I like this, but it's very generic
  Layout: () => <></>,
};

const { Router } = VM.require("devs.near/widget/Router") || {
  Router: () => <></>,
};

const { config, ...passProps } = props;

if (!config) {
  // TODO: get from settings (or default)
  config = {
    router: {
      param: "page",
      routes: {
        home: {
          path: "efiz.near/widget/Tree",
          blockHeight: "final",
          init: {
            name: "Home",
          },
          default: true,
        },
        other: {
          path: "efiz.near/widget/Other",
          blockHeight: "final",
          init: {
            name: "Other",
          },
        },
      },
    },
  };
} else {
  // config may be a VM require string
  if (typeof config !== "object") {
    config = VM.require(config) || {};
  }
}

if (!config) {
  return (
    <p>
      unable to load config:{" "}
      {typeof config === object ? JSON.stringify(config) : config}
    </p>
  );
}

// While something like Theme should be in the parent...
const CSS = styled.div`
  .container {
    border: 1px solid red;
  }

  .button {
  }

  .input {
  }

  .layout {
    border: 4px solid var(--main-color);
  }

  .header {
    border: 1px solid blue;
  }

  .content {
  }

  .footer {
  }
`;

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

return (
  <CSS style={config.theme}>
    <Container>
      <Layout
        variant="standard"
        blocks={config.blocks}
      >
        <Content>
          <Router config={config.router} {...passProps} />
        </Content>
      </Layout>
    </Container>
  </CSS>
);
