import React, { FC } from "react";

// Basic layout for all app
const Layout: FC = (props) => {
  return (
    <div className="appRootBodyWrap">
      <div className="appRootBody">
        {props.children}
      </div>
    </div>
  );
};
export default Layout;