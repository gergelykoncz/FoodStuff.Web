import { AppState } from "../state";
import { loadCategories, loadFoodsByCategory } from "./food.service";

var categoriesCallFailed: jest.Mock;
var categoriesFetched: jest.Mock;
var foodsCallFailed: jest.Mock;
var pagedFoodsFetched: jest.Mock;

var fetchCategories: jest.Mock;
var fetchFoodsByCategory: jest.Mock;
var fetchFoodsBySearchTerm: jest.Mock;

jest.mock("../state", () => {
  categoriesCallFailed = jest.fn();
  categoriesFetched = jest.fn();
  foodsCallFailed = jest.fn();
  pagedFoodsFetched = jest.fn();

  return {
    categoriesCallFailed,
    categoriesFetched,
    foodsCallFailed,
    pagedFoodsFetched,
  };
});

jest.mock("../api/api-calls", () => {
  fetchCategories = jest.fn();
  fetchFoodsByCategory = jest.fn();
  fetchFoodsBySearchTerm = jest.fn();

  return {
    fetchCategories,
    fetchFoodsByCategory,
    fetchFoodsBySearchTerm,
  };
});

let dispatchSpy = jest.fn();

describe("loadCategories", () => {
  beforeEach(() => {
    dispatchSpy.mockReset();
  });

  it("should dispatch the failure action", async () => {
    fetchCategories.mockResolvedValue({ error: "big error" });
    categoriesCallFailed.mockReturnValueOnce("big error");
    await loadCategories(dispatchSpy);
    expect(categoriesCallFailed).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith("big error");
  });

  it("should dispatch the success action", async () => {
    fetchCategories.mockResolvedValue({ result: [] });
    categoriesFetched.mockReturnValueOnce("categoriesFetched");
    await loadCategories(dispatchSpy);
    expect(categoriesFetched).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith("categoriesFetched");
  });
});

describe("loadFoodsByCategory", () => {
  beforeEach(() => {
    dispatchSpy.mockReset();
  });

  it("should dispatch the failure action", async () => {
    fetchFoodsByCategory.mockResolvedValue({ error: "big error" });
    foodsCallFailed.mockReturnValueOnce("big error");
    await loadFoodsByCategory(dispatchSpy, {} as AppState);
    expect(foodsCallFailed).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith("big error");
  });

  it("should fetch foods by category by default", async () => {
    fetchFoodsByCategory.mockResolvedValue({ result: [] });
    pagedFoodsFetched.mockReturnValueOnce("pagedFoodsFetched");
    await loadFoodsByCategory(dispatchSpy, {} as AppState);
    expect(pagedFoodsFetched).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith("pagedFoodsFetched");
  });

  it("should fetch foods by category search term if defined", async () => {
    fetchFoodsBySearchTerm.mockResolvedValue({ result: [] });
    pagedFoodsFetched.mockReturnValueOnce("pagedFoodsFetched");
    await loadFoodsByCategory(dispatchSpy, {
      searchQuery: "hello",
    } as AppState);
    expect(pagedFoodsFetched).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith("pagedFoodsFetched");
  });
});
