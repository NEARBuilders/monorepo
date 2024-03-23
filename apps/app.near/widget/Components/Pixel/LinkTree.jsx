const { TwitterIcon } = VM.require("app.near/widget/Icons") || {
  TwitterIcon: () => <></>,
};

const StyledLink = styled.a`
  color: var(--active-color);
  font-size: 16px;
  transition: 300ms opacity;

  i {
    color: var(--color);
  }

  &:hover {
    opacity: 0.8;
  }
`;

function LinkTree({ linkTree, theme }) {
  const { twitter, github, telegram, website } = linkTree;

  if (!twitter || !github || !telegram || !website) {
    return null;
  }

  return (
    <>
      <div className="d-flex flex-column gap-2">
        {twitter && (
          <StyledLink
            href={`https://x.com/${twitter}`}
            target="_blank"
            style={{ textDecoration: "none", marginBottom: 3 }}
          >
            <TwitterIcon theme={theme} /> {twitter}
          </StyledLink>
        )}
        {github && (
          <StyledLink
            href={`https://github.com/${github}`}
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <i className="bi bi-github"></i> {github}
          </StyledLink>
        )}
        {telegram && (
          <StyledLink
            href={`https://t.me/${github}`}
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <i className="bi bi-telegram"></i> {telegram}
          </StyledLink>
        )}
        {website && (
          <StyledLink
            href={`https://${website}`}
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <i className="bi bi-globe"></i> {website}
          </StyledLink>
        )}
      </div>
    </>
  );
}

return { LinkTree };
