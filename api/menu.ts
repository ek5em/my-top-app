import { MenuItem } from "../interfaces/menu.interface";

export const getMenu = async (firstCategory: number): Promise<MenuItem[]> => {
   const res = await fetch(
      process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find",
      {
         method: "POST",
         body: JSON.stringify({
            firstCategory,
         }),
         headers: new Headers({ "content-type": "application/json" }),
      }
   );
   return res.json();
};
