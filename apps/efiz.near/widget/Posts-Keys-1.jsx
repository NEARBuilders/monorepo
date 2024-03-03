State.init({
  selectedTab: Storage.privateGet("selectedTab") || "all",
});

const keys = [
  "apple123456",
  "banana123456",
  "cherry123456",
  "durian123456",
  "elderberry123456",
];

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
      <p>Rather than indexes, this example treats keys as "domains".</p>
      <p>
        Currently, a post created on the main page will be indexed into a
        sort-of catch-all "post" bucket with a "main" key. Every "post" feed
        reads from this index and then checks for this key.
      </p>
      <p>
        In this example, if a domain has been provided, then we still post to
        the catch-all "post" index, but we write the post under the key equal to
        the domain.
      </p>
      <p>
        This has the advantage of fitting within the current model, but since
        all post feeds read from the post index, when the feed encounters a post
        with a key besides main, it won't render the correct content unless the
        post widget itself is configured to check for it. Actually -- I haven't
        been successful in reading message! I'm not sure this is a supported
        approach
      </p>
      <p>
        Regardless, you can only post to one key within an index at a time,
        making it impossible to "cross post" (post once but appear on two feeds)
        and meaning a lot of duplicate data. A possible solution would be
        modifying the indexer to allow an array of keys.
      </p>
    </div>

    <Content>
      {context.accountId && (
        <>
          <ComposeWrapper>
            <Widget
              src="efiz.near/widget/Posts.Compose-Keys-1"
              props={{ keys }}
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
                  State.update({ choose: value });
                }}
                placeholder="Hashtag filter"
              />
              <Typeahead
                options={keys}
                multiple
                onChange={(value) => {
                  State.update({ choose: value });
                }}
                placeholder="Keys filter"
              />
            </div>
          </FilterWrapper>
        </>
      )}

      <FeedWrapper>
        <Widget
          src="efiz.near/widget/Posts.Feed-Keys-1"
          props={{ accounts, keys: state.choose }}
        />
      </FeedWrapper>
    </Content>
  </>
);
