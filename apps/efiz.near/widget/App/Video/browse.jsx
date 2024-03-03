const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media (hover: none) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

return (
  <>
    <Widget
      src="devs.near/widget/Feed@100100160"
      props={{
        index: {
          action: "every",
          key: "video",
          options: {
            limit: 10,
            order: "desc",
          },
        },
        Item: (p) => (
          <Widget
            src="efiz.near/widget/App.Video.card"
            props={{ ...p, ...props }}
          />
        ),
        Layout: Grid,
        buildPath: (item) => `${item.accountId}/thing/${item.value.id}`,
      }}
    />
  </>
);
