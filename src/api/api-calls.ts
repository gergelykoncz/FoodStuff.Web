import { FoodCategoryDto, PagedFoodDto } from "../types";
import { ApiCallResult } from "../types/api-call-result.dto";
import { fetchWrapper } from "./fetch-wrapper";

const apiRoot = "http://localhost:5023";

export const baseGet = async <T>(path: string): Promise<ApiCallResult<T>> => {
  try {
    const rawResult = await fetchWrapper(`${apiRoot}/${path}`);
    return { result: await rawResult.json() };
  } catch (error) {
    return {
      error,
    };
  }
};

export const fetchCategories = async (): Promise<
  ApiCallResult<FoodCategoryDto[]>
> => baseGet("FoodCategory");

export const fetchFoods = async (
  categoryId: number,
  currentPage: number,
  pageSize: number
): Promise<ApiCallResult<PagedFoodDto>> =>
  baseGet(
    `Food?categoryId=${categoryId}&page=${currentPage}&pageSize=${pageSize}`
  );
