const { getAllAuthors, getPostsByAuthor } = VM.require(
  "devhub.near/widget/core.adapter.devhub-contract"
);

if (!getAllAuthors || !getPostsByAuthor) {
  return <p>Loading modules...</p>;
}

const devs = getAllAuthors();
if (devs === null) {
  return <div>Loading...</div>;
}

const getPostCount = (dev) => {
  const posts = getPostsByAuthor({ author: dev });
  return posts ? posts.length : 0;
};

devs.sort((a, b) => getPostCount(b) - getPostCount(a));

return (
  <div>
    <h3>Post Authors</h3>
    <h5>
      <i>
        of <a href="/devhub.near/widget/app">Near DevHub</a>
      </i>
    </h5>
    <ol>
      {devs.map((dev, index) => (
        <li key={index}>
          <Widget
            src="mob.near/widget/N.ProfileLine"
            props={{ accountId: dev, hideAccountId: true }}
          />{" "}
          ~ <b>{getPostCount(dev)}</b> posts
        </li>
      ))}
    </ol>
  </div>
);
