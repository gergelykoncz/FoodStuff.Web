import {
  fetchCategories,
  fetchFoodsByCategory,
  fetchFoodsBySearchTerm,
} from "./api-calls";

var fetchMock: jest.Mock;

jest.mock("./fetch-wrapper", () => {
  fetchMock = jest.fn();

  return {
    fetchWrapper: fetchMock,
  };
});

describe("apiCalls", () => {
  describe("fetchCategories", () => {
    test("it should call the api", async () => {
      fetchMock.mockResolvedValueOnce({
        json: () => Promise.resolve({ test: 1 }),
      });
      const result = await fetchCategories();
      expect(result.result).toEqual({
        test: 1,
      });
      expect(fetchMock).toHaveBeenLastCalledWith(
        expect.stringContaining("foodCategory")
      );
    });

    test("it should handle failure", async () => {
      fetchMock.mockRejectedValueOnce({
        error: true,
      });
      const result = await fetchCategories();
      expect(result.error).toEqual({
        error: true,
      });
      expect(fetchMock).toHaveBeenLastCalledWith(
        expect.stringContaining("foodCategory")
      );
    });
  });

  describe("fetchFoodsByCategory", () => {
    test("it should call the api", async () => {
      fetchMock.mockResolvedValueOnce({
        json: () => Promise.resolve({ test: 1 }),
      });
      const result = await fetchFoodsByCategory(0, 0, 10);
      expect(result.result).toEqual({
        test: 1,
      });
      expect(fetchMock).toHaveBeenLastCalledWith(
        expect.stringContaining("food/category/0/0/10")
      );
    });

    test("it should handle failure", async () => {
      fetchMock.mockRejectedValueOnce({
        error: true,
      });
      const result = await fetchFoodsByCategory(0, 0, 10);
      expect(result.error).toEqual({
        error: true,
      });
      expect(fetchMock).toHaveBeenLastCalledWith(
        expect.stringContaining("food/category/0/0/10")
      );
    });
  });

  describe("fetchFoodsBySearchTerm", () => {
    test("it should call the api", async () => {
      fetchMock.mockResolvedValueOnce({
        json: () => Promise.resolve({ test: 1 }),
      });
      const result = await fetchFoodsBySearchTerm("hello", 0, 10);
      expect(result.result).toEqual({
        test: 1,
      });
      expect(fetchMock).toHaveBeenLastCalledWith(
        expect.stringContaining("food/search/hello/0/10")
      );
    });

    test("it should handle failure", async () => {
      fetchMock.mockRejectedValueOnce({
        error: true,
      });
      const result = await fetchFoodsBySearchTerm("hello", 0, 10);
      expect(result.error).toEqual({
        error: true,
      });
      expect(fetchMock).toHaveBeenLastCalledWith(
        expect.stringContaining("food/search/hello/0/10")
      );
    });
  });
});
