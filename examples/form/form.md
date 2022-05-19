:: BASE_DOC ::

<!-- 可在这里自行添加 demo 展示 -->

## API
### Form Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
colon | Boolean | false | 是否在表单标签字段右侧显示冒号 | N
data | Object | {} | 表单数据。TS 类型：`FormData` | N
disabled | Boolean | undefined | 是否禁用整个表单 | N
errorMessage | Object | - | 表单错误信息配置，示例：`{ idcard: '请输入正确的身份证号码', max: '字符长度不能超过 ${max}' }`。TS 类型：`FormErrorMessage` | N
formControlledComponents | Array | - | 允许表单统一控制禁用状态的自定义组件名称列表。默认会有组件库的全部输入类组件：TInput、TInputNumber、TCascader、TSelect、TOption、TSwitch、TCheckbox、TCheckboxGroup、TRadio、TRadioGroup、TTreeSelect、TDatePicker、TTimePicker、TUpload、TTransfer、TSlider。对于自定义组件，组件内部需要包含可以控制表单禁用状态的变量 `formDisabled`。示例：`['CustomUpload', 'CustomInput']`。TS 类型：`Array<string>` | N
labelAlign | String | right | 表单字段标签对齐方式：左对齐、右对齐、顶部对齐。可选项：left/right/top | N
labelWidth | String / Number | '100px' | 可以整体设置label标签宽度，默认为100px | N
layout | String | vertical | 表单布局，有两种方式：纵向布局 和 行内布局。可选项：vertical/inline | N
preventSubmitDefault | Boolean | true | 是否阻止表单提交默认事件（表单提交默认事件会刷新页面），设置为 `true` 可以避免刷新 | N
requiredMark | Boolean | undefined | 是否显示必填符号（*），默认显示 | N
resetType | String | empty | 重置表单的方式，值为 empty 表示重置表单为空，值为 initial 表示重置表单数据为初始值。可选项：empty/initial | N
rules | Object | - | 表单字段校验规则。TS 类型：`{ [field in keyof FormData]: Array<FormRule> }` | N
scrollToFirstError | String | - | 表单校验不通过时，是否自动滚动到第一个校验不通过的字段，平滑滚动或是瞬间直达。值为空则表示不滚动。可选项：smooth/auto | N
showErrorMessage | Boolean | true | 校验不通过时，是否显示错误提示信息，统一控制全部表单项。如果希望控制单个表单项，请给 FormItem 设置该属性 | N
statusIcon | Boolean / Slot / Function | undefined | 校验状态图标，值为 `true` 显示默认图标，默认图标有 成功、失败、警告 等，不同的状态图标不同。`statusIcon` 值为 `false`，不显示图标。`statusIcon` 值类型为渲染函数，则可以自定义右侧状态图标。TS 类型：`boolean | TNode<TdFormItemProps>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
submitWithWarningMessage | Boolean | false | 【讨论中】当校验结果只有告警信息时，是否触发 `submit` 提交事件 | N
onReset | Function |  | TS 类型：`(context: { e?: FormResetEvent }) => void`<br/>表单重置时触发 | N
onSubmit | Function |  | TS 类型：`(context: SubmitContext<FormData>) => void`<br/>表单提交时触发。其中 context.validateResult 表示校验结果，context .firstError 表示校验不通过的第一个规则提醒。context.validateResult 值为 true 表示校验通过；如果校验不通过，context.validateResult 值为校验结果列表。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/form/type.ts)。<br/>`interface SubmitContext<T extends Data = Data> { e?: FormSubmitEvent; validateResult: FormValidateResult<T>; firstError?: string }`<br/><br/>`type FormValidateResult<T> = boolean | ValidateResultObj<T>`<br/><br/>`type ValidateResultObj<T> = { [key in keyof T]: boolean | ValidateResultList }`<br/><br/>`type ValidateResultList = Array<AllValidateResult>`<br/><br/>`type AllValidateResult = CustomValidateObj | ValidateResultType`<br/><br/>`interface ValidateResultType extends FormRule { result: boolean }`<br/><br/>`type ValidateResult<T> = { [key in keyof T]: boolean | ErrorList }`<br/><br/>`type ErrorList = Array<FormRule>`<br/> | N
onValidate | Function |  | TS 类型：`(result: ValidateResultContext<FormData>) => void`<br/>校验结束后触发，result 值为 true 表示校验通过；如果校验不通过，result 值为校验结果列表。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/form/type.ts)。<br/>`type ValidateResultContext<T> = Omit<SubmitContext<T>, 'e'>`<br/> | N

### Form Events

名称 | 参数 | 描述
-- | -- | --
reset | `(context: { e?: FormResetEvent })` | 表单重置时触发
submit | `(context: SubmitContext<FormData>)` | 表单提交时触发。其中 context.validateResult 表示校验结果，context .firstError 表示校验不通过的第一个规则提醒。context.validateResult 值为 true 表示校验通过；如果校验不通过，context.validateResult 值为校验结果列表。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/form/type.ts)。<br/>`interface SubmitContext<T extends Data = Data> { e?: FormSubmitEvent; validateResult: FormValidateResult<T>; firstError?: string }`<br/><br/>`type FormValidateResult<T> = boolean | ValidateResultObj<T>`<br/><br/>`type ValidateResultObj<T> = { [key in keyof T]: boolean | ValidateResultList }`<br/><br/>`type ValidateResultList = Array<AllValidateResult>`<br/><br/>`type AllValidateResult = CustomValidateObj | ValidateResultType`<br/><br/>`interface ValidateResultType extends FormRule { result: boolean }`<br/><br/>`type ValidateResult<T> = { [key in keyof T]: boolean | ErrorList }`<br/><br/>`type ErrorList = Array<FormRule>`<br/>
validate | `(result: ValidateResultContext<FormData>)` | 校验结束后触发，result 值为 true 表示校验通过；如果校验不通过，result 值为校验结果列表。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/form/type.ts)。<br/>`type ValidateResultContext<T> = Omit<SubmitContext<T>, 'e'>`<br/>

### FormInstanceFunctions 组件实例方法

名称 | 参数 | 返回值 | 描述
-- | -- | -- | --
clearValidate | `(fields?: Array<keyof FormData>)` | \- | 清空校验结果。可使用 fields 指定清除部分字段的校验结果，fields 值为空则表示清除所有字段校验结果。清除邮箱校验结果示例：`clearValidate(['email'])`
reset | `(params?: FormResetParams)` | \- | 重置表单，表单里面没有重置按钮`<button type="reset" />`时可以使用该方法，默认重置全部字段为空，此方法不会触发 `reset` 事件。<br />如果表单属性 `resetType='empty'` 或者 `reset.type='empty'` 会重置为空；<br />如果表单属性 `resetType='initial'` 或者 `reset.type='initial'` 会重置为表单初始值。<br />`reset.fields` 用于设置具体重置哪些字段，示例：`reset({ type: 'initial', fields: ['name', 'age'] })`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/form/type.ts)。<br/>`interface FormResetParams { type: 'initial' | 'empty'; fields?: Array<keyof FormData> }`<br/>
setValidateMessage | `(message: FormValidateMessage<FormData>)` | \- | 设置自定义校验结果，如远程校验信息直接呈现。注意需要在组件挂载结束后使用该方法。`FormData` 指表单数据泛型。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/form/type.ts)。<br/>`type FormValidateMessage<FormData> = { [field in keyof FormData]: FormItemValidateMessage[] }`<br/><br/>`interface FormItemValidateMessage { type: 'warning' | 'error'; message: string }`<br/>
submit | \- | \- | 提交表单，表单里面没有提交按钮`<button type="submit" />`时可以使用该方法，此方法不会触发 `submit` 事件
validate | `(params?: FormValidateParams)` | `Promise<FormValidateResult<FormData>>` | 校验函数，泛型 `FormData` 表示表单数据 TS 类型。<br/>【关于参数】`params.fields` 表示校验字段，如果设置了 `fields`，本次校验将仅对这些字段进行校验。`params.trigger` 表示本次触发校验的范围，'blur' 表示只触发校验规则设定为 trigger='blur' 的字段，'change' 表示只触发校验规则设定为 trigger='change' 的字段，默认触发全范围校验。<br />【关于返回值】返回值为 true 表示校验通过；如果校验不通过，返回值为校验结果列表。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/form/type.ts)。<br/>`interface FormValidateParams { fields?: Array<string>; trigger?: ValidateTriggerType }`<br/><br/>`type ValidateTriggerType = 'blur' | 'change' | 'all'`<br/>

### FormItem Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
for | String | - | label 原生属性 | N
help | String / Slot / Function | - | 表单项说明内容。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
label | String / Slot / Function | '' | 字段标签名称。TS 类型：`string | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
labelAlign | String | - | 表单字段标签对齐方式：左对齐、右对齐、顶部对齐。默认使用 Form 的对齐方式，优先级高于 Form.labelAlign。可选项：left/right/top | N
labelWidth | String / Number | - | 可以整体设置标签宽度，优先级高于 Form.labelWidth | N
name | String | - | 表单字段名称 | N
requiredMark | Boolean | undefined | 是否显示必填符号（*），优先级高于 Form.requiredMark | N
rules | Array | [] | 表单字段校验规则。TS 类型：`Array<FormRule>` | N
showErrorMessage | Boolean | undefined | 校验不通过时，是否显示错误提示信息，优先级高于 `Form.showErrorMessage` | N
statusIcon | Boolean / Slot / Function | undefined | 校验状态图标，值为 `true` 显示默认图标，默认图标有 成功、失败、警告 等，不同的状态图标不同。`statusIcon` 值为 `false`，不显示图标。`statusIcon` 值类型为渲染函数，则可以自定义右侧状态图标。优先级高级 Form 的 statusIcon。TS 类型：`boolean | TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
successBorder | Boolean | false | 是否显示校验成功的边框，默认不显示 | N

### FormRule

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
boolean | Boolean | - | 内置校验方法，校验值类型是否为布尔类型，示例：`{ boolean: true, message: '数据类型必须是布尔类型' }` | N
date | Boolean / Object | - | 内置校验方法，校验值是否为日期格式，[参数文档](https://github.com/validatorjs/validator.js)，示例：`{ date: { delimiters: '-' }, message: '日期分隔线必须是短横线（-）' }`。TS 类型：`boolean | IsDateOptions` `interface IsDateOptions { format: string; strictMode: boolean; delimiters: string[] }`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/form/type.ts) | N
email | Boolean / Object | - | 内置校验方法，校验值是否为邮件格式，[参数文档](https://github.com/validatorjs/validator.js)，示例：`{ email: { ignore_max_length: true }, message: '请输入正确的邮箱地址' }`。TS 类型：`boolean | IsEmailOptions` `import { IsEmailOptions } from 'validator/es/lib/isEmail'`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/form/type.ts) | N
enum | Array | - | 内置校验方法，校验值是否属于枚举值中的值。示例：`{ enum: ['primary', 'info', 'warning'], message: '值只能是 primary/info/warning 中的一种' }`。TS 类型：`Array<string>` | N
idcard | Boolean | - | 内置校验方法，校验值是否为身份证号码，组件校验正则为 `/^(\d{18,18}|\d{15,15}|\d{17,17}x)$/i`，示例：`{ idcard: true, message: '请输入正确的身份证号码' }` | N
len | Number / Boolean | - | 内置校验方法，校验值固定长度，如：len: 10 表示值的字符长度只能等于 10 ，中文表示 2 个字符，英文为 1 个字符。示例：`{ len: 10, message: '内容长度不对' }`。<br />如果希望字母和中文都是同样的长度，示例：`{ validator: (val) => val.length === 10, message: '内容文本长度只能是 10 个字' }` | N
max | Number / Boolean | - | 内置校验方法，校验值最大长度，如：max: 100 表示值最多不能超过 100 个字符，中文表示 2 个字符，英文为 1 个字符。示例：`{ max: 10, message: '内容超出' }`。<br />如果希望字母和中文都是同样的长度，示例：`{ validator: (val) => val.length <= 10, message: '内容文本长度不能超过 10 个字' }`<br />如果数据类型数字（Number），则自动变为数字大小的比对 | N
message | String | - | 校验未通过时呈现的错误信息，值为空则不显示 | N
min | Number / Boolean | - | 内置校验方法，校验值最小长度，如：min: 10 表示值最多不能少于 10 个字符，中文表示 2 个字符，英文为 1 个字符。示例：`{ min: 10, message: '内容长度不够' }`。<br />如果希望字母和中文都是同样的长度，示例：`{ validator: (val) => val.length >= 10, message: '内容文本长度至少为 10 个字' }`。<br />如果数据类型数字（Number），则自动变为数字大小的比对 | N
number | Boolean | - | 内置校验方法，校验值是否为数字（1.2 、 1e5  都算数字），示例：`{ number: true, message: '请输入数字' }` | N
pattern | Object | - | 内置校验方法，校验值是否符合正则表达式匹配结果，示例：`{ pattern: /@qq.com/, message: '请输入 QQ 邮箱' }`。TS 类型：`RegExp` | N
required | Boolean | - | 内置校验方法，校验值是否已经填写。该值为 true，默认显示必填标记，可通过设置 `requiredMark: false` 隐藏必填标记 | N
telnumber | Boolean | - | 内置校验方法，校验值是否为手机号码，校验正则为 `/^1[3-9]\d{9}$/`，示例：`{ telnumber: true, message: '请输入正确的手机号码' }` | N
trigger | String | change | 校验触发方式。可选项：change/blur | N
type | String | error | 校验未通过时呈现的错误信息类型，有 告警信息提示 和 错误信息提示 等两种。可选项：error/warning | N
url | Boolean / Object | - | 内置校验方法，校验值是否为网络链接地址，[参数文档](https://github.com/validatorjs/validator.js)，示例：`{ url: { protocols: ['http','https','ftp'] }, message: '请输入正确的 Url 地址' }`。TS 类型：`boolean | IsURLOptions` `import { IsURLOptions } from 'validator/es/lib/isURL'`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/form/type.ts) | N
validator | Function | - | 自定义校验规则，示例：`{ validator: (val) => val.length > 0, message: '请输入内容'}`。TS 类型：`CustomValidator` `type CustomValidator = (val: ValueType) => CustomValidateResolveType | Promise<CustomValidateResolveType>` `type CustomValidateResolveType = boolean | CustomValidateObj` `interface CustomValidateObj { result: boolean; message: string; type?: 'error' | 'warning' | 'success' }` `type ValueType = any`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/form/type.ts) | N

### FormErrorMessage

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
boolean | String | - | 布尔类型校验不通过时的表单项显示文案，全局配置默认是：`'${name}数据类型必须是布尔类型'` | N
date | String | - | 日期校验规则不通过时的表单项显示文案，全局配置默认是：`'请输入正确的${name}'` | N
enum | String | - | 枚举值校验规则不通过时的表单项显示文案，全局配置默认是：`${name}只能是${validate}等` | N
idcard | String | - | 身份证号码校验不通过时的表单项显示文案，全局配置默认是：`'请输入正确的${name}'` | N
len | String | - | 值长度校验不通过时的表单项显示文案，全局配置默认是：`'${name}字符长度必须是 ${validate}'` | N
max | String | - | 值的长度太长或值本身太大时，校验不通过的表单项显示文案，全局配置默认是：`'${name}字符长度不能超过 ${validate} 个字符，一个中文等于两个字符'` | N
min | String | - | 值的长度太短或值本身太小时，校验不通过的表单项显示文案，全局配置默认是：`'${name}字符长度不能少于 ${validate} 个字符，一个中文等于两个字符'` | N
number | String | - | 数字类型校验不通过时的表单项显示文案，全局配置默认是：`'${name}必须是数字'` | N
pattern | String | - | 正则表达式校验不通过时的表单项显示文案，全局配置默认是：`'请输入正确的${name}'` | N
required | String | - | 没有填写必填项时的表单项显示文案，全局配置默认是：`'${name}必填'` | N
telnumber | String | - | 手机号号码校验不通过时的表单项显示文案，全局配置默认是：`'请输入正确的${name}'` | N
url | String | - | 链接校验规则不通过时的表单项显示文案，全局配置默认是：`'请输入正确的${name}'` | N
validator | String | - | 自定义校验规则校验不通过时的表单项显示文案，全局配置默认是：'${name}不符合要求' | N
