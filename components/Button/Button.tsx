import { ButtonHTMLAttributes, FC } from "react";
import classes from "./Button.module.css";
import cn from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  appearence: "primary" | "ghost";
}

export const Button: FC<ButtonProps> = ({
  children,
  appearence,
  className,
  ...props
}) => {
  return (
    <button
      className={cn("button", className, {
        [classes.primary]: appearence === "primary",
        [classes.ghost]: appearence === "ghost",
      })}
      {...props}
    >
      {children}
    </button>
  );
};
