import getConfig from "next/config";

/**
 * ベースパスを付与したパスを返します。
 *
 * @param path パス
 */
export const pathFor = (path: string): string => {
  const {
    publicRuntimeConfig: { basePath },
  } = getConfig();

  if (basePath === undefined || !path.startsWith("/")) {
    return path;
  }
  return `${basePath}${path}`;
};
