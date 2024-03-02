const accountId = props.accountId ?? context.accountId;
const domain = props.domain ?? "guide";

let keys = `${accountId ?? "*"}/widget/*`;

if (domain) {
  const taggedWidgets = Social.keys(
    `${accountId ?? "*"}/widget/*/metadata/tags/${domain}`,
    "final"
  );

  if (taggedWidgets === null) {
    return "Loading...";
  }

  keys = Object.entries(taggedWidgets)
    .map((kv) => Object.keys(kv[1].widget).map((w) => `${kv[0]}/widget/${w}`))
    .flat();

  if (!keys.length) {
    return `No widgets found in the #${domain} domain...`;
  }
}

const data = Social.keys(keys, "final", {
  return_type: "BlockHeight",
});

if (data === null) {
  return "Loading...";
}

const processData = (data) => {
  const accounts = Object.entries(data);

  const allItems = accounts
    .map((account) => {
      const accountId = account[0];
      return Object.entries(account[1].widget).map((kv) => ({
        accountId,
        widgetName: kv[0],
        blockHeight: kv[1],
      }));
    })
    .flat();

  allItems.sort((a, b) => b.blockHeight - a.blockHeight);
  return allItems;
};

const renderDomain = (domain, domainBadge) => (
  <a href={makeLink(accountId, domain)}>{domainBadge}</a>
);

const renderItem = (a) => {
  return (
    <a
      href={`#/${a.accountId}/widget/${a.widgetName}`}
      className="text-decoration-none"
      key={JSON.stringify(a)}
    >
      <Widget
        src="mob.near/widget/WidgetImage"
        props={{
          tooltip: true,
          accountId: a.accountId,
          widgetName: a.widgetName,
        }}
      />
    </a>
  );
};

if (JSON.stringify(data) !== JSON.stringify(state.data || {})) {
  State.update({
    data,
    allItems: processData(data),
  });
}

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

return (
  <Wrapper>
    <Header>
      <h3>#{domain}</h3>
      <div className="d-flex flex-wrap gap-1 my-3">
        {state.allItems
          .slice(0, props.limit ? parseInt(props.limit) : 999)
          .map(renderItem)}
      </div>
    </Header>
  </Wrapper>
);
