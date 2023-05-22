import React from "react";
import { GetStaticProps } from "next";
import { Layout } from "@components/templates";
import { Post, PostProps } from "@components/molecules";
import prisma from "@utils/prisma";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { private: false },
    include: {
      user: {
        select: { name: true },
      },
    },
  });
  return {
    props: { feed: feed },
    revalidate: 10,
  };
};

type Props = {
  feed: PostProps[];
};

const Home: React.FC<Props> = ({ feed }) => {
  return (
    <Layout>
      <div className="">
        <h1>Public Images</h1>
        <main>
          {feed.map((post) => (
            <div key={post.id} className="">
              <Post post={post} />
            </div>
          ))}
        </main>
        <p>Pagination (Pager Component)</p>
      </div>
    </Layout>
  );
};

export default Home;
