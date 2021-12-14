:: BASE_DOC ::

## API

### Popup Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
attach | String / Function | 'body' | 制定挂载节点。数据类型为 String 时，会被当作选择器处理，进行节点查询。示例：'body' 或 () => document.body。TS 类型：`AttachNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
content | String / Slot / Function | - | 浮层里面的内容。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
default | String / Slot / Function | - | 触发元素，同 triggerElement。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
destroyOnClose | Boolean | false | 是否在关闭浮层时销毁浮层 | N
disabled | Boolean | false | 是否禁用组件 | N
overlayClassName | String / Object / Array | - | 浮层类名，示例：'name1 name2 name3' 或 `['name1', 'name2']` 或 `[{ 'name1': true }]`。TS 类型：`ClassName`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
overlayStyle | Boolean / Object / Function | - | 浮层样式。TS 类型：`Styles | ((trigger: HTMLElement) => Styles)`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
placement | String | top | 浮层出现位置。可选项：top/left/right/bottom/top-left/top-right/bottom-left/bottom-right/left-top/left-bottom/right-top/right-bottom | N
showArrow | Boolean | false | 是否显示浮层箭头 | N
trigger | String | hover | 触发浮层出现的方式。可选项：hover/click/focus/context-menu | N
triggerElement | String / Slot / Function | - | 触发元素。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
visible | Boolean | false | 是否显示浮层。支持语法糖。TS 类型：`boolean` | N
defaultVisible | Boolean | false | 是否显示浮层。非受控属性。TS 类型：`boolean` | N
zIndex | Number | - | 组件层级，Web 侧样式默认为 5500，移动端和小程序样式默认为 1500 | N
onVisibleChange | Function |  | 当浮层隐藏或显示时触发。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/popup/type.ts)。`(visible: boolean, context: PopupVisibleChangeContext) => {}` | N

### Popup Events

名称 | 参数 | 描述
-- | -- | --
visible-change | `(visible: boolean, context: PopupVisibleChangeContext)` | 当浮层隐藏或显示时触发。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/popup/type.ts)
