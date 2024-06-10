import { FC } from "react";
import { Htag } from "../Htag/Htag";
import { TopPageAdvantage } from "../../interfaces/page.interface";
import TickIcon from "./tick.svg";

import classes from "./Advantages.module.css";
import { P } from "../P/P";
interface AdvantagesProps {
   advantages: TopPageAdvantage[];
}

export const Advantages: FC<AdvantagesProps> = ({ advantages }) => {
   return (
      <div className={classes.advantages}>
         <Htag tag="h2">Преимущества</Htag>
         {advantages.map((a) => (
            <div key={a._id} className={classes.advantage}>
               <TickIcon />
               <Htag tag="h3">{a.title}</Htag>
               <div className={classes.vline}></div>
               <P size="l">{a.description}</P>
            </div>
         ))}
      </div>
   );
};
