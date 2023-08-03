const conditionalClassName = (
  baseClassName: string,
  ClassName?: string
): string => (ClassName ? [baseClassName, ClassName].join(" ") : baseClassName);

export default conditionalClassName;
