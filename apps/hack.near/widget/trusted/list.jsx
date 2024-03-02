const accountId = props.accountId;

if (!accountId) {
  return "missing prop: *accountId*";
}

let trustedList = Social.keys(`*/graph/trust/${accountId}`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

if (trustedList === null) {
  return "Loading";
}

trustedList = Object.entries(trustedList || {});
trustedList.sort(
  (a, b) => b.graph.trust[accountId][1] - a.graph.trust[accountId][1]
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

if (trustedList !== null && trustedList.length === 0) {
  return (
    <>
      <p>{accountId} is not currently trusted by anyone...</p>
      <p>
        ↳
        <a href="#/hack.near/widget/trusted.community">
          join a trusted community
        </a>
      </p>
    </>
  );
}

return (
  <Wrapper>
    {trustedList.map(([accountId], i) => (
      <Item key={i}>
        <Widget src="near/widget/AccountProfile" props={{ accountId }} />
        <Widget src="hack.near/widget/trust.button" props={{ accountId }} />
      </Item>
    ))}
  </Wrapper>
);
