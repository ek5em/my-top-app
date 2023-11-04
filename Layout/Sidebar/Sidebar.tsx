"use client";
import { FC, HTMLAttributes } from "react";
import cn from "classnames";
import { Menu } from "../Menu/Menu";
import classes from "./Sidebar.module.css";

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {}

export const Sidebar: FC<SidebarProps> = ({ ...props }) => {
   return (
      <div {...props}>
         <Menu />
      </div>
   );
};
