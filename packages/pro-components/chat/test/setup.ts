/**
 * 临时适配当前 Chat 的 webc / Omi 依赖：组件导入时会初始化样式表，
 * jsdom 缺少对应能力，Omi 的样式表兼容代码会在测试执行前抛出 ownerNode 为空的错误。
 * 这里只补齐模块加载所需的样式表接口，不验证 CSS 效果，也不替换 props、事件或公开函数。
 *
 * Chat 迁移为原生 Vue 3 实现、移除 webc / Omi 的样式初始化依赖后，
 * 删除本文件及 packages/tdesign-vue-next-chat/test/vitest.config.ts 中的 setupFiles 配置，
 * 运行 pnpm run test:chat，确认组件可直接导入且公开 API 测试仍然通过。
 */
Object.defineProperty(document, 'adoptedStyleSheets', { value: [], writable: true, configurable: true });
Object.defineProperty(ShadowRoot.prototype, 'adoptedStyleSheets', {
  get() {
    return this.chatStyleSheets || [];
  },
  set(value) {
    this.chatStyleSheets = value;
  },
  configurable: true,
});
CSSStyleSheet.prototype.replaceSync = () => {};
