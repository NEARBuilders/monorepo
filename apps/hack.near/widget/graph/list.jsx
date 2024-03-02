const accountId = props.accountId;
const graphId = props.graphId ?? "follow";

if (!accountId) {
  return "";
}

let connections = Social.keys(`*/graph/${graphId}/${accountId}`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

if (connections === null) {
  return "Loading";
}

connections = Object.entries(connections || {});
connections.sort(
  (a, b) => b.graph.connect[accountId][1] - a.graph.connect[accountId][1]
);

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
  return <Text>This account doesn&apos;t have any connections yet.</Text>;
}

return (
  <Wrapper>
    {connections.map(([accountId], i) => (
      <Item key={i}>
        <Widget src="near/widget/AccountProfile" props={{ accountId }} />
        <Widget src="apps.near/widget/ConnectButton" props={{ accountId }} />
      </Item>
    ))}
  </Wrapper>
);
