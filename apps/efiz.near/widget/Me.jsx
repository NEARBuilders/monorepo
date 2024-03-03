const PageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: ${({ bgColor }) => bgColor || "black"};
  color: ${({ textColor }) => textColor || "white"};
  font-family: ${({ font }) => font || "Arial, sans-serif"};
`;

const EditButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
`;

const Subject = styled.h1`
  font-size: ${({ fontSize }) => fontSize || "2rem"};
  margin-bottom: 1rem;
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Tab = styled.div`
  padding: 0.5rem 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 0 0.5rem;
  cursor: pointer;
`;

const Content = styled.div`
`;

function toggleEdit() {}

const Page = ({ bgColor, textColor, font, subject, fontSize, tabs }) => {
  return (
    <PageContainer bgColor={bgColor} textColor={textColor} font={font}>
      <EditButton onClick={toggleEdit}>Edit</EditButton>
      <Subject fontSize={fontSize}>{subject}</Subject>
      <TabsContainer>
        {tabs.map((tab, index) => (
          <Tab key={index} onClick={() => State.update({ src: tab.src })}>
            {tab.title}
          </Tab>
        ))}
      </TabsContainer>
      <Content>{state.src && <Widget src={state.src} props={{}} />}</Content>
    </PageContainer>
  );
};
const tabs = [
  { title: "Tab 1", src: "efiz.near/widget/Tree", defaultProps: {} },
  { title: "Tab 2", src: "efiz.near/widget/Chat", defaultProps: {} },
  { title: "Tab 3", src: "efiz.near/widget/Tree", defaultProps: {} },
];
// Oh dude it would be so cool if these could open draggable widgets...

return (
  <div>
    <Page
      bgColor="linear-gradient(to bottom, #3498db, #fff)"
      textColor="white"
      font="Arial, sans-serif"
      subject="elliot"
      fontSize="3rem"
      tabs={tabs}
    />
  </div>
);
