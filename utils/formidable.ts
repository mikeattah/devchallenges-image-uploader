import { IncomingForm } from "formidable";

export async function getImage(formData) {
  const data = await new Promise(function (resolve, reject) {
    const form = new IncomingForm({ keepExtensions: true });
    form.parse(formData, function (error, fields, files) {
      if (error) return reject(error);
      resolve({ fields, files });
    });
  });

  return data.files.image;
}
