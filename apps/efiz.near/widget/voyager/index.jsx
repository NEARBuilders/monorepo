const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

function Header({ path, goBack, goForward, setLayout, togglePreview }) {
  return (
    <Widget
      src="efiz.near/widget/voyager.header.index"
      props={{
        path,
        goBack,
        goForward,
        setLayout,
        togglePreview,
      }}
    />
  );
}

function Content({
  layout,
  path,
  setPath,
  showPreview,
  selectedPath,
  setSelectedPath,
}) {
  return (
    <Widget
      src="efiz.near/widget/voyager.content.index"
      props={{
        layout,
        path,
        setPath,
        showPreview,
        selectedPath,
        setSelectedPath,
      }}
    />
  );
}

function Sidebar({ setPath, setHistory }) {
  return (
    <Widget
      src="efiz.near/widget/voyager.sidebar.index"
      props={{
        path,
        setPath,
        setHistory,
      }}
    />
  );
}

return (
  <Widget
    src="efiz.near/widget/voyager.provider"
    props={{
      path: props.path,
      Children: (p) => (
        <Container>
          <Sidebar {...p} />
          <MainContent>
            <Header {...p} />
            <Content {...p} />
          </MainContent>
        </Container>
      ),
    }}
  />
);
