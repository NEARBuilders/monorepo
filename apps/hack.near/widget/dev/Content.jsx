const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "build.sputnik-dao.near";
const hashtags = [
  { name: "dev", required: true },
  { name: "bos", required: true },
];

const groupId = "community"; // which group can post?

const policy = Near.view(daoId, "get_policy");
const group = policy.roles
  .filter((role) => role.name === groupId)
  .map((role) => {
    const group = role.kind.Group;

    return group;
  });

const content = context.accountId
  ? Social.get(`${context.accountId}/settings/dev/content`)
  : undefined;

if (content === null) {
  return "";
}

const defaultWidgets = [
  {
    src: "hack.near/widget/dev.Page.Header",
  },
  {
    src: "hack.near/widget/dev.Posts",
    props: {
      communityHashtags: hashtags,
      communityDomain: "bos",
      communityMembers: group[0],
      exclusive: true,
      allowPublicPosting: false,
    },
  },
];

const widgets = (content && JSON.parse(content)) ?? defaultWidgets;

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
          authors: [daoId],
        }}
      />
      {context.accountId && (
        <a
          key="edit"
          href={"#/hack.near/widget/dev.Page.Editor"}
          className="edit-link position-absolute top-0 end-0 link-secondary me-2 mt-1"
        >
          <i class="bi bi-pencil" /> Edit Content
        </a>
      )}
    </div>
    {widgets.map(
      ({ src, requiresLogin }, i) =>
        (!requiresLogin || context.accountId) && (
          <div key={i} className="text rounded-4 p-3 mb-3">
            <Widget src={src} props={props} />
          </div>
        )
    )}
  </Div>
);
