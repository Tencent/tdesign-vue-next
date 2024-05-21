import { createApp, pluginInstall } from '@td/adapter-vue';
import { createPopper } from '@popperjs/core';
import { getAttach } from '@td/adapter-utils';

import type { TNode } from '@td/shared/interface';
import type { TdPopupProps } from '@td/intel/popup/type';
import type { App, Plugin } from '@td/adapter-vue';
import type { Instance } from '@popperjs/core';
import popupOverlayComponent from './overlay';
import { getPopperPlacement } from './utils';

export interface PopupPluginApi {
  config: TdPopupProps;
}

export type PopupPluginMethod = (
  triggerEl: string | HTMLElement,
  content: TNode,
  popupProps?: TdPopupProps
) => Instance;

export type PopupPluginType = Plugin & PopupPluginMethod;

let popperInstance: Instance | null;
let overlayInstance: HTMLElement | null;
let triggerEl: HTMLElement | Element | null;

function removeOverlayInstance() {
  if (overlayInstance) {
    overlayInstance.remove();
    overlayInstance = null;
  }
  if (popperInstance) {
    popperInstance.destroy();
    popperInstance = null;
  }
}

export const createPopupPlugin: PopupPluginMethod = (
  trigger,
  content,
  popupProps,
) => {
  const currentTriggerEl = getAttach(trigger);

  triggerEl = currentTriggerEl;
  removeOverlayInstance();

  const overlayAttach = getAttach(popupProps?.attach || 'body');

  const popupDom = document.createElement('div');
  popupDom.style.cssText
    = 'position: absolute; top: 0px; left: 0px; width: 100%';

  const overlayInstance = createApp(popupOverlayComponent, {
    ...popupProps,
    content,
    triggerElement: triggerEl,
  }).mount(popupDom).$el;

  popupDom.appendChild(overlayInstance);
  overlayAttach.appendChild(popupDom);
  popperInstance = createPopper(triggerEl, overlayInstance, {
    placement: getPopperPlacement(
      popupProps?.placement || ('top' as TdPopupProps['placement']),
    ),
    ...popupProps?.popperOptions,
  });
  return popperInstance;
};

export const PopupPlugin: PopupPluginType = createPopupPlugin as PopupPluginType;

PopupPlugin.install = (app: App) => {
  pluginInstall(app, createPopupPlugin, '$popup');
};

export default PopupPlugin;
