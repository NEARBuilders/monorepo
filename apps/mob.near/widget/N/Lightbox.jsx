const show = props.show;
const hide = props.onHide ?? (() => {});

const closeSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{
      width: "4em",
      stroke: "rgba(255, 255, 255, 0.5)",
      strokeWidth: "0.5px",
    }}
    fill="black"
    viewBox="0 0 16 16"
  >
    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
  </svg>
);

return show ? (
  <>
    <div key="backdrop" className="fade modal-backdrop show" />
    <div
      role="dialog"
      aria-modal="true"
      className="fade modal show lightbox"
      style={{ display: "block" }}
      onClick={(e) => {
        e?.preventDefault && e.preventDefault();
        hide();
      }}
    >
      <div className="position-absolute top-0 end-0">
        <button
          className="btn border-0"
          title="Close"
          onClick={(e) => {
            e?.preventDefault && e.preventDefault();
            hide();
          }}
        >
          {closeSvg}
        </button>
      </div>
      {props.children}
    </div>
  </>
) : (
  ""
);
