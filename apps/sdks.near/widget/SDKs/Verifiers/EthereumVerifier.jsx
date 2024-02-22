const $ = VM.require("sdks.near/widget/Loader");
const { EthereumSigner } = $("@sdks/eth-signer");

const EthereumVerifier = {
  createProof: (nearAccount, address) => {
    return EthereumVerifier.sign(nearAccount, address).then((signature) => {
      return {
        address,
        signature,
      };
    });
  },
  sign: (nearAccount, address) => {
    return EthereumSigner.sign(
      EthereumVerifier.getChallenge(nearAccount, address)
    );
  },
  verify: (nearAccount, address, signature) => {
    const message = EthereumVerifier.getChallenge(nearAccount, address);

    return EthereumSigner.verify(message, signature, address);
  },
  getChallenge: (nearAccount, address) => {
    return `${nearAccount.toLowerCase()} owns the Ethereum address ${address.toLowerCase()}`;
  },
};

return EthereumVerifier;
