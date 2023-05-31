import React, { useRef, useState } from "react";
import { Layout } from "@components/templates";
import Router from "next/router";
import Image from "next/image";
import { validateFileType } from "@utils/validatefiletype";
import { formatFileSize } from "@utils/formatfilesize";

const Upload: React.FC = () => {
  const [image, setImage] = useState();
  const [description, setDescription] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleChange = (e: React.ChangeEvent) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      // handleFiles(e.target.files)
    }
  };

  /** Call file system to select image file for upload */
  const handleClick = () => {
    if (inputRef) {
      inputRef.current.click();
    } else {
      return;
    }
  };

  /** handle file drag events */
  const handleDrag = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  /** handles file drop event */
  const handleDrop = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // handleFiles(e.dataTransfer.files)
    }
  };

  /** Call API route to create a post */
  const uploadImage = async (e: React.SyntheticEvent) => {
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
        <h1 className="">UPLOAD YOUR IMAGE</h1>
        <p className="">File should be jpeg, png, ...</p>
        <form
          method="post"
          encType="multipart/form-data"
          id="form-upload-image"
          onDragEnter={handleDrag}
          onSubmit={uploadImage}
        >
          <input
            id="input-upload-image"
            name="input-upload-image"
            onChange={handleChange}
            accept="image/*"
            type="file"
            ref={inputRef}
            className="opacity-0"
          />
          <label
            id="label-upload-image"
            htmlFor="input-upload-image"
            title="upload an image"
            className={`general styles ${
              dragActive ? "active styles" : "inactive styles"
            }`}
          >
            <div className="">
              <Image
                width="400"
                height="300"
                alt="click to upload image"
                src={
                  image
                    ? URL.createObjectURL(image)
                    : "@public/images/image.svg"
                }
              />
              {image ? (
                validateFileType(image) ? (
                  <small className="text-blue-500">
                    File name: {image?.name} &#124; File size:{" "}
                    {formatFileSize(image?.size)}
                  </small>
                ) : (
                  <small className="text-red-500">
                    {image?.name} is not a valid image file. Please select an
                    image file.
                  </small>
                )
              ) : (
                <small className="text-black">
                  No file currently selected for upload
                </small>
              )}
              <button type="button" onClick={handleClick} className="">
                Drag & Drop your image here
              </button>
            </div>
          </label>
          <p className="">OR</p>
          <button type="button" onClick={handleClick} className="">
            CHOOSE A FILE
          </button>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            cols={50}
            rows={1}
            placeholder="Description"
            value={description}
          />
          <div className="">
            <input
              disabled={!description || !image}
              type="submit"
              value="UPLOAD"
            />
            <a href="#" onClick={() => Router.push("/")} className="">
              CANCEL
            </a>
          </div>
          {dragActive && (
            <div
              id="drag-file-element"
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className="absolute h-100 w-100 border"
            ></div>
          )}
        </form>
      </div>
    </Layout>
  );
};

export default Upload;
