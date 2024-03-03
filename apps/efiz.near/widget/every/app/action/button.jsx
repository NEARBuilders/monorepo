const StyledCreateWidget = styled.div`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  font-weight: var(--font-weight-medium);
  text-transform: lowercase !important;
  text-align: center;
  text-decoration: none;
  border: 2px outset #333;
  background-color: #f5f5f5;
  cursor: pointer;
`;

return (
  <StyledCreateWidget>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <line x1="12" y1="8" x2="12" y2="16"></line>
      <line x1="8" y1="12" x2="16" y2="12"></line>
    </svg>
  </StyledCreateWidget>
);
