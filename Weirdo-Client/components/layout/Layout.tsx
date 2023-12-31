import React, { PropsWithChildren } from "react";
import NewNavbar from "./NewNavbar";

const Layout = (props: PropsWithChildren) => {
  return (
    <div className="grid min-h-screen grid-rows-header bg-zinc-100">
      <div>
        <NewNavbar />
        <div>
        {props.children}
        </div>
      </div>
    </div>
  )
}

export default Layout;
