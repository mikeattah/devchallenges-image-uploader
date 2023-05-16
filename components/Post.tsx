import React from "react";
import Router from "next/router";

export type PostProps = {
  id: string;
  user: {
    name: string;
    email: string;
  } | null;
  description: string;
  private: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const userName = post.user ? post.user.name : "Unknown User";
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <h2>{post.title}</h2>
      <small>By {userName}</small>
    </div>
  );
};

export default Post;
