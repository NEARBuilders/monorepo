const minimumConnections = props.minimumConnections ?? 25;

const accountId = props.accountId ?? context.accountId;

if (!accountId) {
  return "";
}

const daoId = props.daoId ?? "build.sputnik-dao.near";

const policy = Near.view(daoId, "get_policy");

if (policy === null) {
  return "";
}

const groups = policy.roles
  .filter((role) => role.name === "community")
  .map((role) => {
    const group = role.kind.Group;

    return group;
  });

const isMember = groups.map((group) => {
  return !group
    ? false
    : group.filter((address) => address === accountId).length > 0;
})?.[0];

const allAccounts = Social.keys(`*/graph/follow/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});

if (allAccounts === null) {
  return "";
}

const mutualFollowersCount = {};

for (const account of Object.keys(allAccounts)) {
  const followers = allAccounts[account]?.graph?.follow;

  if (followers) {
    for (const follower of Object.keys(followers)) {
      if (allAccounts[follower]?.graph?.follow?.[account]) {
        mutualFollowersCount[account] =
          (mutualFollowersCount[account] || 0) + 1;
      }
    }
  }
}

const rankedAccounts = Object.entries(mutualFollowersCount);

rankedAccounts.sort((a, b) => b[1] - a[1]);

const filteredAccounts = rankedAccounts.filter(
  ([_, count]) => count > minimumConnections
);

const Wrapper = styled.div`
  max-width: 100%;
  @media (max-width: 576px) {
    .content {
      flex-direction: column;
    }
  }
`;

const FollowButtonWrapper = styled.div`
  width: 100%;
  padding: 2px;
  display: flex;
  justify-content: space-between;

  div,
  button {
    flex-grow: 1;
    padding: 8px;
    margin: 4px;
  }

  @media (max-width: 1200px) {
    width: auto;
    div,
    button {
      width: auto;
    }
  }
`;

return (
  <Wrapper>
    <div className="d-flex border-bottom justify-content-between">
      <div className="p-1">
        <h2>Everyone</h2>
        <h5>
          <i>minimumConnections = {minimumConnections} </i>
        </h5>
        <p>
          <i>{filteredAccounts.length} qualified accounts</i>
        </p>
      </div>
      <div className="p-1 m-3">
        <div>
          <Widget
            src="mob.near/widget/Profile"
            props={{ accountId: "build.sputnik-dao.near" }}
          />
          <FollowButtonWrapper>
            <div>
              <Widget
                src="near/widget/FollowButton"
                props={{
                  accountId: "build.sputnik-dao.near",
                }}
              />
            </div>
            {!isMember && (
              <div>
                <Widget
                  src="hack.near/widget/DAO.Join"
                  props={{
                    daoId: "build.sputnik-dao.near",
                    role: "community",
                  }}
                />
              </div>
            )}
          </FollowButtonWrapper>
        </div>
      </div>
    </div>
    {filteredAccounts.map(([accountId, count], i) => (
      <div key={i} className="d-flex border-bottom justify-content-between">
        <div className="d-flex align-items-center">
          <div className="p-3">
            <h5>{i + 1}</h5>
          </div>
          <div className="p-2">
            <Widget src="mob.near/widget/Profile" props={{ accountId }} />
          </div>
        </div>
        <div className="p-1 m-3">
          <p>{count} mutual followers</p>
          <Widget src="mob.near/widget/FollowButton" props={{ accountId }} />
        </div>
      </div>
    ))}
  </Wrapper>
);
