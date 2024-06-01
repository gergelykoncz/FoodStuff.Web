import { useTranslation } from "react-i18next";
import { generateLogarithmicPages } from "../utils";

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
  const { t } = useTranslation();
  const numberOfPages = Math.ceil(count / pageSize);
  const pageArray = generateLogarithmicPages(numberOfPages, currentPage + 1, 4);

  return (
    <div className="pager">
      <button
        data-testid="pager-previous"
        disabled={currentPage === 0}
        onClick={() => onSetPage(currentPage - 1)}
      >
        {t("previous")}
      </button>
      {pageArray.map((i) =>
        typeof i === "number" ? (
          <div
            data-testid="pager-page-item"
            className={currentPage === i ? "selected" : ""}
            key={i}
            onClick={() => typeof i === "number" && onSetPage(i)}
          >
            {i + 1}
          </div>
        ) : (
          <div>{i}</div>
        )
      )}
      <button
        data-testid="pager-next"
        disabled={numberOfPages <= currentPage + 1}
        onClick={() => onSetPage(currentPage + 1)}
      >
        {t("next")}
      </button>
    </div>
  );
}
