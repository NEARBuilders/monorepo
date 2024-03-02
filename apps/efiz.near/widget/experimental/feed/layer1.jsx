const limit = 20;

// This is the layer that makes the requests
// Updates the state
// Data/State layer

State.init({
  offset: 0,
  tokens: [],
  hasMore: true,
});

function fetchTokens() {
  asyncFetch("https://graph.mintbase.xyz/mainnet", {
    method: "POST",
    headers: {
      "mb-api-key": "omni-site",
      "Content-Type": "application/json",
      "x-hasura-role": "anonymous",
    },
    body: JSON.stringify({
      query: `
          query MyQuery {
            mb_views_nft_tokens(
                limit: ${limit},
                offset: ${state.offset}
              where: { nft_contract_id: { _eq: "mint.sharddog.near" }}
              order_by: {minted_timestamp: desc}
            ) {
              media
              owner
            }
          }
        `,
    }),
  }).then((res) => {
    if (res.ok) {
      const tokens = res.body.data.mb_views_nft_tokens;
      if (tokens.length > 0) {
        State.update({
          tokens: [...state.tokens, ...tokens],
          offset: state.offset + limit,
          hasMore: true,
        });
      } else {
        State.update({
          hasMore: false,
        });
      }
    }
  });
}

const loader = (
  <div className="loader" key={"loader"}>
    <span
      className="spinner-grow spinner-grow-sm me-1"
      role="status"
      aria-hidden="true"
    />
    Loading ...
  </div>
);

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(143px, 0.1fr));

  @media (hover: none) {
    grid-template-columns: repeat(auto-fill, minmax(143px, 0.1fr));
  }
`;

const size = "144px";

const tokensClone = JSON.parse(JSON.stringify(state.tokens));

return (
  <InfiniteScroll
    pageStart={0}
    loadMore={fetchTokens}
    hasMore={state.hasMore}
    loader={loader}
  >
    <Widget
      src="efiz.near/widget/experimental.feed.layer2"
      props={{ data: state.tokens }}
    />
  </InfiniteScroll>
);
