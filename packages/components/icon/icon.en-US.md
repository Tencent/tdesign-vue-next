:: BASE_DOC ::

### Install tdesign-icons-vue-next

Icons are published and managed as a separate npm package. If you want to use it directly in your project, please install `tdesign-icons-vue-next`. At the same time, `tdesign-vue-next` also includes icons and supports direct use through `t-icon`.

### Import on-demand

SVG icons can be imported on demand. When using the Icon component in component development, SVG icons are imported on demand.

{{ single }}

### Full import

The icon size supports multiple units, such as 'small', 'medium', 'large', '35px', '3em', etc. 
The icon color is controlled by CSS, for example, using style="color: red" or style="fill: red". 
Click on the 「All Icons」 navigation on the right to view all icons in the component library.

{{ base }}



### Advanced usage of SVG

New svg icons can be added by passing in the URL. 

The component will import default svg icons. If you want to disable the loading of default svg icons, set `loadDefaultIcons` to `false`.

{{ enhanced }}

### Iconfont

{{ iconfont }}

### Advanced usage of iconfont

New iconfont icons can be added by passing in the URL. 

The component will import default iconfont icons. If you want to disable the loading of default iconfont icons, set `loadDefaultIcons` to `false`.


{{ iconfont-enhanced }}

### Icon Selector

If you need to select icons in your project, please use `Select` to implement an icon selector.

{{ icon-select }}

### FAQ

#### How to get all the names of icons？

You can get all the name of icon by import manifest from the bundle `import { manifest } from 'tdesign-icons-vue-next'`

#### the usage of full import needs network. What if my project is in a no-network scenario?

if your project is in a **no-network scenario**, please use **on-demand loading** of icons. For example,`<t-icon name="add" />` should be changed to `<AddIcon />`

## API

### Icon Props

name | type | default | description | required
-- | -- | -- | -- | --
size | String | undefined | size of icon | N
onClick | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N
strokeWidth | Number | width of icon stroke，default is 2
strokeColor | String / Array | stroke color of the outlined icon, default value is `currentColor`, supporting up to two stroke colors at most
fillColor | String / Array | fill color for outlined icons and the fill color for filled icons. For outlined icons, the default is transparent, while for filled icons, the default is currentColor, supporting up to two fill colors at most

### IconSVG Props

name | type | default | description | required
-- | -- | -- | -- | --
loadDefaultIcons | Boolean | true | \- | N
name | String | - | required | Y
size | String | undefined | \- | N
style | String | - | html attribute | N
url | String / Array | - | Typescript：`string \| Array<string>` | N
onClick | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N

### IconSVG Events

name | params | description
-- | -- | --
click | `(context: { e: MouseEvent })` | \-

### Iconfont Props

name | type | default | description | required
-- | -- | -- | -- | --
loadDefaultIcons | Boolean | true | \- | N
name | String | - | required | Y
size | String | undefined | \- | N
style | String | - | html attribute | N
tag | String | i | \- | N
url | String / Array | - | Typescript：`string \| Array<string>` | N
onClick | Function |  | Typescript：`(context: { e: MouseEvent }) => void`<br/> | N

### Iconfont Events

name | params | description
-- | -- | --
click | `(context: { e: MouseEvent })` | \-
