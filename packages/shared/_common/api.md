# API 设计规范

因为同平台不同框架都会遵循同一份 API，所以起草的 API 需要有一种足够通用的表示方法。

## API 描述

- 所有属性和事件使用小驼峰的表示
- 命名一般要避开 HTML 原生属性，比如 Button 的 `type` 属性，在 TDesign 里我们使用 `theme` 表示按钮风格
- 原生 HTML 属性在组件实现时要支持透传，所以在 API 定义里不用声明（Vue 本身就支持透传，React 需要代码实现）
- 可定制内容使用 `TNode` 类型表示
  - 对 Vue 来说，TNode 表示该字段 Props 类型为 `Function`，具体 TS 类型为`type TNode<T = any> = (h: Vue.CreateElement, props?: T) => TNodeReturnValue;`，（重要）同时还需要支持同名插槽。**Props Function 优先级大于 Slot**
  - 对 React 来说，TNode 类型表示该字段类型为
    ```
     // TElement 表示 API 只接受传入组件，即 ReactElement；
     // TNode 表示 API 不仅接受传入组件，还接受传入其他的数据类型，即 ReactNode；
     // TNode<T> 表示 API 会输出参数
     declare type TElement = ReactElement;
     declare type TNode<T = undefined> = T extends {} ? ((props: T) => ReactNode) : ReactNode;
    ```
- 为了更清晰的表示 Vue 中的 v-model，需要指明 model 对应的 props 和 events 分别是什么
- `size` 默认值固定为：small/medium/large
- 事件名称使用小驼峰命名，如：`visibleChange`
  - React 实现使用时名称转换成 带`on`前缀 的小驼峰命名，如： `onVisibleChange`
  - Vue 不仅要实现 `onVisibleChange` Props API，还需要同时实现事件抛出($emit)。事件名称转换成不带 `on` 前缀的中划线命名，如：`visible-change`
- 组件插件方法命名参考 `$Message.info`
- 多参数定义示例：`(value, { index, item, event, other_fields })`
- Vue 组件开发涉及到数据变化的 API 需要默认实现语法糖 `.sync`（v-model 相关 API 除外）。
