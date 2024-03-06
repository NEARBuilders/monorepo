const accountId = props.accountId || context.accountId;
const thumbnails = props.thumbnails;

if (!accountId) {
  return <></>;
}

const f = fetch(
  `https://api.kitwallet.app/account/${accountId}/likelyNFTsFromBlock`
);

if (!f.ok) {
  return "Loading";
}

const allNfts = f.body.list;

const Wrapper = styled.div`
  --template-column-gutters: 16px;
  --template-columns: 1;
  --template-column-compact-multiplier: 1;
  --template-reduced-columns: 0;
  --template-reduced-columns-multiplier: 1;

  @media(min-width: 540px) {
    --template-columns: 2;
  }

  @media(min-width: 992px) {
    --template-columns: 3;
  }

  @media(min-width: 1140px) {
    --template-columns: 4;
  }


  margin: var(--template-column-gutters) -12px 16px;

  display: grid;
  gap: var(--template-column-gutters);
  grid-auto-rows: minmax(0px, 1fr);
  grid-template-columns: repeat( calc( var(--template-columns) - ( var(--template-reduced-columns) * var(--template-reduced-columns-multiplier) ) ), minmax(0,1fr) );

.nft-card {
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: box-shadow 0.25s ease-in-out 0s;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 24px;
    transition: all 0.1s ease 0s;
    .nft-image {
      transform: scale(1.12);
      transition-duration: 0.4s;
    }
  }

  .nft-image-wrapper {
    width: 100%;
    padding-bottom: 100%;
    position:relative;
    background-color: #fff;
    overflow: hidden;
  }

  .nft-image {
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .nft-text {
    width: 100%;
    height: 100%;
    padding: 8px;
    max-height: 7em;
    overflow: hidden;
  }

  .nft-title {
    font-size: 14px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .nft-description {
    font-size: 14px;
    height: 4.5em;
    white-space: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .nft-title {
    color: #333;
  }

  .nft-description {
    color: #777;
  }
}
`;

return (
  <Wrapper>
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
