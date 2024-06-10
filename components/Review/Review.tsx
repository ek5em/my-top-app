import { FC, HTMLAttributes } from "react";
import cn from "classnames";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { ReviewModel } from "../../interfaces/product.interface";
import UserIcon from "./user.svg";
import { Rating } from "../Rating/Rating";

import classes from "./Review.module.css";

interface ReviewProps extends HTMLAttributes<HTMLDivElement> {
   review: ReviewModel;
}

export const Review: FC<ReviewProps> = ({ review, className, ...props }) => {
   const { name, title, createdAt, rating, description } = review;
   return (
      <div className={cn(classes.review, className)} {...props}>
         <UserIcon />
         <div>
            <span className={classes.name}>{name}: </span>
            <span>{title}</span>
         </div>
         <div className={classes.date}>
            {format(new Date(createdAt), "dd MMMM yyyy", { locale: ru })}
         </div>
         <div className={classes.rating}>
            <Rating rating={rating} />
         </div>
         <div className={classes.description}>{description}</div>
      </div>
   );
};
