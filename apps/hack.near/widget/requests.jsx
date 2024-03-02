const accountId = props.accountId ?? "devs.near";

const index = {
  action: "graph",
  key: "request",
  options: {
    limit: 10,
    order: "desc",
  },
};

const ownerId = props.ownerId ?? "hack.near";
const type = props.type ?? "widget";
const name = props.name ?? "community";

if (!ownerId || !type || !name) {
  return "";
}

const src = `${ownerId}/${type}/${name}`;

const Wrapper = styled.div`
  padding: 16px;
`;

const ItemWrapper = styled.div`
  margin-bottom: 12px;
`;

const renderItem = (item, i) => {
  return (
    <ItemWrapper>
      <Widget src="hack.near/widget/update" key={i} props={item} />
    </ItemWrapper>
  );
};

const handleCreate = () =>
  Social.set({
    [`${type}`]: {
      [`${name}`]: {
        "": `${src}`,
      },
    },
  });

return (
  <Wrapper>
    <div className="m-2">
      <button onClick={handleCreate}>Accept</button>
    </div>
    <Widget
      src="mob.near/widget/FilteredIndexFeed"
      props={{ index, renderItem }}
    />
  </Wrapper>
);
