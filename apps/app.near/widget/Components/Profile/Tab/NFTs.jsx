const accountId = props.accountId || context.accountId;
const thumbnails = props.thumbnails;

if (!accountId) {
  return <></>;
}

const f = fetch(`https://api.fastnear.com/v0/account/${accountId}/nft`);

if (!f.ok) {
  return "Loading";
}

const allNfts = f.body.contract_ids;

const Wrapper = styled.div`
  --template-column-gutters: 16px;
  --template-columns: 1;
  --template-column-compact-multiplier: 1;
  --template-reduced-columns: 0;
  --template-reduced-columns-multiplier: 1;

  @media (min-width: 540px) {
    --template-columns: 2;
  }

  @media (min-width: 992px) {
    --template-columns: 3;
  }

  @media (min-width: 1140px) {
    --template-columns: 4;
  }

  margin: var(--template-column-gutters) -12px 16px;

  display: grid;
  gap: var(--template-column-gutters);
  grid-auto-rows: minmax(0px, 1fr);
  grid-template-columns: repeat(
    calc(
      var(--template-columns) -
        (
          var(--template-reduced-columns) *
            var(--template-reduced-columns-multiplier)
        )
    ),
    minmax(0, 1fr)
  );

  .nft-card {
    width: 100%;
    height: 100%;
    background-color: var(--bg1);
    border: 1px solid var(--stroke);
    border-radius: 1rem;
    box-shadow: 0px 4px 8px -2px var(--shadow);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: all 0.3s ease 0s;

    .nft-image-wrapper {
      width: 100%;
      padding-bottom: 100%;
      position: relative;
      background-color: #fff;
      overflow: hidden;
    }

    .nft-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .nft-text {
      width: 100%;
      height: 100%;
      padding: 8px;
      color: var(--color);
      max-height: 7em;
      overflow: hidden;
      font-family: "InterVariable", sans-serif;
    }

    .nft-title {
      font-size: 16px;
      color: var(--color);
      margin-bottom: 4px;
      font-family: var(--accent-font-family), InterVariable, sans-serif;
      font-weight: bold;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .nft-description {
      font-size: 16px;
      font-family: "InterVariable", sans-serif;
      height: 4.5em;
      color: var(--color-muted);
      white-space: break-word;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

return (
  <Wrapper className="container-xl">
    {allNfts.map((contractId, i) => (
      <Widget
        loading=""
        key={contractId}
        src="mob.near/widget/N.NftCollection"
        props={{ accountId, contractId }}
      />
    ))}
  </Wrapper>
);
