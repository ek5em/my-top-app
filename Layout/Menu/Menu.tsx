import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import cn from "classnames";
import { TopLevelCategory } from "../../interfaces/page.interface";
import {
   FirstLevelCategory,
   MenuItem,
   PageItem,
} from "../../interfaces/menu.interface";
import { firstLevelMenu } from "../../helpers";
import classes from "./Menu.module.css";
import { getMenu } from "../../api";

export const Menu: FC = () => {
   const [menu, setMenu] = useState<MenuItem[]>(null!);
   const [firstLevelCategory, setFirstLevelCategory] =
      useState<TopLevelCategory>(0);

   const path = usePathname();

   useEffect(() => {
      const fetchMenu = async () => {
         const menuData = await getMenu(firstLevelCategory);
         setMenu(menuData);
      };
      fetchMenu();
   }, [firstLevelCategory]);

   const changeFirtsCategory = async (newCategory: TopLevelCategory) => {
      setFirstLevelCategory(newCategory);
   };

   const changeSecondCategory = (secondCategory: string) => {
      setMenu(
         menu.map((m) => {
            if (m._id.secondCategory === secondCategory) {
               m.isActive = !m.isActive;
            }
            return m;
         })
      );
   };

   const firstLevelMenuBiulder = (): JSX.Element => {
      return (
         <>
            {firstLevelMenu.map((menu) => (
               <div key={menu.name}>
                  <Link href={`/${menu.route}`}>
                     <div
                        onClick={() => {
                           changeFirtsCategory(menu.id);
                        }}
                        className={cn(classes.firstLevel, {
                           [classes.firstLevelActive]:
                              menu.id === firstLevelCategory,
                        })}
                     >
                        {menu.icon}
                        <span>{menu.name}</span>
                     </div>
                  </Link>
                  {menu.id === firstLevelCategory && secondLevelBuilder(menu)}
               </div>
            ))}
         </>
      );
   };

   const secondLevelBuilder = (menuItem: FirstLevelCategory): JSX.Element => {
      return (
         <div className={classes.secondBlock}>
            {menu &&
               menu.map((m) => {
                  if (
                     m.pages.map((p) => p.alias).includes(path.split("/")[2])
                  ) {
                     m.isActive = true;
                  }
                  return (
                     <div key={m._id.secondCategory}>
                        <div
                           className={classes.secondLevel}
                           onClick={() => {
                              changeSecondCategory(m._id.secondCategory);
                           }}
                        >
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
                  );
               })}
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
               <Link
                  key={page._id}
                  href={`/${route}/${page.alias}`}
                  className={cn(classes.thirdLevel, {
                     [classes.thirdLevelActive]:
                        `/${route}/${page.alias}` === path,
                  })}
               >
                  {page.category}
               </Link>
            ))}
         </>
      );
   };

   return <div className={classes.menu}>{firstLevelMenuBiulder()}</div>;
};
