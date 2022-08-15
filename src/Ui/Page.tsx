import React, { FC } from "react";

import './Page.scss';

// Basic page layout for each route
const Page: FC = (props) => {
  return (
    <section className="appPage">
      {props.children}
    </section>
  );
};
export default Page;