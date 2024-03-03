initState({ amount: 1, reciever: "efiz.near" });

const donate = () => {
  Near.call(
    state.reciever,
    "donate",
    {},
    "30000000000000",
    state.amount * 1e24
  );
};
const onChangeAmount = (amount) => {
  State.update({
    amount,
  });
};

return (
  <div>
    <h1>💸 Donation Amount</h1>
    <input
      type="number"
      placeholder={state.amount}
      onChange={(e) => onChangeAmount(e.target.value)}
    />
    <button
      disabled={context.loading}
      onClick={donate}
      className={`btn ${context.loading ? "btn-outline-dark" : "btn-primary"}`}
    >
      Donate {state.amount} NEAR to {state.reciever}
    </button>
  </div>
);
