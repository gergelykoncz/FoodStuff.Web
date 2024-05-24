import { cleanup, fireEvent, render } from "@testing-library/react";
import Pager from "./Pager";

describe("Pager", () => {
  test("test", () => {
    const sut = render(
      <Pager pageSize={10} count={100} currentPage={0} onSetPage={() => {}} />
    );

    expect(sut).toBeTruthy();
  });
});
