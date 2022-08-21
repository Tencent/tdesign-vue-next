/**
 * Find the nearest scrollable parent
 * @param Element element
 * @return Element
 */
export default function getScrollParent(element: any) {
  let style = window.getComputedStyle(element);
  const excludeStaticParent = style.position === 'absolute';
  const overflowRegex = /(auto|scroll)/;

  if (style.position === 'fixed') return document.body;

  for (let parent = element; parent.parentElement; ) {
    parent = parent.parentElement;
    style = window.getComputedStyle(parent);
    if (excludeStaticParent && style.position === 'static') {
      continue;
    }
    if (overflowRegex.test(style.overflow + style.overflowY + style.overflowX)) return parent;
  }

  return document.body;
}
