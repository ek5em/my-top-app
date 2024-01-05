import { FC, InputHTMLAttributes } from "react";
import cn from "classnames";

import classes from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input: FC<InputProps> = ({ className, ...props }) => {
   return <input className={cn(className, classes.input)} {...props} />;
};
