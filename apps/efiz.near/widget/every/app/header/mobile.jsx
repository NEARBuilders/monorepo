const onClickShowMenu = props.onClickShowMenu;

const StyledMobileMenuButton = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  color: white;
  font-weight: var(--font-weight-bold);
  padding: 0;

  .menu {
    width: 18px;
    height: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-right: 10px;

    div {
      background-color: white;
      height: 2px;
      width: 100%;
      border-radius: 30px;
    }
  }
`;

const Container = styled.div`
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

return (
  <Container>
    <StyledMobileMenuButton onClick={onClickShowMenu}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="black"
        width="64px"
        height="64px"
      >
        <circle cx="12" cy="12" r="8" />
      </svg>
    </StyledMobileMenuButton>
  </Container>
);
