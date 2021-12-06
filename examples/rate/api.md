
### Rate Props
名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
allowHalf | Boolean | false | 是否允许半选 | N
color | String / Array | - | 评分图标的颜色，样式中默认为 #ED7B2F。一个值表示设置选中高亮的五角星颜色，两个值表示分别设置 选中高亮的五角星颜色 和 未选中暗灰的五角星颜色。示例：['#ED7B2F', '#999999']。TS 类型：`string | Array<string>` | N
count | Number | 5 | 评分的数量 | N
disabled | Boolean | false | 是否禁用评分 | N
gap | Number | 6 | 评分图标的间距 | N
showText | Boolean | false | 是否显示对应的辅助文字 | N
size | String | - | 评分图标的大小，示例：`20` | N
texts | Array | - | 自定义评分等级对应的辅助文字。组件内置默认值为：['极差', '失望', '一般', '满意', '惊喜']。自定义值示例：['1分', '2分', '3分', '4分', '5分']。TS 类型：`Array<string>` | N
value | Number | 0 | 必需。选择评分的值。支持语法糖 | Y
defaultValue | Number | 0 | 必需。选择评分的值。非受控属性 | Y
variant | String | outline | 形状类型，有描边类型和填充类型两种。可选项：outline/filled | N
onChange | Function |  | 评分数改变时触发。`(value: number) => {}` | N

### Rate Events
名称 | 参数 | 描述
-- | -- | --
change | `(value: number)` | 评分数改变时触发
