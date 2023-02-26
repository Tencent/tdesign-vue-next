:: BASE_DOC ::

### 全局组件前缀

TDesign 的组件前缀统一为`t`，在一些业务场景中，有需要改变组件前缀来满足业务的使用场景。
可以使用`esm`版本（保证您可以修改less vars)，通过全局配置修改`classPrefix`，并配合 less-loader 修改`@prefix`这个 less vars 来保证组件样式的正常。

```js
import Vue from 'vue'
import TDesign from 'tdesign-vue-next/esm'

Vue.createApp({}).use(TDesign)

...

<t-config-provider :globalConfig="{ classPrefix: 'any'}">
    <t-button>TDesign to any design</t-button>
</t-config-provider>
```

```js
{
    loaderOptions: {
        less: {
            lessOptions: {
                modifyVars: {
                    '@prefix': 'any', // 请注意需要与classPrefix保持一致
                },
                javascriptEnabled: true,
            },
        },
    }
}
```

## API
### GlobalConfigProvider

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
alert | Object | - | 警告全局配置。TS 类型：`AlertConfig` | N
anchor | Object | - | 锚点全局配置。TS 类型：`AnchorConfig` | N
animation | Object | - | 动画效果控制，`ripple` 指波纹动画， `expand` 指展开动画，`fade` 指渐变动画。默认为 `{ include: ['ripple','expand','fade'], exclude: [] }`。TS 类型：`Partial<Record<'include'\|'exclude', Array<AnimationType>>>` `type AnimationType = 'ripple' \| 'expand' \| 'fade'`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/config-provider/type.ts) | N
calendar | Object | - | 日历组件全局配置。TS 类型：`CalendarConfig` | N
cascader | Object | - | 级联选择器全局配置。TS 类型：`CascaderConfig` | N
classPrefix | String | t | CSS 类名前缀 | N
colorPicker | Object | - | 颜色选择器全局配置。TS 类型：`ColorPickerConfig` | N
datePicker | Object | - | 日期选择器全局配置。TS 类型：`DatePickerConfig` | N
dialog | Object | - | 对话框全局配置。TS 类型：`DialogConfig` | N
drawer | Object | - | 抽屉全局配置。TS 类型：`DrawerConfig` | N
form | Object | - | 表单组件全局配置。TS 类型：`FormConfig` | N
guide | Object | - | 引导全局配置。TS 类型：`GuideConfig` | N
icon | Object | - | 图标全局配置。TS 类型：`IconConfig` `type IconConfig = GlobalIconConfig` `import { GlobalIconConfig } from '@icon'`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/config-provider/type.ts) | N
image | Object | - | 图片全局配置。TS 类型：`ImageConfig` | N
imageViewer | Object | - | 图片预览器全局配置。TS 类型：`ImageViewerConfig` | N
input | Object | - | 输入框组件全局配置。TS 类型：`InputConfig` | N
list | Object | - | 列表组件全局配置。TS 类型：`ListConfig` | N
message | Object | - | 消息组件全局配置。TS 类型：`MessageConfig` | N
pagination | Object | - | 分页组件全局配置。TS 类型：`PaginationConfig` | N
popconfirm | Object | - | 气泡确认框全局配置。TS 类型：`PopconfirmConfig` | N
select | Object | - | 选择器组件全局配置。TS 类型：`SelectConfig` | N
steps | Object | - | 步骤条组件全局配置。TS 类型：`StepsConfig` | N
table | Object | - | 表格组件全局配置。TS 类型：`TableConfig` | N
tag | Object | - | 标签全局配置。TS 类型：`TagConfig` | N
timePicker | Object | - | 时间选择器全局配置。TS 类型：`TimePickerConfig` | N
transfer | Object | - | 穿梭框全局配置。TS 类型：`TransferConfig` | N
tree | Object | - | 树组件全局配置。TS 类型：`TreeConfig` | N
treeSelect | Object | - | 树选择器组件全局配置。TS 类型：`TreeSelectConfig` | N
upload | Object | - | 上传组件全局配置。TS 类型：`UploadConfig` | N

### InputConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
autocomplete | String | - | 是否开启自动填充功能 | N
placeholder | String | - | 语言配置，“请输入”占位符描述文本 | N

### PaginationConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
itemsPerPage | String | - | 语言配置，每页条数文本，示例：`'{size} 条/页'` | N
jumpTo | String | - | 语言配置，页码跳转文本，示例：'跳至' | N
page | String | - | 语言配置，“页”描述文本 | N
total | String | - | 语言配置，数据总条数文本，示例：`'共 {total} 项数据'` | N

### CalendarConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
cellMonth | String | - | 语言配置，月份描述文本，示例：'一月,二月,三月,四月,五月,六月,七月,八月,九月,十月,十一月,十二月' | N
controllerConfig | Object | - | 日历右上角控制器按钮配置。TS 类型：`CalendarController`，[Calendar API Documents](./calendar?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/config-provider/type.ts) | N
fillWithZero | Boolean | true | 当日期数字小于 10 时，是否使用 '0' 填充 | N
firstDayOfWeek | Number | 1 | 第一天从星期几开始。可选项：1/2/3/4/5/6/7 | N
hideWeekend | String | - | 语言配置，“隐藏周末”描述文本 | N
monthRadio | String | - | 语言配置，模式切换时的“月”描述文本 | N
monthSelection | String | - | 语言配置，\"月\"选择描述文本。示例：`'{month} 月'` | N
showWeekend | String | - | 语言配置，“显示周末”描述文本 | N
thisMonth | String | - | 语言配置，“本月”描述文本 | N
today | String | - | 语言配置，“今天”描述文本 | N
week | String | - | 语言配置，星期描述文本，示例：`'周一,周二,周三,周四,周五,周六,周日'` | N
yearRadio | String | - | 语言配置，模式切换时的“年”描述文本 | N
yearSelection | String | - | 语言配置，“年”选择描述文本，示例：`'{year} 年'` | N

### CascaderConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
empty | String | - | 语言配置，“暂无数据”描述文本 | N
loadingText | String | - | 语言配置，“加载中”描述文本 | N
placeholder | String | - | 语言配置，“请选择”占位描述文本 | N

### ColorPickerConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
clearConfirmText | String | - | 语言配置，“确定清空最近使用的颜色吗？”清空颜色确认文案 | N
recentColorTitle | String | - | 语言配置，“最近使用颜色” 区域标题文本 | N
swatchColorTitle | String | - | 语言配置，\"系统预设颜色\" 区域标题文本 | N

### TransferConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
empty | String | - | 语言配置，“暂无数据”空数据描述文本 | N
placeholder | String | - | 语言配置，“请输入关键词搜索”占位符描述文本 | N
title | String | - | 语言配置，穿梭框标题描述文本，示例：“{checked} / {total} 项” | N

### TimePickerConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
anteMeridiem | String | - | 语言配置，“上午”描述文本 | N
confirm | String | - | 语言配置，“确定”描述文本 | N
now | String | - | 语言配置，“此刻”描述文本 | N
placeholder | String | - | 语言配置，\"请选择时间\"占位符描述文本 | N
postMeridiem | String | - | 语言配置，“下午”描述文本 | N

### DatePickerConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
confirm | String | - | 语言配置，“确定” 描述文本 | N
dayAriaLabel | String | - | 语言配置，“日” 描述文本 | N
dayjsLocale | String | - | dayjs 语言国际化配置 | N
direction | String | 'ltr' | 日期方向，'ltr' 表示从左往右 | N
firstDayOfWeek | Number | 7 | 第一天从星期几开始。可选项：1/2/3/4/5/6/7 | N
format | String | 'YYYY-MM-DD' | 日期格式化规则 | N
monthAriaLabel | String | - | 语言配置，“月” 描述文本 | N
months | Array | - | 星期文本描述，默认值：['1 月', '2 月', '3 月', '4 月', '5 月', '6 月', '7 月', '8 月', '9 月', '10 月', '11 月', '12 月']。TS 类型：`string[]` | N
nextDecade | String | - | 语言配置，“下个十年” 描述文本 | N
nextMonth | String | - | 语言配置，“下个月” 描述文本 | N
nextYear | String | - | 语言配置，“下一年” 描述文本 | N
now | String | - | 语言配置，“此刻” 描述文本 | N
placeholder | Object | - | 占位符文本提示，默认值：`{ date: '请选择日期',  month: '请选择月份',  year: '请选择年份' }`。TS 类型：`{ date?: string; month?: string; year?: string }` | N
preDecade | String | - | 语言配置，“上个十年” 描述文本 | N
preMonth | String | - | 语言配置，“上个月” 描述文本 | N
preYear | String | - | 语言配置，“上一年” 描述文本 | N
presets | Object | - | 【暂不支持，讨论确认中】预设快捷日期选择，示例：`{ '元旦': '2021-01-01', '昨天':  dayjs().subtract(1, 'day').format('YYYY-MM-DD'), '特定日期': () => ['2021-02-01'] }`。TS 类型：`ConfigPresetDate` `interface ConfigPresetDate { [name: string]: DateConfigValue \| (() => DateConfigValue) }` `type DateConfigValue = string \| Date \| Array<DateConfigValue>`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/config-provider/type.ts) | N
quarters | Array | - | 季度文本描述，默认值：['1 季度', '2 季度', '3 季度', '4 季度']。TS 类型：`string[]` | N
rangeSeparator | String | - | 语言配置，“ 至 ” 范围分隔符描述文本，示例：' ~ ' | N
selectDate | String | - | 语言配置，“选择日期” 描述文本 | N
selectTime | String | - | 语言配置，“选择时间” 描述文本 | N
weekAbbreviation | String | - | 语言配置，“周” 描述文本 | N
weekdays | Object | - | 星期文本描述，默认值：['日', '一', '二', '三', '四', '五', '六']。TS 类型：`string[]` | N
yearAriaLabel | String | - | 语言配置，“年” 描述文本 | N

### DialogConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
cancel | Object | - | 取消按钮风格。TS 类型：`string \| ButtonProps`，[Button API Documents](./button?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/config-provider/type.ts) | N
closeOnEscKeydown | Boolean | true | 按下 ESC 时是否触发对话框关闭事件 | N
closeOnOverlayClick | Boolean | true | 点击蒙层时是否触发关闭事件 | N
confirm | Object | - | 确认按钮风格。TS 类型：`string \| ButtonProps` | N
confirmBtnTheme | Object | - | 确认按钮主题色，即 Dialog 的 `theme` 和 确认按钮的 `theme` 映射关系。示例：{ danger: 'danger' }。TS 类型：`{ default: string; info: string; warning: string; danger: string; success: string; }` | N

### DrawerConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
cancel | String | - | 语言配置，“取消”描述文本。TS 类型：`string \| ButtonProps` | N
closeOnEscKeydown | Boolean | true | 按下 ESC 时是否触发抽屉关闭事件 | N
closeOnOverlayClick | Boolean | true | 点击蒙层时是否触发关闭事件 | N
confirm | String | - | 语言配置，“确认”描述文本。TS 类型：`string \| ButtonProps` | N
size | String | 'small' | 尺寸配置，配置Drawer尺寸 | N

### PopconfirmConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
cancel | String / Object | - | 语言配置，“取消”描述文本。TS 类型：`string \| ButtonProps`，[Button API Documents](./button?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/config-provider/type.ts) | N
confirm | String / Object | - | 语言配置，“确定”描述文本。TS 类型：`string \| ButtonProps` | N
confirmBtnTheme | Object | - | 确认按钮主题色，即 Popconfirm 的 `theme` 和 确认按钮的 `theme` 映射关系。示例：{ danger: 'danger' }。TS 类型：`{ default: string; warning: string; danger: string; }` | N

### TableConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
cancelText | String | - | 语言配置，“取消” 描述文本 | N
clearFilterResultButtonText | String | - | 语言配置，过滤功能中，“清空筛选” 描述文本 | N
columnConfigButtonText | String | - | 语言配置，列配置功能中，“列配置” 按钮描述文本 | N
columnConfigDescriptionText | String | - | 语言配置，“请选择需要在表格中显示的数据列” 描述文本，列配置功能中弹框顶部描述 | N
columnConfigTitleText | String | - | 语言配置，“表格列配置” 描述文本，列配置功能中弹框的标题 | N
confirmText | String | - | 语言配置，“确认” 描述文本 | N
empty | String / Slot / Function | - | 语言配置，“暂无数据” 描述文本。TS 类型：`string \| TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
expandIcon | Slot / Function | undefined | 展开和收起图标（配置传入收起图标即可），如果没有配置，会使用组件内置的默认图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
filterIcon | Slot / Function | undefined | 过滤图标，如果没有配置，会使用组件内置的默认图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
hideSortTips | Boolean | false | 隐藏排序文本提示 | N
loadingMoreText | String | - | 语言配置，“点击加载更多” 描述文本 | N
loadingText | String | - | 语言配置，“正在加载中，请稍后” 描述文本 | N
resetText | String | - | 语言配置，“重置” 描述文本 | N
searchResultText | String | - | 语言配置，过滤功能中，过滤条件和结果描述文本，示例：'搜索“{result}”，找到 {count} 条结果' | N
selectAllText | String | - | 语言配置，'全选' 描述文本 | N
sortAscendingOperationText | String | - | 语言配置，'点击升序' 描述文本 | N
sortCancelOperationText | String | - | 语言配置，'点击取消排序' 描述文本 | N
sortDescendingOperationText | String | - | 语言配置，'点击降序' 描述文本 | N
sortIcon | Slot / Function | undefined | 排序图标（配置传入降序图标即可），如果没有配置，会使用组件内置的默认图标。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
treeExpandAndFoldIcon | Function | undefined | 树形结构，展开和折叠图标。如果没有配置，会使用组件内置的默认图标。TS 类型：`TNode<{ type: 'expand' \| 'fold' }>`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N

### SelectConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
clearIcon | Function | - | 清除图标，【注意】使用渲染函数输出图标组件。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
empty | String | - | 语言配置，“暂无数据”描述文本 | N
filterable | Boolean | false | 全局配置是否可筛选 | N
loadingText | String | - | 语言配置，“加载中”描述文本 | N
placeholder | String | - | 语言配置，“请选择”占位符描述文本 | N

### TreeConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
empty | String | - | 语言配置，“暂无数据”描述文本 | N
folderIcon | Function | - | 目录层级图标，传入收起状态图标即可。【注意】使用渲染函数输出图标组件。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N

### TreeSelectConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
empty | String | - | 语言配置，“暂无数据”描述文本 | N
loadingText | String | - | 语言配置，“加载中”描述文本 | N
placeholder | String | - | 语言配置，“请选择”占位符描述文本 | N

### ListConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
loadingMoreText | String | - | 语言配置，'点击加载更多' 描述文本 | N
loadingText | String | - | 语言配置，'正在加载中，请稍后' 描述文本 | N

### UploadConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
cancelUploadText | String | - | 语言配置，“取消上传” 描述文本 | N
dragger | Object | - | 语言配置，拖拽相关。示例：{ dragDropText: '释放图标', draggingText: '拖拽到此区域', clickAndDragText: '点击上方“选择文件”或将文件拖到此区域' }。TS 类型：`UploadConfigDragger` | N
file | Object | - | 语言配置，文件信息相关。示例：{  fileNameText: '文件名', fileSizeText: '文件尺寸', fileStatusText: '状态', fileOperationText: '操作', fileOperationDateText: '上传日期' }。TS 类型：`UploadConfigFileList` | N
progress | Object | - | 语言配置，上传进度相关。示例：{ uploadText: '上传中', waitingText: '待上传', 'failText': '上传失败', successText: '上传成功' }。TS 类型：`UploadConfigProgress` | N
sizeLimitMessage | String | - | 语言配置，文件大小超出限制时提醒文本。示例：`'文件大小不能超过 {sizeLimit}'` | N
triggerUploadText | Object | - | 语言配置，上传功能触发文案。示例：{ image: '点击上传图片', normal: '点击上传',  fileInput: '选择文件', reupload: '重新上传', delete: '删除', continueUpload?: '继续选择' }。TS 类型：`UploadTriggerUploadText` `interface UploadTriggerUploadText { image?: string, normal?: string,  fileInput?: string,  reupload?: string, continueUpload?: string, delete?: string }`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/config-provider/type.ts) | N

### UploadConfigProgress

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
failText | String | - | 语言配置，“上传失败”文本描述 | N
successText | String | - | 语言配置，“上传成功”文本描述 | N
uploadingText | String | - | 语言配置，“上传中”文本描述 | N
waitingText | String | - | 语言配置，“待上传”文本描述 | N

### UploadConfigDragger

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
clickAndDragText | String | - | 语言配置，“ 点击上方“选择文件”或将文件拖到此区域 ” 描述文本 | N
dragDropText | String | - | 语言配置，“释放图标” 描述文本 | N
draggingText | String | - | 语言配置，'拖拽到此区域' 描述文本 | N

### UploadConfigFileList

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
fileNameText | String | - | 语言配置，“文件名” 描述文本 | N
fileOperationDateText | String | - | 语言配置，“上传日期” 描述文本 | N
fileOperationText | String | - | 语言配置，“操作” 描述文本 | N
fileSizeText | String | - | 语言配置，“文件尺寸” 描述文本 | N
fileStatusText | String | - | 语言配置，“状态” 描述文本 | N

### FormConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
errorMessage | Object | - | 表单错误信息配置，示例：`{ idcard: '请输入正确的身份证号码', max: '字符长度不能超过 ${max}' }`。TS 类型：`FormErrorMessage`，[Form API Documents](./form?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/config-provider/type.ts) | N
requiredMark | Boolean | true | 是否显示必填符号（*），默认显示 | N

### TagConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
closeIcon | Function | - | 关闭图标，【注意】使用渲染函数输出图标组件。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N

### StepsConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
errorIcon | Slot / Function | - | 错误步骤图标，【注意】使用渲染函数输出图标组件。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N

### AlertConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
collapseText | String | - | 语言配置，“收起”描述文本 | N
expandText | String | - | 语言配置，“展开更多”描述文本 | N

### AnchorConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
copySuccessText | String | - | 语言配置，“链接复制成功”描述文本 | N
copyText | String | - | 语言配置，“复制链接” 描述文本 | N

### MessageConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
`MessageOptions` | \- | - | 继承 `MessageOptions` 中的全部属性 | N

### ImageConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
errorText | String | - | 图片加载失败显示的文本，中文默认为“图片无法显示” | N
loadingText | String | - | 图片加载中显示的文本，中文默认为“图片加载中” | N
replaceImageSrc | Function | - | 统一替换图片 `src` 地址，参数为组件的全部属性，返回值为新的图片地址。TS 类型：`(params: ImageProps) => string`，[Image API Documents](./image?tab=api)。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/config-provider/type.ts) | N

### ImageViewerConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
errorText | String | - | 全局语言配置，默认为 “图片加载失败，可尝试重新加载” | N
mirrorTipText | String | - | 全局语言配置，默认为 “镜像” | N
originalSizeTipText | String | - | 全局语言配置，默认为 “原始大小” | N
rotateTipText | String | - | 全局语言配置，默认为 “旋转” | N

### GuideConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
finishButtonProps | Object | - | 最后一步中的完成按钮，示例：`{ content: '完成', theme: 'primary' }`。TS 类型：`ButtonProps` | N
nextButtonProps | Object | - | 下一步按钮，示例：`{ content: '下一步', theme: 'primary' }`。TS 类型：`ButtonProps` | N
prevButtonProps | Object | - | 上一步按钮，示例：`{ content: '上一步', theme: 'default' }`。TS 类型：`ButtonProps` | N
skipButtonProps | Object | - | 跳过按钮，示例：`{ content: '跳过', theme: 'default' }`。TS 类型：`ButtonProps` | N
