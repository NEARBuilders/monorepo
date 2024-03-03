const src = props.src || "hack.near/widget/GitBos";

State.init({
  src,
});

const onChangeSrc = (src) => {
  State.update({
    src,
  });
};

const data = Social.keys(`${state.src}`, "final", {
  return_type: "History",
});

const [accountId, type, name] = state.src.split("/");

const array = data[accountId][type][name];

const lastItem = array[array.length - 1];

return (
  <>
    <input
      type="text"
      value={state.src}
      onChange={(e) => onChangeSrc(e.target.value)}
    ></input>
    <br />
    <p>{JSON.stringify(lastItem)}</p>
  </>
);
