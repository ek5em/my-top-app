"use client";
import { getPage, getProducts } from "../../../../api";
import { notFound } from "next/navigation";
import { withLayout } from "../../../../Layout/Layout";
import { firstLevelMenu } from "../../../../helpers";
import TopPageComponent from "../../../../page-component/TopPageComponent";
import { useEffect, useState } from "react";
import { ProductModel } from "../../../../interfaces/product.interface";
import { TopPageModel } from "../../../../interfaces/page.interface";

const TopPage = ({ params }: { params: { alias: string; type: string } }) => {
    const [page, setPage] = useState<TopPageModel | null>(null);
    const [products, setProducts] = useState<ProductModel[]>([]);

    useEffect(() => {
        const fetchPage = async () => {
            const pageRes = await getPage(params.alias);
            if (!pageRes) {
                return notFound();
            }
            setPage(pageRes);

            const productsRes = await getProducts(pageRes.category);
            if (!productsRes) {
                return notFound();
            }
            setProducts(productsRes);
        };
        fetchPage();
    }, []);

    const firstCategoryItem = firstLevelMenu.find(
        (m) => m.route === params.type
    );

    if (firstCategoryItem) {
        return (
            <TopPageComponent
                firstLevelCattegory={firstCategoryItem.id}
                page={page}
                products={products}
            />
        );
    }
};

export default withLayout(TopPage);
