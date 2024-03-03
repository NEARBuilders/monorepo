const accountId = props.accountId;
const tag = props.tag;

let keys = `*/profile/*`;

const data = Social.keys("*/profile", "final");

const profiles =
  Social.get(["*/profile/name", "*/profile/tags/*"], "final") || {};

const profilesWithTags = { ...profiles };
Object.entries(profiles).forEach(([key, valueObj]) => {
  if (!valueObj?.profile?.hasOwnProperty("tags")) {
    delete profilesWithTags[key];
  }
});
const taggedProfiles = Social.keys(`*/profile/tags/*`, "final") || {};

const limit = props.limit || 39;

if (!data) {
  return "Loading...";
}

if (tag) {
  const taggedWidgets = Social.keys(
    `${accountId ?? "*"}/profile/*/metadata/tags/${tag}`,
    "final"
  );

  if (taggedWidgets === null) {
    return "Loading tags";
  }

  keys = Object.entries(taggedProfiles)
    .map((kv) => Object.keys(kv[1].profile).map((w) => `${kv[0]}/profile/${w}`))
    .flat();

  if (!keys.length) {
    return `No profiles found by tag #${tag}`;
  }
}

const processData = (data) => {
  const accounts = Object.entries(data);

  const allItems = accounts
    .map((account) => {
      const accountId = account[0];
      return Object.entries(account[1].profile).map((kv) => ({
        accountId,
        name: kv[0],
        blockHeight: kv[1],
      }));
    })
    .flat();

  allItems.sort((a, b) => b.blockHeight - a.blockHeight);
  return allItems;
};

const renderTag = (tag, tagBadge) => (
  <a href={makeLink(accountId, tag)}>{tagBadge}</a>
);

const renderItem = (a) => {
  return (
    <a
      href={`#/${a.accountId}/profile/${a.name}`}
      className="text-decoration-none"
      key={JSON.stringify(a)}
    >
      <Widget
        src="mob.near/widget/ProfileImage"
        props={{
          tooltip: true,
          accountId: a.accountId,
          name: a.name,
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

let accounts = Object.entries(data);
const numAccounts = accounts.length;
accounts = accounts.slice(numAccounts - limit, numAccounts);

const allWidgets = [];

for (let i = 0; i < accounts.length; ++i) {
  const accountId = accounts[i][0];

  allWidgets.push(
    <a
      href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
      className="text-decoration-none"
      key={i}
    >
      <Widget
        src="mob.near/widget/ProfileImage"
        props={{
          accountId,
          tooltip: true,
          className: "d-inline-block overflow-hidden",
        }}
      />
    </a>
  );
}

return (
  <div className="d-flex flex-wrap gap-1 my-3">
    {state.allItems
      .slice(0, props.limit ? parseInt(props.limit) : 999)
      .map(renderItem)}
    <div class="d-flex flex-wrap gap-1">{allWidgets}</div>
  </div>
);
