let KeysManager = {
  generate: () => {
    return nacl.box.keyPair();
  },
  encrypt: (message, recipientPublicKey, issuerSecretKey) => {
    let bytesMessage = ethers.utils.toUtf8Bytes(message);
    let nonce = nacl.randomBytes(nacl.box.nonceLength);

    return {
      nonce,
      signature: nacl.box(
        bytesMessage,
        nonce,
        recipientPublicKey,
        issuerSecretKey
      ),
    };
  },
  decrypt: (cyphertext, nonce, issuerPublicKey, recipientSecretKey) => {
    let messageBytes = nacl.box.open(
      cyphertext,
      nonce,
      issuerPublicKey,
      recipientSecretKey
    );

    return ethers.utils.toUtf8String(messageBytes);
  },
};

return KeysManager;
