:: BASE_DOC ::

## API

### Scrollbar Props

name | type | default | description | required
-- | -- | -- | -- | --
ariaLabel | String | - | aria-label text in view layer | N
autoExpand | Boolean | true | Should the scrollbar expand outwards when hovering (to increase the interactive hotspot)? | N
autoresize | Boolean | true | Does the container size respond to changes | N
container | Object | - | Set the maximum height/width of the scrolling container. Typescript: `{ height?:string \| number; maxHeight?: string \| number; width?: string \| number; maxWidth?: string \| number }` | N
disabled | Boolean | false | disabled scroll | N
id | String | - | ID of the view layer | N
role | String | scrollbar | WAI-ARIA role in the view layer | N
step | Object | - | Rolling step. Typescript: `{ x?: number; y?: number}` | N
tabindex | String / Number | - | tabindex of the container | N
thumbMinSize | Number | 20 | Minimum size (px) of the scroll bar slider. | N
viewClassName | String | - | Custom class name for the view (content area) | N
visibility | String | hover | Scroll bar display format. options: always/hover/hide | N
wrapClassName | String | - | Custom class name of the wrapper container | N
onScroll | Function |  | Typescript: `({ scrollTop: number, scrollLeft: number }) => void`<br/>Triggered while scrolling | N

### Scrollbar Events

name | params | description
-- | -- | --
scroll | `({ scrollTop: number, scrollLeft: number })` | Triggered while scrolling

### ScrollbarInstanceFunctions 组件实例方法

name | params | return | description
-- | -- | -- | --
getValues | \- | `PositionValues` | required. Get the view object containing complete scrolling information. [see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/scrollbar/type.ts). <br/>`interface PositionValues { left: number; top: number; scrollLeft: number; scrollTop: number; scrollWidth: number; scrollHeight: number; clientWidth: number; clientHeight: number }`<br/>
scrollTo | `ScrollToFn` | \- | required. Scroll to a specific set of coordinates. [see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/scrollbar/type.ts). <br/>`type ScrollToFn = { (x: number, y: number): void; (options: { top?: number; left?: number; behavior?: ScrollBehavior }): void; }`<br/>
scrollToEdge | `(position:PositionEdge) ` | \- | required. Scroll to one side. [see more ts definition](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/components/scrollbar/type.ts). <br/>`type PositionEdge = "left"\|"right"\|"top"\|"bottom"`<br/>

### ScrollbarValues

name | type | default | description | required
-- | -- | -- | -- | --
PositionEdge | String | - | Scroll to one side. options: left/right/top/bottom | N
PositionValues | Object | - | Get the view object containing complete scrolling information. Typescript: `{ left: number; top: number; scrollLeft: number; scrollTop: number; scrollWidth: number; scrollHeight: number; clientWidth: number; clientHeight: number }` | N
