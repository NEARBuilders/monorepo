const owner = props.owner ?? "hack.near";
const domain = props.domain ?? "builders";

const accountId = props.accountId ?? context.accountId;

const main = context.accountId
  ? Social.get(`${context.accountId}/settings/every/page.main`)
  : undefined;

if (main === null) {
  return "";
}

const defaultWidgets = [
  {
    src: "hack.near/widget/Components",
  },
];

const widgets = (main && JSON.parse(main)) ?? defaultWidgets;

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
      <Widget
        src="miraclx.near/widget/Attribution"
        props={{
          dep: true,
          authors: [owner],
        }}
      />
      {context.accountId && (
        <a
          key="edit"
          href={"#/hack.near/widget/Custom.Page.Editor"}
          className="edit-link position-absolute top-0 end-0 link-secondary me-2 mt-1"
        >
          <i class="bi bi-pencil" /> Edit Page
        </a>
      )}
    </div>
    {widgets.map(
      ({ src, requiresLogin }, i) =>
        (!requiresLogin || context.accountId) && (
          <div key={i} className="text-bg-light rounded-4 p-3 mb-3">
            <Widget src={src} props={{ domain, owner }} />
          </div>
        )
    )}
  </Div>
);
