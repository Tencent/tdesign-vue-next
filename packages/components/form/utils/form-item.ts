export function getFormItemClassName(componentName: string, name?: string) {
  if (!name) return '';
  return `${componentName}__${name}`.replace(/(\[|\]|\.)+/g, '_');
}
