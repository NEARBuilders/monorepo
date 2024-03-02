const accountId = props.accountId ?? context.accountId;

const path = props.path ?? "mob.near/widget/MetadataEditor";
const [creatorId, namespace, thingId] = path.split("/");

const starEdge = Social.keys(`${accountId}/graph/star/${path}`, undefined, {
  values_only: true,
});

const starred = starEdge && Object.keys(starEdge).length > 0;

const type = starred ? "unstar" : "star";

const data = {
  graph: {
    star: { [creatorId]: { [namespace]: { [thingId]: starred ? null : "" } } },
  },
  index: {
    graph: JSON.stringify({
      key: "star",
      value: {
        type,
        path,
      },
    }),
    notify: JSON.stringify({
      key: creatorId,
      value: {
        type,
        item: {
          path,
        },
      },
    }),
  },
};

const handleSave = () => {
  Social.set({ data });
};

return (
  <CommitButton
    disabled={!context.accountId}
    className={`btn ${
      starred ? "btn btn-secondary" : "btn btn-outline-secondary"
    }`}
    data={data}
  >
    {" "}
    <i className="bi-star-fill" />
  </CommitButton>
);
