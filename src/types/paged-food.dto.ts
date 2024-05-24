export interface FoodDto {
  id: number;
  name: string;
}

export interface PagedFoodDto {
  foods: FoodDto[];
  count: number;
  currentPage: number;
  pageSize: number;
}
