const items = props.items;
const renderItem = props.renderItem;
const perPage = props.perPage || 10;

const jItems = JSON.stringify(items);
if (state.jItems !== jItems) {
  State.update({
    widgets: 0,
    jItems,
  });
}

const makeMoreItems = () => {
  State.update({
    widgets: state.widgets + perPage,
  });
};

return (
  <InfiniteScroll
    pageStart={0}
    loadMore={makeMoreItems}
    hasMore={state.widgets < items.length}
    loader={<div className="loader">Loading ...</div>}
  >
    {items.slice(0, state.widgets).map(renderItem)}
  </InfiniteScroll>
);
