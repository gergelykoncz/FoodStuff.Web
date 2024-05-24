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
  | "FOOD_PAGE_SELECTED"
  | "CATEGORIES_CALL_FAILED"
  | "FOODS_CALL_FAILED";

export const categoriesFetched = (
  categories: FoodCategoryDto[]
): AppAction => ({
  type: "CATEGORIES_FETCHED",
  payload: { categories, isCategoriesCallFailed: false },
});

export const pagedFoodsFetched = (foods: PagedFoodDto): AppAction => ({
  type: "PAGED_FOODS_FETCHED",
  payload: { foods, isFoodsCallFailed: false },
});

export const categorySelected = (selectedCategoryId: number): AppAction => ({
  type: "CATEGORY_SELECTED",
  payload: {
    selectedCategoryId,
    selectedPage: 0,
  },
});

export const categoriesCallFailed = (): AppAction => ({
  type: "CATEGORIES_CALL_FAILED",
  payload: {
    isCategoriesCallFailed: true,
  },
});

export const foodsCallFailed = (): AppAction => ({
  type: "FOODS_CALL_FAILED",
  payload: {
    isFoodsCallFailed: true,
  },
});

export const foodPageSelected = (selectedPage: number): AppAction => ({
  type: "FOOD_PAGE_SELECTED",
  payload: { selectedPage: Math.max(0, selectedPage) },
});
