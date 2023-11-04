"use client";

import { useEffect, useState } from "react";
import { TopLevelCategory } from "../interfaces/page.interface";
import { MenuItem } from "../interfaces/menu.interface";
import { getMenu } from "../api";

export const useMenu = (
   initialCategory: TopLevelCategory = 0
): [MenuItem[], (newCategory: TopLevelCategory) => void, TopLevelCategory] => {
   const [menu, setMenu] = useState<MenuItem[]>([]);
   const [firstLevelCategory, setFirstLevelCategory] =
      useState<TopLevelCategory>(0);

   useEffect(() => {
      setCategory(initialCategory);
   }, []);

   const setCategory = async (newCategory: TopLevelCategory) => {
      const newMenu = await getMenu(newCategory);
      setMenu(newMenu);
      setFirstLevelCategory(newCategory);
   };
   return [menu, setCategory, firstLevelCategory];
};
