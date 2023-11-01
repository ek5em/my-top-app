import { FC } from "react";
import { withLayout } from "../Layout/Layout";
import { getMenu } from "../api/menu";

const Home: FC = async () => {
   const menu = await getMenu(0);

   return (
      <div>
         <ul>
            {menu.map((m) => (
               <li key={m._id.secondCategory}>{m._id.secondCategory}</li>
            ))}
         </ul>
      </div>
   );
};

export default withLayout(Home);
