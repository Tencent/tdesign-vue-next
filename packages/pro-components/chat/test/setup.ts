import { enableAutoUnmount } from '@vue/test-utils';

enableAutoUnmount(afterEach);

/**
 * chat 组件测试通用前置环境。
 *
 * 这里只补齐 jsdom 缺失、且与「底层实现（webc 自定义元素 / 纯 Vue 组件）无关」的能力，
 * 保证迁移前（webc）与迁移后（纯 Vue）都能得到一致的运行环境。
 */

// ResizeObserver：chat-list 使用其做自动滚动，jsdom 未实现
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}
if (typeof globalThis.ResizeObserver === 'undefined') {
  (globalThis as any).ResizeObserver = ResizeObserverMock;
}

// IntersectionObserver
if (typeof globalThis.IntersectionObserver === 'undefined') {
  (globalThis as any).IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords(): unknown[] {
      return [];
    }
  } as any;
}

// jsdom 的 window.prompt 会抛 "Not implemented"（复制兜底逻辑会调用）
if (typeof window !== 'undefined') {
  (window as any).prompt = (): null => null;
  (window as any).confirm = (): boolean => true;
}

// webc 侧的 markdown 引擎（cherry-markdown）会启动延时任务并在回调中访问 window，
// 环境 teardown 后触发 ReferenceError。这里统一在用例结束后清理挂起的定时器。
// 迁移到纯 Vue 后可直接删除该段。
const pendingTimers = new Set<ReturnType<typeof setTimeout>>();
const nativeSetTimeout = globalThis.setTimeout;
const nativeClearTimeout = globalThis.clearTimeout;
globalThis.setTimeout = ((handler: any, timeout?: number, ...args: any[]) => {
  const id = nativeSetTimeout(handler as any, timeout as any, ...args);
  pendingTimers.add(id);
  return id;
}) as typeof globalThis.setTimeout;
globalThis.clearTimeout = ((id: any) => {
  pendingTimers.delete(id);
  return nativeClearTimeout(id);
}) as typeof globalThis.clearTimeout;
afterEach(() => {
  pendingTimers.forEach((id) => nativeClearTimeout(id));
  pendingTimers.clear();
});

// jsdom 未实现 scrollTo
if (typeof Element !== 'undefined' && !(Element.prototype as any).scrollTo) {
  (Element.prototype as any).scrollTo = function scrollTo(options?: any) {
    if (options && typeof options.top === 'number') {
      this.scrollTop = options.top;
    }
  };
}

// jsdom 未实现 requestAnimationFrame 的稳定时序，这里保持原生实现（若缺失则补齐）
if (typeof globalThis.requestAnimationFrame === 'undefined') {
  (globalThis as any).requestAnimationFrame = (cb: FrameRequestCallback) => setTimeout(() => cb(Date.now()), 16) as any;
  (globalThis as any).cancelAnimationFrame = (id: any) => clearTimeout(id);
}

// --- 适配底层 webc/omi 在 jsdom 下的缺失能力（迁移到纯 Vue 后可整体删除，不影响用例）---
if (typeof document !== 'undefined' && !('adoptedStyleSheets' in document)) {
  Object.defineProperty(document, 'adoptedStyleSheets', { value: [], writable: true, configurable: true });
}
if (typeof ShadowRoot !== 'undefined' && !('adoptedStyleSheets' in ShadowRoot.prototype)) {
  Object.defineProperty(ShadowRoot.prototype, 'adoptedStyleSheets', {
    get() {
      return this.adoptedStyleSheetsStore || [];
    },
    set(value) {
      this.adoptedStyleSheetsStore = value || [];
    },
    configurable: true,
  });
}
if (typeof CSSStyleSheet !== 'undefined') {
  const sheetProto = CSSStyleSheet.prototype as any;
  if (typeof sheetProto.replaceSync !== 'function') {
    sheetProto.replaceSync = function replaceSync() {};
  }
  if (typeof sheetProto.replace !== 'function') {
    sheetProto.replace = function replace() {
      return Promise.resolve(this);
    };
  }
}

// matchMedia
if (typeof window !== 'undefined' && !window.matchMedia) {
  (window as any).matchMedia = (query: string): MediaQueryList =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    } as unknown as MediaQueryList);
}

export {};
