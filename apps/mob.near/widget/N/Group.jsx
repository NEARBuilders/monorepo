const groupId = props.groupId;

const data = fetch("https://graph.mintbase.xyz", {
  method: "POST",
  headers: {
    "mb-api-key": "omni-site",
    "Content-Type": "application/json",
    "x-hasura-role": "anonymous",
  },
  body: JSON.stringify({
    query: `
query Owners {
  mb_views_nft_tokens(
    where: {
      nft_contract_id: {_eq: "${groupId}"},
      burned_timestamp: {_is_null: true}
    }
    distinct_on: owner
  ) {
    owner
  }
}
`,
  }),
});

const nftMetadata = Near.view(groupId, "nft_metadata");

if (!data.ok || !nftMetadata) {
  return "";
}

const owners = data.body.data.mb_views_nft_tokens.map((o) => o.owner);
const isMember = owners.includes(context.accountId);

const Wrapper = styled.div`
`;

const indexKey = `nft:${groupId}`;

return (
  <Wrapper>
    <Widget
      src="mob.near/widget/N.Group.Header"
      props={{ link: true, groupId, owners }}
    />
    {context.accountId &&
      (isMember ? (
        <Widget
          key="compose"
          loading=""
          src="mob.near/widget/MainPage.N.Compose"
          props={{ indexKey, groupId }}
        />
      ) : (
        <Widget
          loading=""
          src="mob.near/widget/N.Group.NotMemberCompose"
          props={{ groupId }}
        />
      ))}
    <Widget
      src="mob.near/widget/MainPage.N.Feed"
      props={{
        accounts: owners,
        indexKey,
        groupId,
        commentAccounts: owners,
        permissions: {
          disableComment: !isMember,
        },
      }}
    />
  </Wrapper>
);
