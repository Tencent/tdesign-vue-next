:: BASE_DOC ::

## API
### GlobalConfigProvider

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
calendar | Object | - | 日历组件全局配置。TS 类型：`CalendarConfig` | N
cascader | Object | - | 级联选择器全局配置。TS 类型：`CascaderConfig` | N
datePicker | Object | - | 日期选择器全局配置。TS 类型：`DatePickerConfig` | N
dialog | Object | - | 对话框全局配置。TS 类型：`DialogConfig` | N
drawer | Object | - | 抽屉全局配置。TS 类型：`DrawerConfig` | N
form | Object | - | 表单组件全局配置。TS 类型：`FormConfig` | N
input | Object | - | 输入框组件全局配置。TS 类型：`InputConfig` | N
list | Object | - | 列表组件全局配置。TS 类型：`ListConfig` | N
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
placeholder | String | 请输入 | 占位符文本 | N

### PaginationConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
itemsPerPage | String | '{size} 条/页' | 每页条数文本，示例：`'{ total } / page'` | N
jumpTo | String | '跳至' | 页码跳转文本，示例：'jump to' | N
page | String | '页' | “页”文本，示例：'page' | N
total | String | '共 {total} 项数据' | 数据总条数文本，示例：`'total { total }'` | N

### CalendarConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
cellMonth | String | '一月,二月,三月,四月,五月,六月,七月,八月,九月,十月,十一月,十二月' | 语言配置，月份描述文本 | N
controllerConfig | Object | - | 日历右上角控制器按钮配置。TS 类型：`CalendarController`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/config-provider/type.ts) | N
fillWithZero | Boolean | true | 当日期数字小于 10 时，是否使用 '0' 填充 | N
firstDayOfWeek | Number | 1 | 第一天从星期几开始。可选项：1/2/3/4/5/6/7 | N
hideWeekend | String | '隐藏周末' | 语言配置，“隐藏周末”描述文本 | N
monthRadio | String | '月' | 语言配置，模式切换时的“月”描述文本 | N
monthSelection | String | '{month} 月' | 语言配置，"月"选择描述文本 | N
showWeekend | String | '显示周末末' | 语言配置，“显示周末”描述文本 | N
thisMonth | String | '本月' | 语言配置，“本月”描述文本 | N
today | String | '今天' | 语言配置，“今天”描述文本 | N
week | String | 一,二,三,四,五,六,日 | 语言配置，星期描述文本，示例：'周一,周二,周三,周四,周五,周六,周日' | N
yearRadio | String | '年' | 语言配置，模式切换时的“年”描述文本 | N
yearSelection | String | '{year} 年' | 语言配置，“年”选择描述文本 | N

### CascaderConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
empty | String | '暂无数据' | 空数据文本，示例：'empty data' | N
loadingText | String | '加载中' | “加载中”描述文本 | N
placeholder | String | '请选择' | 选择器占位文本，示例：'select time' | N

### TransferConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
empty | String | '暂无数据' | 空数据描述文本 | N
placeholder | String | '请输入关键词搜索' | 占位符描述文本 | N
title | String | '{checked} / {total} 项' | 穿梭框标题描述文本 | N

### TimePickerConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
anteMeridiem | String | '上午' | 语言配置，“上午”描述文本 | N
confirm | String | '确定' | 语言配置，“确定”描述文本 | N
now | String | '此刻' | 语言配置，“此刻”描述文本 | N
placeholder | String | '请选择时间' | 语言配置，占位符描述文本 | N
postMeridiem | String | '下午' | 语言配置，“下午”描述文本 | N

### DatePickerConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
confirm | String | '确定' | “确定” 描述文本 | N
dayAriaLabel | String | '日' | “日” 描述文本 | N
direction | String | 'ltr' | 日期方向，'ltr' 表示从左往右 | N
firstDayOfWeek | Number | 7 | 第一天从星期几开始。可选项：1/2/3/4/5/6/7 | N
format | String | 'YYYY-MM-DD' | 日期格式化规则 | N
monthAriaLabel | String | '月' | “月” 描述文本 | N
months | Array | - | 星期文本描述，默认值：['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']。TS 类型：`string[]` | N
nextDecade | String | '下个十年' | “下个十年” 描述文本 | N
nextMonth | String | '下个月' | “下个月” 描述文本 | N
nextYear | String | '下一年' | “下一年” 描述文本 | N
now | String | '此刻' | “now” 描述文本 | N
placeholder | Object | - | 占位符文本提示，默认值：`{ date: '请选择日期',  month: '请选择月份',  year: '请选择年份' }`。TS 类型：`{ date?: string; month?: string; year?: string }` | N
preDecade | String | '上个十年' | “上个十年” 描述文本 | N
preMonth | String | '上个月' | “上个月” 描述文本 | N
presets | Object | - | 【暂不支持，讨论确认中】预设快捷日期选择，示例：`{ '元旦': '2021-01-01', '昨天':  dayjs().subtract(1, 'day').format('YYYY-MM-DD'), '特定日期': () => ['2021-02-01'] }`。TS 类型：`ConfigPresetDate`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/config-provider/type.ts) | N
preYear | String | '上一年' | “上一年” 描述文本 | N
rangeSeparator | String | ' 至 ' | 范围分隔符描述文本，示例：' ~ ' | N
selectDate | String | '选择日期' | “选择日期” 描述文本 | N
selectTime | String | '选择时间' | “选择时间” 描述文本 | N
weekAbbreviation | String | '周' | “周” 描述文本 | N
weekdays | Object | - | 星期文本描述，默认值：['日', '一', '二', '三', '四', '五', '六']。TS 类型：`string[]` | N
yearAriaLabel | String | '年' | “年” 描述文本 | N

### DialogConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
cancel | Object | - | 取消按钮风格。TS 类型：`string | ButtonProps`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/config-provider/type.ts) | N
confirm | Object | - | 确认按钮风格。TS 类型：`string | ButtonProps` | N
confirmBtnTheme | Object | - | 确认按钮主题色，即 Dialog 的 `theme` 和 确认按钮的 `theme` 映射关系。示例：{ danger: 'danger' }。TS 类型：`{ default: string; info: string; warning: string; danger: string; success: string; }` | N

### DrawerConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
cancel | String | '取消' | “取消”描述文本。TS 类型：`string | ButtonProps` | N
confirm | String | '确认' | “确认”描述文本。TS 类型：`string | ButtonProps` | N

### PopconfirmConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
cancel | String / Object | '取消' | “取消”描述文本。TS 类型：`string | ButtonProps`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/config-provider/type.ts) | N
confirm | String / Object | '确定' | “确定”描述文本。TS 类型：`string | ButtonProps` | N
confirmBtnTheme | Object | - | 确认按钮主题色，即 Popconfirm 的 `theme` 和 确认按钮的 `theme` 映射关系。示例：{ danger: 'danger' }。TS 类型：`{ default: string; warning: string; danger: string; }` | N

### TableConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
empty | String | '暂无数据' | 语言配置，'暂无数据' 描述文本 | N
expandIcon | Function | undefined | 展开和收起图标（配置传入收起图标即可），如果没有配置，组件会内置默认图标。【注意】使用渲染函数输出图标组件。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
filterInputPlaceholder | String | '输入关键词过滤' | 语言配置，'输入关键词过滤' 描述文本 | N
loadingMoreText | String | '点击加载更多' | 语言配置，'点击加载更多' 描述文本 | N
loadingText | String | '正在加载中，请稍后' | 语言配置，'正在加载中，请稍后' 描述文本 | N
sortAscendingOperationText | String | '点击升序' | 语言配置，'点击升序' 描述文本 | N
sortCancelOperationText | String | '点击取消排序' | 语言配置，'点击取消排序' 描述文本 | N
sortDescendingOperationText | String | '点击降序' | 语言配置，'点击降序' 描述文本 | N
sortIcon | Function | undefined | 排序图标（配置传入降序图标即可），如果没有配置，组件会内置默认图标。【注意】使用渲染函数输出图标组件。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N

### SelectConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
clearIcon | Function | - | 清除图标，【注意】使用渲染函数输出图标组件。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
empty | String | '暂无数据' | “暂无数据”描述文本 | N
loadingText | String | '加载中' | “加载中”描述文本 | N
placeholder | String | '请选择' | 占位符描述文本 | N

### TreeConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
empty | String | '暂无数据' | “暂无数据”描述文本 | N
folderIcon | Function | - | 目录层级图标，传入收起状态图标即可。【注意】使用渲染函数输出图标组件。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N

### TreeSelectConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
empty | String | '暂无数据' | “暂无数据”描述文本 | N
loadingText | String | '加载中' | “加载中”描述文本 | N
placeholder | String | '请选择' | 占位符描述文本 | N

### ListConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
loadingMoreText | String | '点击加载更多' | 语言配置，'点击加载更多' 描述文本 | N
loadingText | String | '正在加载中，请稍后' | 语言配置，'正在加载中，请稍后' 描述文本 | N

### UploadConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
cancelUploadText | String | '取消上传' | 语言配置，“取消上传” 描述文本 | N
dragger | Object | - | 语言配置，拖拽相关。示例：{ dragDropText: '释放图标', draggingText: '拖拽到此区域', clickAndDragText: '点击上方“选择文件”或将文件拖到此区域' }。TS 类型：`UploadConfigDragger` | N
file | Object | - | 语言配置，文件信息相关。示例：{  fileNameText: '文件名', fileSizeText: '文件尺寸', fileStatusText: '状态', fileOperationText: '操作', fileOperationDateText: '上传日期' }。TS 类型：`UploadConfigFileList` | N
progress | Object | - | 语言配置，上传进度相关。示例：{ uploadText: '上传中', waitingText: '待上传', 'failText': '上传失败', successText: '上传成功' }。TS 类型：`UploadConfigProgress` | N
sizeLimitMessage | String | '文件大小不能超过 {sizeLimit}' | 语言配置，文件大小超出限制时提醒文本 | N
triggerUploadText | Object | - | 语言配置，上传功能触发文案。示例：{ image: '点击上传图片', normal: '点击上传',  fileInput: '选择文件',reupload: '重新上传',fileInput: '删除' }。TS 类型：`UploadTriggerUploadText`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/config-provider/type.ts) | N

### UploadConfigProgress

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
failText | String | '上传失败' | 语言配置，“上传失败”文本描述 | N
successText | String | '上传成功' | 语言配置，“上传成功”文本描述 | N
uploadingText | String | '上传中' | 语言配置，“上传中”文本描述 | N
waitingText | String | '待上传' | 语言配置，“待上传”文本描述 | N

### UploadConfigDragger

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
clickAndDragText | String | '点击上方“选择文件”或将文件拖到此区域' | 语言配置，'点击上方“选择文件”或将文件拖到此区域' 描述文本 | N
dragDropText | String | '释放图标' | 语言配置，'释放图标' 描述文本 | N
draggingText | String | '拖拽到此区域' | 语言配置，'拖拽到此区域' 描述文本 | N

### UploadConfigFileList

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
fileNameText | String | '文件名' | 语言配置，'文件名' 描述文本 | N
fileOperationDateText | String | '上传日期' | 语言配置，'上传日期' 描述文本 | N
fileOperationText | String | '操作' | 语言配置，'操作' 描述文本 | N
fileSizeText | String | '文件尺寸' | 语言配置，'文件尺寸' 描述文本 | N
fileStatusText | String | '状态' | 语言配置，'状态' 描述文本 | N

### FormConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
errorMessage | Object | - | 表单错误信息配置，示例：`{ idcard: '请输入正确的身份证号码', max: '字符长度不能超过 ${max}' }`。TS 类型：`FormErrorMessage`。[详细类型定义](https://github.com/Tencent/tdesign-vue-next/tree/develop/src/config-provider/type.ts) | N
requiredMark | Boolean | true | 是否显示必填符号（*），默认显示 | N

### TagConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
closeIcon | Function | - | 关闭图标，【注意】使用渲染函数输出图标组件。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N

### StepsConfig

名称 | 类型 | 默认值 | 说明 | 必传
-- | -- | -- | -- | --
errorIcon | Slot / Function | - | 错误步骤图标，【注意】使用渲染函数输出图标组件。TS 类型：`TNode`。[通用类型定义](https://github.com/Tencent/tdesign-vue-next/blob/develop/src/common.ts) | N
