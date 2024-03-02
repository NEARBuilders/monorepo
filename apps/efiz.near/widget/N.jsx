const hashtag = props.hashtag;
const groupId = props.groupId;

if (!state || state.hashtag !== hashtag || state.groupId !== groupId) {
  State.update({
    feedIndex: hashtag ? "hashtag" : groupId ? "group" : "premium",
    hashtag,
    groupId,
  });
}

const options = [
  {
    id: "all",
    title: "All Posts",
  },
  {
    id: "menu",
    title: "Menu",
    mobileOnly: true,
  },
];

if (state.hashtag) {
  options.splice(
    options.findIndex(({ id }) => id === "all"),
    1,
    {
      id: "hashtag",
      title: `#${state.hashtag}`,
    }
  );
} else if (state.groupId) {
  options.splice(
    options.findIndex(({ id }) => id === "all"),
    1,
    {
      id: "group",
      title: `Group`,
    }
  );
}

const [followingAccounts, setFollowingAccounts] = useState([]);

const graph = context.accountId
  ? Social.keys(`${context.accountId}/graph/follow/*`, "final")
  : {};
useEffect(() => {
  if (graph !== null) {
    const accounts = Object.keys(graph[context.accountId].graph.follow || {});
    accounts.push(context.accountId);
    setFollowingAccounts(accounts);
  }
}, [graph, context.accountId]);

const premiumData = Social.get(
  "premium.social.near/badge/premium/accounts/*",
  "final"
);

const [premiumAccounts, setPremiumAccounts] = useState([]);
const [mergedAccounts, setMergedAccounts] = useState([]);
const [premium, setPremium] = useState(false);
const [premiumExpiringSoon, setPremiumExpiringSoon] = useState(false);

const ExpiringSoonDuration = 604800000; // 7 * 24 * 60 * 60 * 1000;

useEffect(() => {
  if (premiumData) {
    const now = Date.now();
    setPremium(false);
    setPremiumExpiringSoon(false);
    setPremiumAccounts(
      Object.entries(premiumData)
        .filter(([accountId, expiration]) => {
          expiration = parseFloat(expiration);
          const active = expiration > now;
          if (accountId === context.accountId && active) {
            setPremium(true);
            setPremiumExpiringSoon(expiration - now < ExpiringSoonDuration);
          }
          return active;
        })
        .map((a) => a[0])
    );
  }
}, [premiumData]);

useEffect(() => {
  setMergedAccounts([...new Set([...followingAccounts, ...premiumAccounts])]);
}, [premiumAccounts, followingAccounts]);

const Wrapper = styled.div`
  margin-top: calc(-1 * var(--body-top-padding, 0));
  @media(min-width: 992px) {
    .b-s {
      border-left: 1px solid #eee;
    }
    .b-e {
      border-right: 1px solid #eee;
    }
  }
`;

const Nav = styled.div`
  .nav-pills {
    background: #fbfbfb;
    font-weight: 500;
    --bs-nav-pills-border-radius: 0;
    --bs-nav-link-color: #000;
    --bs-nav-pills-link-active-color: #000;
    --bs-nav-pills-link-active-bg: #fbfbfb;
    --bs-nav-link-padding-y: 0.75rem;
    border-bottom: 1px solid #eee;
    padding-top: 3px;
  }
  .nav-link.active {
    border-bottom: 3px solid rgb(13, 110, 253);
  }

  .nav-item:not(:has(> .disabled)):hover {
    background: rgba(13, 110, 253, 0.15);
  }

  margin: 0 -12px;
`;

const isPremiumFeed = state.feedIndex === "premium";

return (
  <Wrapper className="row">
    <div className="col-lg-8 b-e b-s">
      <Nav>
        <ul className="nav nav-pills nav-fill">
          {options.map((option, i) => (
            <li
              className={`nav-item ${option.mobileOnly ? "d-lg-none" : ""}`}
              key={i}
            >
              <button
                className={`nav-link ${
                  state.feedIndex === option.id ? "active" : ""
                } ${option.disabled ? "disabled" : ""}`}
                aria-disabled={!!option.disabled}
                onClick={() =>
                  !option.disabled && State.update({ feedIndex: option.id })
                }
              >
                {option.title}
              </button>
            </li>
          ))}
        </ul>
      </Nav>
      <div
        className={`${state.feedIndex === "menu" ? "d-none" : ""} d-lg-block`}
      >
        <Widget
          key="onboarding"
          loading=""
          src="mob.near/widget/N.ProfileOnboarding"
          props={{}}
        />
        {state.feedIndex === "group" ? (
          <Widget
            src="mob.near/widget/N.Group"
            props={{ groupId: state.groupId }}
          />
        ) : (
          <>
            {context.accountId && isPremiumFeed && !premium && (
              <Widget
                key="not-premium"
                loading=""
                src="mob.near/widget/N.NotPremiumCompose"
                props={{}}
              />
            )}
            {context.accountId && isPremiumFeed && premiumExpiringSoon && (
              <Widget
                key="expiring-premium"
                loading=""
                src="mob.near/widget/N.NotPremiumCompose"
                props={{
                  text: "Your Premium subscription expiring soon!",
                  buttonText: "Renew subscription",
                }}
              />
            )}
            {context.accountId && (
              <Widget
                key="compose"
                loading=""
                src="mob.near/widget/MainPage.N.Compose"
                props={{}}
              />
            )}
            {state.feedIndex === "hashtag" ? (
              <Widget
                key="hash-feed"
                src="mob.near/widget/Hashtag.N.Feed"
                props={{ hashtag: state.hashtag }}
              />
            ) : isPremiumFeed ? (
              <Widget
                key="premium-feed"
                src="mob.near/widget/MainPage.N.Feed"
                props={{ accounts: mergedAccounts, isPremiumFeed }}
              />
            ) : (
              <Widget
                key="reg-feed"
                src="mob.near/widget/MainPage.N.Feed"
                props={{
                  accounts:
                    state.feedIndex === "following"
                      ? followingAccounts
                      : undefined,
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
    <div
      className={`${
        state.feedIndex !== "menu" ? "d-none" : "pt-3"
      } d-lg-block col-lg-4 b-e`}
    >
      <Widget src="mob.near/widget/Welcome.RHS" props={props} />
    </div>
  </Wrapper>
);
