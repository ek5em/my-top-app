import { ESort } from "../components/Sort/Sort";
import { ProductModel } from "../interfaces/product.interface";

export type sortActions = { type: ESort };

export interface SortReducerState {
   products: ProductModel[];
   sort: ESort;
}

export const sortReduser = (
   state: SortReducerState,
   action: sortActions
): SortReducerState => {
   switch (action.type) {
      case ESort.Price: {
         return {
            sort: ESort.Price,
            products: state.products.sort((a, b) =>
               a.price > b.price ? 1 : -1
            ),
         };
      }
      case ESort.Raiting: {
         return {
            sort: ESort.Raiting,
            products: state.products.sort((a, b) =>
               a.initialRating > b.initialRating ? -1 : 1
            ),
         };
      }
      default: {
         throw new Error("Такой сортировки нет");
      }
   }
};
