import { render } from "@testing-library/react";
import { PagedFoodDto } from "../types";
import FoodList from "./FoodList";

describe("FoodList", () => {
  test("it should render the error state", async () => {
    const sut = render(
      <FoodList
        hasError={true}
        isLoading={false}
        pagedFoods={{} as unknown as PagedFoodDto}
        onSetPage={jest.fn()}
      />
    );

    const error = await sut.findByTestId("food-list-error");
    expect(error).toBeTruthy();
  });

  test("it should render the normal state", async () => {
    const mockData: PagedFoodDto = {
      foods: [
        {
          id: 0,
          name: "test",
        },
      ],
      count: 1,
      currentPage: 0,
      pageSize: 10,
    };

    const sut = render(
      <FoodList
        hasError={false}
        isLoading={false}
        pagedFoods={mockData}
        onSetPage={jest.fn()}
      />
    );

    const pager = await sut.findByTestId("food-list-pager");
    const items = await sut.findAllByTestId("food-list-item");

    expect(pager).toBeTruthy();
    expect(items.length).toEqual(1);
  });
});
