import { ITopPageModel } from "../interfaces/page.interface";
import { API } from "./API";

export const getPage = async (alias: string): Promise<ITopPageModel | null> => {
   const res = await fetch(API.topPage.byAlias + alias);
   if (!res.ok) {
      return null;
   }
   return res.json();
};
