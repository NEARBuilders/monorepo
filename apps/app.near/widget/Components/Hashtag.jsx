const StyledHashtag = styled.span`
  display: inline-flex;
  border-radius: 100px;
  padding: 4px 8px;
  border: 1px solid
    ${(props) => {
      switch (props.color) {
        case "green":
          return "var(--hashtag-green-stroke)";
        case "yellow":
          return "var(--hashtag-yellow-stroke)";
        case "red":
          return "var(--hashtag-red-stroke)";
        default:
          return "var(--hashtag-yellow-stroke)";
      }
    }};
  background: ${(props) => {
    switch (props.color) {
      case "green":
        return "var(--hashtag-green-bg)";
      case "yellow":
        return "var(--hashtag-yellow-bg)";
      case "red":
        return "var(--hashtag-red-bg)";
      default:
        return "var(--hashtag-yellow-bg)";
    }
  }};
  color: ${(props) => {
    switch (props.color) {
      case "green":
        return "var(--hashtag-green-color)";
      case "yellow":
        return "var(--hashtag-yellow-color)";
      case "red":
        return "var(--hashtag-red-color)";
      default:
        return "var(--hashtag-yellow-color)";
    }
  }};
  font-family: var(--font-family);
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 22.4px */
`;

function Hashtag({ key, children, color }) {
  return (
    <StyledHashtag key={key} color={color}>
      <i className="bi bi-hash"></i> {children}
    </StyledHashtag>
  );
}

return { Hashtag };
