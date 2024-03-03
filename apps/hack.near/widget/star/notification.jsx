const accountId = props.accountId ?? context.accountId;

if (!accountId) {
  return "Sign in with NEAR Wallet";
}

const index = {
  action: "notify",
  key: accountId,
  options: {
    limit: 10,
    order: "desc",
    subscribe: true,
  },
};

const Wrapper = styled.div`
  padding: 16px;
`;

const ItemWrapper = styled.div`
  margin-bottom: 12px;
`;

const renderItem = (item, i) => {
  if (i === 0) {
    Storage.set("lastBlockHeight", item.blockHeight);
  }
  return (
    <ItemWrapper>
      <Widget
        src="hack.near/widget/star.notification.item"
        key={i}
        props={item}
      />
    </ItemWrapper>
  );
};

return (
  <Wrapper>
    <Widget
      src="mob.near/widget/FilteredIndexFeed"
      props={{ index, renderItem }}
    />
  </Wrapper>
);
