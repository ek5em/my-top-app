"use client";

import { FC, useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useScrollPos } from "../../hooks/useScrollPos";

import classes from "./Up.module.css";
import { ButtonIcon, EIcon } from "../ButtonIcon/ButtonIcon";

export const Up: FC = () => {
    const controls = useAnimation();
    const scrollPos = useScrollPos();

    useEffect(() => {
        controls.start({ opacity: scrollPos / document.body.scrollHeight });
    }, [scrollPos, controls]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <motion.div
            className={classes.up}
            onClick={scrollToTop}
            initial={{ opacity: 0 }}
            animate={controls}
        >
            <ButtonIcon appearence="primary" icon={EIcon.up} />
        </motion.div>
    );
};
