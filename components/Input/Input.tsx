import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";
import { FieldError } from "react-hook-form";
import cn from "classnames";

import classes from "./Input.module.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: FieldError;
}

export const Input = forwardRef(
    (
        { error, className, ...props }: InputProps,
        ref: ForwardedRef<HTMLInputElement>
    ) => {
        return (
            <div className={cn(className, classes.inputWrapper)}>
                <input
                    className={cn(classes.input, {
                        [classes.error]: error,
                    })}
                    ref={ref}
                    {...props}
                />
                {error && (
                    <span role="alert" className={classes.errorMessage}>
                        {error.message}
                    </span>
                )}
            </div>
        );
    }
);
