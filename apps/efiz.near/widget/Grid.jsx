const data = props.data;
const references = data.references;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media (hover: none) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Box = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  margin: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

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
const GridBox = ({ value }) => {
  // Parsing the stringified JSON inside the typeData object

  return (
    <Box
      onClick={() => State.update({ isModalOpen: true, modalData: typeData })}
    >
      <Widget src={data.template} props={{ data: value }} />
    </Box>
  );
};

return (
  <>
    <Grid>
      {references && references.map((ref) => <GridBox key={ref} value={ref} />)}
    </Grid>
    {state.isModalOpen && (
      <ModalOverlay>
        <ModalContent>
          <Button
            onClick={() =>
              State.update({ isModalOpen: false, modalData: null })
            }
          >
            X
          </Button>
          <ModalTitle>Save Confirmation</ModalTitle>
        </ModalContent>
      </ModalOverlay>
    )}
  </>
);
