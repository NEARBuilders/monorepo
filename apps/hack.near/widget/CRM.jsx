const data = Social.keys("*/profile/linktree", "final");
const telegram = Social.keys("*/profile/linktree/telegram", "final");
const github = Social.keys("*/profile/linktree/github", "final");
const twitter = Social.keys("*/profile/linktree/twitter", "final");
const website = Social.keys("*/profile/linktree/website", "final");

if (!data || !telegram || !github || !twitter || !website) {
  return "Loading...";
}

const withData = new Set([...Object.keys(data)]);
const withTelegram = new Set([...Object.keys(telegram)]);
const withGitHub = new Set([...Object.keys(github)]);
const withTwitter = new Set([...Object.keys(twitter)]);
const withWebsite = new Set([...Object.keys(website)]);

const [filterBy, setFilterBy] = useState(withData);

const profilesPerPage = 10;

const [currentPage, setCurrentPage] = useState(1);

const startIndex = (currentPage - 1) * profilesPerPage;

const endIndex = startIndex + profilesPerPage;

const displayedProfiles = [...filterBy].slice(startIndex, endIndex);

const handlePageChange = (page) => {
  setCurrentPage(page);
};

const totalPages = Math.ceil(
  Object.keys(data).filter((accountId) => filterBy.has(accountId)).length /
    profilesPerPage
);

const accounts = displayedProfiles.map((accountId) => (
  <div className="m-2" key={accountId}>
    <hr />

    <Widget src="hack.near/widget/profile.linktree" props={{ accountId }} />
  </div>
));

return (
  <div>
    <h3 className="m-2 mb-3">Near Social Profiles</h3>
    <div className="flex-row m-2">
      <Widget src="mob.near/widget/People" />
    </div>
    <br />
    <div className="flex-row m-2">
      <h5>Filter By Available Linktree Data:</h5>
      <button
        onClick={() => setFilterBy(withTwitter)}
        disabled={filterBy === withTwitter}
      >
        Twitter
      </button>
      <button
        onClick={() => setFilterBy(withGitHub)}
        disabled={filterBy === withGitHub}
      >
        GitHub
      </button>
      <button
        onClick={() => setFilterBy(withTelegram)}
        disabled={filterBy === withTelegram}
      >
        Telegram
      </button>
      <button
        onClick={() => setFilterBy(withWebsite)}
        disabled={filterBy === withWebsite}
      >
        Website
      </button>
      <button
        onClick={() => setFilterBy(withData)}
        disabled={filterBy === withData}
      >
        Reset
      </button>
    </div>
    <br />
    <h5 className="m-2 mb-3">{[...filterBy].length} total</h5>
    <div className="m-2">{accounts}</div>
    <div className="m-3">
      <hr />
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous Page
      </button>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next Page
      </button>
    </div>
  </div>
);
