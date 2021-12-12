:: BASE_DOC ::

## API

### Form Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
colon | Boolean | false | 是否在表单标签字段右侧显示冒号 | N
data | Object | {} | 表单数据。TS 类型：`FormData` | N
labelAlign | String | right | 表单字段标签对齐方式：左对齐、右对齐、顶部对齐。可选项：left/right/top | N
labelWidth | String / Number | '100px' | 可以整体设置label标签宽度，默认为100px | N
layout | String | vertical | 表单布局，有两种方式：纵向布局 和 行内布局。可选项：vertical/inline | N
preventSubmitDefault | Boolean | true | 是否阻止表单提交默认事件，即提交后会刷新页面 | N
requiredMark | Boolean | undefined | 是否显示必填符号，默认显示 | N
resetType | String | empty | 重置表单的方式，值为 empty 表示重置表单为空，值为 initial 表示重置表单数据为初始值。可选项：empty/initial | N
rules | Object | - | 表单字段校验规则。TS 类型：`{ [field in keyof FormData]: Array<FormRule> }` | N
scrollToFirstError | String | - | 表单校验不通过时，是否自动滚动到第一个校验不通过的字段，平滑滚动或是瞬间直达。值为空则表示不滚动。可选项：smooth/auto | N
showErrorMessage | Boolean | true | 校验不通过时，是否显示错误提示信息 | N
size | String | medium | 表单尺寸。可选项：medium/large | N
statusIcon | Boolean / Slot / Function | undefined | 校验状态图标。TS 类型：`boolean | TNode<TdFormItemProps>`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
onReset | Function |  | 表单重置时触发。`(context: { e?: FormResetEvent }) => {}` | N
onSubmit | Function |  | 表单提交时触发。其中 context.validateResult 表示校验结果，context .firstError 表示校验不通过的第一个规则提醒。context.validateResult 值为 true 表示校验通过；如果校验不通过，context.validateResult 值为校验结果列表。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/form/type.ts)。`(context: SubmitContext<FormData>) => {}` | N
onValidate | Function |  | 校验结束后触发，result 值为 true 表示校验通过；如果校验不通过，result 值为校验结果列表。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/form/type.ts)。`(result:  ValidateResultContext<FormData>) => {}` | N

### Form Events

名称 | 参数 | 描述
-- | -- | --
reset | `(context: { e?: FormResetEvent })` | 表单重置时触发
submit | `(context: SubmitContext<FormData>)` | 表单提交时触发。其中 context.validateResult 表示校验结果，context .firstError 表示校验不通过的第一个规则提醒。context.validateResult 值为 true 表示校验通过；如果校验不通过，context.validateResult 值为校验结果列表。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/form/type.ts)
validate | `(result:  ValidateResultContext<FormData>)` | 校验结束后触发，result 值为 true 表示校验通过；如果校验不通过，result 值为校验结果列表。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/form/type.ts)

### FormInstanceFunctions 组件实例方法

名称 | 参数 | 返回值 | 描述
-- | -- | -- | --
clearValidate | `(fields?: Array<string>)` | - | 清空校验结果。可使用 fields 指定清除部分字段的校验结果，fields 值为空则表示清除所有字段校验结果
reset | - | - | 重置表单，表单里面没有重置按钮时可以使用该方法（`<button type="reset" />`）
submit | - | - | 提交表单，表单里面没有重置按钮时可以使用该方法（`<button type="submit" />`）
validate | `(params?: FormValidateParams)` | `FormValidateResult<FormData>` | 校验函数。关于参数：params.fields 表示校验字段，如果设置了 fields ，本次校验将仅对这些字段进行校验。params.trigger 表示本次触发校验的范围，'blur' 表示只触发校验规则设定为 trigger='blur' 的字段，'change' 表示只触发校验规则设定为 trigger='change' 的字段，默认触发全范围校验。关于返回值：返回值为 true 表示校验通过；如果校验不通过，返回值为校验结果列表。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/form/type.ts)

### FormItem Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
for | String | - | label 原生属性 | N
help | String | - | 表单项说明内容 | N
label | String / Slot / Function | '' | 字段标签名称。TS 类型：`string | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
labelAlign | String | - | 表单字段标签对齐方式：左对齐、右对齐、顶部对齐。默认使用 Form 的对齐方式，优先级高于 Form.labelAlign。可选项：left/right/top | N
labelWidth | String / Number | - | 可以整体设置标签宽度，优先级高于 Form.labelWidth | N
name | String | - | 表单字段名称 | N
requiredMark | Boolean | undefined | 是否显示必填符号，优先级高于 Form.requiredMark | N
rules | Array | [] | 表单字段校验规则。TS 类型：`Array<FormRule>` | N
statusIcon | Boolean / Slot / Function | undefined | 校验状态图标。优先级高级 Form 的 statusIcon。TS 类型：`boolean | TNode`。[通用类型定义](https://github.com/TDesignOteam/tdesign-vue/blob/develop/src/common.ts) | N
successBorder | Boolean | false | 是否显示校验成功的边框，默认不显示 | N

### FormRule

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
boolean | Boolean | - | 内置校验方法，校验值类型是否为布尔类型 | N
date | Boolean / Object | - | 内置校验方法，校验值是否为日期格式，[参数文档](https://github.com/validatorjs/validator.js)。TS 类型：`boolean | IsDateOptions`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/form/type.ts) | N
email | Boolean / Object | - | 内置校验方法，校验值是否为邮件格式，[参数文档](https://github.com/validatorjs/validator.js)。TS 类型：`boolean | IsEmailOptions`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/form/type.ts) | N
enum | Array | - | 内置校验方法，校验值是否属于枚举值中的值。示例，enum: ['primary', 'info', 'warning']。TS 类型：`Array<string>` | N
idcard | Boolean | - | 内置校验方法，校验值是否为身份证号码 | N
len | Number / Boolean | - | 内置校验方法，校验值固定长度，如：len: 10 表示值的字符长度只能等于 10 ，中文表示 2 个字符，英文为 1 个字符 | N
max | Number / Boolean | - | 内置校验方法，校验值最大长度，如：max: 100 表示值最多不能超过 100 个字符，中文表示 2 个字符，英文为 1 个字符 | N
message | String | - | 校验未通过时呈现的错误信息，值为空则不显示 | N
min | Number / Boolean | - | 内置校验方法，校验值最小长度，如：min: 10 表示值最多不能少于 10 个字符，中文表示 2 个字符，英文为 1 个字符 | N
number | Boolean | - | 内置校验方法，校验值是否为数字（1.2 、 1e5  都算数字） | N
pattern | Object | - | 内置校验方法，校验值是否符合正则表达式匹配结果。TS 类型：`RegExp` | N
required | Boolean | - | 内置校验方法，校验值是否已经填写。该值为 true，默认显示必填标记 | N
telnumber | Boolean | - | 内置校验方法，校验值是否为手机号码 | N
trigger | String | change | 校验触发方式。可选项：change/blur | N
type | String | error | 校验未通过时呈现的错误信息类型，有 告警信息提示 和 错误信息提示 等两种。可选项：error/warning | N
url | Boolean / Object | - | 内置校验方法，校验值是否为网络链接地址，[参数文档](https://github.com/validatorjs/validator.js)。TS 类型：`boolean | IsURLOptions`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/form/type.ts) | N
validator | Function | - | 自定义校验规则。TS 类型：`CustomValidator`。[详细类型定义](https://github.com/TDesignOteam/tdesign-vue/tree/develop/src/form/type.ts) | N
