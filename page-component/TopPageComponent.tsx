"use client";
import React, { FC, useEffect, useReducer } from "react";
import { TopLevelCategory, TopPageModel } from "../interfaces/page.interface";
import { ProductModel } from "../interfaces/product.interface";
import {
    Advantages,
    HhDataComponent,
    Htag,
    Product,
    Sort,
    Tag,
} from "../components";
import { sortReduser } from "./sort.reducer";
import { ESort } from "../components/Sort/Sort";

import classes from "./TopPageComponent.module.css";

interface ITopPageProps {
    firstLevelCattegory: TopLevelCategory;
    page: TopPageModel | null;
    products: ProductModel[];
}

const TopPageComponent: FC<ITopPageProps> = ({
    firstLevelCattegory,
    page,
    products,
}) => {
    const [{ products: sortedProducts, sort }, dispathSort] = useReducer(
        sortReduser,
        {
            sort: ESort.Price,
            products,
        }
    );

    useEffect(() => {
        dispathSort({ type: "reset", initialState: products });
    }, [products]);

    const setSort = (sort: ESort): void => {
        dispathSort({ type: sort });
    };

    return (
        <>
            {page && (
                <div className={classes.wrapper}>
                    <div className={classes.title}>
                        <Htag tag="h1">{page.title}</Htag>
                        {products.length && (
                            <Tag color="gray" size="l">
                                {products.length}
                            </Tag>
                        )}
                        <Sort sort={sort} setSort={setSort} />
                    </div>
                    <div>
                        {sortedProducts &&
                            sortedProducts.map((p) => (
                                <Product layout key={p._id} product={p} />
                            ))}
                    </div>
                    <div className={classes.HhTitle}>
                        <Htag tag="h2">Вакансии - {page.category}</Htag>
                        <Tag color="red" size="l">
                            hh.ru
                        </Tag>
                    </div>
                    {firstLevelCattegory === TopLevelCategory.Courses &&
                        page.hh && <HhDataComponent {...page.hh} />}
                    {page.advantages && page.advantages.length > 1 && (
                        <Advantages advantages={page.advantages} />
                    )}
                    {page.seoText && (
                        <div
                            className={classes.seo}
                            dangerouslySetInnerHTML={{ __html: page.seoText }}
                        />
                    )}
                    <div className={classes.skills}>
                        <Htag tag="h2">Получаемые навыки</Htag>
                        <div className={classes.tags}>
                            {page.tags.map((t) => (
                                <Tag key={t}>{t}</Tag>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TopPageComponent;
