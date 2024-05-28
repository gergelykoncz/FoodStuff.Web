import { useCallback, useEffect, useReducer } from "react";
import "./App.css";
import CategoryList from "./components/CategoryList";
import FoodList from "./components/FoodList";
import {
  appReducer,
  categorySelected,
  foodPageSelected,
  initialAppState,
} from "./state";
import { loadCategories, loadFoodsByCategory } from "./services/food.service";

function App() {
  const [appState, dispatch] = useReducer(appReducer, initialAppState);

  useEffect(() => {
    loadCategories(dispatch);
  }, []);

  useEffect(() => {
    loadFoodsByCategory(dispatch, appState);
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
        hasError={appState.isCategoriesCallFailed}
        onCategorySelected={onCategorySelected}
        onRetry={() => loadCategories(dispatch)}
      />

      <FoodList
        hasError={appState.isFoodsCallFailed}
        pagedFoods={appState.foods}
        onSetPage={onPageSelected}
      />
    </div>
  );
}

export default App;
