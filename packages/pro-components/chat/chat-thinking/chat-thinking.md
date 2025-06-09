---
title: ChatThinking 思考过程
description: 思考过程
isComponent: true
usage: { title: '', description: '' }
spline: aigc
---

## 基础用法
支持通过`maxHeight`来设置展示内容的最大高度，超出会自动滚动；

支持通过`collapsed`来控制面板是否折叠，示例中展示了当内容输出结束时自动收起的效果

{{ base }}


## 样式设置
支持通过`layout`来设置思考过程的布局方式

支持通过`animation`来设置思考内容加载过程的动画效果

{{ style }}


## API
### ChatThinking Props

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
content | Object | - | 思考内容对象。TS类型：`{ text?: string; title?: string }` | N
layout | String | block | 布局方式。可选项： block/border | N
status | ChatMessageStatus/Function | - | 思考状态。可选项：complete/stop/error/pending | N
maxHeight | Number | - | 内容区域最大高度，超出会自动滚动 | N
animation | String | circle | 加载动画类型。可选项： circle/moving/gradient | N
collapsed | Boolean | false | 是否折叠（受控） | N