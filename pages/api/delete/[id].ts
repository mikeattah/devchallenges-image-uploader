import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@utils/prisma";

/**
 * DELETE /api/delete/:id
 *
 * API route to modify the database to delete an image using Prisma Client
 *
 * @param req
 *
 * @param res
 */
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const publicId = req.body?.id;
  if (req.method === "DELETE") {
    const post = await prisma.post.delete({
      where: { id: publicId },
    });
    res.json(post);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
