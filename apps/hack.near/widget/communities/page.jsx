const accountId = props.accountId ?? context.accountId;

const ownerId = props.ownerId ?? "hack.near";

const pageId = props.pageId ?? "community.page";

return (
  <Widget
    src="hack.near/widget/community.page"
    props={{
      accountId,
      communityId: "hack.near",
      contractId: "mint.sharddog.near",
      h1: "Regional Community",
      h2: "DAOs",
      tagline: "building better support systems",
      mainColor: "#888",
      buttonText: "Join",
      link: "https://near.social/rc-dao.near/widget/com.page",
    }}
  />
);
