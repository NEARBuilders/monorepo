const ownerId = "manzanal.near";

const limitPerPage = 21;
let components = [];
let totalComponents = 0;
const componentsUrl = "/#/hack.near/widget/Common.Component.Library";

State.init({
  tab: "home",
  id: "",
  currentPage: 0,
  selectedTab: props.tab || "all",
});

const curatedComps = [
  {
    type: "common",
    name: "Buttons",
    id: "buttons",
    icon: "bi-egg",
    components: [
      {
        accountId: "mob.near",
        widgetName: "CopyButton",
      },
      {
        accountId: "mob.near",
        widgetName: "CommentButton",
      },
      {
        accountId: "rubycop.near",
        widgetName: "NftVotingButton",
      },
      {
        accountId: "mob.near",
        widgetName: "LikeButton",
      },
      {
        accountId: "mob.near",
        widgetName: "LikeButton.Faces",
      },
      {
        accountId: "mob.near",
        widgetName: "FollowButton",
      },
      {
        accountId: "mob.near",
        widgetName: "NotificationButton",
      },
      {
        accountId: "mob.near",
        widgetName: "PokeButton",
      },
      {
        accountId: "peechz.near",
        widgetName: "TwitterFollowButton",
      },
    ],
  },
  {
    type: "common",
    name: "Search",
    icon: "bi-search",
    id: "search",
    components: [
      {
        accountId: "mob.near",
        widgetName: "ComponentSearch",
      },
      {
        accountId: "mob.near",
        widgetName: "ComponentSearch.Item",
      },
      {
        accountId: "manzanal.near",
        widgetName: "SerchComponent",
      },
    ],
  },
  {
    type: "common",
    name: "Time and Date",
    id: "time",
    icon: "bi-calendar",
    components: [
      {
        accountId: "mob.near",
        widgetName: "TimeAgo",
      },
    ],
  },
  {
    type: "common",
    name: "Compose",
    id: "compose",
    icon: "bi-envelope-paper",
    components: [
      {
        accountId: "mob.near",
        widgetName: "Common.Compose",
      },
    ],
  },
  {
    type: "common",
    name: "Markdown",
    id: "markdown",
    icon: "bi-markdown",
    components: [{ accountId: "mob.near", widgetName: "MarkdownEditorDemo" }],
  },
  {
    type: "common",
    name: "Metadata",
    id: "metadata",
    icon: "bi-box-seam",
    components: [{ accountId: "mob.near", widgetName: "MetadataEditor" }],
  },
  {
    type: "common",
    name: "Dev Tools",
    id: "tools",
    icon: "bi-tools",
    components: [
      { accountId: "mob.near", widgetName: "Explorer" },
      { accountId: "mob.near", widgetName: "WidgetHistory" },
      { accountId: "mob.near", widgetName: "WidgetSource" },
    ],
  },
];
const filterTag = props.commonComponentTag ?? "dev";
const debug = props.debug ?? false;

const renderCategory = (categoryId) => {
  if (!categoryId || categoryId === "") return <></>;
  const item = curatedComps.find((i) => i.id == categoryId);
  return (
    <div class="mt-3">
      <div class="text fs-5 text-muted mb-1" id={item.id}>
        {item.type}
      </div>
      <div class="border border-2 mb-4 rounded"></div>
      <div class="container">
        <div className="row ">
          {item.components.map((comp, i) => (
            <div class="col-6 mb-2">
              <Widget
                key={i}
                src="adminalpha.near/widget/ComponentCard"
                props={{
                  src: `${component.accountId}/widget/${component.widgetName}`,
                  blockHeight: component.blockHeight,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const renderHome = () => {
  return <Widget src="hack.near/widget/ComponentsPage" />;
};

const renderSearch = () => {
  return <Widget src="hack.near/widget/Applications" />;
};

const onSelect = (selection) => {
  State.update({ tab: selection.tab, id: selection.id ? selection.id : "" });
};

const renderContent = {
  home: renderHome(),
  search: renderSearch(),
  type: renderCategory(state.id),
}[state.tab];

return (
  <>
    <div class="row">
      <div class="col-md-3">
        <Widget
          src="hack.near/widget/Common.Component.Library.Navbar"
          props={{
            tab: state.tab,
            onSelect,
            navItems: curatedComps.map((i) => ({
              type: i.type,
              name: i.name,
              icon: i.icon,
              id: i.id,
            })),
          }}
        />
        <hr className="border-2" />
        <Widget
          src="miraclx.near/widget/Attribution"
          props={{ authors: [ownerId], dep: true }}
        />
      </div>
      <div class="col-md-9">{renderContent}</div>
    </div>
  </>
);
