"use client";
import { FC, HTMLAttributes, useState, KeyboardEvent } from "react";
import cn from "classnames";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";

import MagnifierIcon from "./magnifier.svg";
import classes from "./Search.module.css";
import { useRouter } from "next/navigation";

interface SearchProps extends HTMLAttributes<HTMLFormElement> {}

export const Search: FC<SearchProps> = ({ className, ...props }) => {
    const [search, setSearch] = useState<string>("");
    const router = useRouter();

    const goToSearch = () => {
        router.push(`/search?q=${search}`);
    };

    const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            goToSearch();
        }
    };

    return (
        <form
            className={cn(className, classes.search)}
            {...props}
            role="search"
        >
            <Input
                className={classes.input}
                placeholder="Поиск..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
                onKeyDown={keyDownHandler}
            />
            <Button
                aria-label="Искать по сайту"
                className={classes.btn}
                appearence="primary"
                onClick={goToSearch}
            >
                <MagnifierIcon />
            </Button>
        </form>
    );
};
