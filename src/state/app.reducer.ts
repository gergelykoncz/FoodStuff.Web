import { AppAction } from "./app.actions";
import { AppState } from "./app.state";

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "CATEGORIES_FETCHED":
    case "CATEGORY_SELECTED":
    case "PAGED_FOODS_FETCHED":
    case "FOOD_PAGE_SELECTED":
    case "CATEGORIES_CALL_FAILED":
    case "FOODS_CALL_FAILED":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
