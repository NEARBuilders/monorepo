State.init({
  starts_at: 1702123200000,
  expires_at: 1702814400000,
  total_participants_allowed: 23,
  indexer_name: "test",
  title: "create something useful",
  description: "everyone is learning together",
  img_url:
    "https://researchathon.mypinata.cloud/ipfs/QmUjZgep4cEG3BctH3UFn17HvqZ96xhWeTGacoruAHGsjA",
  tags: "build, hack, dev",
  deposit: "1000000000000000000000000",
});

const handleChange = (e) => {
  const { name, value } = e.target;
  State.update({
    ...state,
    [name]: value,
  });
};

const createQuest = () => {
  const questArgs = {
    starts_at: parseInt(state.starts_at, 10),
    expires_at: parseInt(state.expires_at, 10),
    total_participants_allowed: parseInt(state.total_participants_allowed, 10),
    indexer_name: state.indexer_name,
    title: state.title,
    description: state.description,
    img_url: state.img_url,
    tags: state.tags.split(",").map((tag) => tag.trim()),
  };

  Near.call([
    {
      contractName: "test1.questverse.near",
      methodName: "create_quest",
      args: questArgs,
      deposit: state.deposit,
    },
  ]);
};

return (
  <>
    <div className="m-3">
      <label htmlFor="starts_at">Starts At:</label>
      <input
        type="date"
        id="starts_at"
        name="starts_at"
        value={state.starts_at}
        onChange={(e) => {
          State.update({
            starts_at: e.target.value,
          });
        }}
      />
    </div>
    <div className="m-3">
      <label htmlFor="expires_at">Expires At:</label>
      <input
        type="date"
        id="expires_at"
        name="expires_at"
        value={state.expires_at}
        onChange={(e) => {
          State.update({
            expires_at: e.target.value,
          });
        }}
      />
    </div>
    <div className="m-3">
      <label htmlFor="total_participants_allowed">
        Total Participants Allowed:
      </label>
      <input
        type="number"
        id="total_participants_allowed"
        name="total_participants_allowed"
        value={state.total_participants_allowed}
        onChange={(e) => {
          State.update({
            total_participants_allowed: e.target.value,
          });
        }}
      />
    </div>
    <div className="m-3">
      <label htmlFor="indexer_name">Indexer Name:</label>
      <input
        type="text"
        id="indexer_name"
        name="indexer_name"
        value={state.indexer_name}
        onChange={(e) => {
          State.update({
            indexer_name: e.target.value,
          });
        }}
      />
    </div>
    <div className="m-3">
      <label htmlFor="deposit">Amount:</label>
      <input
        type="text"
        id="deposit"
        name="deposit"
        value={state.deposit}
        onChange={(e) => {
          State.update({
            deposit: e.target.value,
          });
        }}
      />
    </div>
    <div className="m-3">
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={state.title}
        onChange={(e) => {
          State.update({
            title: e.target.value,
          });
        }}
      />
    </div>
    <div className="m-3">
      <label htmlFor="description">Description:</label>
      <input
        type="text"
        id="description"
        name="description"
        value={state.description}
        onChange={(e) => {
          State.update({
            description: e.target.value,
          });
        }}
      />
    </div>
    <div className="m-3">
      <label htmlFor="img_url">Image:</label>
      <input
        type="text"
        id="img_url"
        name="img_url"
        value={state.img_url}
        onChange={(e) => {
          State.update({
            img_url: e.target.value,
          });
        }}
      />
    </div>
    <div className="m-3">
      <label htmlFor="tags">Tags:</label>
      <input
        type="text"
        id="tags"
        name="tags"
        value={state.tags}
        onChange={(e) => {
          State.update({
            tags: e.target.value,
          });
        }}
      />
    </div>
    <div className="m-3">
      <button onClick={createQuest}>Create</button>
    </div>
  </>
);
