const StyledButton = styled.div`
  all: unset;
  display: flex;
  padding: 8px 20px;
  justify-content: center;
  align-items: center;
  gap: 8px;

  border-radius: 8px;
  border: 1px solid var(--stroke);
  background: var(--bg1);

  /* Pixel/Shadow/Light/Tag & Button */
  box-shadow: 0px 4px 8px -2px var(--shadow);

  color: var(--color);
  font-family: "Pixelify Sans", "InterVariable", sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 25.2px */

  transition: all 300ms;

  &:hover {
    background: var(--bg1-hover);
    cursor: pointer;
  }
`;

function Button({ children, className, style, onClick, variant }) {
  return (
    <StyledButton
      onClick={onClick}
      className={className}
      style={style}
      variant={variant ?? "outline"}
    >
      {children}
    </StyledButton>
  );
}

return { Button };
