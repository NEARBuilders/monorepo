const { tokenId, balance, usdBalance } = props;
if (!tokenId) {
  throw "Missing tokenId";
}

const bigBalance =
  balance === null || balance === undefined ? null : Big(balance);

const metadata = Near.view(tokenId, "ft_metadata");

const { bigToString, MutedDecimals } = VM.require(
  "mob.near/widget/Token.utils"
);

const adjustedBalance =
  !bigBalance || !metadata?.decimals
    ? bigBalance
    : bigBalance.div(Big(10).pow(metadata.decimals));

const name = metadata?.name || "";
const icon = metadata?.icon;
const symbol = metadata?.symbol || tokenId;

const Wrapper = styled.div`
.token-badge {
  vertical-align: middle;
  width: 12rem;
  margin-right: 1rem;

  .token-name {
    color: #666;
  }

  img {
    width: 32px;
    height: 32px;
    border-radius: 16px;
    vertical-align: middle;
    margin-right: 0.5em;
  }
}
`;

return (
  <Wrapper>
    <div className="d-inline-block token-badge">
      <div className="token-name text-truncate" title={name}>
        {name}
      </div>
      <div
        title={tokenId}
        className="text-nowrap overflow-hidden d-flex align-items-center"
      >
        {icon && <img src={icon} alt="Token Icon" />}
        <span className="font-monospace align-middle text-truncate">
          {symbol}
        </span>
      </div>
    </div>
    <span className="font-monospace fw-bold">
      <MutedDecimals
        value={bigToString(adjustedBalance ? adjustedBalance.toString() : null)}
      />
    </span>
    {Big(usdBalance || "0").gt(0) && (
      <span className="font-monospace fw-bold d-inline-flex ms-3">
        <span className="text-secondary">~$</span>
        <MutedDecimals value={bigToString(usdBalance)} />
      </span>
    )}
  </Wrapper>
);
