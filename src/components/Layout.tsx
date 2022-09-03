import Head from "next/head";
import React from "react";

const Layout: React.FC<{ children: React.ReactNode; title?: string }> = ({
  children,
  title,
}) => {
  return (
    <>
      <Head>
        <title>{title ? `${title} | ReactTable` : "ReactTable"}</title>
      </Head>
      {children}
    </>
  );
};

export default Layout;
