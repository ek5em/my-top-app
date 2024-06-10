import { useEffect, useState } from "react";

export const useScrollPos = (): number => {
    const [scrollPos, setScrollPos] = useState<number>(0);

    const isBrowser = typeof window !== "undefined";
    const scrollHandler = () => {
        setScrollPos(isBrowser ? window.scrollY : 0);
    };

    useEffect(() => {
        window.addEventListener("scroll", scrollHandler);
        return () => {
            window.removeEventListener("scroll", scrollHandler);
        };
    }, []);

    return scrollPos;
};
