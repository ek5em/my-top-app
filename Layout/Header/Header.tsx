import { FC, HTMLAttributes } from "react";
import classes from "classnames";
import "./Header.module.css";

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const Header: FC<HeaderProps> = ({ ...props }) => {
   return <div {...props}>HEADER</div>;
};
