:: BASE_DOC ::

### 属性配置
| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
|theme|string|light|否|风格|
|size|string|medium|否|尺寸，大，中（默认），小，可选值为 large/medium/small|
|separator|string/TNode|/|否|分隔符自定义,TNode优先级高于string|

## breadcrumb item

### 属性配置

| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
|to|string/object|无|否|路由跳转对象，同 vue-router 的 to|
|router|string/object|如果存在vue-router，则默认使用vue-router|否|路由对象|
|replace|boolean|false|否|在使用 to 进行路由跳转时，启用 replace 将不会向 history 添加新记录|
|overlay|dropdown|无|否|下拉框内容|

### 事件

| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
|click|Function(event)|无|否|点击事件|
