const $ = VM.require("sdks.near/widget/Loader");
const { ExternalDependencyAdapter } = $("@sdks/abstracts");

return (Store, status) => {
  const CryptoJS = {
    ...ExternalDependencyAdapter(Store, status, "CryptoJS"),
    package: "crypto-js@4.2.0/crypto-js.js",
    aes: {
      encrypt: (message, key, config) => {
        return CryptoJS.request(
          CryptoJS.createRequest("AES.encrypt", [message, key, config])
        );
      },
      decrypt: (ciphertext, key, config) => {
        return CryptoJS.request(
          CryptoJS.createRequest("AES.decrypt", [ciphertext, key, config])
        );
      },
    },
    blowfish: {
      encrypt: (message, key, config) => {
        return CryptoJS.request(
          CryptoJS.createRequest("Blowfish.encrypt", [message, key, config])
        );
      },
      decrypt: (ciphertext, key, config) => {
        return CryptoJS.request(
          CryptoJS.createRequest("Blowfish.decrypt", [ciphertext, key, config])
        );
      },
    },
    des: {
      encrypt: (message, key, config) => {
        return CryptoJS.request(
          CryptoJS.createRequest("DES.encrypt", [message, key, config])
        );
      },
      decrypt: (ciphertext, key, config) => {
        return CryptoJS.request(
          CryptoJS.createRequest("DES.decrypt", [ciphertext, key, config])
        );
      },
    },
    evpkdf: (password, salt, config) => {
      return CryptoJS.request(
        CryptoJS.createRequest("EvpKDF", [password, salt, config])
      );
    },
    hmacmd5: (message, key) => {
      return CryptoJS.request(
        CryptoJS.createRequest("HmacMD5", [message, key])
      );
    },
    hmacripemd160: (message, key) => {
      return CryptoJS.request(
        CryptoJS.createRequest("HmacRIPEMD160", [message, key])
      );
    },
    hmacsha1: (message, key) => {
      return CryptoJS.request(
        CryptoJS.createRequest("HmacSHA1", [message, key])
      );
    },
    hmacsha224: (message, key) => {
      return CryptoJS.request(
        CryptoJS.createRequest("HmacSHA224", [message, key])
      );
    },
    hmacsha256: (message, key) => {
      return CryptoJS.request(
        CryptoJS.createRequest("HmacSHA256", [message, key])
      );
    },
    hmacsha3: (message, key) => {
      return CryptoJS.request(
        CryptoJS.createRequest("HmacSHA3", [message, key])
      );
    },
    hmacsha384: (message, key) => {
      return CryptoJS.request(
        CryptoJS.createRequest("HmacSHA384", [message, key])
      );
    },
    hmacsha512: (message, key) => {
      return CryptoJS.request(
        CryptoJS.createRequest("HmacSHA512", [message, key])
      );
    },
    md5: (message, config) => {
      return CryptoJS.request(CryptoJS.createRequest("MD5", [message, config]));
    },
    pbkdf2: (password, salt, config) => {
      return CryptoJS.request(
        CryptoJS.createRequest("PBKDF2", [password, salt, config])
      );
    },
    rc4: {
      encrypt: (message, key, config) => {
        return CryptoJS.request(
          CryptoJS.createRequest("RC4.encrypt", [message, key, config])
        );
      },
      decrypt: (ciphertext, key, config) => {
        return CryptoJS.request(
          CryptoJS.createRequest("RC4.decrypt", [ciphertext, key, config])
        );
      },
    },
    rc4drop: {
      encrypt: (message, key, config) => {
        return CryptoJS.request(
          CryptoJS.createRequest("RC4Drop.encrypt", [message, key, config])
        );
      },
      decrypt: (ciphertext, key, config) => {
        return CryptoJS.request(
          CryptoJS.createRequest("RC4Drop.decrypt", [ciphertext, key, config])
        );
      },
    },
    ripemd160: (message, config) => {
      return CryptoJS.request(
        CryptoJS.createRequest("RIPEMD160", [message, config])
      );
    },
    rabbit: {
      encrypt: (message, key, config) => {
        return CryptoJS.request(
          CryptoJS.createRequest("Rabbit.encrypt", [message, key, config])
        );
      },
      decrypt: (ciphertext, key, config) => {
        return CryptoJS.request(
          CryptoJS.createRequest("Rabbit.decrypt", [ciphertext, key, config])
        );
      },
    },
    rabbitlegacy: {
      encrypt: (message, key, config) => {
        return CryptoJS.request(
          CryptoJS.createRequest("RabbitLegacy.encrypt", [message, key, config])
        );
      },
      decrypt: (ciphertext, key, config) => {
        return CryptoJS.request(
          CryptoJS.createRequest("RabbitLegacy.decrypt", [
            ciphertext,
            key,
            config,
          ])
        );
      },
    },
    sha1: (message, config) => {
      return CryptoJS.request(
        CryptoJS.createRequest("SHA1", [message, config])
      );
    },
    sha224: (message, config) => {
      return CryptoJS.request(
        CryptoJS.createRequest("SHA224", [message, config])
      );
    },
    sha256: (message, config) => {
      return CryptoJS.request(
        CryptoJS.createRequest("SHA256", [message, config])
      );
    },
    sha3: (message, config) => {
      return CryptoJS.request(
        CryptoJS.createRequest("SHA3", [message, config])
      );
    },
    sha384: (message, config) => {
      return CryptoJS.request(
        CryptoJS.createRequest("SHA384", [message, config])
      );
    },
    sha512: (message, config) => {
      return CryptoJS.request(
        CryptoJS.createRequest("SHA512", [message, config])
      );
    },
    tripledes: {
      encrypt: (message, key, config) => {
        return CryptoJS.request(
          CryptoJS.createRequest("TripleDES.encrypt", [message, key, config])
        );
      },
      decrypt: (ciphertext, key, config) => {
        return CryptoJS.request(
          CryptoJS.createRequest("TripleDES.decrypt", [ciphertext, key, config])
        );
      },
    },
  };

  return CryptoJS;
};
