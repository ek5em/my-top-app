import { getPage, getProducts } from "../../../../api";
import { notFound } from "next/navigation";
import { withLayout } from "../../../../Layout/Layout";
import { firstLevelMenu } from "../../../../helpers";
import TopPageComponent from "../../../../page-component/TopPageComponent";

const TopPage = async ({
   params,
}: {
   params: { alias: string; type: string };
}) => {
   const firstCategoryItem = firstLevelMenu.find(
      (m) => m.route === params.type
   );

   if (!firstCategoryItem) {
      notFound();
   }

   const page = await getPage(params.alias);
   if (!page) {
      notFound();
   }

   const products = await getProducts(page.category);

   return (
      <TopPageComponent
         firstLevelCattegory={firstCategoryItem.id}
         page={page}
         products={products}
      />
   );
};

export default withLayout(TopPage);
