const accountId = props.accountId;
const blockHeight = props.blockHeight;
const groupId = props.groupId;
const postType = props.postType ?? "post";
const externalLink =
  props.link ??
  `https://near.social/mob.near/widget/${
    postType === "post" ? "MainPage.N.Post.Page" : "MainPage.N.Comment.Page"
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

const shareSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "1.25em" }}
    fill="currentColor"
    viewBox="0 0 16 16"
    stroke="currentColor"
    strokeWidth="0.363"
  >
    <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
    <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
  </svg>
);

const Button = styled.div`
  line-height: 20px;
  min-height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: left;
  background: inherit;
  color: inherit;
  font-size: 16px;
  .icon {
    position: relative;
    &:before {
      margin: -8px;
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      border-radius: 50%;
    }
  }

  &:not([disabled]) {
    cursor: pointer;
  }

  &:not([disabled]):hover {
    opacity: 1 !important;
    color: DeepSkyBlue;

    .icon:before {
      background: rgba(0, 191, 255, 0.1);
    }
  }
`;

return (
  blockHeight !== "now" && (
    <span>
      <Button data-bs-toggle="dropdown" aria-expanded="false" title="Share">
        <span className="icon">{shareSvg}</span>
        <span className="count" />
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
