const accountId = props.accountId ?? "blaze.near";

const sbtData = Near.view("registry.i-am-human.near", "sbt_supply_by_owner", {
  account: accountId,
  issuer: "gooddollar-v1.i-am-human.near",
});

if (sbtData > 0) {
  return "✅";
}
