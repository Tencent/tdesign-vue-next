:: BASE_DOC ::


如果页面进行了切换并滚动，返回后发现 Affix 组件被触发，这可能是使用了`v-show`指令，没有触发`destroyed`，原本监听事件没有被清除。在 affix 中提供了`calcInitValue`方法供大家使用，可手动触发占位节点的宽高和定位的计算，请看<a href="#11基础锚点">基础锚点</a>的用法
## API

### Affix Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
container | String / Function | () => (() => window) | 指定滚动的容器。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body。TS 类型：`ScrollContainer` | N
offsetBottom | Number | 0 |  距离容器顶部达到指定距离后触发固定 | N
offsetTop | Number | 0 |  距离容器底部达到指定距离后触发固定 | N
zIndex | Number | - | 固钉定位层级，样式默认为 500 | N
onFixedChange | Function |  | 固定状态发生变化时触发。`(affixed: boolean, context: { top: number }) => {}` | N

### Affix Events

名称 | 参数 | 描述
-- | -- | --
fixed-change | `(affixed: boolean, context: { top: number })` | 固定状态发生变化时触发
