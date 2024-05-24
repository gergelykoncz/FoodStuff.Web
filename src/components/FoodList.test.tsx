import { render } from "@testing-library/react";
import { PagedFoodDto } from "../types";
import FoodList from "./FoodList";

describe("FoodList", () => {
  test("it should render the error state", () => {
    const sut = render(
      <FoodList
        hasError={true}
        pagedFoods={{} as unknown as PagedFoodDto}
        onSetPage={jest.fn()}
      />
    );

    const error = sut.findByTestId("food-list-error");
    expect(error).toBeTruthy();
  });
});
