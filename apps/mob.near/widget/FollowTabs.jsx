const accountId = props.accountId ?? context.accountId;
const tab = props.tab === "following" ? props.tab : "followers";

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

return (
  <>
    <Nav>
      <ul className="nav nav-pills nav-fill" role="tablist">
        <li className="nav-item" role="presentation">
          <a
            href={`/mob.near/widget/FollowPage?accountId=${accountId}&tab=followers`}
            className={`btn nav-link ${tab === "followers" ? "active" : ""}`}
            role="tab"
          >
            Followers
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            href={`/mob.near/widget/FollowPage?accountId=${accountId}&tab=following`}
            className={`btn nav-link ${tab === "following" ? "active" : ""}`}
            role="tab"
          >
            Following
          </a>
        </li>
      </ul>
    </Nav>
    <div className="tab-content">
      <div className="tab-pane fade in show active" role="tabpanel">
        <Widget
          src={
            tab === "followers"
              ? "mob.near/widget/FollowersList"
              : "mob.near/widget/FollowingList"
          }
          props={{ accountId }}
        />
      </div>
    </div>
  </>
);
