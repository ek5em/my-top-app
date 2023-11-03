import { IProductModel } from "../interfaces/product.interface";
import { API } from "./API";

export const getProducts = async (
   category: string
): Promise<IProductModel[]> => {
   const res = await fetch(API.product.find, {
      method: "POST",
      body: JSON.stringify({
         category,
      }),
      headers: new Headers({ "content-type": "application/json" }),
   });
   return res.json();
};
