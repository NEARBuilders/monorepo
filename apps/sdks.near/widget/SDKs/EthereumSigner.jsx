const EthereumSigner = {
  sign: (message) => Ethers.provider().getSigner().signMessage(message),
  verify: (originalMessage, signature, expectedSignerAddress) => {
    return new Promise((resolve, reject) => {
      try {
        const address = EthereumSigner.getSignerAddress(
          originalMessage,
          signature
        );
        return resolve(
          expectedSignerAddress.toLowerCase() == address.toLowerCase()
        );
      } catch {
        console.error(
          "The signature is invalid or the expectedSignerAddress is null"
        );
        return reject();
      }
    });
  },
  recoverPublicKey: (originalMessage, signature) => {
    return (
      ethers.utils.recoverPublicKey(
        ethers.utils.hashMessage(originalMessage),
        signature
      ) || ""
    ).substring(4);
  },
  getSignerAddress: (message, signature) => {
    return ethers.utils.verifyMessage(message, signature);
  },
};

return EthereumSigner;
