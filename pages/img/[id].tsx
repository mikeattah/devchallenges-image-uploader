import React, { useState } from "react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Router from "next/router";
import { useSession } from "next-auth/react";
import { Authenticating } from "@components/atoms";
import { PostProps } from "@components/molecules";
import { Layout } from "@components/templates";
import prisma from "@utils/prisma";

export const getServerSideProps: GetServerSideProps<{
  post: PostProps;
}> = async ({ params }) => {
  const image = await prisma.post.findUnique({
    where: { id: String(params?.id) },
    include: {
      user: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: { image: image },
  };
};

/**
 * Delete an image via API route
 *
 * @param id
 */
async function handleDelete(id: string): Promise<void> {
  await fetch(`/api/delete/${id}`, {
    method: "DELETE",
  });
  Router.push("/");
}

const ViewImage: React.FC<PostProps> = (props) => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <Authenticating />;
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.user?.email;
  const [copied, setCopied] = useState(false);
  const [privacy, setPrivacy] = useState(props.private);

  /** Copy image url to clipboard */
  const handleCopy = () => {
    if (!navigator.clipboard) {
      return;
    }
    navigator.clipboard.writeText(props.imageUrl).then(
      function () {
        console.log("Async: copying URL to clipboard was successful");
        setCopied(true);
      },
      function (err) {
        console.error("Could not copy URL", err);
      }
    );
  };

  /** toggle image privacy between public and private */
  const handlePrivacy = async (id: string) => {
    const update = await prisma.post.update({
      where: { id: id },
      data: {
        private: !privacy,
      },
    });
    setPrivacy(update.privacy);
  };

  return (
    <Layout>
      <div>
        <h1 className="">Image uploaded successfully</h1>
        <p className="">Uploaded by: {props?.user?.name || "Unknown User"}</p>
        <p className="">{props.description}</p>
        <div className="">
          <Image
            width="400"
            height="300"
            alt={props.description}
            src={props.imageUrl}
          />
          <div className="">
            <input
              title="copy image url"
              value={props.imageUrl}
              type="text"
              className=""
            />
            <button type="button" onClick={handleCopy} className="">
              Copy
            </button>
            {/* add copied tooltip */}
            {/* and/or download image? */}
          </div>
        </div>
        {userHasValidSession && postBelongsToUser && (
          <div className="">
            <button
              type="button"
              onClick={() => handlePrivacy(props.id)}
              className=""
            >
              {props.private ? "Private" : "Public"}
            </button>
            <button
              type="button"
              onClick={() => handleDelete(props.id)}
              className=""
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ViewImage;
