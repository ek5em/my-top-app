import { TopLevelCategory } from "./page.interface";

export interface PageItem {
   alias: string;
   title: string;
   _id: string;
   category: string;
}

export interface MenuItem {
   _id: {
      secondCategory: string;
   };
   isActive?: boolean;
   pages: PageItem[];
}

export interface FirstLevelCategory {
   route: string;
   icon: JSX.Element;
   name: string;
   id: TopLevelCategory;
}
