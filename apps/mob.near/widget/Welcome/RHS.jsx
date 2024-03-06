const rhs = context.accountId
  ? Social.get(`${context.accountId}/settings/near.social/homepage.rhs`)
  : undefined;

if (rhs === null) {
  return "";
}

const defaultWidgets = [
  {
    src: "mob.near/widget/Welcome.GetInvolved",
  },
  {
    src: "mob.near/widget/Welcome.Notifications",
    requiresLogin: true,
  },
  {
    src: "mob.near/widget/Applications",
  },
  {
    src: "mob.near/widget/People",
  },
];

const widgets = (rhs && JSON.parse(rhs)) ?? defaultWidgets;

const Div = styled.div`
  margin: 0 -12px;
  position: relative;
  @media (hover: hover) {
    > .edit-link {
      display: none;
    }
  }
  &:hover {
    > .edit-link {
      display: inline;
    }
  }
  .menu-item {
    position: relative;
    padding: 12px;
    padding-bottom: 4px;
    border-bottom: 1px solid #eee;
    &:hover {
      background-color: rgba(0, 0, 0, 0.03);
    }
  }
`;

return (
  <Div>
    {context.accountId && (
      <a
        key="edit"
        style={{ zIndex: 1 }}
        href="/mob.near/widget/Welcome.RHS.Editor"
        className="edit-link position-absolute top-0 end-0 link-secondary me-2 mt-1"
      >
        <i class="bi bi-pencil" /> Edit Menu
      </a>
    )}
    {widgets.map(
      ({ src, requiresLogin }, i) =>
        (!requiresLogin || context.accountId) && (
          <div key={i} className="menu-item">
            <Widget src={src} />
          </div>
        )
    )}
    <div key="edit-item" className="menu-item pb-3">
      <a
        className="link-secondary stretched-link"
        href="/mob.near/widget/Welcome.RHS.Editor"
      >
        <i class="bi bi-pencil" /> Edit Menu
      </a>
    </div>
  </Div>
);
