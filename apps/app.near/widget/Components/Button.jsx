const StyledButton = styled.div`
  all: unset;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  border-radius: 10px;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 22.4px */
  transition: all 300ms;

  padding: ${(props) => {
    switch (props.variant) {
      case "transparent":
        return "8px 12px";
      default:
        return "8px 20px;";
    }
  }};

  border: ${(props) => {
    switch (props.variant) {
      case "outline":
        return "1px solid var(--button-outline-stroke)";
      case "primary":
        return "1px solid var(--button-primary-stroke, rgba(0, 26, 51, 0.16))";
      case "transparent":
        return;
    }
  }};
  background: ${(props) => {
    switch (props.variant) {
      case "outline":
        return "var(--button-outline-bg)";
      case "primary":
        return "var(--button-primary-bg, #000)";
      case "transparent":
        return "transparent";
    }
  }};
  color: ${(props) => {
    switch (props.variant) {
      case "outline":
        return "var(--button-outline-color)";
      case "primary":
        return "var(--button-primary-color, #fff)";
      case "transparent":
        return "var(--button-outline-color)";
    }
  }};

  &:hover {
    cursor: pointer;
    background: ${(props) => {
      switch (props.variant) {
        case "outline":
          return "var(--button-outline-hover-bg)";
        case "primary":
          return "var(--button-primary-hover-bg, rgba(0, 0, 0, 0.8))";
        case "transparent":
          return "var(--button-outline-hover-bg)";
      }
    }};
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
