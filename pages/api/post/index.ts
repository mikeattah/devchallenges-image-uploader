import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "utils/prisma";

/**
 * POST /api/post
 *
 * Update the API route to modify the database using Prisma Client
 *
 * @param req
 *
 * @param res
 *
 * Required fields in body: title
 *
 * Optional fields in body: content
 */
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, content } = req.body;

  const session = await getSession({ req });
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: session?.user?.email! } },
    },
  });
  res.json(result);
}
