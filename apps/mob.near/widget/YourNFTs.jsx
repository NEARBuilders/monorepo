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

return (
  <div className="d-flex gap-1 flex-wrap">
    {allNfts.map((contractId, i) => (
      <Widget
        key={i}
        src={
          thumbnails
            ? "mob.near/widget/NftCollectionThumbs"
            : "mob.near/widget/NftCollection"
        }
        props={{ accountId, contractId }}
      />
    ))}
  </div>
);
