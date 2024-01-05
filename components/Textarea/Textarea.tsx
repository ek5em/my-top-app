import { FC, TextareaHTMLAttributes } from "react";
import cn from "classnames";

import classes from "./Textarea.module.css";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea: FC<TextareaProps> = ({ className, ...props }) => {
   return <textarea className={cn(className, classes.textarea)} {...props} />;
};
