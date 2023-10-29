"use client";
import { FC, HTMLAttributes, KeyboardEvent, useEffect, useState } from "react";
import cn from "classnames";
import StarIcon from "./star.svg";
import classes from "./Raiting.module.css";

interface RaitingProps extends HTMLAttributes<HTMLDivElement> {
   isEditable?: boolean;
   raiting: number;
   setRaiting?: (raiting: number) => void;
}

export const Raiting: FC<RaitingProps> = ({
   raiting,
   setRaiting,
   isEditable = false,
   ...props
}) => {
   const [raitingArray, setRaitingArray] = useState<Array<boolean>>(
      new Array(5).fill(false)
   );

   useEffect(() => {
      raitingBuilder(raiting);
   }, [raiting]);

   const raitingBuilder = (currentRaiting: number) => {
      const newArray = raitingArray.map((r: boolean, i: number) => {
         return i < currentRaiting;
      });
      setRaitingArray(newArray);
   };

   const onHover = (i: number) => {
      raitingBuilder(i);
   };

   const onLeave = () => {
      raitingBuilder(raiting);
   };

   const onClick = (raiting: number) => {
      if (isEditable && setRaiting) {
         setRaiting(raiting);
      }
      return;
   };

   const keyDown = (e: KeyboardEvent<SVGAElement>, raiting: number) => {
      if (
         (e.code === "Space" || e.code === "Enter") &&
         isEditable &&
         setRaiting
      ) {
         setRaiting(raiting);
      }
      return;
   };

   return (
      <div {...props} className={cn(classes.raiting)}>
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
      </div>
   );
};
