:: BASE_DOC ::

### 安装独立 Icon 包

图标相对其他基础组件较为独立，所以作为一个独立的 npm 包做发布管理。如果项目中直接使用，请安装`tdesign-icons-vue-next`。
同时`tdesign-vue-next`也内置了 icon,支持直接通过`t-icon`来使用

### SVG 全量引入

图标尺寸单位支持多种， 'small', 'medium', 'large', '35px', '3em' 等。
图标颜色使用 CSS 控制，如：style="color: red"，或者 style="fill: red"。
点击右侧导航「全部图标」即可查看组件库全部图标。

::: demo demos/base
:::

### SVG 按需引入

图标可以按需引入单个 SVG 图标。组件开发内部使用到 Icon 时，均按需引入 SVG 图标。

::: demo demos/single
:::

### SVG 高级用法

可以传入 url 加入新的 svg 图标。

引入新的图标 Url 之后，图标名称必须写全称，以作区分，如：`"name='home'"` 需要写成 `"name='t-icon-home'"`。

组件会引入默认的 svg 图标，如果希望禁止组件加载默认的 svg 图标，将 `loadDefaultIcons` 置为 false 即可。

::: demo demos/enhanced icon
:::

### iconfont 图标

使用 Iconfont 图标需要单独引入 Iconfont 图标组件

::: demo demos/iconfont icon
:::

### iconfont 高级用法

可以传入 url 加入新的 iconfont 图标。

引入新的图标 Url 之后，图标名称必须写全称，以作区分，如：`"name='home'"` 需要写成 `"name='t-icon-home'"`。

组件会引入默认的 iconfont 图标，如果希望禁止组件加载默认的 iconfont 图标，将 `loadDefaultIcons` 置为 false 即可。

::: demo demos/iconfont-enhanced
:::

### 全部图标

::: demo demos/all icon
:::

:: BASE_PROPS ::
