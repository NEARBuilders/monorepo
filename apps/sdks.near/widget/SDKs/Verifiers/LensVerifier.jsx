const $ = VM.require("sdks.near/widget/Loader");
const { EthereumSigner } = $("@sdks/eth-signer");
const LensSDK = VM.require(`mattb.near/widget/LensSDKRequire`);

const LensVerifier = {
  authenticate: (address) => {
    return LensSDK.authenticateLens(address, () =>
      Ethers.provider().getSigner()
    );
  },
  createProof: (address, nearAccount) => {
    return LensVerifier.authenticate(address).then((success) => {
      if (success) {
        return LensSDK.getProfileByEthereumAddress(address).then((payload) => {
          let [profile] = payload.body.data.profiles.items;
          let handle = profile.handle;

          if (!handle) {
            return new Promise((_, reject) =>
              reject("This address doesn't own a handle or the request failed")
            );
          }

          return LensVerifier.sign(handle, nearAccount, address).then(
            (signature) => {
              return {
                handle,
                signature,
              };
            }
          );
        });
      }

      return new Promise((_, reject) => reject("Lens authentication failed"));
    });
  },
  sign: (handle, nearAccount, address) => {
    return EthereumSigner.sign(
      LensVerifier.getChallenge(handle, nearAccount, address)
    );
  },
  verify: (handle, nearAccount, signature) => {
    return LensSDK.getProfileByHandle(handle).then((payload) => {
      let expectedAddress = payload.body.data.profile.ownedBy;

      const message = LensVerifier.getChallenge(
        handle,
        nearAccount,
        expectedAddress
      );

      return EthereumSigner.verify(message, signature, expectedAddress);
    });
  },
  getChallenge: (handle, nearAccount, address) => {
    return `${nearAccount.toLowerCase()} with address ${address.toLowerCase()} owns the ${handle.toLowerCase()} handle`;
  },
};

return LensVerifier;
