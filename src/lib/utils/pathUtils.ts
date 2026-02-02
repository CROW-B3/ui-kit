export const normalizePath = (path: string): string => {
  if (!path) return '/';
  return path.replace(/\/$/, '') || '/';
};

export const isActivePath = (
  currentPath: string,
  targetPath: string
): boolean => {
  const normalized = normalizePath(currentPath);
  const target = normalizePath(targetPath);
  return normalized === target;
};

export const isActivePathPrefix = (
  currentPath: string,
  prefix: string
): boolean => {
  const normalized = normalizePath(currentPath);
  const normalizedPrefix = normalizePath(prefix);
  return normalized.startsWith(normalizedPrefix);
};
