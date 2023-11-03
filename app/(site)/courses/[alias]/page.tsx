import { getMenu, getPage, getProducts } from "../../../../api";
import { notFound } from "next/navigation";
import { withLayout } from "../../../../Layout/Layout";

const firstCategory = 0;

const Courses = async ({ params }: { params: { alias: string } }) => {
   const page = await getPage(params.alias);
   if (!page) {
      notFound();
   }
   const menu = await getMenu(firstCategory);
   const products = await getProducts(page.category);

   return <div></div>;
};

export default withLayout(Courses);
