const accountId = props.accountId;
const blockHeight = props.blockHeight;
const postType = props.postType ?? "post";
const externalLink = `https://near.social/mob.near/widget/${
  postType === "post" ? "MainPage.Post.Page" : "MainPage.Comment.Page"
}?accountId=${accountId}&blockHeight=${blockHeight}`;

const clickbaitPrompt =
  props.clickbaitPrompt ??
  `Check out this ${postType} on @NearSocial_\n#NearSocial #NEAR #BOS\n${externalLink}`;

const twitterUrl = new URL("https://twitter.com/intent/tweet");
twitterUrl.searchParams.set("text", clickbaitPrompt);

const mailtoUrl = new URL("mailto:");
mailtoUrl.searchParams.set(
  "subject",
  `Check out this ${postType} on Near Social`
);
mailtoUrl.searchParams.set(
  "body",
  `Take a look this ${postType}.
${externalLink}
`
);

const Button = styled.button`
  border: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  padding-left: 0.5em;
  &:hover {
    color: DeepSkyBlue;
    background: rgba(0, 191, 255, 0.1);
  }
`;

return (
  blockHeight !== "now" && (
    <span>
      <Button
        className="btn me-1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        title="Share"
      >
        <i className="bi fs-4 bi-share" />
      </Button>
      <ul className="dropdown-menu">
        <li>
          <Widget
            src="mob.near/widget/CopyButton"
            props={{
              text: externalLink,
              className: "btn btn-outline-dark dropdown-item",
              label: `Copy link to ${postType}`,
            }}
          />
        </li>
        <li className="dropdown-item">
          <a
            className="link-dark text-decoration-none"
            href={mailtoUrl.toString()}
            target="_blank"
          >
            <i className="bi bi-envelope-at" /> Share by email
          </a>
        </li>
        <li className="dropdown-item">
          <a
            className="link-dark text-decoration-none"
            href={twitterUrl.toString()}
            target="_blank"
          >
            <i className="bi bi-twitter" />
            Share on Twitter
          </a>
        </li>
      </ul>
    </span>
  )
);
