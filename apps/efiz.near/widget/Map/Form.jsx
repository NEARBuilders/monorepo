const data = props.data;
const form = props.form;

const ModalOverlay = styled.div`
  position: absolute;
  right: 50px;
  top: 80px;
  display: flex;
  flex-direction: column;
  // z-index: 100;
  width: 400px;
  @media (max-width: 510px) {
    right: 10px;
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
      {Children ? <Children data={data} /> : <p>{JSON.stringify(data)}</p>}
    </ModalContent>
  </ModalOverlay>
);
