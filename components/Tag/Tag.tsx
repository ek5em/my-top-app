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
   color = "primary",
   href,
   children,
   ...props
}) => {
   return (
      <div
         className={cn(classes.tag, classes[size], classes[color])}
         {...props}
      >
         {href ? <a href={href}>{children}</a> : <>{children}</>}
      </div>
   );
};
