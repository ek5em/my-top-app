import React, { FC } from "react";
import { Tag } from "../components";

const Home: FC = () => {
  return (
    <div>
      <Tag size="s" color="ghost">гост</Tag>
      <Tag size="s" color="gray">грей</Tag>
      <Tag color="green">грин</Tag>
      <Tag color="primary">примари</Tag>
      <Tag color="red">ред</Tag>
    </div>
  );
};

export default Home;
