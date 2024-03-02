const accountId = props.accountId; // which account's Types to use
const font = props.font || "Times New Roman"; // custom font for H1
const hashtag = props.hashtag || "page"; // where to index data from
const text = props.text || hashtag; // text for H1
const view = props.view || "WIDGETS";

// Modify the template below
const pageTypes = [
  {
    name: "community",
    hashtag: "community",
    template: "efiz.near/widget/TaggedWidgets",
  },
  {
    name: "guide",
    hashtag: "guide",
    template: "efiz.near/widget/TaggedWidgets",
  },
];

const H1 = styled.h1`
  font-family: ${font}, Times, serif;
  font-size: 4em;
  line-height: 1.25;
  font-weight: 400;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

const Controller = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin-top: 160px;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 4px;
  margin: 0 4px;
`;

const Button = styled.button`
  text-transform: lowercase !important;
`;

State.init({
  title: text,
  selectedTab: view,
  type: null,
});

const renderView = () => {
  switch (state.selectedTab) {
    case "CREATE":
      return (
        <Widget
          src={"efiz.near/widget/Everything.Create.Page"}
          props={{ typeTag: state.type.hashtag, template: state.type.template }}
        />
      );
    case "WIDGETS":
      return (
        <Widget
          src={"efiz.near/widget/TaggedWidgets"}
          props={{ hashtag: state.type.hashtag || hashtag }}
        />
      );
  }
};

const handleSelectType = (type) => {
  State.update({
    type,
    title: type.name || text,
    selectedTab: "WIDGETS",
  });
};

const handlePageCreate = () => {
  State.update({
    selectedTab: "CREATE",
  });
};

return (
  <>
    <Container>
      <Controller>
        <H1>{state.title}</H1>
        <ButtonRow>
          {state.type === null ? (
            <>
              {pageTypes.map((it) => (
                <Button onClick={() => handleSelectType(it)}>{it.name}</Button>
              ))}
            </>
          ) : (
            <>
              <Button onClick={() => handleSelectType(null)}>back</Button>
              <Button onClick={() => handlePageCreate()}>create new</Button>
            </>
          )}
        </ButtonRow>
      </Controller>
      {renderView()}
    </Container>
  </>
);
