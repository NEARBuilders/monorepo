const owner = props.owner ?? "hack.near";
const domain = props.domain ?? "builders";

const accountId = props.accountId ?? context.accountId;

const side = context.accountId
  ? Social.get(`${context.accountId}/settings/every/page.side`)
  : undefined;

if (side === null) {
  return "";
}

const defaultWidgets = [
  {
    src: "hack.near/widget/Guide.Summary",
  },
  {
    src: "hack.near/widget/Hashtag.Feed",
    props: { owner, domain },
  },
  {
    src: "mob.near/widget/People",
  },
];

const widgets = (side && JSON.parse(side)) ?? defaultWidgets;

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
    <div className="mb-3">
      <a href="#/hack.near/widget/Page.Menu.Editor">🧰 🛠️ 🧱</a>
      {context.accountId && (
        <a
          key="edit"
          href={"#/hack.near/widget/Page.Menu.Editor"}
          className="edit-link position-absolute top-0 end-0 link-secondary me-2 mt-1"
        >
          <i class="bi bi-pencil" /> Edit Menu
        </a>
      )}
      <br />
    </div>
    {widgets.map(
      ({ src, requiresLogin }, i) =>
        (!requiresLogin || context.accountId) && (
          <div key={i} className="text-bg-light rounded-4 p-3 mb-3">
            <Widget src={src} props={props} />
          </div>
        )
    )}
  </Div>
);
