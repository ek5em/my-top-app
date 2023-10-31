import { FC, HTMLAttributes } from "react";
import { format } from "date-fns";
import cn from "classnames";
import classes from "./Footer.module.css";

interface FooterProps extends HTMLAttributes<HTMLDivElement> {}

export const Footer: FC<FooterProps> = ({ className, ...props }) => {
   return (
      <footer className={cn(classes.footer, className)} {...props}>
         <div>
            OwlTop © 2020 - {format(new Date(), "yyyy")} Все права защищены
         </div>
         <a href="_blank">Пользовательское соглашение</a>
         <a href="_blank">Политика конфиденциальности</a>
      </footer>
   );
};
