"use client";
import { FC, useState } from "react";
import { Raiting } from "../components";
import { withLayout } from "../Layout/Layout";
const Home: FC = () => {
   const [raiting, setRaiting] = useState<number>(3);
   return (
      <div>
         <Raiting raiting={raiting} isEditable setRaiting={setRaiting} />
         <Raiting raiting={raiting} isEditable setRaiting={setRaiting} />
         <Raiting raiting={raiting} isEditable setRaiting={setRaiting} />
         <Raiting raiting={raiting} isEditable setRaiting={setRaiting} />
      </div>
   );
};

export default withLayout(Home);
