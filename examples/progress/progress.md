:: BASE_DOC ::

### 属性配置
| 属性 | 类型 | 默认值 | 必传 | 说明 |
|-----|-----|-----|-----|-----|
|theme|String|line   |N    |进度条类型，可选thin plump circle|
|percentage|Number|0   |Y    |进度条百分比|
|label|Boolean/TNode|true   |N    |是否显示label，为boolean时，默认percent)=>${percent}%|
|status|String| - |N    |进度条当前状态，success、error、warning、active(其中active仅type=line可用）|
|color|String/Object|腾讯蓝 |N    |进度条的颜色，object的时候是渐变色）|
|trackColor|String |#F5F5F5 |N    |进度条未完成的颜色|
|strokeWidth|Number/String  |- |N    |进度条线的宽度，默认Number单位px|
|size|String  |- |N    |进度条线的尺寸，可选 small、medium、large|
