import { FC, HTMLAttributes } from "react";
import cn from "classnames";
import classes from "./Card.module.css";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
   color?: "white" | "blue";
}
export const Card: FC<CardProps> = ({
   color = "white",
   className,
   ...props
}) => {
   return (
      <div
         className={cn(classes.card, className, {
            [classes.blue]: color === "blue",
         })}
         {...props}
      ></div>
   );
};
