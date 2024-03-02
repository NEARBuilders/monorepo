/**
 * Forked from near/widget/Posts
 */

const communityHashtags = props.communityHashtags || [];
const communityDomain = props.communityDomain || null;
const communityMembers = props.communityMembers || [];
const exclusive = props.exclusive || false; // rename to exclusive
const allowPublicPosting = props.allowPublicPosting || false;

State.init({
  selectedTab: Storage.privateGet("selectedTab") || "all",
  domainsFilter: [],
  hashtagsFilter: [],
  disableHashtags: false,
});

const embedHashtags = communityHashtags
  .filter((hashtag) => hashtag.required === true)
  .map((hashtag) => hashtag.name);

// To be continued...
const optionalHashtags = communityHashtags
  .filter((hashtag) => hashtag.required === false)
  .map((hashtag) => hashtag.name);

function selectTab(selectedTab) {
  Storage.privateSet("selectedTab", selectedTab);
  State.update({ selectedTab });
}

const previousSelectedTab = Storage.privateGet("selectedTab");

if (previousSelectedTab && previousSelectedTab !== state.selectedTab) {
  State.update({
    selectedTab: previousSelectedTab,
  });
}

if (state.selectedTab === "community") {
  State.update({
    domainsFilter: [communityDomain],
    disableHashtags: true,
  });
} else {
  State.update({
    domainsFilter: ["post"],
    disableHashtags: false,
  });
}

let accounts = undefined;

if (state.filterFollowing) {
  const graph = Social.keys(`${context.accountId}/graph/follow/*`, "final");
  if (graph !== null) {
    accounts = Object.keys(graph[context.accountId].graph.follow || {});
    accounts.push(context.accountId);
  } else {
    accounts = [];
  }
}

const H2 = styled.h2`
  font-size: 19px;
  line-height: 22px;
  color: #11181c;
  margin: 0 0 24px;
  padding: 0 24px;

  @media (max-width: 1200px) {
    display: none;
  }
`;

const Content = styled.div`
  @media (max-width: 1200px) {
    > div:first-child {
      border-top: none;
    }
  }
`;

const ComposeWrapper = styled.div`
  border-top: 1px solid #eceef0;
`;

const FilterWrapper = styled.div`
  border-top: 1px solid #eceef0;
  padding: 24px 24px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 1200px) {
    padding: 12px;
  }
`;

const PillSelect = styled.div`
  display: inline-flex;
  align-items: center;

  @media (max-width: 600px) {
    width: 100%;

    button {
      flex: 1;
    }
  }
`;

const PillSelectButton = styled.button`
  display: block;
  position: relative;
  border: 1px solid #e6e8eb;
  border-right: none;
  padding: 3px 24px;
  border-radius: 0;
  font-size: 12px;
  line-height: 18px;
  color: ${(p) => (p.selected ? "#fff" : "#687076")};
  background: ${(p) => (p.selected ? "#006ADC !important" : "#FBFCFD")};
  font-weight: 600;
  transition: all 200ms;

  &:hover {
    background: #ecedee;
    text-decoration: none;
  }

  &:focus {
    outline: none;
    border-color: #006adc !important;
    box-shadow: 0 0 0 1px #006adc;
    z-index: 5;
  }

  &:first-child {
    border-radius: 6px 0 0 6px;
  }
  &:last-child {
    border-radius: 0 6px 6px 0;
    border-right: 1px solid #e6e8eb;
  }
`;

const FeedWrapper = styled.div`
  .post {
    padding-left: 24px;
    padding-right: 24px;

    @media (max-width: 1200px) {
      padding-left: 12px;
      padding-right: 12px;
    }
  }
`;

return (
  <>
    <Content>
      {context.accountId ? (
        <>
          <ComposeWrapper>
            <Widget
              src="efiz.near/widget/Community.Posts.Compose"
              props={{
                allowPublicPosting,
                exclusive,
                isMember: communityMembers.includes(context.accountId),
                communityDomain,
                embedHashtags,
              }}
            />
          </ComposeWrapper>
          <FilterWrapper>
            <PillSelect>
              {allowPublicPosting ? (
                <>
                  <PillSelectButton
                    type="button"
                    onClick={() => selectTab("all")}
                    selected={state.selectedTab === "all"}
                  >
                    All
                  </PillSelectButton>
                  {communityDomain && (
                    <PillSelectButton
                      type="button"
                      onClick={() => selectTab("community")}
                      selected={state.selectedTab === "community"}
                    >
                      Community
                    </PillSelectButton>
                  )}
                </>
              ) : null}
              <PillSelectButton
                type="button"
                onClick={() =>
                  State.update({ filterFollowing: !state.filterFollowing })
                }
                selected={state.filterFollowing}
              >
                Following
              </PillSelectButton>
            </PillSelect>
          </FilterWrapper>
        </>
      ) : (
        <Widget src="evrything.near/widget/Register" />
      )}
      <FeedWrapper>
        <Widget
          src="efiz.near/widget/Posts.Feed"
          props={{
            accounts,
            domainsFilter: state.domainsFilter,
            hashtagsFilter: state.disableHashtags ? [] : embedHashtags,
          }}
        />
      </FeedWrapper>
    </Content>
  </>
);
