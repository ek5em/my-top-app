"use client";
import { FC, HTMLAttributes, useState } from "react";
import classes from "./Header.module.css";
import { ButtonIcon, EIcon, Logo } from "../../components";
import { Variants, motion } from "framer-motion";
import { Sidebar } from "../Sidebar/Sidebar";

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const Header: FC<HeaderProps> = ({ ...props }) => {
    const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
    const variants: Variants = {
        open: {
            x: 0,
            transition: {
                duration: 0.3,
            },
        },
        close: {
            x: "100%",
        },
    };
    return (
        <header {...props} className={classes.header}>
            <Logo />
            <ButtonIcon
                appearence="white"
                icon={EIcon.menu}
                className={classes.burger}
                onClick={() => setIsMenuOpened(true)}
            />
            <motion.div
                className={classes.mobileMenu}
                variants={variants}
                initial="close"
                animate={isMenuOpened ? "open" : "close"}
            >
                <Sidebar />
                <ButtonIcon
                    appearence="white"
                    icon={EIcon.close}
                    onClick={() => setIsMenuOpened(false)}
                    className={classes.close}
                />
            </motion.div>
        </header>
    );
};
