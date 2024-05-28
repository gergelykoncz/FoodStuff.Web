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
> => baseGet("foodCategory");

export const fetchFoodsByCategory = async (
  categoryId: number,
  currentPage: number,
  pageSize: number
): Promise<ApiCallResult<PagedFoodDto>> =>
  baseGet(`food/category/${categoryId}/${currentPage}/${pageSize}`);

export const fetchFoodsBySearchTerm = async (
  searchTerm: string,
  currentPage: number,
  pageSize: number
): Promise<ApiCallResult<PagedFoodDto>> =>
  baseGet(`food/search/${searchTerm}/${currentPage}/${pageSize}`);
