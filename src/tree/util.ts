
export function getParentNodes(element?: HTMLElement, parent?: HTMLElement): Array<HTMLElement> {
  const parents = [];
  let el: any = element;
  while (el && el.parentNode) {
    parents.push(el);
    if (el === parent) {
      break;
    }
    el = el.parentNode;
  }
  return parents;
};
