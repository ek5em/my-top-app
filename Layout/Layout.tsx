import { FunctionComponent, KeyboardEvent, useRef, useState } from "react";
import cn from "classnames";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import { Footer } from "./Footer/Footer";
import { Up } from "../components";

import classes from "./Layout.module.css";

export const withLayout = <T extends Record<string, unknown>>(
    Component: FunctionComponent<T>
) => {
    return (props: T): JSX.Element => {
        const [isSkipLinkVisible, setIsSkipLinkVisible] =
            useState<boolean>(false);
        const bodyRef = useRef<HTMLDivElement>(null);

        const skipToContent = (key: KeyboardEvent) => {
            if (key.code === "Space" || key.code === "Enter") {
                key.preventDefault();
                bodyRef.current?.focus();
            }
            setIsSkipLinkVisible(false);
        };
        return (
            <div className={classes.wrapper}>
                <a
                    tabIndex={1}
                    onFocus={() => setIsSkipLinkVisible(true)}
                    onKeyDown={(key: KeyboardEvent) => skipToContent(key)}
                    className={cn(classes.skipLink, {
                        [classes.skipLinkVisible]: isSkipLinkVisible,
                    })}
                >
                    Перейти к содержимому
                </a>
                <Header className={classes.header} />
                <Sidebar className={classes.sidebar} />
                <main
                    className={classes.body}
                    tabIndex={0}
                    ref={bodyRef}
                    role="main"
                >
                    <Component {...props} />
                </main>
                <Up />
                <Footer className={classes.footer} />
            </div>
        );
    };
};
