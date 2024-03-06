const { Modal } = VM.require("buildhub.near/widget/components") || {
  Modal: () => <></>,
};

const showModal = props.showModal;
const toggleModal = props.toggleModal;
const toggle = props.toggle;
const bootstrapTheme = props.bootstrapTheme || "dark";
const filters = props.filters;
const setFilters = props.setFilters;
const tagFilters = props.tagFilters;

return (
  <Modal
    open={showModal}
    title={"Project Filters"}
    onOpenChange={toggleModal}
    toggle={toggle}
  >
    <Widget
      src="buildhub.near/widget/components.modals.projects.Filters"
      loading=""
      props={{
        bootstrapTheme,
        toggleModal,
        filters,
        setFilters,
        tagFilters,
      }}
    />
  </Modal>
);
