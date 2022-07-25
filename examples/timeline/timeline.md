:: BASE_DOC ::

## API
### Timeline Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
reverse | boolean | false | 节点排序，默认为正序 | N
mode | left \| alternate \| right | left | 时间轴和内容的相对位置，left为时间轴在内容左侧，right为时间轴在内容右侧，alternate为内容交替出现在时间轴两侧 | N
direction | vertical \| horizontal | vertical | 时间轴排列方式 | N
pending | boolean \| string \| TNode [通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | false | 指定最后一个幽灵节点是否存在或内容 | N


### TimelineItem Props
名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
color | string | #0052D9 | 指定圆圈颜色 | N
dot | string \| TNode [通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | - | 自定义时间轴点 | N
description | string \| TNode [通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | - | 自定义描述  | N
timestamp | string \| TNode [通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | - | 自定义时间戳  | N
hideTimestamp | boolean | false | 是否隐藏时间戳 | N
hollow | boolean | true | 是否空心点 | N
dashed | boolean | false | 是否为虚线 | N
disabled | boolean | false | 是否为禁用状态 | N
