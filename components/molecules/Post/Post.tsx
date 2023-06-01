import React from "react";
import Image from "next/image";
import Router from "next/router";

export type PostProps = {
  id: string;
  user: {
    name: string;
    email: string;
  } | null;
  imageUrl: string;
  description: string;
  private: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const userName = post.user ? post.user.name : "Unknown User";
  return (
    <div
      onClick={() => Router.push("/img/[id]", `/img/${post.id}`)}
      className=""
    >
      <Image
        height="300"
        width="400"
        src={post.imageUrl}
        alt={post.description}
        fill={true}
      />
      <div className="">
        <p className="">Uploaded by {userName}</p>
        <p className="">{post.description}</p>
      </div>
    </div>
  );
};

export default Post;
