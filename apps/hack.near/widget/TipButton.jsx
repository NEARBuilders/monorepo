const accountId = props.accountId ?? "infinity.near";

let tipNEAR = (accId) => {
  let amount = "500000000000000000000000"; // 0.5N
  Near.call(
    "passthrough.near",
    "transfer",
    { receiver_id: accId },
    gas,
    amount
  );
};

return (
  <div
    class="d-inline-flex align-items-center"
    onClick={() => tipNEAR(accountId)}
  >
    <button class="btn btn-outline-success me-1">Tip 0.5 NEAR</button>
  </div>
);
