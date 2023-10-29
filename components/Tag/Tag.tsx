import { FC, HTMLAttributes } from "react";
import cn from "classnames";
import classes from "./Tag.module.css";

interface TagProps extends HTMLAttributes<HTMLDivElement> {
   size?: "l" | "s";
   color?: "ghost" | "gray" | "red" | "primary" | "green";
   href?: string;
}

export const Tag: FC<TagProps> = ({
   size = "l",
   color,
   href,
   children,
   ...props
}) => {
   return (
      <div
         className={cn(classes.tag, {
            [classes.l]: size === "l",
            [classes.s]: size === "s",
            [classes.ghost]: color === "ghost",
            [classes.gray]: color === "gray",
            [classes.green]: color === "green",
            [classes.primary]: color === "primary",
            [classes.red]: color === "red",
         })}
         {...props}
      >
         {href ? <a href={href}>{children}</a> : <>{children}</>}
      </div>
   );
};
