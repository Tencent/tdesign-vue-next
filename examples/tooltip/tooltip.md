:: BASE_DOC ::


### 定时消失
::: demo demos/duration 
:::

## API

### Tooltip Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
destroyOnClose | Boolean | true | 是否在关闭浮层时销毁浮层 | N
duration | Number | 3000 | 用于设置显示几秒之后消失，初始第一次有效 | N
showArrow | Boolean | true | 是否显示浮层箭头 | N
theme | String | default | 文字提示风格。可选项：default/primary/success/danger/warning/light | N
PopupProps | - | - | 继承 `PopupProps` 中的全部 API | N
