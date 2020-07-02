## popconfirm 

::: demo demos/base 默认
:::

::: demo demos/theme 主题
:::

::: demo demos/icon 自定义icon
:::

::: demo demos/button 自定义button
:::

::: demo demos/content 自定义content
:::

::: demo demos/event 回调
:::

::: demo demos/inherit 继承自popup
:::
> 更多属性，如disabled、placement、trigger等等，请参考popup

### Props
|  属性  |  类型  |  默认值  |  必传  |  说明  |
| ----- | ----- | ----- | ----- | ----- |
| cancelText |  String/Slot | 取消 | N | 取消按钮文字 |
| confirmText |  String/Slot | 确定 | N | 确认按钮文字 |
| content | String/Function/Slot | - | N | 确认框描述 |
| icon | String/Function/Slot | "info" | N | 自定义弹出气泡Icon图标 |
| theme | String | "default" | N | 确认框主题 |



### Events
|  事件  |  说明  |  参数  |
| ----- | ----- | ----- | 
| cancel | 点击取消的回调 | function(e) |
| confirm | 点击确认的回调 | function(e) |


