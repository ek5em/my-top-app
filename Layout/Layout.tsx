import { FunctionComponent } from "react";
import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import { Footer } from "./Footer/Footer";

export const withLayout = <T extends Record<string, unknown>>(
   Component: FunctionComponent<T>
) => {
   return (props: T): JSX.Element => {
      return (
         <>
            <Header />
            <Sidebar />
            <div>
               <Component {...props} />
            </div>
            <Footer />
         </>
      );
   };
};
