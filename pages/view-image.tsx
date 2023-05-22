import React from "react";
import { Layout } from "@components/templates";
import Image from "next/image";

const ViewImage: React.FC = () => {
  /** copy image url to clipboard */
  const handleClick = () => {};

  return (
    <Layout>
      <h1 className="">Image uploaded successfully</h1>
      <div className="">
        <Image width="400" height="300" alt="" src="" />
        <div className="">
          <input type="text" value="" title="copy image url" />
          <button type="button" onClick={handleClick} className="">
            Copy
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ViewImage;
