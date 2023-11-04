import { FC } from "react";
import cn from "classnames";
import { useMenu } from "../../hooks/useMenu";
import { FirstLevelCategory, PageItem } from "../../interfaces/menu.interface";
import { TopLevelCategory } from "../../interfaces/page.interface";
import { CoursesIcon, BooksIcon, ProductsIcon, ServicesIcon } from "./icons";

import classes from "./Menu.module.css";

const firstLevelMenu: FirstLevelCategory[] = [
   {
      route: "courses",
      name: "Курсы",
      icon: <CoursesIcon />,
      id: TopLevelCategory.Courses,
   },
   {
      route: "books",
      name: "Книги",
      icon: <BooksIcon />,
      id: TopLevelCategory.Books,
   },
   {
      route: "products",
      name: "Товары",
      icon: <ProductsIcon />,
      id: TopLevelCategory.Products,
   },
   {
      route: "services",
      name: "Сервесы",
      icon: <ServicesIcon />,
      id: TopLevelCategory.Services,
   },
];

export const Menu: FC = () => {
   const [menu, setCategory, firstLevelCategory] = useMenu();

   const firstLevelMenuBiulder = (): JSX.Element => {
      return (
         <>
            {firstLevelMenu.map((menu) => (
               <div key={menu.name}>
                  <a href={`/${menu.route}`}>
                     <div
                        className={cn(classes.firstLevel, {
                           [classes.firstLevelActive]:
                              menu.id === firstLevelCategory,
                        })}
                     >
                        {menu.icon}
                        <span>{menu.name}</span>
                     </div>
                  </a>
                  {menu.id === firstLevelCategory && secondLevelBuilder(menu)}
               </div>
            ))}
         </>
      );
   };

   const secondLevelBuilder = (menuItem: FirstLevelCategory): JSX.Element => {
      return (
         <div className={classes.secondBlock}>
            {menu.map((m) => (
               <div key={m._id.secondCategory}>
                  <div className={classes.secondLevel}>
                     {m._id.secondCategory}
                  </div>
                  <div
                     className={cn(classes.secondLevelBlock, {
                        [classes.secondLevelBlockActive]: m.isActive,
                     })}
                  >
                     {thirdLevelMenuBuilder(m.pages, menuItem.route)}
                  </div>
               </div>
            ))}
         </div>
      );
   };

   const thirdLevelMenuBuilder = (
      pages: PageItem[],
      route: string
   ): JSX.Element => {
      return (
         <>
            {pages.map((page) => (
               <a
                  key={page._id}
                  href={`/${route}/${page.alias}`}
                  className={cn(classes.thirdLevel, {
                     [classes.thirdLevelActive]: false,
                  })}
               >
                  {page.category}
               </a>
            ))}
         </>
      );
   };

   return <div className={classes.menu}>{firstLevelMenuBiulder()}</div>;
};
