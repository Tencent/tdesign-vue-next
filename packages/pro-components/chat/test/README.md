# chat 组件测试工程（webc → Vue 3 迁移回归网）

## 背景

`packages/pro-components/chat` 目前通过 `omi-vueify` 桥接 `tdesign-web-components`（webc）自定义元素，
计划全量迁移为纯 Vue 3 实现。迁移过程必须保证：

1. **基础 API** 不 breaking：props（名称 / 类型 / 默认值）、events、slots、实例方法；
2. **组合类 API** 不 breaking：Chatbot 组合、chat-engine hooks、toolcall / activity 注册表；
3. **UI 层** 不 breaking：公开 class 结构与层级。

同时测试**不能反过来绑死 webc 实现**，否则每改一处就全量变红，反而阻塞迁移。

## 运行

```bash
# 仅跑 chat 测试（推荐，约 10s）
pnpm test:chat

# 更新快照（确认 UI / 契约变更后使用，需人工 review diff）
pnpm test:chat:update

# 等价命令
npx vitest run --project chat
```

- 配置文件：`packages/pro-components/chat/test/vitest.config.ts`
- 已在根 `vitest.config.ts` 的 `projects` 中注册
- 测试入口：`packages/pro-components/chat/**/__tests__/**`

> 说明：迁移前 chat 的用例位于 `chat/*/__tests__/`，但根 vitest 的 include 只覆盖
> `packages/components/**`，这些用例**从未被执行**（其中部分断言实际是失败的）。
> 本次统一接入了独立的 chat project，并重写了这些历史用例。

## 分层设计

| 层 | 文件 | 关注点 | 迁移后是否需要改 |
| --- | --- | --- | --- |
| L1 基础 API 契约 | `__tests__/api-contract.test.tsx` | 导出清单、全局注册名、props / emits 契约 | 不需要（除非 API 真的变了） |
| L2 单个组件行为 | `__tests__/chat-*.test.tsx` | props→DOM 语义、事件、插槽、实例方法 | 不需要 |
| L3 组合类 API | `__tests__/chatbot-composition.test.tsx`、`__tests__/chat-engine.test.tsx` | Chatbot 实例方法、ChatList+Sender+Actionbar 数据流、hooks、注册表 | 不需要 |
| L4 UI 结构指纹 | `__tests__/ui-structure.test.tsx` | 公开 class 结构与层级 | class 结构变化时需 review 更新 |
| 组件级冒烟 | `chat/*/__tests__/index.test.jsx` | 各组件可挂载、核心 prop 生效 | 不需要 |

## 关键设计：与 webc 实现解耦

1. **L1 只读组件定义**（`test/helpers/contract.ts`），不渲染、不依赖 DOM，
   因此 webc 桥接与纯 Vue 实现会得到完全一致的结果。
2. **L2 只断言公开语义**：`t-chat__*` class、文本内容、事件参数、子组件组合关系
   （如 `findAllComponents(ChatMessage)`），而不是底层自定义元素标签。
3. **L4 使用结构指纹**（`test/helpers/structure.ts`）：只保留 `标签 + class + 白名单属性`，
   剔除 `style / id / data-v-* / 图标内部 / webc 桥接属性`；对含 webc 自定义元素的区域使用
   `ignoreCustomElements`，保证"列表容器层"指纹在迁移前后可比。
4. **环境补丁集中在 `test/setup.ts`**：`adoptedStyleSheets`、`window.prompt`、定时器清理等
   jsdom 缺失能力均集中在此，且都标注了「迁移后可删除」。

## 迁移期的验收流程

1. 迁移开始前：`pnpm test:chat` 全绿 → 记为基线。
2. 迁移过程中逐个组件替换实现，保持 `pnpm test:chat` 全绿。
3. 若 L1 / L2 / L3 失败 → **说明产生了 breaking change**，应修复实现而不是更新基线。
   - L1 的 `exports` 快照包含当前从 webc `chat-engine` re-export 的符号；
     若迁移后某个符号被移除属于对外 breaking change，需要显式确认后再更新快照。
4. 若仅 L4 失败 → 说明 class 结构变化，需人工确认：
   - 属于预期的 UI 调整：更新快照 `pnpm test:chat:update` 并在 MR 中说明；
   - 属于误改：修复实现。
5. 迁移完成后删除 `test/setup.ts` 中标注「迁移后可删除」的 webc 兼容段，
   以及 `vitest.config.ts` 中 `omi-vueify` 的 alias，再次运行 `pnpm test:chat` 应全绿。

## 如何验证「测试网真的有效」（假迁移演练）

迁移前建议先自己跑一次演练，确认这张网既**放得过重构**也**拦得住破坏**。

### A. 假迁移：实现替换但 API 不变 → 期望全绿（不阻碍迁移）

任选一个 webc 桥接的组件换成纯 Vue 实现。以 `ChatLoading` 为例，
把 `chat-loading/index.ts` 临时改成：

```ts
import type { DefineComponent } from 'vue';
import { defineComponent, h } from 'vue';

const ChatLoading = defineComponent(
  (props: any) => () =>
    h('div', { class: 't-chat-loading' }, [
      h('div', { class: ['t-chat-loading__indicator', `t-chat-loading__indicator--${props.animation ?? 'moving'}`] }),
      props.text ? h('span', { class: 't-chat-loading__text' }, props.text) : null,
    ]),
  { name: 'TChatLoading', props: { animation: { type: String, default: 'moving' }, text: { type: String, default: '' } } },
) as unknown as DefineComponent<any>;

export { ChatLoading };
export default ChatLoading;
```

实测结果：**167 / 167 全绿** —— 底层从 webc 换成纯 Vue，测试零阻碍
（`ChatLoading` 在 L1 只校验"存在且可注册"，迁移后 props 出现属于增强，不会误报）。

### B. 破坏性变更注入 → 期望被拦截

```bash
# 跑全部 6 类注入
bash packages/pro-components/chat/test/drill/migration-drill.sh
# 或只跑某一项，如第 3 项
bash packages/pro-components/chat/test/drill/migration-drill.sh 3
```

脚本会临时改源码 → 跑测试 → 用备份还原（不依赖 git，不影响未提交改动）。
当前实测结果：

| # | 注入的 breaking change | 结果 | 拦截层 |
| --- | --- | --- | --- |
| ① | 重命名 prop `ChatSender.stopDisabled` | exit=1 ✅ | L1 props 契约 + L2 行为 |
| ② | 改默认值 `ChatActionbar.actionBar` 去掉 `share` | exit=1 ✅ | L1 props 契约 + L2 行为 |
| ③ | 改公开 class `t-chat__actions` | exit=1 ✅ | L2 语义 + L3 组合 + L4 结构指纹 |
| ④ | 删除对外导出 `ChatAction` | exit=1 ✅ | L1 exports 快照 / 导出校验 / 兼容断言 |
| ⑤ | 篡改组合类 API `Chatbot.regenerate` | exit=1 ✅ | L3 实例方法契约 |
| ⑥ | 篡改事件名 `ChatSender.send -> submit` | exit=1 ✅ | L1 emits 契约 |

> 某一项若出现 `exit=0`，说明对应维度存在盲区，应先补用例再开始迁移。

### C. 真实迁移时的用法

每完成一个迁移子步骤（如把 `ChatMarkdown` 换成 Vue 实现），跑一次 `pnpm test:chat`：
- 全绿 → 这一步没有 breaking change，继续；
- L4 报红 → 人工确认 class 变化是否可接受，可接受则 `-u` 更新并在 MR 说明；
- L1/L2/L3 报红 → 回到实现，不要动基线。

## 迁移后可补充的点

- 消息项内容当前位于 webc 的 shadow DOM，jsdom 下不可见；
  迁移为纯 Vue 后，可在 `__tests__/ui-structure.test.tsx` 中补充消息气泡内部结构指纹。
- `ChatLoading` / `ChatMarkdown` / `Attachments` 当前由 webc 承载，
  迁移后可在对应 `__tests__` 下补充 DOM 级断言（现有用例只校验挂载契约）。
