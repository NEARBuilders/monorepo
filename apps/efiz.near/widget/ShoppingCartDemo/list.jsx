const elements = ["alice.near", "bob.near"];

State.init({
  selectedElements: [],
});

const handleSelect = (id) => {
  // check if already selected
  if (state.selectedElements.includes(id)) {
    // if already selected, remove check
    const updatedElements = state.selectedElements.filter(
      (elementId) => elementId !== id
    );
    // update in local storage so it can be picked up by the cart
    Storage.set("demo-cart-items", JSON.stringify(updatedElements));
    // update in state, so there is a smooth experience
    State.update({
      selectedElements: updatedElements,
    });
  } else {
    // not selected, so add to array
    const updatedElements = [...state.selectedElements, id];
    // update in local storage so it can be picked up by the cart
    Storage.set("demo-cart-items", JSON.stringify(updatedElements));
    // update in state, so there is a smooth experience
    State.update({
      selectedElements: updatedElements,
    });
  }
};

return (
  <div className="border">
    {elements?.map((it) => (
      <div key={it} className="d-flex align-items-center mb-3">
        <p className="mb-0">{it}</p>
        <input
          type="checkbox"
          checked={state.selectedElements.includes(it)}
          onChange={() => handleSelect(it)}
          className="form-check-input ms-3"
        />
      </div>
    ))}
  </div>
);
