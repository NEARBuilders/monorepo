const accountId = props.accountId;

if (!accountId) {
  return "";
}

let connections = Social.keys(`${accountId}/graph/connect/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

if (connections === null) {
  return "";
}

connections = Object.entries(connections[accountId].graph.connect || {});
connections.sort((a, b) => b[1] - a[1]);

const Wrapper = styled.div`
  display: grid;
  gap: 24px;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const Text = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
`;

if (connections !== null && connections.length === 0) {
  return "";
}

return (
  <Wrapper>
    {connections.map(([accountId], i) => (
      <Item key={i}>
        <Widget src="near/widget/AccountProfile" props={{ accountId }} />
        <Widget src="hack.near/widget/connect.button" props={{ accountId }} />
      </Item>
    ))}
  </Wrapper>
);
