import { FunctionComponent } from "react";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import { Footer } from "./Footer/Footer";

import classes from "./Layout.module.css";

export const withLayout = <T extends Record<string, unknown>>(
   Component: FunctionComponent<T>
) => {
   return (props: T): JSX.Element => {
      return (
         <div className={classes.wrapper}>
            <Header className={classes.header} />
            <Sidebar className={classes.sidebar} />
            <div className={classes.body}>
               <Component {...props} />
            </div>
            <Footer className={classes.footer} />
         </div>
      );
   };
};
