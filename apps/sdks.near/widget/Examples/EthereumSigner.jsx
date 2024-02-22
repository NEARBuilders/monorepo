const owner = "sdks.near";
const EthereumSigner = VM.require(`${owner}/widget/SDKs.EthereumSigner.Main`);

State.init({
  accountId: "",
  proof: false,
  verified: false,
  broken: false,
  signature: "",
});

if (Ethers.send("eth_accounts", []).length > 0) {
  let [account] = Ethers.send("eth_accounts", []);

  State.update({
    accountId: account,
  });
}

let message = `Me, ${context.accountId} swear to be the owner of the ${state.accountId} address`;

const generateSignature = () => {
  EthereumSigner.sign(message).then((signature) => {
    State.update({
      signature,
      proof: true,
    });
  });
};

const verifySignature = () => {
  console.log(message, state.signature);
  EthereumSigner.verify(message, state.signature, state.accountId)
    .then((result) => {
      console.log(result);
      State.update({
        verified: result,
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

const toggleSignature = () => {
  if (state.broken) {
    State.update({ signature: state.signature.substring(0, state.signature.length - 1), broken: false });
  } else {
    State.update({ signature: state.signature + "a", broken: true });
  }
};

return (
  <>
    {state.accountId && (
      <>
        <br />
        Your address is:
        <br /> <strong>{state.accountId}</strong>
        <br />
        Your NEAR account is:
        <br /> <strong>{context.accountId}</strong>
        <br />
        Signature: <br /> <strong>{state.signature || "No signature"}</strong>
        <br />
        Proof that you are the owner: <br />
        <strong>
          {state.proof && state.verified ? "Proven" : "Not proven"}
        </strong>
        {!state.proof && (
          <>
            <br />
            <br />
            <br />
            Message to sign:
            <br /> <strong>{message}</strong>
            <br />
            <br />
            <button onClick={() => generateSignature()}>
              Generate signature
            </button>
          </>
        )}
        {state.proof && (
          <>
            <br />
            <br />
            <br />
            Verification result: You are{!state.verified ? " not " : " "}the
            owner
            <br />
            <br />
            <button onClick={() => verifySignature()}>Verify signature</button>
            <button onClick={() => toggleSignature()}>{state.broken ? "Heal" : "Break"} signature</button>
          </>
        )}
      </>
    )}

    {(!state.accountId || !context.accountId) && (
      <>
        <h1>
          Please, connect your Ethereum wallet on Polygon Mainnet
          {!context.accountId ? " and your NEAR account" : ""}
        </h1>
        <br />
        <Web3Connect />
      </>
    )}
  </>
);
