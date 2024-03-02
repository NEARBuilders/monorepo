const ownerId = "manzanal.near";

const limitPerPage = 21;
let components = [];
let totalComponents = 0;
const componentsUrl = "/#/adminalpha.near/widget/ComponentsPage";

State.init({
  tab: "home",
  id: "",
  currentPage: 0,
  selectedTab: props.tab || "all",
});

if (props.tab && props.tab !== state.selectedTab) {
  State.update({
    selectedTab: props.tab,
  });
}

const tagsData = Social.get("*/widget/*/metadata/tags/*", "final");

const data = Social.keys("*/widget/*", "final", {
  return_type: "BlockHeight",
});

if (data) {
  const result = [];

  Object.keys(data).forEach((accountId) => {
    return Object.keys(data[accountId].widget).forEach((widgetName) => {
      totalComponents++;

      if (state.selectedTab === "apps") {
        const hasAppTag =
          tagsData[accountId].widget[widgetName]?.metadata?.tags["app"] === "";
        if (!hasAppTag) return;
      }

      result.push({
        accountId,
        widgetName,
        blockHeight: data[accountId].widget[widgetName],
      });
    });
  });

  result.sort((a, b) => b.blockHeight - a.blockHeight);
  components = result.slice(0, state.currentPage * limitPerPage + limitPerPage);
}

function onSearchChange({ result, term }) {
  if (term.trim()) {
    State.update({ searchResults: result || [] });
  } else {
    State.update({ searchResults: null });
  }
}

const items = state.searchResults || components;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding-bottom: 48px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Search = styled.div`
  width: 246px;

  @media (max-width: 500px) {
    width: 100%;
  }
`;

const H1 = styled.h1`
  font-weight: 600;
  font-size: 32px;
  line-height: 39px;
  color: #11181c;
  margin: 0;
`;

const H2 = styled.h2`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #687076;
  margin: 0;
`;

const Text = styled.p`
  margin: 0;
  line-height: 1.5rem;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")} !important;
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "")};
  white-space: ${(p) => (p.ellipsis ? "nowrap" : "")};
  overflow-wrap: anywhere;

  b {
    font-weight: 600;
    color: #11181c;
  }

  &[href] {
    display: inline-flex;
    gap: 0.25rem;

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
`;

const Items = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 800px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Item = styled.div``;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 8px;
  height: 32px;
  background: #fbfcfd;
  border: 1px solid #d7dbdf;
  border-radius: 50px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  cursor: pointer;
  color: #11181c !important;
  margin: 0;

  &:hover,
  &:focus {
    background: #ecedee;
    text-decoration: none;
    outline: none;
  }

  span {
    color: #687076 !important;
  }
`;

const Tabs = styled.div`
  display: flex;
  height: 48px;
  border-bottom: 1px solid #eceef0;
  margin-bottom: -24px;
  overflow: auto;
  scroll-behavior: smooth;

  @media (max-width: 1200px) {
    background: #f8f9fa;
    border-top: 1px solid #eceef0;
    margin-left: -12px;
    margin-right: -12px;

    > * {
      flex: 1;
    }
  }
`;

const TabsButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-weight: 600;
  font-size: 12px;
  padding: 0 12px;
  position: relative;
  color: ${(p) => (p.selected ? "#11181C" : "#687076")};
  background: none;
  border: none;
  outline: none;
  text-align: center;
  text-decoration: none !important;

  &:hover {
    color: #11181c;
  }

  &::after {
    content: "";
    display: ${(p) => (p.selected ? "block" : "none")};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: #59e692;
  }
`;

const curatedComps = [
  {
    category: "Buttons",
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
    category: "Search",
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
    category: "Time and Date",
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
    category: "Compose",
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
    category: "Markdown",
    id: "markdown",
    icon: "bi-markdown",
    components: [{ accountId: "mob.near", widgetName: "MarkdownEditorDemo" }],
  },
  {
    category: "Metadata",
    id: "metadata",
    icon: "bi-box-seam",
    components: [{ accountId: "mob.near", widgetName: "MetadataEditor" }],
  },
  {
    category: "Widget Tools",
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

const searchComponents = () => {
  return (
    <Wrapper>
      <Search>
        <Widget
          src="adminalpha.near/widget/ComponentSearch"
          props={{
            limit: 21,
            onChange: onSearchChange,
          }}
        />
      </Search>
      {!state.searchResults && (
        <Tabs>
          <TabsButton
            href={`${componentsUrl}?tab=all`}
            selected={state.selectedTab === "all"}
          >
            All
          </TabsButton>

          <TabsButton
            href={`${componentsUrl}?tab=apps`}
            selected={state.selectedTab === "apps"}
          >
            Apps
          </TabsButton>
        </Tabs>
      )}

      {state.searchResults?.length === 0 && (
        <Text>No components matched your search.</Text>
      )}

      {items.length > 0 && (
        <Items>
          {items.map((component, i) => (
            <Item key={component.accountId + component.widgetName}>
              <Widget
                src="adminalpha.near/widget/ComponentCard"
                props={{
                  src: `${component.accountId}/widget/${component.widgetName}`,
                  blockHeight: component.blockHeight,
                }}
              />
            </Item>
          ))}
        </Items>
      )}

      {!state.searchResults && (
        <Button
          type="button"
          onClick={() => State.update({ currentPage: state.currentPage + 1 })}
        >
          Load More
        </Button>
      )}
    </Wrapper>
  );
};

const renderCategory = (categoryId) => {
  if (!categoryId || categoryId === "") return <></>;
  const item = curatedComps.find((i) => i.id == categoryId);
  return (
    <div class="mt-3">
      <div class="text fs-5 text-muted mb-1" id={item.id}>
        {item.category}
      </div>
      <div class="border border-2 mb-4 rounded"></div>
      <div class="container">
        <div className="row ">
          {item.components.map((comp, i) => (
            <div class="col-6 mb-2">
              <Widget
                key={i}
                src="mob.near/widget/WidgetMetadata"
                props={{
                  accountId: comp.accountId,
                  widgetName: comp.widgetName,
                  expanded: false,
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
  return <Widget src="adminalpha.near/widget/ComponentsPage" />;
};

const onSelect = (selection) => {
  State.update({ tab: selection.tab, id: selection.id ? selection.id : "" });
};

const renderContent = {
  home: renderHome(),
  searchComponents: searchComponents(),
  category: renderCategory(state.id),
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
              category: i.category,
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
