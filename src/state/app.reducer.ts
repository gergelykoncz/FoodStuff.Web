import { AppAction } from "./app.actions";
import { AppState } from "./app.state";

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "CATEGORIES_FETCHED":
    case "CATEGORY_SELECTED":
    case "PAGED_FOODS_FETCHED":
    case "FOOD_PAGE_SELECTED":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
