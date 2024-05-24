type PagerProps = {
  count: number;
  currentPage: number;
  pageSize: number;
  onSetPage: (e: number) => void;
};

export default function Pager({
  count,
  currentPage,
  pageSize,
  onSetPage,
}: PagerProps) {
  const numberOfPages = Math.ceil(count / pageSize);
  const pageArray = new Array(numberOfPages).fill(0);
  return (
    <div className="pager">
      <button
        data-testid="pager-previous"
        disabled={currentPage === 0}
        onClick={() => onSetPage(currentPage - 1)}
      >
        Prev
      </button>
      {pageArray.map((_, i) => (
        <div
          data-testid="pager-page-item"
          className={currentPage === i ? "selected" : ""}
          key={i}
          onClick={() => onSetPage(i)}
        >
          {i + 1}
        </div>
      ))}
      <button
        data-testid="pager-next"
        disabled={numberOfPages <= currentPage + 1}
        onClick={() => onSetPage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}
