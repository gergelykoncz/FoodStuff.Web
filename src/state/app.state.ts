import { FoodCategoryDto, PagedFoodDto } from "../types";

export interface AppState {
  categories: FoodCategoryDto[];
  foods: PagedFoodDto;
  selectedCategoryId: number;
  selectedPage: number;
  isCategoriesCallFailed: boolean;
  isFoodsCallFailed: boolean;
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
  isCategoriesCallFailed: false,
  isFoodsCallFailed: false,
};
