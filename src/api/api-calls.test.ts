import { fetchCategories, fetchFoods } from "./api-calls";

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
        expect.stringContaining("FoodCategory")
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
        expect.stringContaining("FoodCategory")
      );
    });
  });

  describe("fetchFoods", () => {
    test("it should call the api", async () => {
      fetchMock.mockResolvedValueOnce({
        json: () => Promise.resolve({ test: 1 }),
      });
      const result = await fetchFoods(0, 0, 10);
      expect(result.result).toEqual({
        test: 1,
      });
      expect(fetchMock).toHaveBeenLastCalledWith(
        expect.stringContaining("Food?categoryId=0&page=0&pageSize=10")
      );
    });

    test("it should handle failure", async () => {
      fetchMock.mockRejectedValueOnce({
        error: true,
      });
      const result = await fetchFoods(0, 0, 10);
      expect(result.error).toEqual({
        error: true,
      });
      expect(fetchMock).toHaveBeenLastCalledWith(
        expect.stringContaining("Food?categoryId=0&page=0&pageSize=10")
      );
    });
  });
});
