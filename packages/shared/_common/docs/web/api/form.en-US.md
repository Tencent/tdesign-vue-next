---
title: Form
description: Used to collect, verify and submit data, generally composed of input box, radio box, check box, selector and other controls.
isComponent: true
usage: { title: "", description: "" }
spline: form
---

### Typical Form

A typical form component contains a variety of form items, such as input boxes, selectors, radio boxes, multicheck boxes, switches, text input, and so on.

- If there is a submit button `<button type="submit">` in the form, the `submit` event will be triggered automatically when the submit button is clicked.
- If there is a reset button `<button type="reset">` in the form, the `reset` event will be triggered automatically when the reset button is clicked.
- If there is no submit or reset button in the form and you want to click any button to submit or reset, you can use the component instance methods `submit` and `reset`. For more information, please see the API documentation.
  {{ base }}

### Login Form

A form specifically for account and password entry for the login page.

{{ login }}

### Forms with Different Alignment

Depending on your goals and constraints, choose the best label alignment, with the default alignment being right.

{{ align }}

### Forms with Different Layout Types

{{ layout }}

### Forms with different reset functions

There are three types of form reset: reset all data to blank, reset all data to initial value, and reset any data to any value.

- The first method is to use `resetType` to control.`empty` means to reset the form to empty, and `initial` means to reset the form data to the initial value. Example: `<Form resetType="initial" />`.
- The second method: Use the component instance method `reset` to reset the data. For more information, see the API documentation. Example 1:`reset({ type:'initial' })`, Example 2:`reset({ fields:['name'] })`。

{{ reset }}

### Form Items in Different Status

The user is prompted to fill in the form through icons and prompt text.

- Verification status includes success, failure and warning. You can use `successBorder` to control whether to display a green border after verification is successful.
- Use `statusIcon` to control the verification icon.`FormItem.statusIcon` has higher priority than `Form.statusIcon`. If the value is `true`, the default icon will be displayed. The default icons include success, failure, warning, etc. The icons are different for different statuses.`  statusIcon`value is`false`, no icon is displayed.`  If the value type of statusIcon`is a rendering function, you can customize the status icon on the right.

{{ validator-status }}

### Forms with Different Verification Rules

The built-in verification rules of the form are: `date` / `url` / `email` / `required` / `boolean` / `max` / `min` / `len` / `number` / `enum` / `idcard` / `telnumber` / `pattern`. For verification rule parameters such as `date` / `url` / `email`, see:[https://github.com/validatorjs/validator.js](https://github.com/validatorjs/validator.js)。 See `FormRule` in the API documentation for examples of verification rules.

{{ validator }}

### Forms with Custom Verification Rules

You can configure custom verification rules or asynchronous verification. Different verification results can be set for the same verification rule of the same field.

Use `validator` to define a custom verification function, and support asynchronous return of `Promise`. Different verification results, verification result types, and verification result information can be set for the returned results.

- Example 1:`validator:(val) =&gt; { result:!!  val, message:'This item is required', type:'error' }`。
- Example 2:`validator:(val) =&gt; new Promise((resolve) =&gt; resolve({ result:false, message:'Verification failed', type:'warning' }))`。 For asynchronous verification, the verification results must be returned in all cases. You should not only return the case where `resolve(false)` fails the verification, but also return the case where `resolve(true)` passes the verification.

{{ custom-validator }}

### The form for clearing verification results

In some complex business scenarios, it is necessary to control whether the verification results are displayed or not. In this case, the instance method `clearValidate` is used to clear the verification results. You can clear the verification results of all or some fields.

{{ clear-validate }}

### Forms for Unified Configuration of Verification Information

Default verification information is required for each rule in `FormRule`. Default verification information can be overwritten by `Form.errorMessage`, and verification information of each rule can be configured globally (ConfigProvider).

{{ error-message }}

### Forms for Complex Data Verification

In many cases, the type of form data is often not only a simple object, but also contains arrays, object array nesting, and so on. Forms support validation of these complex data types.

{{ validate-complicated-data }}

### Disabled Form

You can disable an entire form item using the `disabled` attribute. For custom components, you can use `formControlledComponents` to enable the Form proxy to be disabled.

{{ disabled }}

### Forms for Setting Verification Information

Use the `validateMessage` attribute to customize the form verification information prompt, which is mainly used for non-component internal verification information presentation, such as:The remote validation result of the first rendering of the form. This value must be set to null if you want to enable validation within the component.

{{ validate-message }}
