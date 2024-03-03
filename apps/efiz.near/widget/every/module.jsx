function mergeItems(iIndex, oldItems, newItems, desc) {
  const index = indices[iIndex];
  const items = [
    ...new Set(
      [
        ...newItems.map((item) => ({
          ...item,
          action: index.action,
          key: index.key,
          index: iIndex,
        })),
        ...oldItems,
      ].map((i) => JSON.stringify(i))
    ),
  ].map((i) => JSON.parse(i));
  items.sort((a, b) => a.blockHeight - b.blockHeight);
  if (desc) {
    items.reverse();
  }
  return items;
}

function Grid({ children, numColumns }) {
  const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(${numColumns || 3}, 1fr);

    @media (hover: none) {
      grid-template-columns: repeat(1, 1fr);
    }
  `;
  return <StyledGrid>{children}</StyledGrid>;
}

function normalizePath(path) {
  return path.replace(/\//g, "_");
}

function generateUID() {
  return (
    Math.random().toString(16).slice(2) +
    Date.now().toString(36) +
    Math.random().toString(16).slice(2)
  );
}

function createThing({ data, type, thingId, onCommit, onCancel }) {
  thingId = thingId || generateUID();

  const save = {
    every: {
      thing: {
        [thingId]: JSON.stringify(data),
      },
    },
    index: {
      every: JSON.stringify({
        key: type,
        value: {
          thingId,
          type,
        },
      }),
    },
  };
  Social.set(save, {
    onCommit,
    onCancel,
  });
}

return { mergeItems, Grid, normalizePath };
