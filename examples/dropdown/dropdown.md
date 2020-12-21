:: BASE_DOC ::

### 禁用
::: demo demos/disabled 
:::

### 自定义其他属性
::: demo demos/custom 
:::

### 高尺寸
::: demo demos/long 
:::

### click、visibleChange事件
::: demo demos/event 
:::

### 属性配置

| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
|options|Array|[]|Y|item格式参考下面备注|
|hideAfterItemClick|Boolean|true|N|点击选项后是否自动隐藏弹窗|
|disabled|Boolean|false|N|用于是否禁用显示dropdown|
|placement|String|'bottomLeft'|N|弹窗定位方式，可选值参考**popup**|
|trigger|String|'hover'|N|触发方式，可选值参考**popup**|
|maxColumnHeight|Number|300|N|弹窗最大高度px（超过显示滚动条）|
|minItemWidth|Number|10|N|选项最小宽度px|
|maxItemWidth|Number|100|N|选项最大宽度px（超过显示省略号）|

```json
// options数组中每一个item对象支持字段
{
  disabled: boolean,
  id: string | number,
  text: string,
  iconName: string,
  topSplit: boolean,
  children: OptionItem[],
}
```

### 事件event

| 事件名称 | 参数 | 说明 |
|-----|-----|-----|
|visibleChange|visible|弹窗显示或隐藏时触发|
|click|{id,path,text}|点击选项时触发，获取点击对象的相关属性|
