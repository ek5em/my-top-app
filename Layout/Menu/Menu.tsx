import { FC, KeyboardEvent, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import cn from "classnames";
import { Variants, motion } from "framer-motion";
import { TopLevelCategory } from "../../interfaces/page.interface";
import {
    FirstLevelCategory,
    MenuItem,
    PageItem,
} from "../../interfaces/menu.interface";
import { firstLevelMenu } from "../../helpers";
import { getMenu } from "../../api";
import classes from "./Menu.module.css";

export enum EAnnounce {
    closed = 1,
    opened,
}

export const Menu: FC = () => {
    const [menu, setMenu] = useState<MenuItem[]>(null!);
    const [firstLevelCategory, setFirstLevelCategory] =
        useState<TopLevelCategory>(0);
    const [announce, setAnnounce] = useState<EAnnounce | null>(null);
    const path = usePathname();

    useEffect(() => {
        const fetchMenu = async () => {
            let category = 0;
            switch (path.split("/")[1]) {
                case "books": {
                    category = 1;
                    break;
                }
                case "products": {
                    category = 2;
                    break;
                }
                case "services": {
                    category = 3;
                    break;
                }
                default: {
                }
            }

            const menuData = await getMenu(category);

            setMenu(menuData);
        };
        fetchMenu();
    }, []);

    const variants: Variants = {
        visible: {
            height: "auto",
            opacity: 1,
        },
        hidden: {
            opacity: 0,
            height: 0,
        },
    };

    const changeFirtsCategory = async (newCategory: TopLevelCategory) => {
        setFirstLevelCategory(newCategory);
    };

    const changeSecondCategory = (secondCategory: string) => {
        setMenu(
            menu.map((m) => {
                if (m._id.secondCategory === secondCategory) {
                    setAnnounce(
                        m.isActive ? EAnnounce.closed : EAnnounce.opened
                    );
                    m.isActive = !m.isActive;
                }
                return m;
            })
        );
    };

    const changeSecondCategoryKey = (key: KeyboardEvent, category: string) => {
        if (key.code === "Space" || key.code === "Enter") {
            key.preventDefault();
            changeSecondCategory(category);
        }
    };

    const firstLevelMenuBiulder = (): JSX.Element => {
        const path = usePathname().split("/")[1];
        return (
            <ul>
                {firstLevelMenu.map((menu) => (
                    <li key={menu.name} aria-expanded={path === menu.route}>
                        <Link href={`/${menu.route}`}>
                            <div
                                onClick={() => {
                                    changeFirtsCategory(menu.id);
                                }}
                                className={cn(classes.firstLevel, {
                                    [classes.firstLevelActive]:
                                        path === menu.route,
                                })}
                            >
                                {menu.icon}
                                <span>{menu.name}</span>
                            </div>
                        </Link>
                        {path === menu.route && secondLevelBuilder(menu)}
                    </li>
                ))}
            </ul>
        );
    };

    const secondLevelBuilder = (menuItem: FirstLevelCategory): JSX.Element => {
        return (
            <ul className={classes.secondBlock}>
                {menu &&
                    menu.map((m) => {
                        if (
                            m.pages
                                .map((p) => p.alias)
                                .includes(path.split("/")[2])
                        ) {
                            m.isActive = true;
                        }
                        return (
                            <li key={m._id.secondCategory}>
                                <button
                                    className={classes.secondLevel}
                                    onClick={() => {
                                        changeSecondCategory(
                                            m._id.secondCategory
                                        );
                                    }}
                                    onKeyDown={(key: KeyboardEvent) => {
                                        changeSecondCategoryKey(
                                            key,
                                            m._id.secondCategory
                                        );
                                    }}
                                    aria-expanded={m.isActive}
                                >
                                    {m._id.secondCategory}
                                </button>
                                <motion.ul
                                    layout
                                    className={classes.secondLevelBlock}
                                >
                                    {thirdLevelMenuBuilder(
                                        m.pages,
                                        menuItem.route,
                                        m.isActive ?? false
                                    )}
                                </motion.ul>
                            </li>
                        );
                    })}
            </ul>
        );
    };

    const thirdLevelMenuBuilder = (
        pages: PageItem[],
        route: string,
        isOpen: boolean
    ): JSX.Element => {
        return (
            <>
                {pages.map((page) => (
                    <motion.li
                        variants={variants}
                        initial="hidden"
                        animate={isOpen ? "visible" : "hidden"}
                        key={page._id}
                    >
                        <Link
                            href={`/${route}/${page.alias}`}
                            className={cn(classes.thirdLevel, {
                                [classes.thirdLevelActive]:
                                    `/${route}/${page.alias}` === path,
                            })}
                            tabIndex={isOpen ? 0 : -1}
                            aria-current={
                                `/${route}/${page.alias}` === path
                                    ? "page"
                                    : false
                            }
                        >
                            {page.category}
                        </Link>
                    </motion.li>
                ))}
            </>
        );
    };

    return (
        <nav className={classes.menu} role="navigation">
            {announce && (
                <span className="screenReaderComment" role="log">
                    {announce === EAnnounce.opened ? "развёрнуто" : "свёрнуто"}
                </span>
            )}
            {firstLevelMenuBiulder()}
        </nav>
    );
};
