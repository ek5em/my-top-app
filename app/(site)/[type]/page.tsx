"use client";
import { notFound } from "next/navigation";
import { withLayout } from "../../../Layout/Layout";
import { firstLevelMenu } from "../../../helpers";

const Type = async ({ params }: { params: { type: string } }) => {
    const firstCategoryItem = firstLevelMenu.find(
        (m) => m.route === params.type
    );
    if (!firstCategoryItem) {
        notFound();
    }

    return <div></div>;
};

export default withLayout(Type);
