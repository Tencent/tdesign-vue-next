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

::: demo demos/checkable 可选
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

::: demo demos/checkable 可选
:::

<!-- 
### 属性配置

#### Tree Props

| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
| data | any[] | [] | 否 | 可嵌套的节点属性的数组，生成 tree 的数据 |
| empty | TNode | '' | 否 | 内容为空的时候展示的文本 |
| keys | object | {} | 否 | 定义从节点取值的属性名称 |
| keys.value | string | 'value'| 否 | 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的 |
| keys.children | string | 'children' | 否 | 定义子节点的key |
| keys.label | string | 'label' | 否 | 定义节点文本的key |
| expand-all | boolean | false | 否 | 默认展开所有节点 |
| expand-parent | boolean/string | 'auto' | 否 | 展开子节点的时候是否自动展开父节点(api调用时，以及初始化时) |
| default-expanded | string[] | [] | 否 | 展开的节点 value，非受控 API |
| expanded | string[] | [] | 否 | 展开的节点 value，受控 API |
| expand-level | number | 0 | 否 | 默认展开的级别，第一层为0 |
| expand-mutex | boolean | false | 否 | 同级别展开互斥，手风琴效果 |
| transition | boolean | true | 否 | 节点展开关闭是否使用动画 |
| activable | boolean | false | 否 | 节点是否可高亮选择 |
| active-multiple | boolean | false | 否 | 是否可以高亮多个节点 |
| default-actived | string[] | [] | 否 | 高亮的节点 value，非受控 API |
| actived | string[] | [] | 否 | 高亮的节点 value，受控 API |
| disabled | boolean | false | 否 | 树是否可操作 |
| checkable | boolean | false | 否 | 节点是否展示复选框 |
| default-value | string[] | [] | 否 | 选中的节点 value，非受控 API |
| value | string[] | [] | 否 | 选中的节点 value，受控 API |
| check-props | object | - | 否 | checkbox 组件选项，参考 checkbox 组件的 API |
| check-strictly | boolean | false | 否 | 可选中的节点是否关闭关联选中关系 |
| hover | boolean | false | 否 | 节点是否有 hover 状态 |
| icon | TNode | true | 否 | 是否显示节点图标 |
| line | TNode | true | 否 | 是否显示连接线 |
| load | function | - | 否 | 加载子数据的方法，在展开节点时调用，仅当节点 children 为 true 时生效 |
| lazy | boolean | true | 否 | 延迟加载 children 为 true 的节点的子节点数据，即使 expand-all 被设置为 true，也同样延迟加载 |
| value-mode | string | 'onlyLeaf' | 否 | 选中节点的取值方式。举例: 'all' - [ 广东省，深圳市，宝安区 ] 层级全部显示，为默认选项；'parentFirst' - [ 广东省 ] 表示当子节点全部选中时，仅显示父节点；'onlyLeaf' - [ 宝安区 ] 仅显示子节点 |
| label | TNode | - | 否 | 节点文本的渲染方法 |
| filter | function | - | 否 | 节点过滤方法，只呈现返回值为 true 的节点 |
| operations | TNode | - | 否 | 节点操作区域渲染方法 |
| expand-on-click-node | boolean | false | 否 | 是否点击节点自动展开收缩 |

#### Tree Scope Slots

| 插槽名称 | 说明 |
|-----|-----|
| line | 连接线 |
| icon | 图标 |
| label | 文本 |
| operations | 操作区域 |

#### Tree Events

| 事件名称 | 回调参数 | 参数类型 | 说明 |
|-----|-----|-----|-----|
| click | state | object | 点击时触发 |
|  | state.event | Event | 点击事件 |
|  | state.node | TreeNode | 事件触发的节点 |
| expand |  |  | 节点展开关闭时触发 |
|  | values | string[] | 展开节点的 value |
|  | state | object | 节点信息 |
|  | state.event | Event | 展开事件 |
|  | state.node | TreeNode | 事件触发的节点 |
|  |  |  |  |
|  |  |  |  |
 -->
