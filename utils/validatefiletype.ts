// source:  https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
const fileTypes = [
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon",
];

export type ImageFile = {
  name: string;
  lastModified: number;
  lastModifiedDate?: Date;
  size: number;
  type: string;
  webkitRelativePath?: string;
};

export const validateFileType = (file: ImageFile) => {
  return fileTypes.includes(file.type);
};
