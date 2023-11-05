import { getMenu, getPage, getProducts } from "../../../../api";
import { notFound } from "next/navigation";
import { withLayout } from "../../../../Layout/Layout";
import { firstLevelMenu } from "../../../../helpers";

const Alias = async ({
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

   const menu = await getMenu(firstCategoryItem.id);
   const products = await getProducts(page.category);

   return <div>{products.length}</div>;
};

export default withLayout(Alias);
