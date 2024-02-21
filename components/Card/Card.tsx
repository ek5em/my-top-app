import { FC, ForwardedRef, HTMLAttributes, Ref, forwardRef } from "react";
import cn from "classnames";
import classes from "./Card.module.css";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    color?: "white" | "blue";
    ref?: Ref<HTMLDivElement>;
}
export const Card: FC<CardProps> = forwardRef(
    (
        { color = "white", className, ...props },
        ref: ForwardedRef<HTMLDivElement>
    ) => {
        return (
            <div
                className={cn(classes.card, className, {
                    [classes.blue]: color === "blue",
                })}
                ref={ref}
                {...props}
            ></div>
        );
    }
);
