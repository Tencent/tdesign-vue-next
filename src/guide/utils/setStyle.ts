export default function setStyle(element: HTMLElement, style: Record<string, any> | string) {
  let cssText = '';

  if (element.style.cssText) {
    cssText += element.style.cssText;
  }

  if (typeof style === 'string') {
    cssText += style;
  } else {
    for (const rule in style) {
      cssText += `${rule}:${style[rule]};`;
    }
  }

  element.style.cssText = cssText;
}
