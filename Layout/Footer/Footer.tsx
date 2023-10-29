import { FC, HTMLAttributes } from "react";
import classes from "classnames";
import "./Footer.module.css";

interface FooterProps extends HTMLAttributes<HTMLDivElement> {}

export const Footer: FC<FooterProps> = ({ ...props }) => {
   return <div {...props}>FOOTER</div>;
};
