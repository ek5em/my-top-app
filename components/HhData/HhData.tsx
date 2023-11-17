import RateIcon from "./rate.svg";
import classes from "./HhData.module.css";

import { FC } from "react";
import { HhData } from "../../interfaces/page.interface";
import { Card } from "../Card/Card";
import { Price } from "../../helpers";

export const HhDataComponent: FC<HhData> = ({
   count,
   juniorSalary,
   middleSalary,
   seniorSalary,
}) => {
   return (
      <div className={classes.hh}>
         <Card className={classes.count}>
            <div className={classes.title}>Всего вакансий</div>
            <div className={classes.countValue}>{count}</div>
         </Card>
         <Card className={classes.salary}>
            <div>
               <div className={classes.title}>Начальный</div>
               <div className={classes.salaryCount}>{Price(juniorSalary)}</div>
               <div className={classes.rate}>
                  <RateIcon className={classes.filled} />
                  <RateIcon />
                  <RateIcon />
               </div>
            </div>
            <div>
               <div className={classes.title}>Средний</div>
               <div className={classes.salaryCount}>{Price(middleSalary)}</div>
               <div className={classes.rate}>
                  <RateIcon className={classes.filled} />
                  <RateIcon className={classes.filled} />
                  <RateIcon />
               </div>
            </div>
            <div>
               <div className={classes.title}>Профессиональный</div>
               <div className={classes.salaryCount}>{Price(seniorSalary)}</div>
               <div className={classes.rate}>
                  <RateIcon className={classes.filled} />
                  <RateIcon className={classes.filled} />
                  <RateIcon className={classes.filled} />
               </div>
            </div>
         </Card>
      </div>
   );
};
