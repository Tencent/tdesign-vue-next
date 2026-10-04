# chat 迁移回归测试

这套测试保护 `packages/pro-components/chat` 从 `tdesign-web-components` / `omi-vueify` 迁移到 Vue 3 时的既有 API 调用和 DOM 语义。它不要求保留自定义元素标签、shadow DOM 或 Omi 实例。

## 运行

```bash
pnpm test:chat                  # 日常回归
pnpm test:chat:update           # 仅更新 DOM / 方法清单快照，人工审查 diff
pnpm test:chat:migration-done   # 回归 + 源码及发布包 webc 依赖清零

# 等价替换与破坏性变更演练（串行运行，不要同时运行其他测试或编辑目标源码）
bash packages/pro-components/chat/test/drill/migration-drill.sh
bash packages/pro-components/chat/test/drill/migration-drill.sh vue
bash packages/pro-components/chat/test/drill/migration-drill.sh 7
```

根 `vitest.config.ts` 注册独立 `chat` project，收集本组件目录中的 `__tests__`。`pull-request.yml` 在 `develop`、`main`、`compositionAPI` 和本 PR 的目标分支 `chore/fix/esm` 上运行 `test:chat`。

## 保护范围与基线

| 层       | 测试 / 基线                                             | 保护的内容                                                                                                               |
| -------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| API      | `api-contract.test.tsx` / `test/api-baseline.json`      | 既有导出、全局注册名、9 个组件的 props 类型 / 默认值 / 必填性、emits、历史别名                                           |
| 组件行为 | `chat-*.test.tsx`                                       | 输入、发送、停止、插槽、禁用态、列表布局与滚动 API                                                                       |
| 桥接行为 | `bridged-behavior.test.tsx`                             | Loading 默认动画与文案更新、Message 正文与插槽、Markdown 格式与更新、附件删除事件、Chatbot 消息替换 / 追加 / 前插 / 清空 |
| 组合行为 | `chatbot-composition.test.tsx` / `chat-engine.test.tsx` | 输入 → 发送 → 消息入列、操作栏回调、Chatbot 方法清单、hooks、注册表                                                      |
| DOM 结构 | `ui-structure.test.tsx` / `structure-boundary.test.tsx` | 公开容器 class、层级、语义属性，验证消息根标签替换不改变容器基线                                                         |
| 依赖收敛 | `webc-dependencies.test.ts` / `test/webc-baseline.json` | 已有文件只能保留或删除基线中的 webc 模块引用，发布包不得增加 webc 依赖                                                   |

API JSON 基线来自原有契约快照。新增可选 prop、事件、导出和注册组件可以通过；既有 prop 的类型、默认值、必填性变化或既有事件 / 导出的删除会失败。`test:chat:update` 不会改写这份基线；有意的 API 变更需要人工审查 JSON diff。

桥接组件的完整 props 类型与默认值尚未全部登记。当前以实际行为保护关键能力，并保留存在、安装和方法清单检查。Chatbot 的网络发送、再生成、取消请求行为尚未覆盖。

### DOM 与 shadow DOM

`test/helpers/dom.ts` 遍历开放 shadow root 和 slot 分发内容，同样适用于普通 Vue DOM。测试观察文本、格式和用户操作结果，不读取底层 `chatEngine`、Omi 状态或自定义元素私有方法。

容器指纹使用 `omitRoots` 显式排除 `findAllComponents(ChatMessage)` 的根节点。消息自身由行为测试保护；消息根节点从 `<t-chat-item>` 换为 `<article>` 时，容器快照不变。其他自定义元素不会被统一跳过。

结构指纹仍保留被测试区域的标签、class 和层级，因此局部包装元素的调整可能需要人工审查。它不包含计算样式，也不是截图基线，不能验证颜色、间距、换行、动画或实际滚动布局不变。这些仍需真实浏览器视觉验收。

### Loading 默认值

当前 webc 运行时的 ChatLoading 默认动画为 `moving`，仓库独立 props 文件写的是 `gradient`，且该文件没有接入当前桥接实现。测试锁定当前运行时的 `moving`；迁移时不要把接入 props 文件造成的默认值变化当成等价重构。

### 环境与清理

jsdom 缺失的 observer、scrollTo、constructable stylesheet 等能力集中补齐在 `test/setup.ts`。所有 wrapper 在每条测试后自动卸载，随后清理挂起的定时器，避免文档节点、事件订阅和延时任务跨用例残留。

## 演练与验收

演练脚本先确认基线通过，再逐项备份、注入、运行、恢复；退出或收到 INT / TERM 信号时也恢复当前文件。用例未被拦截、测试环境启动失败或恢复后基线失败，脚本都会以非零状态退出。

| 演练                                                                                           | 期望                   |
| ---------------------------------------------------------------------------------------------- | ---------------------- |
| ChatLoading 替换为保持当前文案、动画契约的 Vue 组件                                            | 通过                   |
| 新增可选 prop                                                                                  | 通过                   |
| ChatMessage 根节点替换为普通 HTML，保留 props / 正文 / 插槽                                    | 通过                   |
| 重命名 Sender prop、修改 Actionbar 默认值 / class、删除导出、重命名 Chatbot 方法或 Sender 事件 | 被拦截                 |
| Chatbot.setMessages 仍暴露为函数，但变为空实现                                                 | 被消息内容行为测试拦截 |

演练替身用于验证回归测试能否接受实现替换，不代表生产组件的完整实现或视觉等价。

迁移中保持 `test:chat` 通过，并在移除引用后收缩 `test/webc-baseline.json`，防止旧引用被重新引入。扫描覆盖静态 import、类型引用、重导出、动态 import、require，以及 Vue SFC 的两个 script 块；注释和普通文案不计入依赖。

迁移收尾时删除发布包的 webc / omi-vueify 依赖、测试配置中的 omi-vueify alias，以及已不需要的环境兼容补丁，再运行 `test:chat:migration-done`。日常运行只跳过这一条显式收尾门禁；其余行为用例不会因组件挂载失败而跳过。
