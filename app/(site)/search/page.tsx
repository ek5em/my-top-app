'use client'
import { useSearchParams } from "next/navigation";
import { withLayout } from "../../../Layout/Layout";

const Search = () => {
   const search = useSearchParams().get("q");
   return <div>{search}</div>;
};

export default withLayout(Search);
