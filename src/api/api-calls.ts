import { FoodCategoryDto, PagedFoodDto } from "../types";

const apiRoot = "http://localhost:5023";

export const fetchCategories = async (): Promise<FoodCategoryDto[]> => {
  const rawResult = await fetch(`${apiRoot}/FoodCategory`);
  const jsonResult = await rawResult.json();
  jsonResult.sort((a: FoodCategoryDto, b: FoodCategoryDto) =>
    a.name.localeCompare(b.name)
  );
  return await jsonResult;
};

export const fetchFoods = async (
  categoryId: number,
  currentPage: number,
  pageSize: number
): Promise<PagedFoodDto> => {
  const rawResult = await fetch(
    `${apiRoot}/Food?categoryId=${categoryId}&page=${currentPage}&pageSize=${pageSize}`
  );
  return await rawResult.json();
};
