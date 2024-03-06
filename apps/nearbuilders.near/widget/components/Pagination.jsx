const totalPages = props.totalPages ?? 12; // Assume you have 12 pages
const maxVisiblePages = props.maxVisiblePages ?? 4;
const onPageClick = props.onPageClick
  ? props.onPageClick
  : () => console.log("clicked");
const pagesToShow = Math.min(totalPages, maxVisiblePages);
const selectedPage = props.selectedPage === 0 ? 1 : props.selectedPage;
const totalPageSets = Math.ceil(totalPages / maxVisiblePages);
const [currentPageSet, setCurrentPageSet] = useState(1);

const ThemeContainer =
  props.ThemeContainer ||
  styled.div`
    --font-color: #fff;
    --bg-color: none;
    --selected-bg-color: #23242b;
    --arrow-stroke-color: #ffffff1a;
  `;

const Pagination = styled.div`
  display: flex;
  gap: 12px;

  div {
    display: flex;
    height: 40px;
    min-width: 40px;
    padding: 12px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    color: var(--font-color);
    transition: all 300ms;
    cursor: pointer;
    background-color: var(--bg-color);

    /* Other/Button_text */
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    &.selected,
    &:hover {
      background-color: var(--selected-bg-color);
    }

    &.arrow {
      border: 1px solid var(--arrow-stroke-color);
    }

    &.disabled {
      cursor: not-allowed;
    }
  }
`;

const handlePageClick = (pageNumber) => {
  onPageClick(pageNumber);
};

const handleArrowClick = (direction) => {
  if (direction === "left") {
    setCurrentPageSet(Math.max(currentPageSet - 1, 1));
  } else {
    setCurrentPageSet(
      Math.min(currentPageSet + 1, Math.ceil(totalPages / maxVisiblePages)),
    );
  }
};

const getPageNumber = (index) =>
  (currentPageSet - 1) * maxVisiblePages + index + 1;

return (
  <ThemeContainer>
    <Pagination>
      <div
        className={`arrow ${currentPageSet === 1 ? "disabled" : undefined}`}
        onClick={() => handleArrowClick("left")}
      >
        <i className="bi bi-arrow-left"></i>
      </div>
      {Array.from({ length: pagesToShow }).map((_, index) => {
        const pageNumber = getPageNumber(index);
        return (
          <div
            key={pageNumber}
            className={pageNumber === selectedPage ? "selected" : undefined}
            onClick={() => handlePageClick(pageNumber)}
          >
            {pageNumber}
          </div>
        );
      })}
      <div
        className={`arrow ${
          currentPageSet === Math.ceil(totalPages / maxVisiblePages)
            ? "disabled"
            : undefined
        }`}
        onClick={() => handleArrowClick("right")}
      >
        <i className="bi bi-arrow-right"></i>
      </div>
    </Pagination>
  </ThemeContainer>
);
