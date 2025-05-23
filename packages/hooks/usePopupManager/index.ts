// https://github.dev/arco-design/arco-design-vue
import { onMounted, onBeforeUnmount, readonly, Ref, ref, watch } from 'vue';
export type PopupType = 'popup' | 'dialog' | 'message' | 'drawer';

const popupStackType = ['dialog', 'drawer'];
const POPUP_BASE_Z_INDEX = 1000;
const MESSAGE_BASE_Z_INDEX = 5000;
const Z_INDEX_STEP = 1;

class PopupManager {
  private popupStack = {
    popup: new Set<number>(),
    dialog: new Set<number>(),
    message: new Set<number>(),
    drawer: new Set<number>(),
  };

  private zIndexStack: number[] = [];

  private getNextZIndex = (type: PopupType) => {
    const current =
      type === 'message'
        ? Array.from(this.popupStack.message).pop() || MESSAGE_BASE_Z_INDEX
        : Array.from(this.popupStack.popup).pop() || POPUP_BASE_Z_INDEX;
    return current + Z_INDEX_STEP;
  };

  public add = (type: PopupType) => {
    const zIndex = this.getNextZIndex(type);
    this.popupStack[type].add(zIndex);
    if (popupStackType.includes(type)) {
      this.popupStack.popup.add(zIndex);
    }
    this.zIndexStack.push(zIndex);
    return zIndex;
  };

  public delete = (zIndex: number, type: PopupType) => {
    this.popupStack[type].delete(zIndex);
    if (popupStackType.includes(type)) {
      this.popupStack.popup.delete(zIndex);
    }
    const index = this.zIndexStack.indexOf(zIndex);
    if (index !== -1) {
      this.zIndexStack.splice(index, 1);
    }
  };

  // 最顶层的交互式弹窗（指Dialog和Drawer）
  public isTopInteractivePopup = (popupType: PopupType, zIndex: number) => {
    if (popupStackType.includes(popupType)) {
      const lastZIndex = this.zIndexStack[this.zIndexStack.length - 1];
      return zIndex === lastZIndex;
    }

    if (this.popupStack[popupType]?.size > 1) {
      return zIndex === Array.from(this.popupStack[popupType]).pop();
    }

    return true;
  };

  public getLastZIndex = () => {
    return this.zIndexStack[this.zIndexStack.length - 1];
  };
}

const popupManager = new PopupManager();

export function usePopupManager(
  type: PopupType,
  {
    visible,
    runOnMounted,
  }: {
    visible?: Ref<boolean>;
    runOnMounted?: boolean;
  } = {},
) {
  const zIndex = ref(0);

  const open = () => {
    zIndex.value = popupManager.add(type);
  };

  const close = () => {
    popupManager.delete(zIndex.value, type);
  };

  const isTopInteractivePopup = () => {
    if (popupStackType.includes(type)) {
      return popupManager.isTopInteractivePopup(type, zIndex.value);
    }
    return false;
  };

  watch(
    () => visible?.value,
    (visible) => {
      if (visible) {
        open();
      } else {
        close();
      }
    },
    {
      immediate: true,
    },
  );

  if (runOnMounted) {
    onMounted(() => {
      open();
    });

    onBeforeUnmount(() => {
      close();
    });
  }

  return {
    zIndex: readonly(zIndex),
    open,
    close,
    isTopInteractivePopup,
  };
}
