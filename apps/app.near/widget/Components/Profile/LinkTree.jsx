const { TwitterIcon } = VM.require("app.near/widget/Icons") || {
  TwitterIcon: () => <></>,
};

const StyledLink = styled.a`
  color: var(--color);
  font-size: 20px;
  transition: 300ms opacity;

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
      <div className="d-flex align-items-center flex-wrap" style={{ gap: 10 }}>
        {twitter && (
          <StyledLink
            href={`https://x.com/${twitter}`}
            target="_blank"
            style={{ textDecoration: "none", marginBottom: 3 }}
          >
            <TwitterIcon theme={theme} />
          </StyledLink>
        )}
        {github && (
          <StyledLink
            href={`https://github.com/${github}`}
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <i className="bi bi-github"></i>
          </StyledLink>
        )}
        {telegram && (
          <StyledLink
            href={`https://t.me/${github}`}
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <i className="bi bi-telegram"></i>
          </StyledLink>
        )}
        {website && (
          <StyledLink
            href={`https://${website}`}
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <i className="bi bi-globe"></i>
          </StyledLink>
        )}
      </div>
    </>
  );
}

return { LinkTree };
