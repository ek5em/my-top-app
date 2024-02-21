"use client";
import {
   FC,
   ForwardedRef,
   HTMLAttributes,
   KeyboardEvent,
   forwardRef,
   useEffect,
   useState,
} from "react";
import { FieldError } from "react-hook-form";
import cn from "classnames";
import StarIcon from "./star.svg";
import classes from "./Rating.module.css";

interface RaitingProps extends HTMLAttributes<HTMLDivElement> {
   isEditable?: boolean;
   rating: number;
   setRating?: (rating: number) => void;
   error?: FieldError;
}

export const Rating = forwardRef(
   (
      { error, rating, setRating, isEditable = false, ...props }: RaitingProps,
      ref: ForwardedRef<HTMLDivElement>
   ) => {
      const [raitingArray, setRaitingArray] = useState<Array<boolean>>(
         new Array(5).fill(false)
      );

      useEffect(() => {
         raitingBuilder(rating);
      }, [rating]);

      const raitingBuilder = (currentRaiting: number) => {
         const newArray = raitingArray.map((r: boolean, i: number) => {
            return i < currentRaiting;
         });
         setRaitingArray(newArray);
      };

      const onHover = (i: number) => {
         isEditable && raitingBuilder(i);
      };

      const onLeave = () => {
         raitingBuilder(rating);
      };

      const onClick = (raiting: number) => {
         if (isEditable && setRating) {
            setRating(raiting);
         }
         return;
      };

      const keyDown = (e: KeyboardEvent<SVGAElement>, raiting: number) => {
         if (
            (e.code === "Space" || e.code === "Enter") &&
            isEditable &&
            setRating
         ) {
            setRating(raiting);
         }
         return;
      };

      return (
         <div
            ref={ref}
            className={cn(classes.rating, {
               [classes.error]: error,
            })}
            {...props}
         >
            {raitingArray.map((isFilled: boolean, i: number) => {
               return (
                  <span
                     key={i}
                     onMouseEnter={() => onHover(i + 1)}
                     onMouseLeave={onLeave}
                     onClick={() => onClick(i + 1)}
                  >
                     <StarIcon
                        tabIndex={isEditable ? 0 : -1}
                        onKeyDown={(e) => {
                           keyDown(e, i + 1);
                        }}
                        className={cn(classes.star, {
                           [classes.filled]: isFilled,
                           [classes.editable]: isEditable,
                        })}
                     />
                  </span>
               );
            })}
            {error && (
               <span className={classes.errorMessage}>{error.message}</span>
            )}
         </div>
      );
   }
);
