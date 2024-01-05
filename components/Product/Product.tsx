import React, { FC, HTMLAttributes } from "react";
import cn from "classnames";
import Image from "next/image";
import { ProductModel } from "../../interfaces/product.interface";
import { DeclineWord, Price } from "../../helpers";
import { Card } from "../Card/Card";
import { Raiting } from "../Raiting/Raiting";
import { Tag } from "../Tag/Tag";
import { Button } from "../Button/Button";

import classes from "./Product.module.css";

interface ProductProps extends HTMLAttributes<HTMLDivElement> {
   product: ProductModel;
}

export const Product: FC<ProductProps> = ({ className, product, ...props }) => {
   return (
      <Card className={cn(className, classes.product)} {...props} color="white">
         <div className={classes.logo}>
            <Image
               src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
               alt={product.title}
               height={70}
               width={70}
            />
         </div>
         <div className={classes.title}>{product.title}</div>
         <div className={classes.price}>
            {Price(product.price)}
            {product.oldPrice && (
               <Tag className={classes.priceDiffer} color="green">
                  {Price(product.price - product.oldPrice)}
               </Tag>
            )}
         </div>
         <div className={classes.credit}>
            {Price(product.credit)}/<span>мес</span>
         </div>
         <div className={classes.rating}>
            <Raiting raiting={product.reviewAvg ?? product.initialRating} />
         </div>
         <div className={classes.tags}>
            {product.categories.map((c) => (
               <Tag key={c} color="ghost">
                  {c}
               </Tag>
            ))}
         </div>
         <div className={classes.priceTitle}>цена</div>
         <div className={classes.creditTitle}>в кредит</div>
         <div className={classes.ratingTitle}>
            {product.reviewCount}{" "}
            {DeclineWord(product.reviewCount, ["отзыв", "отзыва", "отзывов"])}
         </div>
         <hr className={cn(classes.line, classes.hr)} />
         <div className={classes.description}>{product.description}</div>
         <div className={classes.features}>
            {product.characteristics.map((characteristic) => {
               return (
                  <div className={classes.characteristics}>
                     <span className={classes.characteristicName}>
                        {characteristic.name}
                     </span>
                     <span className={classes.characteristicDots} />
                     <span className={classes.characteristicValue}>
                        {characteristic.value}
                     </span>
                  </div>
               );
            })}
         </div>
         <div className={classes.advBlock}>
            {product.advantages && (
               <div className={classes.advantages}>
                  <div className={classes.advTitle}>Преимущества</div>
                  <div className={classes.advText}>{product.advantages}</div>
               </div>
            )}
            {product.disadvantages && (
               <div className={classes.disadvantages}>
                  <div className={classes.advTitle}>Недостатки</div>
                  <div className={classes.advText}>{product.disadvantages}</div>
               </div>
            )}
         </div>
         <hr className={cn(classes.line, classes.hr2)} />
         <div className={classes.actions}>
            <Button appearence="primary">Узнать подробнее</Button>
            <Button appearence="ghost" arrow="right">
               Читать отзывы
            </Button>
         </div>
      </Card>
   );
};
