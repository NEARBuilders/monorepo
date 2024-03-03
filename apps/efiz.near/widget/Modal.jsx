const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 4px;
`;

const ModalTitle = styled.h3`
  margin-bottom: 10px;
`;

const Button = styled.button`
`;

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <Button onClick={onClose}>X</Button>
        <ModalTitle>Save Confirmation</ModalTitle>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

return { Modal };
