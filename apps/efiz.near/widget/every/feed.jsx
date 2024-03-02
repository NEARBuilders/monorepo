let accounts = undefined;

State.init({
  view: "ALL",
});

if (state.view === "FOLLOWING") {
  const graph = Social.keys(`${context.accountId}/graph/follow/*`, "final");
  if (graph !== null) {
    accounts = Object.keys(graph[context.accountId].graph.follow || {});
    accounts.push(context.accountId);
  } else {
    accounts = [];
  }
}

const Row = styled.div`
    display: flex;
    flex-direction: row;
    gap: 4px;
`;

const Button = styled.button``;

function Feed({ view }) {
  switch (view) {
    case "ALL": {
      return <Widget src="every.near/widget/every.post" />;
    }
    case "FOLLOWING": {
      // Notice how every.post loads quickly and on-demand, but every.feed.view frontloads
      // TODO: merge
      return (
        <Widget
          src="efiz.near/widget/every.feed.view"
          props={{
            data: {
              sources: [{ domain: "post", key: "main" }],
              accountWhitelist: accounts,
              typeWhitelist: ["md"],
            },
          }}
        />
      );
    }
    case "HASHTAG": {
      return <Widget src="efiz.near/widget/every.hashtag" />;
    }
  }
}

return (
  <>
    <Row>
      <Button onClick={() => State.update({ view: "ALL" })}>All</Button>
      <Button onClick={() => State.update({ view: "FOLLOWING" })}>
        Following
      </Button>
      <Button onClick={() => State.update({ view: "HASHTAG" })}>Hashtag</Button>
    </Row>
    <Feed view={state.view} />
  </>
);
