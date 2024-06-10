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
            <div id="sort" className={classes.name}>
                Сортировка
            </div>
            <button
                id="rating"
                onClick={() => setSort(ESort.Raiting)}
                className={cn({
                    [classes.active]: sort === ESort.Raiting,
                })}
                aria-selected={sort === ESort.Raiting}
                aria-label="Сортировка по рейтингу"
            >
                <SortIcon className={classes.sortIcon} />
                По рейтингу
            </button>
            <button
                id="cost"
                onClick={() => setSort(ESort.Price)}
                className={cn({
                    [classes.active]: sort === ESort.Price,
                })}
                aria-selected={sort === ESort.Price}
                aria-label="Сортировка по цене"
            >
                <SortIcon className={classes.sortIcon} />
                По цене
            </button>
        </div>
    );
};
