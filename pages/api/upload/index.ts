import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import { UploadApiResponse, uploadImage } from "@utils/cloudinary";
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

  // get user session
  const session = await getSession({ req });

  // upload image file to cloudinary server
  const image = (await uploadImage(
    URL.createObjectURL(formData.image)
  )) as UploadApiResponse;

  // post image details to database
  const result = await prisma.post.create({
    data: {
      id: image.asset_id || image.signature,
      publicId: image.public_id,
      url: image.secure_url,
      format: image.format,
      version: image.version,
      createdAt: image.created_at,
      description: formData.description,
      private: formData.privacy,
      user: { connect: { email: session?.user?.email! } },
    },
  });
  // send image details to client
  res.json(result);
}
