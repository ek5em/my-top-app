import { FC, HTMLAttributes } from "react";
import cn from "classnames";
import SortIcon from "./sort.svg";
import classes from "./Sort.module.css";

export enum ESort {
   Price,
   Raiting,
}

interface SortProps extends HTMLAttributes<HTMLDivElement> {
   sort: ESort;
   setSort: (sort: ESort) => void;
}

export const Sort: FC<SortProps> = ({ sort, setSort, className, ...props }) => {
   return (
      <div className={cn(className, classes.sort)} {...props}>
         <span
            onClick={() => setSort(ESort.Raiting)}
            className={cn({
               [classes.active]: sort === ESort.Raiting,
            })}
         >
            <SortIcon className={classes.sortIcon} />
            По рейтингу
         </span>
         <span
            onClick={() => setSort(ESort.Price)}
            className={cn({
               [classes.active]: sort === ESort.Price,
            })}
         >
            <SortIcon className={classes.sortIcon} />
            По цене
         </span>
      </div>
   );
};
