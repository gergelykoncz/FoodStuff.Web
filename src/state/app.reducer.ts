import { FoodCategoryDto, PagedFoodDto } from "../types";

export interface AppState {
  categories: FoodCategoryDto[];
  foods: PagedFoodDto;
  selectedCategoryId: number;
  selectedPage: number;
}

export const initialAppState: AppState = {
  categories: [],
  foods: {
    foods: [],
    count: 0,
    currentPage: 0,
    pageSize: 10,
  },
  selectedCategoryId: 1,
  selectedPage: 0,
};

type Action = {
  type: ActionTypes;
  payload: Partial<{ [K in keyof AppState]: AppState[K] }>;
};

export type ActionTypes =
  | "CATEGORIES_FETCHED"
  | "CATEGORY_SELECTED"
  | "PAGED_FOODS_FETCHED"
  | "FOOD_PAGE_SELECTED";

export const categoriesFetched = (categories: FoodCategoryDto[]): Action => ({
  type: "CATEGORIES_FETCHED",
  payload: { categories },
});

export const pagedFoodsFetched = (foods: PagedFoodDto): Action => ({
  type: "PAGED_FOODS_FETCHED",
  payload: { foods },
});

export const categorySelected = (selectedCategoryId: number): Action => ({
  type: "CATEGORY_SELECTED",
  payload: {
    selectedCategoryId,
    selectedPage: 0,
  },
});

export const foodPageSelected = (selectedPage: number): Action => ({
  type: "FOOD_PAGE_SELECTED",
  payload: { selectedPage: Math.max(0, selectedPage) },
});

export const appReducer = (state: AppState, action: Action): AppState => {
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
