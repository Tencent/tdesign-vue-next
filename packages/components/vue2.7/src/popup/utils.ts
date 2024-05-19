import { off, on } from '@td/adapter-utils';

import type {
  PopupTriggerEvent,
  TdPopupProps,
} from '@td/intel/components/popup/type';
import type { Placement } from '@popperjs/core';

import type { Ref } from '@td/adapter-vue';

const triggers = ['click', 'hover', 'focus', 'context-menu'] as const;

const defaultVisibleDelay = [250, 150];

const POPUP_ATTR_NAME = 'data-td-popup';
const POPUP_PARENT_ATTR_NAME = 'data-td-popup-parent';

function getPopperPlacement(placement: TdPopupProps['placement']) {
  return placement
    ?.replace(/-(left|top)$/, '-start')
    .replace(/-(right|bottom)$/, '-end') as Placement;
}

function attachListeners(elm: Ref<Element>) {
  const offs: Array<() => void> = [];
  return {
    add<K extends keyof HTMLElementEventMap>(
      type: K,
      listener: (ev: HTMLElementEventMap[K]) => void,
    ) {
      if (!type) {
        return;
      }
      on(elm.value, type, listener);
      offs.push(() => {
        off(elm.value, type, listener);
      });
    },
    clean() {
      offs.forEach(handler => handler?.());
      offs.length = 0;
    },
  };
}

function getTriggerType(ev?: PopupTriggerEvent) {
  switch (ev?.type) {
    case 'mouseenter':
      return 'trigger-element-hover';
    case 'mouseleave':
      return 'trigger-element-hover';
    case 'focusin':
      return 'trigger-element-focus';
    case 'focusout':
      return 'trigger-element-blur';
    case 'click':
      return 'trigger-element-click';
    case 'context-menu':
    case 'keydown':
      return 'keydown-esc';
    case 'mousedown':
      return 'document';
    default:
      return 'trigger-element-close';
  }
}

/**
 * @param id
 * @param upwards query upwards poppers
 */
function getPopperTree(id: number | string, upwards?: boolean): Element[] {
  const list = [] as any;
  const selectors = [POPUP_PARENT_ATTR_NAME, POPUP_ATTR_NAME];

  if (!id) {
    return list;
  }
  if (upwards) {
    selectors.unshift(selectors.pop());
  }

  recurse(id);

  return list;

  function recurse(id: number | string) {
    const children = document.querySelectorAll(`[${selectors[0]}="${id}"]`);
    children.forEach((el) => {
      list.push(el);
      const childId = el.getAttribute(selectors[1]);
      if (childId && childId !== id) {
        recurse(childId);
      }
    });
  }
}
export {
  getPopperPlacement,
  attachListeners,
  triggers,
  defaultVisibleDelay,
  POPUP_ATTR_NAME,
  POPUP_PARENT_ATTR_NAME,
  getTriggerType,
  getPopperTree,
};
