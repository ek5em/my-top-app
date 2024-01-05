import { FirstLevelCategory } from "../interfaces/menu.interface";
import { TopLevelCategory } from "../interfaces/page.interface";
import { CoursesIcon, BooksIcon, ProductsIcon, ServicesIcon } from "./icons";

export const firstLevelMenu: FirstLevelCategory[] = [
   {
      route: "courses",
      name: "Курсы",
      id: TopLevelCategory.Courses,
      icon: <CoursesIcon />,
   },
   {
      route: "books",
      name: "Книги",
      id: TopLevelCategory.Books,
      icon: <BooksIcon />,
   },
   {
      route: "products",
      name: "Товары",
      id: TopLevelCategory.Products,
      icon: <ProductsIcon />,
   },
   {
      route: "services",
      name: "Сервесы",
      id: TopLevelCategory.Services,
      icon: <ServicesIcon />,
   },
];

export const Price = (price: number): string =>
   price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽";

export const DeclineWord = (
   num: number,
   words: [string, string, string]
): string => {
   const rest = num % 20;
   return words[rest === 0 || rest > 4 ? 2 : rest === 1 ? 0 : 1];
};
