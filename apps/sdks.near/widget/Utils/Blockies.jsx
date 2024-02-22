const $ = VM.require("sdks.near/widget/Loader");
const { ExternalDependencyAdapter } = $("@sdks/abstracts");

return (Store, status) => {
  const Blockies = {
    ...ExternalDependencyAdapter(Store, status, "ethereum-blockies-base64"),
    package: "ethereum-blockies-base64@1.0.2/dist/main.js",
    create: (address) => {
      return Blockies.request(Blockies.createRequest("create", [address], "string"));
    },
  };

  return Blockies;
};
