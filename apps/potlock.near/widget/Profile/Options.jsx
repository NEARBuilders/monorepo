const ProfileOptions = (props) => [
  {
    label: "Social Feed",
    id: "feed",
    disabled: false,
    source: "{config/account}/widget/Profile.Feed",
    href: props.hrefWithParams(`?tab=profile&accountId=${props.accountId}&nav=feed`),
  },
  {
    label: "Donations",
    id: "donations",
    disabled: false,
    source: "{config/account}/widget/Profile.DonationsTable",
    href: props.hrefWithParams(`?tab=profile&accountId=${props.accountId}&nav=donations`),
  },
  {
    label: "",
    id: "followers",
    disabled: false,
    source: "{config/account}/widget/Profile.FollowTabs",
  },
  {
    label: "",
    id: "following",
    disabled: false,
    source: "{config/account}/widget/Profile.FollowTabs",
  },
];

return {
  ProfileOptions,
};
