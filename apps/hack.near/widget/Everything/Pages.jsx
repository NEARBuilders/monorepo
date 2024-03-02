const type = props.type || "everything";
const domain = props.domain || "everything";

const index = {
  action: domain,
  key: "main",
  options: {
    limit: 10,
    order: "desc",
  },
};

const renderThing = (a) => {
  if (type === "everything" || a.value.type === type) {
    // check for modification
    // see Everything.View.Thing to see the delete function
    // but since we can't actually delete the data,
    // we will check if this blockheight has been modified/hid
    const mod = JSON.parse(
      Social.get(`${a.accountId}/modification/${a.blockHeight}`) || "null"
    );
    // if it has been modified with a hide, then return null
    if (mod && mod.action === "HIDE") {
      return null;
    }
    return (
      <Widget
        src={"evrything.near/widget/Everything.Summary.Thing"}
        props={{
          accountId: a.accountId,
          blockHeight: a.blockHeight,
          type: a.value.type,
        }}
      />
    );
  }
};

return (
  <Widget
    src="hack.near/widget/FilteredIndexFeed"
    props={{ index, renderItem: renderThing }}
  />
);
