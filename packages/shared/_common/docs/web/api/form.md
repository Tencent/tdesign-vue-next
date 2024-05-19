---
title: Form 表单
description: 用以收集、校验和提交数据，一般由输入框、单选框、复选框、选择器等控件组成。
isComponent: true
usage: { title: '', description: '' }
spline: form
---

### 典型表单

一个典型表单组件包含各种表单项，比如输入框、选择器、单选框、多选框、开关、文本输入等。

- 如果表单内存在提交按钮 `<button type="submit">`，点击提交按钮时，会自动触发 `submit` 事件。
- 如果表单内存在重置按钮 `<button type="reset">`，点击重置按钮时，会自动触发 `reset` 事件。
- 如果表单内不存在提交或重置按钮，您希望点击任意按钮进行提交和重置操作，则可以使用组件实例方法 `submit` 和 `reset`，详情请查阅 API 文档。

{{ base }}

### 登录表单

专门适用于登录页面的账号和密码输入的表单。

{{ login }}


### 不同对齐方式的表单

根据具体目标和制约因素，选择最佳的标签对齐方式，默认对齐方式为右对齐。

{{ align }}

### 不同布局类型的表单

{{ layout }}

### 不同重置功能的表单

表单重置分三类：全部数据重置为空、全部数据重置为初始值、重置任意数据为任意值。

- 第一种方式：使用 `resetType` 控制，值为 `empty` 表示重置表单为空，值为 `initial` 表示重置表单数据为初始值。示例：`<Form resetType="initial" />`。
- 第二种方式：使用组件实例方法 `reset` 进行数据重置，具体参数参考 API 文档。示例一：`reset({ type: 'initial' })`，示例二：`reset({ fields: ['name'] })`。

{{ reset }}

### 不同状态的表单项

通过图标及提示文字的形式来提示用户对表单的填写。

- 校验状态有：成功、失败、警告等状态，可使用 `successBorder` 控制是否显示校验成功后的绿色边框。
- 使用 `statusIcon` 控制校验图标，`FormItem.statusIcon` 优先级大于 `Form.statusIcon`。值为 `true` 显示默认图标，默认图标有 成功、失败、警告 等，不同的状态图标不同。`statusIcon` 值为 `false`，不显示图标。`statusIcon` 值类型为渲染函数，则可以自定义右侧状态图标。

{{ validator-status }}

### 不同校验规则的表单

表单内置的校验规则有：`date` / `url` / `email` / `required` / `boolean` / `max` / `min` / `len` / `number` / `enum` / `idcard` / `telnumber` / `pattern` 。其中 `date` / `url` / `email` 等校验规则参数参看：[https://github.com/validatorjs/validator.js](https://github.com/validatorjs/validator.js)。各校验规则示例见 API 文档中的 `FormRule`。

{{ validator }}

### 可自定义校验规则的表单

支持自定义配置校验规则，也支持配置异步校验。同一个字段的同一个校验规则可以设定多种不同的校验结果。

使用 `validator` 自定义校验函数，支持异步返回结果 `Promise`，返回结果可以设置不同的校验结果、校验结果类型、校验结果信息。

- 示例一：`validator: (val) => { result: !!val, message: '该项必填', type: 'error' }`。
- 示例二：`validator: (val) => new Promise((resolve) => resolve({ result: false, message: '校验未通过', type: 'warning' }))`。如果是异步校验，必须返回所有情况的校验结果，不能只返回 `resolve(false)` 校验不通过的情况，还需要注意返回 `resolve(true)` 校验通过的情况。

{{ custom-validator }}

### 可清空校验结果的表单

在一些复杂的业务场景中，会涉及到自主控制校验结果的显示与否，此时使用实例方法 `clearValidate` 来清空校验结果。可以清空全部字段的校验结果，也可以清除部分字段的校验结果。

{{ clear-validate }}

### 可统一配置校验信息的表单

`FormRule` 中的每个规则都要默认校验信息，支持通过 `Form.errorMessage` 覆盖默认校验信息，也支持全局配置（ConfigProvider）各个规则的校验信息。

{{ error-message }}

### 可进行复杂数据校验的表单

很多时候，表单数据的类型往往不仅仅是单纯的对象，还包含着数组、对象数组嵌套等。表单支持这些复杂数据类型的校验。

{{ validate-complicated-data }}

### 禁用态的表单

可以使用 `disabled` 属性禁用整个表单项。对于自定义组件，可以使用 `formControlledComponents` 设置为允许 Form 代理禁用状态。

{{ disabled }}

### 可设置校验信息的表单

使用 `validateMessage` 属性可以自定义表单校验信息提示，主要用于非组件内部的校验信息呈现，如：表单初次呈现的远程校验结果。如果要启动组件内部的校验功能，该值必须设置为空。

{{ validate-message }}
