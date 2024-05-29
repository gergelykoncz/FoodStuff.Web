import { useEffect, useState, memo } from "react";
import { useTranslation } from "react-i18next";
import { FoodCategoryDto } from "../types/food-category.dto";

type CategoryListProps = {
  categories: FoodCategoryDto[];
  hasError: boolean;
  onCategorySelected: (e: number) => void;
  onRetry: () => void;
};

function CategoryList({
  categories,
  hasError,
  onCategorySelected,
  onRetry,
}: CategoryListProps) {
  const { t } = useTranslation();
  const [filter, setFilter] = useState(categories);

  useEffect(() => setFilter(categories), [categories]);

  const onFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (!text) {
      setFilter(categories);
    } else {
      setFilter(
        categories.filter((c) =>
          c.name.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  return (
    <div className="category-list">
      <h3>{t("categories")}</h3>
      <input
        type="search"
        placeholder={t("search")}
        onChange={onFilter}
        disabled={hasError}
      />

      {hasError ? (
        <div>
          <div>{t("categories_error")}</div>
          <button onClick={() => onRetry()}>{t("retry_loading")}</button>
        </div>
      ) : (
        filter.map((c) => (
          <div
            onClick={() => onCategorySelected(c.id)}
            className="category-item"
            key={c.id}
          >
            {c.name} ({c.count})
          </div>
        ))
      )}
    </div>
  );
}

export default memo(CategoryList);
