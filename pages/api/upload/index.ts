import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import { uploadImage } from "@utils/cloudinary";
import prisma from "@utils/prisma";

/**
 * POST /api/upload
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
  const { formData } = req.body;

  const session = await getSession({ req });
  const cloud = await uploadImage(formData.image);

  const result = await prisma.post.create({
    data: {
      ...cloud,
      description: formData.description,
      private: false,
      user: { connect: { email: session?.user?.email! } },
    },
  });
  res.json(result);
}
