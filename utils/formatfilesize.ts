// source: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
export const formatFileSize = (size: number): string => {
  if (size < 1024) {
    return `${size} bytes`;
  } else if (size >= 1024 && size < 1048576) {
    return `${(size / 1024).toFixed(1)} KB`;
  } else if (size >= 1048576) {
    return `${(size / 1048576).toFixed(1)} MB`;
  }
  return "";
};
