:: BASE_DOC ::

## API
### Affix Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
container | String / Function | () => (() => window) | 指定滚动的容器。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body。TS 类型：`ScrollContainer`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
content（暂未实现） | String / Slot / Function | - | 内容。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
default | String / Slot / Function | - | 内容，同 content。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
offsetBottom | Number | 0 |  距离容器底部达到指定距离后触发固定 | N
offsetTop | Number | 0 |  距离容器顶部达到指定距离后触发固定 | N
zIndex | Number | - | 固钉定位层级，样式默认为 500 | N
onFixedChange | Function |  | TS 类型：`(affixed: boolean, context: { top: number }) => void`<br/>固定状态发生变化时触发 | N

### Affix Events

名称 | 参数 | 描述
-- | -- | --
fixed-change | `(affixed: boolean, context: { top: number })` | 固定状态发生变化时触发
