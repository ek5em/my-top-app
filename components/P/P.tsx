import { FC, HTMLAttributes } from "react";
import cn from "classnames";
import classes from "./P.module.css";

interface PProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: "m" | "l" | "s";
}

export const P: FC<PProps> = ({ size = "m", children, ...props }) => {
  return (
    <p
      className={cn(classes.p, {
        [classes.l]: size === "l",
        [classes.m]: size === "m",
        [classes.s]: size === "s",
      })}
      {...props}
    >
      {children}
    </p>
  );
};
