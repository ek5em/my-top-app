"use client";
import { getPage, getProducts } from "../../../../api";
import { notFound } from "next/navigation";
import { withLayout } from "../../../../Layout/Layout";
import { firstLevelMenu } from "../../../../helpers";
import TopPageComponent from "../../../../page-component/TopPageComponent";
import { useEffect, useState } from "react";
import { ProductModel } from "../../../../interfaces/product.interface";
import { TopPageModel } from "../../../../interfaces/page.interface";
import Error404 from "../../../404";

const TopPage = ({ params }: { params: { alias: string; type: string } }) => {
    const [page, setPage] = useState<TopPageModel | null>(null);
    const [products, setProducts] = useState<ProductModel[] | null>(null);

    useEffect(() => {
        const fetchPage = async () => {
            const pageRes = await getPage(params.alias);
            if (!pageRes) {
                return;
            }
            setPage(pageRes);

            const productsRes = await getProducts(pageRes.category);
            if (!productsRes) {
                return;
            }
            setProducts(productsRes);
        };
        fetchPage();
    }, []);

    const firstCategoryItem = firstLevelMenu.find(
        (m) => m.route === params.type
    );

    if (!firstCategoryItem || !products) {
        return <Error404 />;
    }
    return (
        <TopPageComponent
            firstLevelCattegory={firstCategoryItem.id}
            page={page}
            products={products}
        />
    );
};

export default withLayout(TopPage);
