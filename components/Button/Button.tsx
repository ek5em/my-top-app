import { ButtonHTMLAttributes, FC } from "react";
import cn from "classnames";
import ArrowIcon from "./Arrow.svg";
import classes from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
   appearence: "primary" | "ghost";
   arrow?: "right" | "down" | null;
}

export const Button: FC<ButtonProps> = ({
   children,
   appearence,
   className,
   arrow = null,
   ...props
}) => {
   return (
      <button
         className={cn(classes.button, className, classes[appearence])}
         {...props}
      >
         {children}
         {arrow && (
            <span
               className={cn(classes.arrow, {
                  [classes.down]: arrow === "down",
               })}
            >
               <ArrowIcon />
            </span>
         )}
      </button>
   );
};
