import { ForwardedRef, TextareaHTMLAttributes, forwardRef } from "react";
import { FieldError } from "react-hook-form";
import cn from "classnames";

import classes from "./Textarea.module.css";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
   error?: FieldError;
}

export const Textarea = forwardRef(
   (
      { error, className, ...props }: TextareaProps,
      ref: ForwardedRef<HTMLTextAreaElement>
   ) => {
      return (
         <div className={cn(className, classes.textareaWrapper)}>
            <textarea
               className={cn(classes.textarea, {
                  [classes.error]: error,
               })}
               ref={ref}
               {...props}
            />
            {error && (
               <span className={classes.errorMessage}>{error.message}</span>
            )}
         </div>
      );
   }
);
