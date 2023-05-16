import React, { useState } from "react";
import Layout from "@components/Layout";
import Router from "next/router";

const Upload: React.FC = () => {
  const [image, setImage] = useState();
  const [description, setDescription] = useState("");

  const handleChange = (e: React.SyntheticEvent) => {
    setImage(e.target.files[0]);
  };

  const handleClick = () => {};

  /** Call API route to create a post */
  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!image) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", image);

      await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: formData,
      });
      await Router.push("/uploaded");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="">
        <form onSubmit={submitData}>
          <h1 className="">UPLOAD YOUR IMAGE</h1>
          <p className="">File should be jpeg, png, ...</p>
          <input
            title="Image File"
            onChange={handleChange}
            accept=".jpg, .png, .gif, .jpeg"
            type="file"
          />
          <textarea
            cols={50}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows={1}
            value={description}
          />
          <button type="button" className="" onClick={handleClick}>
            CHOOSE A FILE
          </button>
          <div className="">
            <input disabled={!description} type="submit" value="UPLOAD" />
            <a className="" href="#" onClick={() => Router.push("/")}>
              CANCEL
            </a>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Upload;
