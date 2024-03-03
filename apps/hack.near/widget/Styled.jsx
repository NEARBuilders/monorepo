const nsh = context.accountId
  ? Social.get(`${context.accountId}/settings/near.social/page.nsh`)
  : undefined;

if (nsh === null) {
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

const widgets = (nsh && JSON.parse(nsh)) ?? defaultWidgets;

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
        href={"#/create.near/widget/Welcome.RHS.Editor"}
        className="edit-link position-absolute top-0 end-0 link-secondary me-2 mt-1"
      >
        <i class="bi bi-pencil" /> Edit Menu
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
