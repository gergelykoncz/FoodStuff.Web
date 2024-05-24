import { FoodCategoryDto, PagedFoodDto } from "../types";
import { ApiCallResult } from "../types/api-call-result.dto";

const apiRoot = "http://localhost:5023";

export const fetchCategories = async (): Promise<
  ApiCallResult<FoodCategoryDto[]>
> => {
  try {
    const rawResult = await fetch(`${apiRoot}/FoodCategory`);
    const jsonResult = await rawResult.json();
    jsonResult.sort((a: FoodCategoryDto, b: FoodCategoryDto) =>
      a.name.localeCompare(b.name)
    );
    return { result: await rawResult.json() };
  } catch (error) {
    return {
      result: undefined,
      error,
    };
  }
};

export const fetchFoods = async (
  categoryId: number,
  currentPage: number,
  pageSize: number
): Promise<ApiCallResult<PagedFoodDto>> => {
  try {
    const rawResult = await fetch(
      `${apiRoot}/Food?categoryId=${categoryId}&page=${currentPage}&pageSize=${pageSize}`
    );
    return { result: await rawResult.json() };
  } catch (error) {
    return {
      result: undefined,
      error,
    };
  }
};
