import path from "path";

export function getToolName() {
  const url = window.location.pathname;
  const filePath = url;

  // Extract the last segment of the URL path
  const segments = filePath.split("/");
  const fileName = segments[segments.length - 1];

  // Remove file extension if present
  const fileNameWithoutExtension = path.basename(fileName, ".js");

  return fileNameWithoutExtension;
}
