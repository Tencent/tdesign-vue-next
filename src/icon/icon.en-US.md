:: BASE_DOC ::

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
