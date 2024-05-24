import { useCallback, useEffect, useReducer } from "react";
import "./App.css";
import CategoryList from "./components/CategoryList";
import FoodList from "./components/FoodList";
import { fetchCategories, fetchFoods } from "./api/api-calls";
import {
  appReducer,
  categoriesFetched,
  categorySelected,
  foodPageSelected,
  initialAppState,
  pagedFoodsFetched,
} from "./state";

function App() {
  const [appState, dispatch] = useReducer(appReducer, initialAppState);

  useEffect(() => {
    fetchCategories().then((result) => {
      dispatch(categoriesFetched(result));
    });
  }, []);

  useEffect(() => {
    fetchFoods(appState.selectedCategoryId, appState.selectedPage, 10).then(
      (result) => {
        dispatch(pagedFoodsFetched(result));
      }
    );
  }, [appState.selectedCategoryId, appState.selectedPage]);

  const onCategorySelected = useCallback(
    (e: number) => dispatch(categorySelected(e)),
    [appState.categories]
  );

  const onPageSelected = (e: number) => dispatch(foodPageSelected(e));

  return (
    <div className="App">
      <CategoryList
        categories={appState.categories}
        onCategorySelected={onCategorySelected}
      />

      <FoodList pagedFoods={appState.foods} onSetPage={onPageSelected} />
    </div>
  );
}

export default App;
