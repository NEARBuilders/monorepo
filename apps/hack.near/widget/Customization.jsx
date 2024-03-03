const page = context.accountId
  ? Social.get(`${context.accountId}/settings/near.social/page`)
  : undefined;

if (page === null) {
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
  {
    src: "mob.near/widget/Welcome.FollowFeed",
  },
  {
    src: "mob.near/widget/Welcome.PokeFeed",
  },
];

const widgets = (page && JSON.parse(page)) ?? defaultWidgets;

const Div = styled.div`
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
`;

return (
  <Div>
    {context.accountId && (
      <a
        key="edit"
        href={"#/hack.near/widget/Page.Editor"}
        className="edit-link position-absolute top-0 end-0 link-secondary me-2 mt-1"
      >
        <i class="bi bi-pencil" /> Edit Page
      </a>
    )}
    {widgets.map(
      ({ src, requiresLogin }, i) =>
        (!requiresLogin || context.accountId) && (
          <div key={i} className="text-bg-light rounded-4 p-3 mb-3">
            <Widget src={src} />
          </div>
        )
    )}
  </Div>
);
