import { FoodCategoryDto, PagedFoodDto } from "../types";
import { AppState } from "./app.state";

export interface AppAction {
  type: ActionTypes;
  payload: Partial<{ [K in keyof AppState]: AppState[K] }>;
}

export type ActionTypes =
  | "CATEGORIES_FETCHED"
  | "CATEGORY_SELECTED"
  | "PAGED_FOODS_FETCHED"
  | "FOOD_PAGE_SELECTED";

export const categoriesFetched = (
  categories: FoodCategoryDto[]
): AppAction => ({
  type: "CATEGORIES_FETCHED",
  payload: { categories },
});

export const pagedFoodsFetched = (foods: PagedFoodDto): AppAction => ({
  type: "PAGED_FOODS_FETCHED",
  payload: { foods },
});

export const categorySelected = (selectedCategoryId: number): AppAction => ({
  type: "CATEGORY_SELECTED",
  payload: {
    selectedCategoryId,
    selectedPage: 0,
  },
});

export const foodPageSelected = (selectedPage: number): AppAction => ({
  type: "FOOD_PAGE_SELECTED",
  payload: { selectedPage: Math.max(0, selectedPage) },
});
