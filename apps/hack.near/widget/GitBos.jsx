const id = props.id ?? "builders";

State.init({
  feedIndex: "projects",
});

const options = [
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "activity",
    title: "Activity",
  },
  {
    id: "groups",
    title: "Groups",
  },
  {
    id: "menu",
    title: "Menu",
    mobileOnly: true,
  },
];

const [connectedAccounts, setConnectedAccounts] = useState([]);

const graph = context.accountId
  ? Social.keys(`${context.accountId}/graph/${id}/*`, "final")
  : {};
useEffect(() => {
  if (graph !== null) {
    const accounts = Object.keys(graph[context.accountId].graph.follow || {});
    accounts.push(context.accountId);
    setConnectedAccounts(accounts);
  }
}, [graph, context.accountId]);

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

  @media(max-width: 991px) {
    margin: -24px -12px 0;
  }
`;

const isMember = true;

return (
  <div className="row">
    <div className="col-lg-8">
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
        className={`${
          state.feedIndex === "menu" ? "d-none" : ""
        } d-lg-block m-3`}
      >
        {state.feedIndex === "activity" ? (
          <Widget
            key="recent"
            src="mob.near/widget/LastWidgets"
            props={{ accounts: connectedAccounts }}
          />
        ) : state.feedIndex === "projects" ? (
          <Widget key="featured" src="near/widget/FeaturedComponents" />
        ) : (
          <Widget key="community" src="hack.near/widget/every.group" />
        )}
      </div>
    </div>
    <div
      className={`${
        state.feedIndex !== "menu" ? "d-none" : "pt-3"
      } d-lg-block col-lg-4`}
    >
      <Widget src="devs.near/widget/GitBos.kit" props={props} />
    </div>
  </div>
);
