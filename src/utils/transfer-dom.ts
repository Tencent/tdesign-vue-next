/* eslint-disable no-param-reassign */
// Thanks to: https://github.com/airyland/vux/blob/v2/src/directives/transfer-dom/index.js

import { DirectiveBinding } from 'vue/types/options';

// Thanks to: https://github.com/calebroseland/vue-dom-portal
interface TransferData {
  parentNode: HTMLElement;
  home: Comment;
  hasMovedOut: boolean;
  target: HTMLElement;
}
interface TransferElement extends HTMLElement {
  __transferDomData?: TransferData;
  parentNode: HTMLElement;
}
/**
 * Get target DOM Node
 * @param {(Node|string|Boolean)} [node=document.body] DOM Node, CSS selector, or Boolean
 * @return {Node} The target that the el will be appended to
 */
function getTarget(node: any): any {
  if (node === void 0) {
    return document.body;
  }

  if (typeof node === 'string' && node.indexOf('?') === 0) {
    return document.body;
  } if (typeof node === 'string' && node.indexOf('?') > 0) {
    // [node] = node.split('?')[0];
    [node] = node.split('?');
  }

  if (node === 'body' || node === true) {
    return document.body;
  }

  if (node instanceof window.Node) {
    return node;
  }
  return document.querySelector(node) || document.body;
}

function getShouldUpdate(node: any) {
  // do not updated by default
  if (!node) {
    return false;
  }
  if (typeof node === 'string' && node.indexOf('?') > 0) {
    try {
      const config = JSON.parse(node.split('?')[1]);
      return config.autoUpdate || false;
    } catch (e) {
      return false;
    }
  }
  return false;
}

const TransferDom = {
  inserted(el: TransferElement, binding: DirectiveBinding) {
    const { value } = binding;
    el.className = el.className ? `${el.className} v-transfer-dom` : 'v-transfer-dom';
    const { parentNode } = el;
    const home = document.createComment('');
    let hasMovedOut = false;
    const target = getTarget(value);
    if (value !== false) {
      parentNode.replaceChild(home, el); // moving out, el is no longer in the document
      target.appendChild(el); // moving into new place
      hasMovedOut = true;
    }
    if (!el.__transferDomData) {
      el.__transferDomData = {
        parentNode,
        home,
        target,
        hasMovedOut,
      };
    }
  },
  componentUpdated(el: TransferElement, binding: DirectiveBinding) {
    const { value } = binding;
    const shouldUpdate = getShouldUpdate(value);
    if (!shouldUpdate) {
      return;
    }
    // need to make sure children are done updating (vs. `update`)
    const ref$1 = el.__transferDomData;
    // homes.get(el)
    const { parentNode, home, hasMovedOut } = ref$1;

    // recall where home is
    if (!hasMovedOut && value) {
      // remove from document and leave placeholder
      parentNode.replaceChild(home, el);
      // append to target
      getTarget(value).appendChild(el);
      el.__transferDomData = Object.assign(
        {},
        el.__transferDomData,
        { hasMovedOut: true, target: getTarget(value) }
      );
    } else if (hasMovedOut && value === false) {
      // previously moved, coming back home
      parentNode.replaceChild(el, home);
      el.__transferDomData = Object.assign(
        {},
        el.__transferDomData,
        { hasMovedOut: false, target: getTarget(value) }
      );
    } else if (value) {
      // already moved, going somewhere else
      getTarget(value).appendChild(el);
    }
  },
  unbind: function unbind(el: TransferElement) {
    el.className = el.className.replace('v-transfer-dom', '');
    if (el.__transferDomData && el.__transferDomData.hasMovedOut === true) {
      el.__transferDomData.parentNode && el.__transferDomData.parentNode.appendChild(el);
    }
    el.__transferDomData = null;
  },
};

export default TransferDom;
