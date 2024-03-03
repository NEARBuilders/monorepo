State.init({
  currentFolder: props.rootFolder,
});

const Container = styled.div`
  border: 1px solid #ccc;
  height: fit-content;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-bottom: 1px solid #ccc;
`;

const IconBox = styled.div`
  font-size: 2em;
  line-height: 1.25;
  font-weight: 400;
  cursor: pointer;
`;

const Content = styled.div`
  padding: 1px;
  min-height: 300px;
`;

const Button = styled.button`
  text-transform: lowercase !important;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 4px;
`;

function Modifier() {
  const renderIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="black"
        width="24px"
        height="24px"
      >
        <circle cx="12" cy="12" r="8" />
      </svg>
    );
  };

  return (
    <Widget
      src="efiz.near/widget/Common.Dropdown"
      props={{
        renderIcon: renderIcon,
        elements: [],
      }}
    />
  );
}

const FolderItem = styled.div`
  cursor: pointer;
  margin: 8px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const DocumentItem = styled.div`
  margin-left: 20px;
`;

const openFolder = (folder) => {
  State.update({ currentFolder: folder });
};

const renderDocuments = (folder) => {
  return folder.documents.map((document) => (
    <DocumentItem key={document.id}>{document.name}</DocumentItem>
  ));
};

const renderFolders = (folder) => {
  return (
    folder &&
    folder.folders.map((subfolder) => (
      <FolderItem key={subfolder.id} onClick={() => openFolder(subfolder)}>
        {subfolder.name}
      </FolderItem>
    ))
  );
};

const handleCreateDocument = () => {
  if (state.currentFolder) {
    props.createDocument(
      state.currentFolder.id,
      "New Document",
      "Document content goes here"
    );
  }
};

const handleCreateFolder = () => {
  if (state.currentFolder) {
    props.createFolder(state.currentFolder.id, "New Folder");
  }
};

const handleBackToRoot = () => {
  State.update({ rootFolder });
};

return (
  <Container>
    <Header>
      <ButtonRow>
        <Modifier />
      </ButtonRow>
    </Header>
    <Content>
      <div>
        {state.currentFolder ? (
          <>
            <button onClick={handleBackToRoot}>Back to Root</button>
            <h2>{state.currentFolder.name}</h2>
            <button onClick={handleCreateDocument}>Create Document</button>
            <button onClick={handleCreateFolder}>Create Folder</button>
            <div>
              {renderDocuments(state.currentFolder)}
              {renderFolders(state.currentFolder)}
            </div>
          </>
        ) : (
          <div>
            <h2>Root Folder</h2>
            {renderFolders(props.rootFolder)}
          </div>
        )}
      </div>
    </Content>
  </Container>
);

// which is inside of a widget
// inside of a Thing.
// A Thing is a curation of widgets and other things.

<Widget
  src={`nearui.near/widget/Typography.Text`} // the template, which honestly should be a require. Since it must be stateless
  props={{
    // these are the props that follow the type
    children: "Your Text Here", // is a stateless required component, or a stateful widget
    tag: "h1",
    size: "5",
    weight: "bold",
    color: "primary",
    className: "mt-4 mb-2",
    otherProps: {
      // this gets passed to this component...
      id: "my-text",
    },
  }}
/>;
// A widget is a structure of widgets
