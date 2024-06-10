import { ProductModel } from "../interfaces/product.interface";
import { API } from "./API";

export const getProducts = async (
   category: string,
   limit = 10
): Promise<ProductModel[]> => {
   const res = await fetch(API.product.find, {
      method: "POST",
      body: JSON.stringify({
         category,
         limit,
      }),
      headers: new Headers({ "content-type": "application/json" }),
   });
   return res.json();
};
