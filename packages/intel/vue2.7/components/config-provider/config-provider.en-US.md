:: BASE_DOC ::

### Global Component Classprefix

the classprefix of TDesign component is `t`. In some situations, it is necessary to change the component prefix to meet the usage needs.

You can use the `esm` version (which guarantees that you can modify less vars), modify the `classPrefix` through global configuration, and cooperate with less-loader to modify the `@prefix` less vars to ensure the normal styling of the components.

```js
import Vue from 'vue'
import TDesign from 'tdesign-vue/esm'
import 'tdesign-vue/esm/style/index.js'

Vue.use(TDesign);
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
                    '@prefix': 'any', // should be the same as classPrefix
                },
                javascriptEnabled: true,
            },
        },
    }
}
```
## API
### GlobalConfigProvider

name | type | default | description | required
-- | -- | -- | -- | --
alert | Object | - | Alert global configs。Typescript：`AlertConfig` | N
anchor | Object | - | Anchor global configs。Typescript：`AnchorConfig` | N
animation | Object | - | Typescript：`Partial<Record<'include'\|'exclude', Array<AnimationType>>>` `type AnimationType = 'ripple' \| 'expand' \| 'fade'`。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/config-provider/type.ts) | N
calendar | Object | - | Calendar global configs。Typescript：`CalendarConfig` | N
cascader | Object | - | Cascader global configs。Typescript：`CascaderConfig` | N
classPrefix | String | t | \- | N
colorPicker | Object | - | ColorPicker global configs。Typescript：`ColorPickerConfig` | N
datePicker | Object | - | DatePicker global configs。Typescript：`DatePickerConfig` | N
dialog | Object | - | Dialog global configs。Typescript：`DialogConfig` | N
drawer | Object | - | Drawer global configs。Typescript：`DrawerConfig` | N
form | Object | - | Form global configs。Typescript：`FormConfig` | N
guide | Object | - | Guide global configs。Typescript：`GuideConfig` | N
icon | Object | - | icon config。Typescript：`IconConfig` `type IconConfig = GlobalIconConfig` `import { GlobalIconConfig } from '@icon'`。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/config-provider/type.ts) | N
image | Object | - | image global configs。Typescript：`ImageConfig` | N
imageViewer | Object | - | imageViewer global configs。Typescript：`ImageViewerConfig` | N
input | Object | - | Input global configs。Typescript：`InputConfig` | N
list | Object | - | List global configs。Typescript：`ListConfig` | N
message | Object | - | Message Component global configs。Typescript：`MessageConfig` | N
pagination | Object | - | Pagination global configs。Typescript：`PaginationConfig` | N
popconfirm | Object | - | Popconfirm global configs。Typescript：`PopconfirmConfig` | N
select | Object | - | Select global configs。Typescript：`SelectConfig` | N
steps | Object | - | Steps global configs。Typescript：`StepsConfig` | N
table | Object | - | Table global configs。Typescript：`TableConfig` | N
tag | Object | - | Tag global configs。Typescript：`TagConfig` | N
timePicker | Object | - | TimePicker global configs。Typescript：`TimePickerConfig` | N
transfer | Object | - | Transfer global configs。Typescript：`TransferConfig` | N
tree | Object | - | Tree global configs。Typescript：`TreeConfig` | N
treeSelect | Object | - | TreeSelect global configs。Typescript：`TreeSelectConfig` | N
upload | Object | - | Upload global configs。Typescript：`UploadConfig` | N

### InputConfig

name | type | default | description | required
-- | -- | -- | -- | --
autocomplete | String | - | \- | N
placeholder | String | - | \- | N

### PaginationConfig

name | type | default | description | required
-- | -- | -- | -- | --
itemsPerPage | String | - | \- | N
jumpTo | String | - | \- | N
page | String | - | \- | N
total | String | - | \- | N

### CalendarConfig

name | type | default | description | required
-- | -- | -- | -- | --
cellMonth | String | - | \- | N
controllerConfig | Object | - | Typescript：`CalendarController`，[Calendar API Documents](./calendar?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/config-provider/type.ts) | N
fillWithZero | Boolean | true | \- | N
firstDayOfWeek | Number | 1 | options：1/2/3/4/5/6/7 | N
hideWeekend | String | - | \- | N
monthRadio | String | - | \- | N
monthSelection | String | - | \- | N
showWeekend | String | - | \- | N
thisMonth | String | - | \- | N
today | String | - | \- | N
week | String | - | \- | N
yearRadio | String | - | \- | N
yearSelection | String | - | \- | N

### CascaderConfig

name | type | default | description | required
-- | -- | -- | -- | --
empty | String | - | \- | N
loadingText | String | - | \- | N
placeholder | String | - | select placeholder text | N

### ColorPickerConfig

name | type | default | description | required
-- | -- | -- | -- | --
clearConfirmText | String | - | \- | N
recentColorTitle | String | - | \- | N
swatchColorTitle | String | - | \- | N

### TransferConfig

name | type | default | description | required
-- | -- | -- | -- | --
empty | String | - | \- | N
placeholder | String | - | \- | N
title | String | - | \- | N

### TimePickerConfig

name | type | default | description | required
-- | -- | -- | -- | --
anteMeridiem | String | - | \- | N
confirm | String | - | \- | N
now | String | - | \- | N
placeholder | String | - | placeholder text | N
postMeridiem | String | - | \- | N

### DatePickerConfig

name | type | default | description | required
-- | -- | -- | -- | --
confirm | String | - | confirm text | N
dayAriaLabel | String | - | date text | N
dayjsLocale | String | - | dayjs language international configuration | N
direction | String | 'ltr' | range separator text | N
firstDayOfWeek | Number | 7 | options：1/2/3/4/5/6/7 | N
format | String | 'YYYY-MM-DD' | date format rules | N
monthAriaLabel | String | - | month text | N
months | Array | - | Typescript：`string[]` | N
nextDecade | String | - | next decade text | N
nextMonth | String | - | next month text | N
nextYear | String | - | next year text | N
now | String | - | now text | N
placeholder | Object | - | Typescript：`{ date?: string; month?: string; year?: string }` | N
preDecade | String | - | pre decade text | N
preMonth | String | - | pre month text | N
preYear | String | - | pre year text | N
presets | Object | - | Typescript：`ConfigPresetDate` `interface ConfigPresetDate { [name: string]: DateConfigValue \| (() => DateConfigValue) }` `type DateConfigValue = string \| Date \| Array<DateConfigValue>`。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/config-provider/type.ts) | N
quarters | Array | - | Typescript：`string[]` | N
rangeSeparator | String | - | range separator text | N
selectDate | String | - | select date text | N
selectTime | String | - | select time text | N
weekAbbreviation | String | - | week text | N
weekdays | Object | - | Typescript：`string[]` | N
yearAriaLabel | String | - | year text | N

### DialogConfig

name | type | default | description | required
-- | -- | -- | -- | --
cancel | Object | - | Typescript：`string \| ButtonProps`，[Button API Documents](./button?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/config-provider/type.ts) | N
closeOnEscKeydown | Boolean | true | \- | N
closeOnOverlayClick | Boolean | true | \- | N
confirm | Object | - | Typescript：`string \| ButtonProps` | N
confirmBtnTheme | Object | - | Typescript：`{ default: string; info: string; warning: string; danger: string; success: string; }` | N

### DrawerConfig

name | type | default | description | required
-- | -- | -- | -- | --
cancel | String | - | Typescript：`string \| ButtonProps` | N
closeOnEscKeydown | Boolean | true | \- | N
closeOnOverlayClick | Boolean | true | \- | N
confirm | String | - | Typescript：`string \| ButtonProps` | N
size | String | 'small' | \- | N

### PopconfirmConfig

name | type | default | description | required
-- | -- | -- | -- | --
cancel | String / Object | - | Typescript：`string \| ButtonProps`，[Button API Documents](./button?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/config-provider/type.ts) | N
confirm | String / Object | - | Typescript：`string \| ButtonProps` | N
confirmBtnTheme | Object | - | Typescript：`{ default: string; warning: string; danger: string; }` | N

### TableConfig

name | type | default | description | required
-- | -- | -- | -- | --
cancelText | String | - | \- | N
clearFilterResultButtonText | String | - | \- | N
columnConfigButtonText | String | - | \- | N
columnConfigDescriptionText | String | - | \- | N
columnConfigTitleText | String | - | \- | N
confirmText | String | - | \- | N
empty | String / Slot / Function | - | Typescript：`string \| TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
expandIcon | Slot / Function | undefined | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
filterIcon | Slot / Function | undefined | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
hideSortTips | Boolean | false | hide sort tips | N
loadingMoreText | String | - | \- | N
loadingText | String | - | \- | N
resetText | String | - | \- | N
searchResultText | String | - | \- | N
selectAllText | String | - | \- | N
sortAscendingOperationText | String | - | \- | N
sortCancelOperationText | String | - | \- | N
sortDescendingOperationText | String | - | \- | N
sortIcon | Slot / Function | undefined | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
treeExpandAndFoldIcon | Function | undefined | Typescript：`TNode<{ type: 'expand' \| 'fold' }>`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N

### SelectConfig

name | type | default | description | required
-- | -- | -- | -- | --
clearIcon | Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N
empty | String | - | \- | N
filterable | Boolean | false | \- | N
loadingText | String | - | \- | N
placeholder | String | - | placeholder text | N

### TreeConfig

name | type | default | description | required
-- | -- | -- | -- | --
empty | String | - | \- | N
folderIcon | Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N

### TreeSelectConfig

name | type | default | description | required
-- | -- | -- | -- | --
empty | String | - | \- | N
loadingText | String | - | \- | N
placeholder | String | - | placeholder text | N

### ListConfig

name | type | default | description | required
-- | -- | -- | -- | --
loadingMoreText | String | - | \- | N
loadingText | String | - | \- | N

### UploadConfig

name | type | default | description | required
-- | -- | -- | -- | --
cancelUploadText | String | - | \- | N
dragger | Object | - | Typescript：`UploadConfigDragger` | N
file | Object | - | Typescript：`UploadConfigFileList` | N
progress | Object | - | Typescript：`UploadConfigProgress` | N
sizeLimitMessage | String | - | \- | N
triggerUploadText | Object | - | Typescript：`UploadTriggerUploadText` `interface UploadTriggerUploadText { image?: string, normal?: string,  fileInput?: string,  reupload?: string, continueUpload?: string, delete?: string }`。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/config-provider/type.ts) | N

### UploadConfigProgress

name | type | default | description | required
-- | -- | -- | -- | --
failText | String | - | \- | N
successText | String | - | \- | N
uploadingText | String | - | \- | N
waitingText | String | - | \- | N

### UploadConfigDragger

name | type | default | description | required
-- | -- | -- | -- | --
clickAndDragText | String | - | \- | N
dragDropText | String | - | \- | N
draggingText | String | - | \- | N

### UploadConfigFileList

name | type | default | description | required
-- | -- | -- | -- | --
fileNameText | String | - | \- | N
fileOperationDateText | String | - | \- | N
fileOperationText | String | - | \- | N
fileSizeText | String | - | \- | N
fileStatusText | String | - | \- | N

### FormConfig

name | type | default | description | required
-- | -- | -- | -- | --
errorMessage | Object | - | Typescript：`FormErrorMessage`，[Form API Documents](./form?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/config-provider/type.ts) | N
requiredMark | Boolean | true | \- | N

### TagConfig

name | type | default | description | required
-- | -- | -- | -- | --
closeIcon | Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N

### StepsConfig

name | type | default | description | required
-- | -- | -- | -- | --
errorIcon | Slot / Function | - | Typescript：`TNode`。[see more ts definition](https://github.com/Tencent/tdesign-vue/blob/develop/src/common.ts) | N

### AlertConfig

name | type | default | description | required
-- | -- | -- | -- | --
collapseText | String | - | \- | N
expandText | String | - | \- | N

### AnchorConfig

name | type | default | description | required
-- | -- | -- | -- | --
copySuccessText | String | - | \- | N
copyText | String | - | \- | N

### MessageConfig

name | type | default | description | required
-- | -- | -- | -- | --
`MessageOptions` | \- | - | extends `MessageOptions` | N

### ImageConfig

name | type | default | description | required
-- | -- | -- | -- | --
errorText | String | - | loading text, default value is "Error" | N
loadingText | String | - | loading text, default value is "loading" | N
replaceImageSrc | Function | - | replace all `src` attribute of images。Typescript：`(params: ImageProps) => string`，[Image API Documents](./image?tab=api)。[see more ts definition](https://github.com/Tencent/tdesign-vue/tree/develop/src/config-provider/type.ts) | N

### ImageViewerConfig

name | type | default | description | required
-- | -- | -- | -- | --
errorText | String | - | \- | N
mirrorTipText | String | - | mirror operation text | N
originalSizeTipText | String | - | original size tips | N
rotateTipText | String | - | rotate operation text | N

### GuideConfig

name | type | default | description | required
-- | -- | -- | -- | --
finishButtonProps | Object | - | finish button in last step. `{ content: 'Finish', theme: 'primary' }`。Typescript：`ButtonProps` | N
nextButtonProps | Object | - | next step button. `{ content: 'Next Button', theme: 'primary' }`。Typescript：`ButtonProps` | N
prevButtonProps | Object | - | previous step button. `{ content: 'Previous Step', theme: 'default' }`。Typescript：`ButtonProps` | N
skipButtonProps | Object | - | skip button. `{ content: 'Skip', theme: 'default' }`。Typescript：`ButtonProps` | N
