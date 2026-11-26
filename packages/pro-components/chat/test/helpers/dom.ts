/** 读取公开 DOM 语义，同时支持 webc 的开放 shadow root 和 Vue 的普通 DOM。 */
export const findInChat = (root: Element | ShadowRoot, selector: string): Element[] => {
  const found = Array.from(root.querySelectorAll(selector));
  const elements = [root, ...Array.from(root.querySelectorAll('*'))];
  elements.forEach((element) => {
    if (element instanceof Element && element.shadowRoot) {
      found.push(...findInChat(element.shadowRoot, selector));
    }
  });
  return found;
};

export const chatText = (root: Element | ShadowRoot): string => {
  if (root instanceof Element && root.shadowRoot) return chatText(root.shadowRoot);
  const nodes = root instanceof HTMLSlotElement ? root.assignedNodes({ flatten: true }) : [];
  return Array.from(nodes.length ? nodes : root.childNodes)
    .map((node) => {
      if (node instanceof Element) {
        if (['STYLE', 'SCRIPT'].includes(node.tagName)) return '';
        return chatText(node);
      }
      return node.nodeType === Node.TEXT_NODE ? node.textContent : '';
    })
    .join('');
};
