import { useEffect, useState, memo } from "react";
import { FoodCategoryDto } from "../types/food-category.dto";

type CategoryListProps = {
  categories: FoodCategoryDto[],
  onCategorySelected: (e: number) => void
}

function CategoryList({ categories, onCategorySelected }: CategoryListProps) {
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
      <h3>Categories</h3>
      <input type="search" placeholder="Search" onChange={onFilter} />
      {filter.map((c) => (
        <div
          onClick={() => onCategorySelected(c.id)}
          className="category-item"
          key={c.id}
        >
          {c.name} ({c.count})
        </div>
      ))}
    </div>
  );
}

export default memo(CategoryList);
