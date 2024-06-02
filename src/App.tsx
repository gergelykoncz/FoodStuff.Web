import "./App.scss";
import { useCallback, useEffect, useReducer } from "react";
import FoodList from "./components/FoodList";
import Header from "./components/Header";
import {
  appReducer,
  categorySelected,
  foodPageSelected,
  initialAppState,
  searchQueryUpdated,
} from "./state";
import { loadCategories, loadFoodsByCategory } from "./services/food.service";

function App() {
  const [appState, dispatch] = useReducer(appReducer, initialAppState);

  useEffect(() => {
    loadCategories(dispatch);
  }, []);

  useEffect(() => {
    loadFoodsByCategory(dispatch, appState);
  }, [
    appState.selectedCategoryId,
    appState.selectedPage,
    appState.searchQuery,
  ]);

  const onCategorySelected = useCallback(
    (e: number) => dispatch(categorySelected(e)),
    [appState.categories]
  );

  const onPageSelected = (e: number) => dispatch(foodPageSelected(e));

  const onSearch = (e: string | undefined) => dispatch(searchQueryUpdated(e));

  return (
    <div className="app">
      <Header onSearch={onSearch} />
      <div className="app-content">
        <FoodList
          hasError={appState.isFoodsCallFailed}
          isLoading={appState.isFoodsCallInProgress}
          pagedFoods={appState.foods}
          onSetPage={onPageSelected}
        />
      </div>
    </div>
  );
}

export default App;
