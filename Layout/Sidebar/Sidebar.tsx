"use client";
import { FC, HTMLAttributes } from "react";
import cn from "classnames";
import { Logo, Search } from "../../components";
import { Menu } from "../Menu/Menu";

import classes from "./Sidebar.module.css";

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {}

export const Sidebar: FC<SidebarProps> = ({ className, ...props }) => {
    return (
        <div className={cn(className, classes.sidebar)} {...props}>
            <Logo />
            <Search />
            <Menu />
        </div>
    );
};
