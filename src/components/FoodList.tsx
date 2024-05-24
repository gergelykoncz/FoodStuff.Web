import { PagedFoodDto } from "../types/paged-food.dto";
import Pager from "./Pager";

type FoodListProps = {
  hasError: boolean;
  pagedFoods: PagedFoodDto;
  onSetPage: (e: number) => void;
};

export default function FoodList({
  pagedFoods,
  hasError,
  onSetPage,
}: FoodListProps) {
  return (
    <div className="food-list">
      <h3>Foods</h3>

      {hasError ? (
        <div data-testid="food-list-error">
          There was an error retrieving the food items
        </div>
      ) : (
        <>
          {pagedFoods.foods.map((f) => (
            <div key={f.id}>{f.name}</div>
          ))}
          <Pager
            count={pagedFoods.count}
            currentPage={pagedFoods.currentPage}
            pageSize={10}
            onSetPage={onSetPage}
          />
        </>
      )}
    </div>
  );
}
