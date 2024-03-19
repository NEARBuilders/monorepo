const StyledHashtag = styled.span`
  display: inline-flex;
  border-radius: 100px;
  padding: 4px 8px;
  border: 1px solid var(--hashtag-stroke);
  background: var(--hashtag-bg);
  color: var(--hashtag-color);
  font-family: InterVariable;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 22.4px */
`;

function Hashtag({ key, children }) {
  return (
    <StyledHashtag key={key}>
      <i className="bi bi-hash"></i> {children}
    </StyledHashtag>
  );
}

return { Hashtag };
