import "./Pager.scss";
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
    <div className="app-pager">
      <button
        data-testid="pager-previous"
        className="app-pager-previous"
        disabled={currentPage === 0}
        onClick={() => onSetPage(currentPage - 1)}
      >
        <span className="from-tablet">{t("previous")}</span>
        <span className="to-tablet">&lt;</span>
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
          <div key={i}>{i}</div>
        )
      )}
      <button
        data-testid="pager-next"
        className="app-pager-next"
        disabled={numberOfPages <= currentPage + 1}
        onClick={() => onSetPage(currentPage + 1)}
      >
        <span className="from-tablet">{t("next")}</span>
        <span className="to-tablet">&gt;</span>
      </button>
    </div>
  );
}
