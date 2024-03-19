const { Button } = VM.require("app.near/widget/Components.Button") || {
  Button: () => <></>,
};

const items = [
  { label: "Posts", widgetSrc: "app.near/widget/Components.Profile.Tab.Posts" },
  {
    label: "Videos",
    widgetSrc: "app.near/widget/Components.Profile.Tab.Videos",
  },
  {
    label: "Photos",
    widgetSrc: "app.near/widget/Components.Profile.Tab.Photos",
  },
  {
    label: "Widgets",
    widgetSrc: "app.near/widget/Components.Profile.Tab.Widgets",
  },
  { label: "NFTs", widgetSrc: "app.near/widget/Components.Profile.Tab.NFTs" },
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
  }
`;

return (
  <ProfileTabs>
    <TabsContainer>
      {items.map((item) => (
        <Button
          style={
            selectedTab.label === item.label
              ? {
                  borderBottom: "1px solid var(--active-color)",
                  borderRadius: 0,
                }
              : {}
          }
          onClick={() => setSelectedTab(item)}
          variant="transparent"
        >
          <span
            className={`children ${selectedTab.label === item.label ? "selected" : null}`}
          >
            {item.label}
          </span>
        </Button>
      ))}
    </TabsContainer>
    <div className="container-xl">
      <Widget src={selectedTab.widgetSrc} />
    </div>
  </ProfileTabs>
);
