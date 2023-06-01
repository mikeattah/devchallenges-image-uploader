import React from "react";
import { GetStaticProps } from "next";
import { Pagination } from "flowbite-react";
import { Post, PostProps } from "@components/molecules";
import { Layout } from "@components/templates";
import prisma from "@utils/prisma";

export const getStaticProps: GetStaticProps = async () => {
  const images = await prisma.post.findMany({
    where: { private: false },
    include: {
      user: {
        select: { name: true },
      },
    },
  });
  return {
    props: { images: images },
    revalidate: 10,
  };
};

type Props = {
  images: PostProps[];
};

const Home: React.FC<Props> = ({ images }) => {
  return (
    <Layout>
      <h1 className="">Public Images</h1>
      <div className="">
        {images.map((post) => (
          <div key={post.id} className="">
            <Post post={post} />
          </div>
        ))}
      </div>
      <Pagination currentPage={} onPageChange={} totalPages={} className="" />
    </Layout>
  );
};

export default Home;
