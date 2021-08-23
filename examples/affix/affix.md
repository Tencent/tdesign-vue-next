:: BASE_DOC ::


如果页面进行了切换并滚动，返回后发现 Affix 组件被触发，这可能是使用了`v-show`指令，没有触发`destroyed`，原本监听事件没有被清除。在 affix 中提供了`calcInitValue`方法供大家使用，可手动触发占位节点的宽高和定位的计算，请看<a href="#11基础锚点">基础锚点</a>的用法

:: BASE_PROPS ::