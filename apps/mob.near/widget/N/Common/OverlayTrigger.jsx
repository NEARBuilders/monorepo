const showTimer = 250;
const hideTimer = 300;

const handleOnMouseEnter = () => {
  clearTimeout(state.debounce);
  State.update({
    debounce: setTimeout(() => State.update({ show: true }), showTimer),
  });
};
const handleOnMouseLeave = () => {
  clearTimeout(state.debounce);
  State.update({
    debounce: setTimeout(() => State.update({ show: false }), hideTimer),
  });
};

State.init({
  show: false,
});

const overlayClassName =
  props.overlayClassName ?? "border m-3 p-3 rounded-4 bg-white shadow";
const overlayStyle = props.overlayStyle ?? { maxWidth: "24em", zIndex: 1070 };

const overlay = (
  <div
    className={overlayClassName}
    style={overlayStyle}
    onMouseEnter={handleOnMouseEnter}
    onMouseLeave={handleOnMouseLeave}
  >
    {props.popup}
  </div>
);

return (
  <OverlayTrigger
    show={state.show}
    trigger={["hover", "focus"]}
    delay={{ show: showTimer, hide: hideTimer }}
    placement="auto"
    overlay={overlay}
  >
    <span
      className="d-inline-flex"
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      {props.children}
    </span>
  </OverlayTrigger>
);
