const [show, setShow] = useState(true);
const onHide = props.onHide ?? (() => setShow(false));
const onSelect = props.onSelect ?? (() => {});
const [searchTerm, setSearchTerm] = useState("");
const [debounce, setDebounce] = useState(null);
const [loading, setLoading] = useState(false);
const [results, setResults] = useState([]);
const debouceTimeout = 1000;

const tenorApiKey = "CIDF1JJPZGRB";
const tenorLimit = 20;

const tenorAnonId = fetch(`https://api.tenor.com/v1/anonid?key=${tenorApiKey}`)
  .body.anon_id;

const Wrapper = styled.div`
  white-space: normal;
  .tenor-logo {
    height: 1em;
  }

  .lightbox {
    backdrop-filter: blur(5px);
  }

  .results {
    display: flex;
    flex-wrap: wrap;
    gap: .25rem;
    .gif {
      height: 120px;
      object-fit: cover;
      cursor: pointer;
    }
  }
`;

const search = (searchTerm) => {
  if (!searchTerm) {
    setResults([]);
    setLoading(false);
    return;
  }

  asyncFetch(
    `https://api.tenor.com/v1/search?tag=${encodeURIComponent(
      searchTerm
    )}&key=${tenorApiKey}&limit=${tenorLimit}&anon_id=${tenorAnonId}`
  ).then((res) => {
    setResults(res.body.results);
    setLoading(false);
  });
};

useEffect(() => {
  clearTimeout(debounce);
  setDebounce(setTimeout(() => search(searchTerm), debouceTimeout));
  setLoading(!!searchTerm);
}, [searchTerm]);

const renderGif = (gif) => {
  return (
    <img
      key={gif.id}
      className="gif"
      onClick={() => onSelect(gif.media[0].gif)}
      src={gif.media[0].tinygif.url}
      alt={gif.content_description}
    />
  );
};

const content = (
  <div
    className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable"
    onClick={(e) => {
      e.stopPropagation();
    }}
  >
    <div className="modal-content">
      <div className="modal-header">
        <div className="modal-title h4">
          GIF Search
          <img
            className="tenor-logo"
            src="https://www.gstatic.com/tenor/web/attribution/PB_tenor_logo_blue_horizontal.svg"
            alt="Powered by Tenor"
          />
        </div>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={onHide}
        ></button>
      </div>
      <div className="modal-body">
        <input
          autoFocus
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <hr />
        {loading ? (
          <span
            key="loading"
            className="spinner-grow spinner-grow-sm me-1"
            role="status"
            aria-hidden="true"
          />
        ) : (
          ""
        )}
        <div key="results" className="results">
          {results ? results.map(renderGif) : "Not found"}
        </div>
      </div>
    </div>
  </div>
);

return (
  <Wrapper>
    <Widget
      key="gif-search"
      src="mob.near/widget/N.Lightbox"
      loading=""
      props={{
        show,
        onHide,
        children: content,
      }}
    />
  </Wrapper>
);
