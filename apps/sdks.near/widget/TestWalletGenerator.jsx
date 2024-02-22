const $ = VM.require("sdks.near/widget/Loader");
const { WalletGenerator } = $("@sdks/eth-utils");

State.init({
  wallet: null,
  createWallet: false,
});

return (
  <>
    <button onClick={() => State.update({ createWallet: true })}>
      Create wallet
    </button>

    {state.wallet && (
      <>
        <br />
        <br />
        PubKey: {state.wallet.pubKey}
        <br />
        PriKey: {state.wallet.priKey}
      </>
    )}

    {state.createWallet && (
      <WalletGenerator onCreate={(data) => State.update({ wallet: data })} />
    )}
  </>
);
