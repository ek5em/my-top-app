import Link from "next/link";
import { FC } from "react";
import LogoIcon from "./logo.svg";
import classes from "./Logo.module.css";

export const Logo: FC = () => {
    return (
        <Link href={"/"}>
            <LogoIcon className={classes.logo} />
        </Link>
    );
};

export default Logo;
