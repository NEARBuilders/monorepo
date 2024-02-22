let availableComponents = Object.keys(Social.getr(`sdks.near/widget`));

const resolve = (componentPath) =>
  availableComponents.filter((path) => path.indexOf(componentPath) != -1) || [];

return {
  libs: {
    "eth-signer": "SDKs.EthereumSigner",
    lens: {
      definitions: ["SDKs.Lens.Constants", "SDKs.Lens.Interfaces"],
      api: resolve("SDKs.Lens.API"),
      requests: resolve("SDKs.Lens.Requests"),
      utils: resolve("SDKs.Lens.Helpers"),
      queries: resolve("SDKs.Lens.Queries"),
      mutations: resolve("SDKs.Lens.Mutations"),
      types: resolve("SDKs.Lens.Types"),
      filters: resolve("SDKs.Lens.Filters"),
    },
    "lens-sdk": "SDKs.Lens.LensSDK",
    "light-client": "SDKs.LightClient",
    verifiers: resolve("SDKs.Verifiers"),
    "eth-utils": [...resolve("Utils.Ethereum"), "SDKs.EthereumSigner"],
    "near-utils": resolve("Utils.Near"),
    "near-fs": "Utils.NearFS",
    "ens-resolver": "Utils.Ethereum.ENSResolver",
    "crypto-js": ["Abstracts.ExternalDependency", "Utils.CryptoJS"],
    utils: ["Abstracts.ExternalDependency", ...resolve("Utils.")],
    abstracts: resolve("Abstracts."),
    blockies: ["Abstracts.ExternalDependency", "Utils.Blockies"],
    "routes-manager": "Utils.RoutesManager",
    sputnik: ["SDKs.Sputnik.DaoSDK"],
    multisig: ["SDKs.Near.MultiSigSDK"],
    hooks: resolve("Hooks."),
  },
  links: {
    telegram: "@OxMattB",
    twitter: "@0xMattB",
    near: "@mattb.near",
  },
};
