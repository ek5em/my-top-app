import { FC, ReactNode } from "react";
import classes from "./Htag.module.css"; 

interface HtagProps {
  tag: "h1" | "h2" | "h3";
  children: ReactNode;
}

export const Htag: FC<HtagProps> = ({ tag, children }) => {
  switch (tag) {
    case "h1":
      return <h1 className={classes.h1}>{children}</h1>;
    case "h2":
      return <h2 className={classes.h2}>{children}</h2>;
    case "h3":
      return <h3 className={classes.h3}>{children}</h3>;
    default:
      return <></>;
  }
};

