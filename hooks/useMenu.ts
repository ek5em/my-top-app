"use client";

import { useEffect, useState } from "react";
import { TopLevelCategory } from "../interfaces/page.interface";
import { MenuItem } from "../interfaces/menu.interface";
import { getMenu } from "../api";

export const useMenu = (
   initialCategory: TopLevelCategory = 0
): [MenuItem[], (newMenu: MenuItem[]) => void, TopLevelCategory] => {
   const [menuState, setStateMenu] = useState<MenuItem[]>([]);
   const [firstLevelCategory, setFirstLevelCategory] =
      useState<TopLevelCategory>(0);

   useEffect(() => {
      setCategory(initialCategory);
   }, []);

   const setCategory = async (newCategory: TopLevelCategory) => {
      const newMenu = await getMenu(newCategory);
      setFirstLevelCategory(newCategory);
      setMenu(newMenu);
   };

   const setMenu = (newMenu: MenuItem[]) => {
      setStateMenu(newMenu);
   };
   return [menuState, setMenu, firstLevelCategory];
};
