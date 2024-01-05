"use client";
import { FC, HTMLAttributes } from "react";
import Link from "next/link";
import cn from "classnames";
import { Search } from "../../components";
import { Menu } from "../Menu/Menu";
import Logo from "../logo.svg";

import classes from "./Sidebar.module.css";

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {}

export const Sidebar: FC<SidebarProps> = ({ className, ...props }) => {
   return (
      <div className={cn(className, classes.sidebar)} {...props}>
         <Link href={"/"}>
            <Logo className={classes.logo} />
         </Link>
         <Search />
         <Menu />
      </div>
   );
};
