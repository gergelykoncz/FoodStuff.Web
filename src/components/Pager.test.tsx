import { render, fireEvent, createEvent } from "@testing-library/react";
import Pager from "./Pager";

describe("Pager", () => {
  describe("page selection", () => {
    test("it should render the correct number of pages", async () => {
      const sut = render(
        <Pager pageSize={10} count={100} currentPage={0} onSetPage={() => {}} />
      );

      const items = await sut.findAllByTestId("pager-page-item");

      expect(items.length).toEqual(10);
    });

    test("it should dispatch the proper event", async () => {
      const mockOnSetPage = jest.fn();
      const sut = render(
        <Pager
          pageSize={10}
          count={100}
          currentPage={0}
          onSetPage={mockOnSetPage}
        />
      );

      const items = await sut.findAllByTestId("pager-page-item");
      const lastItem = items[items.length - 1];
      fireEvent.click(lastItem);

      expect(mockOnSetPage).toHaveBeenCalledWith(9);
    });
  });

  describe("next and previous buttons", () => {
    test("it should disable the previous button on the first page", async () => {
      const sut = render(
        <Pager pageSize={10} count={100} currentPage={0} onSetPage={() => {}} />
      );

      const item = await sut.queryByTestId("pager-previous");

      expect(item?.hasAttribute("disabled")).toBeTruthy();
    });

    test("it should dispatch the proper event on next page click", async () => {
      const mockOnSetPage = jest.fn();

      const sut = render(
        <Pager
          pageSize={10}
          count={100}
          currentPage={0}
          onSetPage={mockOnSetPage}
        />
      );

      const item = await sut.queryByTestId("pager-next");
      fireEvent.click(item!);

      expect(mockOnSetPage).toHaveBeenCalledWith(1);
    });

    test("it should disable the next button on the last page", async () => {
      const sut = render(
        <Pager
          pageSize={10}
          count={100}
          currentPage={10}
          onSetPage={() => {}}
        />
      );

      const item = await sut.queryByTestId("pager-next");

      expect(item?.hasAttribute("disabled")).toBeTruthy();
    });

    test("it should dispatch the proper event on previous page click", async () => {
      const mockOnSetPage = jest.fn();

      const sut = render(
        <Pager
          pageSize={10}
          count={100}
          currentPage={1}
          onSetPage={mockOnSetPage}
        />
      );

      const item = await sut.queryByTestId("pager-previous");
      fireEvent.click(item!);

      expect(mockOnSetPage).toHaveBeenCalledWith(0);
    });
  });
});
