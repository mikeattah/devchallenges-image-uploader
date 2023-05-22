import React, { ReactNode } from "react";
import { Footer, Header } from "@components/organisms";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div className="">
    <Header />
    <main className="">{props.children}</main>
    <Footer />
  </div>
);

export default Layout;
