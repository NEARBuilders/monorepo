const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
`;

const ModalBox = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 1002;
`;

const CloseButton = styled.button`
  background: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  float: right;
`;

function Modal({ onClose, children }) {
  return (
    <ModalBackdrop>
      <ModalBox>
        <CloseButton onClick={onClose}>Close</CloseButton>
        {children}
      </ModalBox>
    </ModalBackdrop>
  );
}

const {
  getSelectedShapes,
  getSnapshot,
  deleteShapes,
  getShapePageBounds,
  createShapeId,
  createShape,
  updateShape,
  asSvg,
  asPng,
  asDataUrl,
  snapshot,
} = props;

const [isModalOpen, setModalOpen] = useState(false);

const save = () => {
  Social.set({
    thing: {
      canvas: JSON.stringify(getSnapshot()),
    },
  });
};

const Button = styled.button`
  padding: 10px 20px;
`;

const toggleModal = () => {
  setModalOpen(!isModalOpen);
};

return (
  <>
    <Button className="classic" onClick={toggleModal}>
      <i class="bi bi-save"></i> save canvas
    </Button>
    {isModalOpen && (
      <Modal onClose={toggleModal}>
        <Widget
          key="everycanvas.near/widget/magic"
          src="everycanvas.near/widget/magic"
          props={{
            selectedShapes,
            selectedShapeIds,
            deleteShapes,
            getShapePageBounds,
            createShapeId,
            createShape,
            updateShape,
            asSvg,
            asPng,
            asDataUrl,
            snapshot: JSON.stringify(snapshot),
          }}
          config={{
            redirectMap: redirectMapStore.redirectMap,
          }}
        />
      </Modal>
    )}
  </>
);
