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
### All Icons

<div style="background: #ecf2fe; display: flex; align-items: center; line-height: 20px; padding: 14px 24px; border-radius: 3px; color: #555a65;margin:16px 0">
  <svg fill="none" viewBox="0 0 16 16" width="16px" height="16px" style="margin-right: 5px">
    <path fill="#0052d9" d="M8 15A7 7 0 108 1a7 7 0 000 14zM7.4 4h1.2v1.2H7.4V4zm.1 2.5h1V12h-1V6.5z" fillOpacity="0.9"></path>
  </svg>
<p style="flex:1">Most icons were added to the icon library after version 0.3.0. If you find that the icon cannot be displayed normally after being imported, please check the version of tdesign-icons-vue-next you have installed. Supports Chinese and English search. If you think other keyword prompts can be added, feel free to submit a Pull Request to <a href="https://github.com/Tencent/tdesign-icons/blob/develop/packages/view/src/manifest.js" target="_blank"> the Icon Repository</a> to help us complete it together. </p>
</div>


<td-icons-view />

## API

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
