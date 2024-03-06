const data = Social.keys("*/profile/tags/*", "final");

if (!data) {
  return "Loading";
}

const accounts = Object.entries(data);

const allWidgets = accounts.map((account) => {
  const accountId = account[0];
  const tags = Object.keys(account[1].profile.tags || {});

  return (
    <div className="mb-2">
      <Widget src="mob.near/widget/Profile" props={{ accountId }} />
      {tags.length > 0 && (
        <div>
          {tags.map((tag) => (
            <span className="me-1 mb-1 badge bg-secondary">#{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
});

return <>{allWidgets}</>;
