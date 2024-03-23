const StyledHashtag = styled.span`
  display: inline-flex;
  border-radius: 8px;
  padding: 4px 8px;
  border: 1px solid var(--hashtag-stroke);
  background: var(--hashtag-bg);
  color: var(--hashtag-color);
  font-family: "Pixelify Sans", InterVariable, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 22.4px */
  box-shadow: 0px 4px 8px -2px var(--shadow);
`;

function Hashtag({ key, children }) {
  return <StyledHashtag key={key}># {children}</StyledHashtag>;
}

return { Hashtag };
