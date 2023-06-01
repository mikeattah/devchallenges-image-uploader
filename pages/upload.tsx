import React, { useRef, useState } from "react";
import Router from "next/router";
import Image from "next/image";
import "flowbite";
// import type { Post } from "@prisma/client";
import { Layout } from "@components/templates";
import { formatFileSize } from "@utils/formatfilesize";
import { ImageFile, validateFileType } from "@utils/validatefiletype";

const Upload: React.FC = () => {
  const [image, setImage] = useState<ImageFile>({
    name: "",
    lastModified: 0,
    size: 0,
    type: "",
  });
  const [description, setDescription] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      setImage(e.currentTarget.files[0]);
      // handleFiles(e.target.files)
    }
  };

  /** Call file system to select image file for upload */
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    } else {
      return;
    }
  };

  /** handle file drag events */
  const handleDrag = (e: React.DragEvent<HTMLDivElement | HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  /** handles file drop event */
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // handleFiles(e.currentTarget.files)
    }
  };

  /** Call API route to create a post */
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElem = document.getElementById("form-upload-image") as
      | HTMLFormElement
      | undefined;

    if (!image.name || !validateFileType(image)) {
      return;
    }

    try {
      const inputElem = document.getElementById(
        "input-upload-image"
      ) as HTMLInputElement;
      const imageBlob = await fetch(inputElem.value).then((res) => res.blob());
      const formData = new FormData(formElem);
      formData.append("image", imageBlob, image.name);

      const response = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        body: formData,
      });

      await Router.push("/img/[id]", `/img/${response.id}`);
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
          onSubmit={handleSubmit}
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
                  image.name
                    ? URL.createObjectURL(image)
                    : "@public/images/image.svg"
                }
              />
              {image.name ? (
                validateFileType(image) ? (
                  <small className="text-blue-500">
                    File name: {image.name} &#124; File size:{" "}
                    {formatFileSize(image.size)}
                  </small>
                ) : (
                  <small className="text-red-500">
                    {image.name} is not a valid image file. Please select an
                    image file.
                  </small>
                )
              ) : (
                <small className="text-black">
                  No file currently selected for upload.
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
          <fieldset className="">
            <legend className="">Set image visiibility:</legend>
            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="radio-upload-public"
                name="privacy"
                value="public"
                checked
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 transition-all duration-200"
              />
              <label
                htmlFor="radio-upload-public"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Public
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="radio-upload-private"
                name="privacy"
                value="private"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 transition-all duration-200"
              />
              <label
                htmlFor="radio-upload-private"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Private
              </label>
            </div>
          </fieldset>
          <div className="">
            <input
              disabled={!description || !image.name}
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
              className="absolute h-full w-full rounded-2xl inset-0"
            ></div>
          )}
        </form>
      </div>
    </Layout>
  );
};

export default Upload;
