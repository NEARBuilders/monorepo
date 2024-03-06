const accountId = props.accountId;
if (!accountId) {
  return "";
}
const [tokens, setTokens] = useState(false);
const [loading, setLoading] = useState(true);

const { bigToString, MutedDecimals } = VM.require(
  "mob.near/widget/Token.utils"
);

const priceData = Near.view("priceoracle.near", "get_price_data");

useEffect(() => {
  setTokens(false);
  setLoading(true);
  asyncFetch(
    `https://api.fastnear.com/v0/account/${accountId}/ft_with_balances`
  )
    .then((res) => {
      if (!res.ok) {
        console.error("Failed to fetch ft_with_balances", res);
        return;
      }
      setTokens(res.body.tokens);
    })
    .finally(() => setLoading(false));
}, [accountId]);

const sortedTokens = useMemo(() => {
  if (!tokens) {
    return tokens;
  }
  const prices = Object.fromEntries(
    (priceData?.prices || []).map(({ asset_id, price }) => [asset_id, price])
  );
  const computeUsdBalance = (tokenId, balance) => {
    if (balance === null) {
      return "0";
    }
    const price = prices[tokenId] || {
      multiplier: "0",
      decimals: 1,
    };
    return Big(price.multiplier)
      .mul(Big(balance))
      .div(Big(10).pow(price.decimals))
      .toFixed(6);
  };
  const st = Object.entries(tokens).map(([tokenId, balance]) => ({
    tokenId,
    balance,
    usdBalance: computeUsdBalance(tokenId, balance),
  }));
  st.sort((a, b) => parseFloat(b.usdBalance) - parseFloat(a.usdBalance));
  return st;
}, [tokens, priceData]);

const Wrapper = styled.div`
.header {
  margin-bottom: 1em;
}
.token {
  margin-bottom: 1em;
  overflow: hidden;
}
`;

const renderToken = ({ tokenId, balance, usdBalance }) => {
  return (
    <Widget
      loading=""
      src="mob.near/widget/Tokens.TokenWithBalance"
      props={{ tokenId, balance, usdBalance }}
    />
  );
};

const usdSum = sortedTokens
  ? sortedTokens
      .map(({ usdBalance }) => parseFloat(usdBalance || "0"))
      .reduce((s, v) => s + v, 0)
  : 0;

return (
  <Wrapper>
    <div className="header">
      Fungible Tokens of
      <Widget src="mob.near/widget/N.ProfileLine" props={{ accountId }} />
      {usdSum > 0 && (
        <div>
          Total USD sum:
          <span className="font-monospace fw-bold d-inline-flex">
            <span className="text-secondary">~$</span>
            <MutedDecimals value={bigToString(usdSum)} />
          </span>
        </div>
      )}
    </div>
    <div className="actions">
      {sortedTokens
        ? sortedTokens
            .filter((t) => t.balance !== null)
            .map((t) => (
              <div key={t.tokenId} className="token">
                {renderToken(t)}
              </div>
            ))
        : "Loading"}
    </div>
  </Wrapper>
);
