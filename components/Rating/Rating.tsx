"use client";
import {
    FC,
    ForwardedRef,
    HTMLAttributes,
    KeyboardEvent,
    forwardRef,
    useEffect,
    useRef,
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
        {
            error,
            rating,
            setRating,
            isEditable = false,
            ...props
        }: RaitingProps,
        ref: ForwardedRef<HTMLDivElement>
    ) => {
        const [ratingArray, setRaitingArray] = useState<Array<boolean>>(
            new Array(5).fill(false)
        );

        const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

        useEffect(() => {
            raitingBuilder(rating);
        }, [rating]);

        const raitingBuilder = (currentRaiting: number) => {
            const newArray = ratingArray.map((r: boolean, i: number) => {
                return i < currentRaiting;
            });
            setRaitingArray(newArray);
        };

        const focusHandler = (r: number, i: number): -1 | 0 => {
            if (!isEditable) {
                return -1;
            }
            if (!rating && i === 0) {
                return 0;
            }
            if (rating === i + 1) {
                return 0;
            }
            return -1;
        };

        const onHover = (i: number) => {
            isEditable && raitingBuilder(i);
        };

        const onLeave = () => {
            raitingBuilder(rating);
        };

        const onClick = (newRating: number) => {
            if (isEditable && setRating) {
                setRating(newRating);
            }
            return;
        };

        const keyDownHandler = (e: KeyboardEvent) => {
            if (!isEditable || !setRating) {
                return;
            }
            if (!rating) {
                return setRating(1);
            }
            const { code: key } = e;
            if (key === "ArrowRight" || key === "ArrowUp") {
                e.preventDefault();
                setRating(rating < 5 ? rating + 1 : 5);
                ratingArrayRef.current[rating]?.focus();
            }
            if (key === "ArrowLeft" || key === "ArrowDown") {
                e.preventDefault();
                setRating(rating > 1 ? rating - 1 : 1);
                ratingArrayRef.current[rating - 2]?.focus();
            }
        };

        return (
            <div
                ref={ref}
                className={cn(classes.rating, {
                    [classes.error]: error,
                })}
                {...props}
            >
                {ratingArray.map((isFilled: boolean, i: number) => {
                    return (
                        <span
                            key={i}
                            onMouseEnter={() => onHover(i + 1)}
                            onMouseLeave={onLeave}
                            onClick={() => onClick(i + 1)}
                            tabIndex={focusHandler(rating, i)}
                            onKeyDown={keyDownHandler}
                            ref={(r) => ratingArrayRef.current?.push(r)}
                        >
                            <StarIcon
                                className={cn(classes.star, {
                                    [classes.filled]: isFilled,
                                    [classes.editable]: isEditable,
                                })}
                            />
                        </span>
                    );
                })}
                {error && (
                    <span className={classes.errorMessage}>
                        {error.message}
                    </span>
                )}
            </div>
        );
    }
);
