import { useCallback, useEffect, useState } from "react";
import "./App.css";
import CategoryList from "./components/CategoryList";
import FoodList from "./components/FoodList";
import { FoodCategoryDto, PagedFoodDto } from "./types";
import { fetchCategories, fetchFoods } from "./api/api-calls";

function App() {
  const [categories, setCategories] = useState<FoodCategoryDto[]>([]);
  const [pagedFoods, setPagedFoods] = useState<PagedFoodDto>({
    foods: [],
    count: 0,
    currentPage: 0,
    pageSize: 10
  } as PagedFoodDto);
  const [categoryId, setCategoryId] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchCategories().then((result) => {
      setCategories(result)
    });
  }, []);

  useEffect(() => {
    fetchFoods(categoryId, currentPage, 10).then(result => {
      setPagedFoods(result)
    })
  }, [categoryId, currentPage]);

  const onCategorySelected = useCallback(
    (e: number) => {
      setCategoryId(e);
      setCurrentPage(0);
    },
    [categories]
  );

  const onPageSelected = (e: number) => {
    const page = Math.max(0, e);
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <CategoryList
        categories={categories}
        onCategorySelected={onCategorySelected}
      />

      <FoodList pagedFoods={pagedFoods} onSetPage={onPageSelected} />
    </div>
  );
}

export default App;
