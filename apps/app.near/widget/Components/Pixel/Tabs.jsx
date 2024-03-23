const { Button } = VM.require("app.near/widget/Components.Pixel.Button") || {
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
    widgetSrc: "app.near/widget/Components.Pixel.Tab.Widgets",
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
  width: 100%;
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 8px;
  background: var(--bg2);
  border-radius: 8px;
  width: max-content;

  @media (max-width: 768px) {
    gap: 16px;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    i {
      font-size: 24px !important;
    }
  }
`;

const TabButton = ({ item }) => {
  return (
    <Button
      onClick={() => setSelectedTab(item)}
      variant={selectedTab.label === item.label ? "" : "transparent"}
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
    <div>
      <Widget
        src={selectedTab.widgetSrc}
        props={{ accountId: props.accountId }}
      />
    </div>
  </ProfileTabs>
);
