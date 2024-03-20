const { Button } = VM.require("app.near/widget/Components.Button") || {
  Button: () => <></>,
};

const items = [
  {
    label: "Posts",
    widgetSrc: "app.near/widget/Components.Profile.Tab.Posts",
    icon: "bi bi-newspaper",
  },
  {
    label: "Videos",
    widgetSrc: "app.near/widget/Components.Profile.Tab.Videos",
    icon: "bi bi-camera-video",
  },
  {
    label: "Photos",
    widgetSrc: "app.near/widget/Components.Profile.Tab.Photos",
    icon: "bi bi-image",
  },
  {
    label: "Widgets",
    widgetSrc: "app.near/widget/Components.Profile.Tab.Widgets",
    icon: "bi bi-code-slash",
  },
  {
    label: "NFTs",
    widgetSrc: "app.near/widget/Components.Profile.Tab.NFTs",
    icon: "bi bi-wallet2",
  },
];

const [selectedTab, setSelectedTab] = useState(items[0]);

const ProfileTabs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
  border-bottom: 1px solid var(--stroke);
  margin-bottom: 1rem;

  span.children {
    font-size: 18px !important;
    font-weight: 500 !important;
    color: var(--color-muted);
  }

  span.children.selected {
    color: var(--active-color);
  }

  @media screen and (max-width: 768px) {
    gap: 16px;
    flex-wrap: wrap;
    justify-content: space-between;
    i {
      font-size: 24px !important;
    }
  }
`;

const TabButton = ({ item }) => {
  return (
    <Button
      style={
        (selectedTab.label === item.label && {
          borderBottom: "1px solid var(--active-color)",
          borderRadius: "8px 8px 0 0",
        }) ||
        {}
      }
      onClick={() => setSelectedTab(item)}
      variant="transparent"
    >
      <span
        className={`children ${selectedTab.label === item.label ? "selected" : null}`}
      >
        <span className="d-none d-md-block">{item.label}</span>
        <span className="d-md-none">
          <i className={item.icon}></i>
        </span>
      </span>
    </Button>
  );
};

return (
  <ProfileTabs>
    <TabsContainer>
      {items.map((item) => (
        <TabButton item={item} key={item.label} />
      ))}
    </TabsContainer>
    <div className="container-xl">
      <Widget
        src={selectedTab.widgetSrc}
        props={{ accountId: props.accountId }}
      />
    </div>
  </ProfileTabs>
);
