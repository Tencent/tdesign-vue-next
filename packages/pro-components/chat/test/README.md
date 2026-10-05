# chat 迁移回归测试

这套测试保护 `packages/pro-components/chat` 从 `tdesign-web-components` / `omi-vueify` 迁移到 Vue 3 时的既有公开调用和用户行为。允许新增兼容能力、组件内文件搬迁和内部 DOM 调整。

## 运行

```bash
pnpm test:chat                  # 日常回归
pnpm test:chat:migration-done   # 回归 + 源码及发布包直接 webc 依赖清零
pnpm build:chat && pnpm test:chat:package # 排除测试文件，并编译公开类型使用方

# 串行演练：不要同时运行其他测试、构建或编辑目标源码
bash packages/pro-components/chat/test/drill/migration-drill.sh
bash packages/pro-components/chat/test/drill/migration-drill.sh compatible
bash packages/pro-components/chat/test/drill/migration-drill.sh vue
bash packages/pro-components/chat/test/drill/migration-drill.sh hooks
bash packages/pro-components/chat/test/drill/migration-drill.sh types # 先 build:chat
```

根 `vitest.config.ts` 注册独立 `chat` project，收集本组件目录中的 `__tests__`。`pull-request.yml` 在 `develop`、`main`、`compositionAPI` 和本 PR 的目标分支 `chore/fix/esm` 上运行 `test:chat`。

## 保护范围与基线

| 范围 | 测试 / 基线 | 保护内容 |
| --- | --- | --- |
| API | `api-contract.test.tsx` / `test/api-baseline.json` | 既有导出、注册名、9 个组件的 prop 兼容性、emits、历史别名 |
| 组件行为 | `chat-*.test.tsx` | 输入、发送、停止、插槽、禁用态、列表布局与滚动 API |
| 桥接行为 | `bridged-behavior.test.tsx` | Loading 默认动画与文案更新、Message 正文与插槽、Markdown 格式与更新、附件删除事件、Chatbot 消息替换 / 追加 / 前插 / 清空 |
| 组合行为 | `chatbot-composition.test.tsx` / `chat-engine.test.tsx` | 输入→发送→消息入列、操作回调、必要公开方法、hooks 和注册表 |
| 公开类型 | `test/consumer/public-api.tsx` | 代表性公开调用消费构建后的 ES / ESM 声明，错误类型必须报错 |
| 依赖收敛 | `webc-dependencies.test.ts` / `test/webc-baseline.json` | 按组件目录限制引用预算，发布包不得新增 webc 依赖，收尾时全部清零 |

API JSON 基线来自原有契约：保留旧 prop 类型成员，允许类型扩展与无关成员换序；Boolean 的存在及其相对 String 的转换顺序必须保持，避免空字符串转换发生变化。既有默认值保持，不能把可选 prop 改为必填。新增可选 prop、事件、导出、注册组件和 hook 返回字段可通过；删除旧能力或缩窄旧调用会失败。有意的 API 变更需要人工审查 JSON diff。

桥接组件的完整 props 类型与默认值尚未全部登记。当前以实际行为保护关键能力，并保留存在、安装和必要方法检查。Chatbot 的网络发送、再生成、取消请求行为尚未覆盖。

### DOM 与 Loading

`test/helpers/dom.ts` 遍历开放 shadow root 和 slot 分发内容，也适用于普通 Vue DOM。现有组件与组合测试检查必要容器标记、文本、格式、插槽和操作结果；不保存整棵 DOM、class 顺序、内部包装层或完整方法列表快照。消息根标签替换和保留行为的内部包装调整可以通过。

部分动画状态仍通过当前实现的 class 定位；迁移时可以调整定位方式，保持默认值及用户可见状态。当前安装的 `tdesign-web-components@1.3.1-alpha.11` 源码中，ChatLoading 默认动画是 `moving`；仓库独立 props 文件写的是 `gradient`，但未接入当前桥接实现。测试保护当前运行行为，接入该 props 文件造成的默认值变化需要明确处理。

jsdom 测试不验证计算样式、像素、颜色、间距、换行、动画效果或实际滚动布局。这些仍需真实浏览器视觉验收。

### 依赖预算

`webc-baseline.json` 的 `units` 按 chat 下的一级组件目录记录预算，根目录文件归入 `.`。预算统计每个文件中去重后的 webc 模块引用数量之和，允许同一组件内改名、子路径调整、`.ts` → `.vue` 搬迁及删除引用。扫描覆盖静态 import、类型引用、重导出、动态 import、require，以及 Vue SFC 的两个 script 块；注释和普通文案不计入依赖。

预算不得增长，未登记或已清零的目录不得重新引用，也不得引入新的 webc 包。它不逐个冻结文件路径或子模块清单，也不统计每次 API 使用或完整传递依赖。移除引用后需同步收缩预算，防止旧依赖重新引入；预算不会自动更新。

收尾时删除发布包的 webc / omi-vueify 直接依赖、测试配置中的 omi-vueify alias，以及不再需要的环境补丁，再运行 `test:chat:migration-done`。日常运行只跳过这一条显式收尾检查；其余行为用例不会因挂载失败而跳过。

### 环境、发布包与公开调用

jsdom 缺失的 observer、scrollTo、constructable stylesheet 等能力集中补齐在 `test/setup.ts`。所有 wrapper 在每条测试后自动卸载，再清理挂起定时器。

构建入口与类型声明复制均排除 `test` / `__tests__`。CI 构建 chat 后运行 `test:chat:package`，检查 ES / ESM 入口代码和声明存在、产物没有测试目录，并编译公开类型使用方。

`test/consumer/public-api.tsx` 只保留少量公开调用示例：Sender 的输入 / 发送回调与双向绑定、List 布局和滚动接口，以及 useChat 的消息类型和方法。ES / ESM 构建声明分别编译同一份示例，不加载根 tsconfig 的源码 alias；错误类型示例必须报错，避免声明退化为 `any` 后假通过。编译开启 strict，跳过依赖声明的库内检查；不穷举全部公开类型，也不验证 Vue SFC 模板或独立安装环境。

`chat-engine.test.tsx` 通过 useChat 返回的公开引擎方法验证消息与状态同步、清空恢复 idle、多实例隔离，以及卸载一个实例后其他实例继续工作。不要求已卸载实例保留状态或引擎仍可调用，允许清空 / 销毁资源。无需网络、底层 store mock、订阅次数断言或定时等待。

维护时优先处理这些示例反映的实际调用回归。不要生成整份声明快照，或把内部引擎类、shadow DOM、包装节点作为类型门禁。

## 演练与验收

脚本先确认基线通过，再逐项备份、注入、运行、恢复；退出或收到 INT / TERM 时也恢复当前文件。未被拦截、环境启动失败或恢复后基线失败都会以非零状态退出。默认演练包含 7 类兼容改动和 10 类破坏性改动，发布类型演练单独执行。

| 演练 | 期望 |
| --- | --- |
| ChatLoading 改为保持文案及动画状态的 Vue 组件；ChatMessage 根节点改为普通 HTML | 通过 |
| 新增可选 prop、运行时 String 扩展为 String / Number、useChat 新增返回字段 | 通过 |
| 操作栏增加内部包装层、同一组件桥接引用从 TS 搬到 Vue SFC | 通过 |
| Sender prop / 事件改名、Actionbar 默认值 / 必要容器 class 变化、删除导出、Chatbot 方法改名 | 被拦截 |
| Chatbot.setMessages 仍为函数但变为空实现 | 被消息内容行为测试拦截 |
| 新增 webc 引用、useChat 不同步状态 / 多实例共用引擎 | 被拦截 |
| 发布声明新增可选字段 | 通过 |
| 发布声明删除 Sender 导出、退化为 any、缩窄 List 布局 | 被类型使用方门禁拦截 |

演练替身只验证测试能否接受实现替换，不代表生产组件完整实现或视觉等价。
