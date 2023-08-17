export function mergeClasses(externalClass?: string, internalClass?: string) {
  if (!externalClass && !internalClass) return undefined;
  if (!externalClass) return internalClass;
  if (!internalClass) return externalClass;

  return `${externalClass} ${internalClass}`;
}
