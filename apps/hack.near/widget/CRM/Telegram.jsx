const data = Social.keys("*/profile/linktree", "final");
const tg = Social.keys("*/profile/linktree/telegram", "final");

if (!data || !tg) {
  return "Loading";
}

const withTelegram = new Set([...Object.keys(tg)]);

const profilesPerPage = 10;

const [currentPage, setCurrentPage] = useState(1);

const startIndex = (currentPage - 1) * profilesPerPage;
const endIndex = startIndex + profilesPerPage;
const displayedProfiles = Object.keys(data)
  .filter((accountId) => withTelegram.has(accountId))
  .slice(startIndex, endIndex);

const handlePageChange = (page) => {
  setCurrentPage(page);
};

const totalPages = Math.ceil(
  Object.keys(data).filter((accountId) => withTelegram.has(accountId)).length /
    profilesPerPage
);

const accounts = displayedProfiles.map((accountId) => (
  <div className="m-2" key={accountId}>
    <Widget src="hack.near/widget/profile.tg" props={{ accountId }} />
  </div>
));

return (
  <div>
    <h3 className="m-2 mb-3">Near Social Users on Telegram</h3>
    <h5 className="m-2 mb-3">{Object.keys(tg).length} total</h5>
    <div className="m-2">{accounts}</div>
    <div className="m-3">
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
