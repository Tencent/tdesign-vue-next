## Tree 树
<!-- 
::: demo demos/base 默认
:::

::: demo demos/expandAll 初始化展开全部
:::

::: demo demos/expandLevel 初始化展开第一级
:::

::: demo demos/expandMutex 互斥展开
:::

::: demo demos/transition 关闭动画
:::

::: demo demos/activable 可高亮
:::

::: demo demos/activeMultiple 可多个高亮
:::

::: demo demos/checkable 可选
:::

::: demo demos/checkStrictly 选中态不关联
:::

::: demo demos/disabled 树禁用
:::

::: demo demos/load 异步加载节点
:::

::: demo demos/lazy 延迟异步加载节点
:::

::: demo demos/vmodel 受控
:::

::: demo demos/filter 过滤
:::

::: demo demos/empty 自定义空白label
:::

::: demo demos/label 自定义label
:::

::: demo demos/icon 自定义icon
:::

::: demo demos/line 显示连线
:::

::: demo demos/operations 操作节点
:::
-->

::: demo demos/operations 操作节点
:::

### 属性配置

#### Tree Props

| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
| data | Array | [] | 否 | 可嵌套的节点属性的数组，生成 tree 的数据 |
| empty | TNode | '' | 否 | 内容为空的时候展示的文本 |
| keys | Object | {} | 否 | 定义从节点取值的属性名称 |
| keys.value | String | 'value'| 否 | 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的 |
| keys.children | String | 'children' | 否 | 定义子节点的key |
| keys.label | String | 'label' | 否 | 定义节点文本的key |
| expand-all | Boolean | false | 否 | 默认展开所有节点 |
||||||
||||||
||||||
