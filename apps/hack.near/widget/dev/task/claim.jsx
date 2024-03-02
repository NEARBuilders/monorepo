const accountId = props.accountId ?? context.accountId;

if (!accountId) {
  return "Please connect your NEAR wallet :)";
}

const WIDGET_AUTHOR = "hack.near";
const daoId = props.daoId ?? "build.sputnik-dao.near";
const bountiesPerPage = props.bountiesPerPage ?? 5;

State.init({
  daoId,
  bounties: [],
  lastBountyId: null,
  hasMore: true,
});

const loadBounties = () => {
  const lastBountyId =
    state.lastBountyId !== null
      ? state.lastBountyId
      : Near.view(daoId, "get_last_bounty_id");
  if (lastBountyId === null) return;

  const fromIndex = Math.max(0, lastBountyId - bountiesPerPage + 1);
  const limit = fromIndex === 0 ? lastBountyId + 1 : bountiesPerPage;

  const newBounties = Near.view(daoId, "get_bounties", {
    from_index: fromIndex,
    limit: limit,
  });
  if (newBounties === null) return;

  State.update({
    ...state,
    hasMore: fromIndex > 0,
    bounties: [...state.bounties, ...newBounties.reverse()],
    lastBountyId: fromIndex - 1,
  });
};

const onChangeDAO = (newDaoId) => {
  State.update({
    daoId: newDaoId,
    bounties: [],
    lastBountyId: null,
    hasMore: true,
  });
};

return (
  <>
    <div>
      <InfiniteScroll loadMore={loadBounties} hasMore={state.hasMore}>
        {state.bounties.map((bounty, i) => (
          <Widget
            key={i}
            src={WIDGET_AUTHOR + "/widget/dev.task"}
            props={{ daoId: state.daoId, bounty: bounty }}
          />
        ))}
      </InfiniteScroll>
    </div>
  </>
);
