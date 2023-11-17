"use client";
import { FC, HTMLAttributes } from "react";
import cn from "classnames";
import { Menu } from "../Menu/Menu";
import Logo from "../logo.svg";

import classes from "./Sidebar.module.css";

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {}

export const Sidebar: FC<SidebarProps> = ({ className, ...props }) => {
   return (
      <div className={cn(className, classes.sidebar)} {...props}>
         <Logo className={classes.logo} />
         <div>Search</div>
         <Menu />
      </div>
   );
};
