const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet to add a new meme";
}

State.init({
  meme: { title: "", description: "" },
  img: {},
  done: false,
});

const meme = {
  title: state.meme.title,
  description: state.meme.description,
  image: {},
};

if (state.img.cid) {
  meme.image.ipfs_cid = state.img.cid;
}

const hasMeme = meme.image.ipfs_cid || meme.title;

return (
  <div className="row mb-3">
    <div>
      <h4>Add a meme</h4>
    </div>

    <div className="mb-2">
      Meme:
      <br />
      <IpfsImageUpload image={state.img} />
    </div>
    {meme.image.ipfs_cid && (
      <div className="mb-2">
        Title <span className="text-secondary">(optional)</span>
        <input type="text" value={state.meme.title} />
      </div>
    )}
    {state.meme.title && (
      <div className="mb-2">
        Description <span className="text-secondary">(optional)</span>
        <input type="text" value={state.meme.description} />
      </div>
    )}
    <div className="mb-2">
      {hasMeme ? (
        <CommitButton
          data={{ post: { meme } }}
          onCommit={() => {
            State.update({
              meme: { title: "", description: "" },
              img: {},
              done: true,
            });
          }}
        >
          Post meme
        </CommitButton>
      ) : (
        !props.noPrevMeme && (
          <a
            className="btn btn-outline-primary"
            href={`#/mob.near/widget/Meme?accountId=${accountId}`}
          >
            View your last meme
          </a>
        )
      )}
    </div>
    <hr />
    {state.done && !hasMeme && (
      <div className="alert alert-success">Success!</div>
    )}
    {(hasMeme || !props.noPrevMeme) && (
      <Widget
        src="mob.near/widget/Meme"
        props={{ meme: hasMeme ? meme : undefined }}
      />
    )}
  </div>
);
