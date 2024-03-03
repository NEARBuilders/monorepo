State.init({
  selectedTab: props.tab || "fingerprints",
});

const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "creativesdao.sputnik-dao.near";

const hashtags = [
  { name: "creativescommunity", required: true },
  { name: "creativesdao", required: true },
];

if (props.tab && props.tab !== state.selectedTab) {
  State.update({
    selectedTab: props.tab,
  });
}

const accountUrl = `hack.near/widget/creatives.dao`;

const Wrapper = styled.div`
  padding: 23px;
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: ${(p) => p.size || "25px"};
  line-height: 1.2em;
  color: #11181c;
  margin: ${(p) => (p.margin ? "0 0 24px" : "0")};
  overflow-wrap: anywhere;
`;

const Tabs = styled.div`
  display: flex;
  height: 48px;
  border-bottom: 1px solid #eceef0;
  margin-bottom: 72px;
  overflow: auto;
  scroll-behavior: smooth;
  justify-content: center;

  @media (max-width: 1200px) {
    background: #f8f9fa;
    border-top: 1px solid #eceef0;
    margin: 0 -12px 48px;

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
  font-size: 23px;
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
    cursor: pointer;
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

const handleTabClick = (tab) => {
  State.update({
    selectedTab: tab,
  });
};

return (
  <Wrapper>
    <Tabs>
      <TabsButton
        onClick={() => handleTabClick("fingerprints")}
        selected={state.selectedTab === "fingerprints"}
      >
        Fingerprints
      </TabsButton>

      <TabsButton
        onClick={() => handleTabClick("discussion")}
        selected={state.selectedTab === "discussion"}
      >
        Discussion
      </TabsButton>

      <TabsButton
        onClick={() => handleTabClick("members")}
        selected={state.selectedTab === "members"}
      >
        Members
      </TabsButton>

      <TabsButton
        onClick={() => handleTabClick("explore")}
        selected={state.selectedTab === "explore"}
      >
        Explore
      </TabsButton>
    </Tabs>

    {state.selectedTab === "fingerprints" && (
      <Widget src="creativesdao.near/widget/ImwithCreativesConstellation" />
    )}

    {state.selectedTab === "discussion" && (
      <Widget
        src="efiz.near/widget/Community.Posts"
        props={{
          communityHashtags: hashtags,
        }}
      />
    )}

    {state.selectedTab === "members" && (
      <Widget
        src="hack.near/widget/DAO.Groups"
        props={{ daoId: "creatives.sputnik-dao.near" }}
      />
    )}

    {state.selectedTab === "explore" && (
      <Widget
        src="efiz.near/widget/core"
        props={{ path: "every.near/thing/test" }}
      />
    )}
  </Wrapper>
);
