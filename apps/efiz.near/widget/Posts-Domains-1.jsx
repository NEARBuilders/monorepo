State.init({
  selectedTab: Storage.privateGet("selectedTab") || "all",
});

const domains = [
  "apple123456",
  "banana123456",
  "cherry123456",
  "durian123456",
  "elderberry123456",
];

const hashtags = ["nearsocial", "dev"];

const previousSelectedTab = Storage.privateGet("selectedTab");

if (previousSelectedTab && previousSelectedTab !== state.selectedTab) {
  State.update({
    selectedTab: previousSelectedTab,
  });
}

let accounts = undefined;

if (state.selectedTab === "following" && context.accountId) {
  const graph = Social.keys(`${context.accountId}/graph/follow/*`, "final");
  if (graph !== null) {
    accounts = Object.keys(graph[context.accountId].graph.follow || {});
    accounts.push(context.accountId);
  } else {
    accounts = [];
  }
} else {
  accounts = undefined;
}

function selectTab(selectedTab) {
  Storage.privateSet("selectedTab", selectedTab);
  State.update({ selectedTab });
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
    <div class="alert alert-primary" role="alert">
      <p>This example treats indexes as "domains".</p>
      <p>
        Currently, a post created on the main page will be indexed into a
        sort-of catch-all "post" bucket. Every "post" feed reads from this
        index.
      </p>
      <p>
        Alternatively in this example, if domains have been provided, then we
        create an index under that "domain" and do not post into the catch-all
        "post" index.
      </p>
      <p>
        This has some advantages because now a user can be selective with what
        feed their post will or will not appear up on, and it's also easy to
        merge domains together in the feed.
      </p>
      <p>
        However, this also has some disadvantages; domains could proliferate out
        of control and since there is no "registar", developers could be unaware
        that they are sharing a domain. A possible solution could be that
        domains are .near accounts and permissions are put in place that only
        authorized users can post to a domain (i.e. exclusive communities).
      </p>
    </div>

    <Content>
      {context.accountId && (
        <>
          <ComposeWrapper>
            <Widget
              src="efiz.near/widget/Posts.Compose-Domains-1"
              props={{ domains }}
            />
          </ComposeWrapper>

          <FilterWrapper>
            <PillSelect>
              <PillSelectButton
                type="button"
                onClick={() => selectTab("all")}
                selected={state.selectedTab === "all"}
              >
                All
              </PillSelectButton>

              <PillSelectButton
                type="button"
                onClick={() => selectTab("following")}
                selected={state.selectedTab === "following"}
              >
                Following
              </PillSelectButton>
            </PillSelect>
            <div className="d-inline-flex gap-2">
              <Typeahead
                options={hashtags}
                multiple
                onChange={(value) => {
                  State.update({ hashtags: value });
                }}
                placeholder="Hashtag filter"
              />
              <Typeahead
                options={domains}
                multiple
                onChange={(value) => {
                  State.update({ choose: value });
                }}
                placeholder="Domain filter"
              />
            </div>
          </FilterWrapper>
        </>
      )}

      <FeedWrapper>
        <Widget
          src="efiz.near/widget/Posts.Feed-Domains-1"
          props={{ accounts, domains: state.choose, hashtags: state.hashtags }}
        />
      </FeedWrapper>
    </Content>
  </>
);
