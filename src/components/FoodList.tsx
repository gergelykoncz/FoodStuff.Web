import { PagedFoodDto } from "../types/paged-food.dto";
import Pager from "./Pager";

type FoodListProps = {
  pagedFoods: PagedFoodDto,
  onSetPage: (e: number) => void
}

function FoodList({ pagedFoods, onSetPage }: FoodListProps) {
  return (
    <div className="food-list">
      <h3>Foods</h3>
      {pagedFoods.foods.map((f) => (
        <div key={f.id}>{f.name}</div>
      ))}
      <Pager
        count={pagedFoods.count}
        currentPage={pagedFoods.currentPage}
        pageSize={10}
        onSetPage={onSetPage}
      />
    </div>
  );
}

export default FoodList;
