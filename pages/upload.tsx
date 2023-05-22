import React, { useState } from "react";
import { Layout } from "@components/templates";
import Router from "next/router";
import Image from "next/image";

const Upload: React.FC = () => {
  const [image, setImage] = useState();
  const [description, setDescription] = useState("");

  const handleChange = (e: React.ChangeEvent) => {
    setImage(e.target.files[0]);
  };

  /** Call File System to select image file for upload */
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
      await Router.push("/view-image");
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
            id="input-upload-image"
            onChange={(e) => handleChange(e)}
            accept="image/jpg, image/png, image/jpeg, .gif, "
            type="file"
          />
          <label
            id="label-upload-image"
            htmlFor="input-upload-image"
            title="Upload an image"
          >
            <div className="">
              <Image
                width="200"
                height="150"
                alt="Click to upload image"
                src="@public/images/image.svg"
              />
              <p className="">Drag & Drop your image here</p>
              <button
                type="button"
                title="Click to upload image"
                className=""
              >OR</button>
            </div>
          </label>
          <button type="button" className="" onClick={handleClick}>
            CHOOSE A FILE
          </button>
          <textarea
            cols={50}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows={1}
            value={description}
          />
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
