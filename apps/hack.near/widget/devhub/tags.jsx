const { getAllLabels, getPostsByLabel } = VM.require(
  "devhub.near/widget/core.adapter.devhub-contract"
);

if (!getAllLabels || !getPostsByLabel) {
  return <p>Loading modules...</p>;
}

const tags = getAllLabels();
if (tags === null) {
  return <div>Loading...</div>;
}

// Create a function to get the number of posts for a tag
const getPostCount = (tag) => {
  const posts = getPostsByLabel({ label: tag });
  return posts ? posts.length : 0;
};

// Sort the tags based on the number of posts
tags.sort((a, b) => getPostCount(b) - getPostCount(a));

return (
  <div>
    <h3>Common Tags</h3>
    <h5>
      <i>
        of <a href="/devhub.near/widget/app">Near DevHub</a>
      </i>
    </h5>
    <ol>
      {tags.map((tag, index) => (
        <li key={index}>
          {tag} ~ <b>{getPostCount(tag)}</b> posts
        </li>
      ))}
    </ol>
  </div>
);
