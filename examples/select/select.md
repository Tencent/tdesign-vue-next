:: BASE_DOC ::

### Select Props

| 属性            | 类型                            | 默认值 | 必传 | 说明                                                                                                      |
| --------------- | ------------------------------- | ------ | ---- | --------------------------------------------------------------------------------------------------------- |
| value / v-model | string / number/ array / object | -      | Y    | 指定选中项目的 value 值，可以使用 v-model 双向绑定数据 |
| size            | string                            | -      | N    | 尺寸，大、中（默认）、小，可选值为  large / medium / small / 或者不填                                    |
| clearable       | boolean                         | false  | N    | 是否可以清空选项（单选时有效）                                                                               |
| multiple        | boolean                         | false  | N    | 是否多选                                                                                                  |
| disabled        | boolean                         | false  | N    | 是否禁用                                                                                                  |
| placeholder     | string                          | 请选择      | N    | 占位符                                                                                                    |
| filterable      | boolean                         | false  | N    | 是否可搜索                                                                                                |
| filterMethod    | function                        | -      | N    | 自定义搜索方法                                                                                            |
| creatable       | boolean                         | false  | N    | 是否允许用户创建新条目，需配合 filterable 使用                                                            |
| remote          | boolean                         | false  | N    | 是否为远程搜索                                                                                            |
| remoteMethod    | function                        | -      | N    | 远程搜索方法                                                                                              |
| loading         | boolean                         | false  | N    | 是否正在从远程获取数据                                                                                    |
| loadingText     | string / function               | 加载中 | N    | 远程加载时显示的文字，支持自定义。如加上超链接                                                            |
| notFoundContent | string / function               | 无数据 | N    | 当下拉列表为空时显示的内容                                                                                |
| labelInValue    | Boolean                         | false  | N    | 在返回选项时，是否将 label 和 value 一并返回，默认只返回 value                                            |
| reserveKeyword  | boolean                         | false  | N    | 多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词                                                  |
| bordered        | boolean                         | true   | N    | 是否有边框（todo）                                                                                         |
| multipleLimit   | number                          | 0      | N    | 多选时用户最多可以选择的项目数，为 0 则不限制（todo）                                                 |
| valueKey        | string                          | value  | N    | 作为 value 唯一标识的键名，绑定值为对象类型时必填（todo）                                               |
| labelKey        | string                          | label  | N    | 作为 label 唯一标识的键名，绑定值为对象类型时必填（todo）                                                 |
| popupProps      | object                          | -      | N    | 透传给 popup 组件的参数                                                                                   |
| options         | [{ label, value }]              | -      | N    | 数据化配置选项内容，相比 jsx 定义会获得更好的渲染性能                                                     |
| triggerText     | string                          | 更多   | N    | border 为 false 时，支持的自定义文本（todo）                                                         |
| prefixIcon      | String / slot / Function        | -      | N    | Select 前置图标                                                                                           |
| suffixIcon      | String / slot / Function        | -      | N    | Select 后置图标（待定）                                                                              |

### Option Props

| 属性     | 类型            | 默认值 | 必传 | 说明                                                          |
| -------- | --------------- | ------ | ---- | ------------------------------------------------------------- |
| value    | string / number | -      | Y    | 选项的值                                                      |
| label    | string / number | -      | N    | 选项的标签，若不设置则默认与 value 相同，有 children 先渲染。 |
| disabled | boolean         | -      | N    | 是否禁用该选项                                                |

### OptionGroup Props

| 属性  | 类型   | 默认值 | 必传 | 说明       |
 | ----- | ------ | ------ | ---- | ---------- |
| label | string | -      | N    | 分组的组名 |

### Select Events

| 事件名称      | 参数                                  | 说明                       |
| ------------- | ------------------------------------- | -------------------------- |
| change        | (value) 目前的选中值                  | 当选择项发生改变时触发     |
| visible-change | (value) 出现则为 true，隐藏则为 false | 当下拉框显示/隐藏时触发    |
| remove        | (value) 移除的已选项值                | 多选模式下移除已选项时触发 |
| clear         | -                                     | 点击清空按钮时触发         |
| focus         | event                                 | 当 input 获得焦点时触发    |
| blur          | event                                 | 当 input 失去焦点时触发    |
| create        | (value)创建的新条目                    | 当选择新创建的条目时触发，creatable为true时生效   |

