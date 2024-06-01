import { useTranslation } from "react-i18next";
import "./Header.css";
import { FormEvent } from "react";

type HeaderProps = {
  onSearch: (e: string | undefined) => void;
};

export default function Header({ onSearch }: HeaderProps) {
  const { t } = useTranslation();

  const formSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSearch(formData.get("search")?.toString());
  };

  return (
    <header className="app-header">
      <h1>{t("food_stuff")}</h1>
      <search>
        <form onSubmit={(e) => formSubmit(e)} className="app-header-search">
          <label htmlFor="search">{t("find_foods")}</label>
          <input
            type="search"
            id="search"
            name="search"
            placeholder={t("find_foods")}
          />
          <button type="submit">{t("search")}</button>
        </form>
      </search>
    </header>
  );
}
