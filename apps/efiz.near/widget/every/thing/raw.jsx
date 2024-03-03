const path = props.path;
const blockHeight = props.blockHeight;
const parts = path.split("/");

const thing = JSON.parse(Social.get(path, blockHeight) || "null");

if (!thing) {
  return <></>;
}

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
  margin-bottom: 10px;
  gap: 8px;
  margin: 8px;
`;

return (
  <>
    <Header>
      <h2>{path}</h2>
      <span>
        <strong>Type</strong>: <Link to={`/${thing.type}`}>{thing.type}</Link>
      </span>
    </Header>
    <Widget src="efiz.near/widget/Every.Raw.View" props={{ value: thing }} />
  </>
);
