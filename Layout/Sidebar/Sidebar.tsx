import { FC, HTMLAttributes } from "react";
import classes from "classnames";
import "./Sidebar.module.css";

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {}

export const Sidebar: FC<SidebarProps> = ({ ...props }) => {
   return <div {...props}>SIDEBAR</div>;
};
