import React from "react";
import { GetServerSideProps } from "next";
import Router from "next/router";
import Layout from "@components/Layout";
import { PostProps } from "@components/Post";
import { useSession } from "next-auth/react";
import prisma from "utils/prisma";

export const getServerSideProps: GetServerSideProps<{
  post: PostProps;
}> = async ({ params }) => {
  const post = (await prisma.post.findUnique({
    where: { id: String(params?.id) },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  })) as PostProps;
  return {
    props: { post: post },
  };
};

/**
 * Publish a post via API route
 *
 * @param id
 */
async function publishPost(id: string): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: "PUT",
  });
  await Router.push("/");
}

/**
 * Delete a post via API route
 *
 * @param id
 */
async function deletePost(id: string): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });
  Router.push("/");
}

const Post: React.FC<PostProps> = (props) => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.author?.email;
  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {props?.author?.name || "Unknown author"}</p>
        {!props.published && userHasValidSession && postBelongsToUser && (
          <button type="button" onClick={() => publishPost(props.id)}>
            Publish
          </button>
        )}
        {userHasValidSession && postBelongsToUser && (
          <button type="button" onClick={() => deletePost(props.id)}>
            Delete
          </button>
        )}
      </div>
    </Layout>
  );
};

export default Post;
