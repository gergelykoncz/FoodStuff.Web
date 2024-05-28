import { fetchCategories, fetchFoodsByCategory } from "../api/api-calls";
import {
  AppAction,
  AppState,
  categoriesCallFailed,
  categoriesFetched,
  foodsCallFailed,
  pagedFoodsFetched,
} from "../state";

export const loadCategories = async (dispatch: React.Dispatch<AppAction>) => {
  const response = await fetchCategories();
  if (response.error || !response.result) {
    dispatch(categoriesCallFailed());
  } else {
    dispatch(categoriesFetched(response.result));
  }
};

export const loadFoodsByCategory = async (
  dispatch: React.Dispatch<AppAction>,
  appState: AppState
) => {
  const response = await fetchFoodsByCategory(
    appState.selectedCategoryId,
    appState.selectedPage,
    10
  );
  if (response.error || !response.result) {
    dispatch(foodsCallFailed());
  } else {
    dispatch(pagedFoodsFetched(response.result));
  }
};
