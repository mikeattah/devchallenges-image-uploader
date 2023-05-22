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
    <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <Image
        height="300"
        width="400"
        src={post.imageUrl}
        alt={post.description}
        fill={true}
      />
      <small className="">Uploaded by {userName}</small>
      <small className="">{post.description}</small>
    </div>
  );
};

export default Post;
