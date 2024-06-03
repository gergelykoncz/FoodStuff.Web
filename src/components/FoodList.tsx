/// <reference types="vite-plugin-svgr/client" />

import "./FoodList.scss";
import { useTranslation } from "react-i18next";
import { PagedFoodDto } from "../types/paged-food.dto";
import Pager from "./Pager";
import Loader from "../svg/loader-bars.svg?react";

type FoodListProps = {
  hasError: boolean;
  isLoading: boolean;
  pagedFoods: PagedFoodDto;
  onSetPage: (e: number) => void;
};

export default function FoodList({
  pagedFoods,
  hasError,
  isLoading,
  onSetPage,
}: FoodListProps) {
  const { t } = useTranslation();

  return (
    <div className="app-food-list">
      <h3>{t("foods")}</h3>

      {hasError ? (
        <div data-testid="food-list-error">{t("foods_error")}</div>
      ) : (
        <>
          {pagedFoods.foods.map((f) => (
            <div data-testid="food-list-item" key={f.id}>
              {f.name}
            </div>
          ))}
          <div data-testid="food-list-pager" className="app-food-list-pager">
            <Pager
              count={pagedFoods.count}
              currentPage={pagedFoods.currentPage}
              pageSize={10}
              onSetPage={onSetPage}
            />
          </div>

          {isLoading && <Loader />}
        </>
      )}
    </div>
  );
}
