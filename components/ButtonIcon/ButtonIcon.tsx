import { ButtonHTMLAttributes, FC } from "react";
import cn from "classnames";
import close from "./close.svg";
import menu from "./menu.svg";
import up from "./up.svg";

import classes from "./ButtonIcon.module.css";

interface ButtonIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    appearence: "primary" | "white";
    icon: EIcon;
}

export enum EIcon {
    up = "up",
    close = "close",
    menu = "menu",
}
const icons = {
    up,
    close,
    menu,
};

export const ButtonIcon: FC<ButtonIconProps> = ({
    appearence,
    className,
    icon,
    ...props
}) => {
    const IconComponent = icons[icon];
    return (
        <button
            className={cn(classes.button, className, classes[appearence])}
            {...props}
        >
            <IconComponent />
        </button>
    );
};
