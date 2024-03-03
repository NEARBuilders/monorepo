const inspectWidget = props.inspectWidget;
const focusedMarker = props.focusedMarker;

const ModalOverlay = styled.div`
  position: absolute;
  left: 50px;
  top: 80px;
  display: flex;
  flex-direction: column;
  // z-index: 100;
  width: 400px;
  @media (max-width: 510px) {
    left: 10px;
    top: 54px;
    width: 96%;
  }
`;

const ModalContent = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Children = props.children;

return (
  <ModalOverlay>
    <ModalContent>
      {Children ? (
        <Children {...(focusedMarker || {})} />
      ) : (
        <p>{JSON.stringify(focusedMarker)}</p>
      )}
    </ModalContent>
  </ModalOverlay>
);
