import React from "react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { useSession, getSession } from "next-auth/react";
import Layout from "@components/Layout";
import prisma from "utils/prisma";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { album: [] } };
  }

  const album = await prisma.post.findMany({
    where: {
      user: { email: session?.user?.email },
    },
    include: {
      user: {
        select: { name: true },
      },
    },
  });
  return {
    props: { album: album },
  };
};

type Props = {
  drafts: PostProps[];
};

const Album: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <h1>My Album</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <h1>My Album</h1>
        <main>
          {props.album.map((image) => (
            <div key={image.publicId} className="">
              <Image src={image.imageUrl} alt={image.description} fill={true} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default Album;
