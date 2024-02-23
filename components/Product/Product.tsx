"use client";

import React, {
    ForwardedRef,
    HTMLAttributes,
    forwardRef,
    useRef,
    useState,
} from "react";
import cn from "classnames";
import { Variants, motion } from "framer-motion";
import Image from "next/image";
import { ProductModel } from "../../interfaces/product.interface";
import { DeclineWord, Price } from "../../helpers";
import { Review, Card, Rating, Tag, Button } from "..";

import classes from "./Product.module.css";
import { ReviewForm } from "../ReviewForm/ReviewForm";

interface ProductProps extends HTMLAttributes<HTMLDivElement> {
    product: ProductModel;
}

export const Product = motion(
    forwardRef(
        (
            { className, product, ...props }: ProductProps,
            ref: ForwardedRef<HTMLDivElement>
        ) => {
            const [isReviewOpen, setIsReviewOpen] = useState<boolean>(false);
            const reviewRef = useRef<HTMLDivElement>(null);
            const {
                _id,
                title,
                image,
                price,
                oldPrice,
                credit,
                reviewAvg,
                advantages,
                disadvantages,
                categories,
                initialRating,
                characteristics,
                reviewCount,
                description,
                reviews,
            } = product;

            const goToReview = () => {
                setIsReviewOpen(true);
                reviewRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            };

            const variants: Variants = {
                visible: { height: "auto", opacity: 1 },
                hidden: { height: 0, opacity: 0 },
            };
            return (
                <div ref={ref} className={className} {...props}>
                    <Card className={classes.product} color="white">
                        <div className={classes.logo}>
                            <Image
                                src={process.env.NEXT_PUBLIC_DOMAIN + image}
                                alt={title}
                                height={70}
                                width={70}
                            />
                        </div>
                        <div className={classes.title}>{title}</div>
                        <div className={classes.price}>
                            {Price(price)}
                            {oldPrice && (
                                <Tag
                                    className={classes.priceDiffer}
                                    color="green"
                                >
                                    {Price(price - oldPrice)}
                                </Tag>
                            )}
                        </div>
                        <div className={classes.credit}>
                            {Price(credit)}/<span>мес</span>
                        </div>
                        <div className={classes.rating}>
                            <Rating rating={reviewAvg ?? initialRating} />
                        </div>
                        <div className={classes.tags}>
                            {categories.map((c) => (
                                <Tag key={c} color="ghost">
                                    {c}
                                </Tag>
                            ))}
                        </div>
                        <div className={classes.priceTitle}>цена</div>
                        <div className={classes.creditTitle}>в кредит</div>
                        <div className={classes.ratingTitle}>
                            <a href="#review" onClick={goToReview}>
                                {reviewCount}{" "}
                                {DeclineWord(reviewCount, [
                                    "отзыв",
                                    "отзыва",
                                    "отзывов",
                                ])}
                            </a>
                        </div>
                        <hr className={cn(classes.line, classes.hr)} />
                        <div className={classes.description}>{description}</div>
                        <div className={classes.features}>
                            {characteristics.map((characteristic) => {
                                return (
                                    <div
                                        key={characteristic.name}
                                        className={classes.characteristics}
                                    >
                                        <span
                                            className={
                                                classes.characteristicName
                                            }
                                        >
                                            {characteristic.name}
                                        </span>
                                        <span
                                            className={
                                                classes.characteristicDots
                                            }
                                        />
                                        <span
                                            className={
                                                classes.characteristicValue
                                            }
                                        >
                                            {characteristic.value}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className={classes.advBlock}>
                            {advantages && (
                                <div className={classes.advantages}>
                                    <div className={classes.advTitle}>
                                        Преимущества
                                    </div>
                                    <div className={classes.advText}>
                                        {advantages}
                                    </div>
                                </div>
                            )}
                            {disadvantages && (
                                <div className={classes.disadvantages}>
                                    <div className={classes.advTitle}>
                                        Недостатки
                                    </div>
                                    <div className={classes.advText}>
                                        {disadvantages}
                                    </div>
                                </div>
                            )}
                        </div>
                        <hr className={cn(classes.line, classes.hr2)} />
                        <div className={classes.actions}>
                            <Button appearence="primary">
                                Узнать подробнее
                            </Button>
                            <Button
                                appearence="ghost"
                                arrow={isReviewOpen ? "down" : "right"}
                                onClick={() => setIsReviewOpen(!isReviewOpen)}
                            >
                                Читать отзывы
                            </Button>
                        </div>
                    </Card>
                    <motion.div
                        className={classes.reviews}
                        variants={variants}
                        animate={isReviewOpen ? "visible" : "hidden"}
                        initial="hidden"
                    >
                        <Card color="blue" ref={reviewRef}>
                            {reviews.map((review) => (
                                <div key={review._id}>
                                    <Review review={review} />
                                    <hr className={cn(classes.line)} />
                                </div>
                            ))}
                            <ReviewForm productId={_id} />
                        </Card>
                    </motion.div>
                </div>
            );
        }
    )
);
