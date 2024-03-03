const YoctoToNear = (amountYocto) =>
  new Big(amountYocto).div(new Big(10).pow(24)).toString();

const accountId = props.accountId || context.accountId;
const contractId = props.contractId || context.contractId || "toolipse.near";
const marketId = "simple.market.mintbase1.near";
const AFFILIATE_ACCOUNT = props.affiliateAccount || "toolipse.near";

const STORAGE_PRICE_PER_BYTE_EXPONENT = 19;
const STORAGE_BYTES = {
  COMMON: 80, // one royalty owner, one split owner, or one approval
  TOKEN_BASE: 440,
  MINTING_BASE: 92,
  MINTING_FEE: 100, // minting fee of 1 milliNEAR expressed as bytes
};

function calculateMintingDeposit({ nTokens, nRoyalties, nSplits, metadata }) {
  const nSplitsAdj = nSplits < 1 ? 0 : nSplits - 1;
  const bytesPerToken =
    STORAGE_BYTES.TOKEN_BASE +
    nSplitsAdj * STORAGE_BYTES.COMMON +
    STORAGE_BYTES.COMMON;
  const metadataBytesEstimate = JSON.stringify(metadata).length;

  const totalBytes =
    STORAGE_BYTES.MINTING_BASE +
    STORAGE_BYTES.MINTING_FEE +
    metadataBytesEstimate +
    bytesPerToken * nTokens +
    STORAGE_BYTES.COMMON * nRoyalties;

  return `${Math.ceil(totalBytes)}${"0".repeat(
    STORAGE_PRICE_PER_BYTE_EXPONENT
  )}`;
}

function handleMint() {
  const nTokens = 1;
  const nRoyalties = Object.keys({})?.length;
  const nSplits = 0;
  const metadata = {
    reference: "zEQztMC23HShpHFTXcfnQ3GCqgo3WkbvcOfm2AfYFQg",
    media: "rzjQuYYuWnr-lVL0oDE5hYjsFDz1rWxy6jD7VYp9LXU",
  };
  const gas = 300000000000000;
  const deposit = calculateMintingDeposit({
    nSplits,
    nTokens,
    nRoyalties,
    metadata,
  });

  Near.call(
    "efiz.mintbase1.near",
    "nft_batch_mint",
    {
      owner_id: "efiz.near",
      metadata,
      num_to_mint: nTokens,
      royalty_args: null,
      token_ids_to_mint: null,
      split_owners: null,
    },
    gas,
    deposit
  );
}

const Button = styled.button`
`;

return <Button onClick={handleMint}>mint</Button>;
