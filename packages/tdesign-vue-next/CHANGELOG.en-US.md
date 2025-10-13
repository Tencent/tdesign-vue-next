---
title: Changelog
spline: explain
toc: false
docClass: timeline
---

## 🌈 1.17.1 `2025-10-09` 

### 🐞 Bug Fixes
- `Descriptions`: Fix margin issue in borderless mode @liweijie0812 ([#6043](https://github.com/Tencent/tdesign-vue-next/pull/6043))
- `Watermark`: Fix build error in SSR scenario for version `1.17.0` @Wesley-0808  ([#6047](https://github.com/Tencent/tdesign-vue-next/pull/6047))
- `Calendar`: Fix the issue where month options after the end month were not properly disabled when the calendar range value is set within the same year @shumuuu ([#6045](https://github.com/Tencent/tdesign-vue-next/pull/6045))


## 🌈 1.17.0 `2025-09-25` 

### 🚀 Features
- `Watermark`: Add `layout` API to support generating watermarks with different layouts @Wesley-0808 ([#5991](https://github.com/Tencent/tdesign-vue-next/pull/5991))
- `Icon`: 
  - `tdesign-icons-vue-next` released version `0.4.x`, adding `align-bottom`, `no-result`, `no-result-filled`, `tree-list`, `wifi-no`, `wifi-no-filled`, `logo-stackblitz-filled`, `logo-stackblitz`, `logo-wecom-filled` icons; removed `video-camera-3`, `video-camera-3-filled`, `list` icons, please note this change if you previously depended on the removed icons when upgrading ⚠️ @uyarn ([#5968](https://github.com/Tencent/tdesign-vue-next/pull/5968))
  - Icon resources used in on-demand loading now support variable stroke width functionality, configured via `strokeWidth` property, please refer to documentation and examples for specific usage @uyarn ([#5968](https://github.com/Tencent/tdesign-vue-next/pull/5968))
  - Icon resources used in on-demand loading now support multi-color fill functionality, configured via `strokeColor` and `fillColor` properties, please refer to documentation and examples for specific usage @uyarn ([#5968](https://github.com/Tencent/tdesign-vue-next/pull/5968))
- `ImageViewer`: Add default trigger rendering, which defaults to using the current image as the default trigger, reducing component usage difficulty, please refer to related example changes @EthanShen10086 ([#5935](https://github.com/Tencent/tdesign-vue-next/pull/5935))
- `Notification`: Add `onClose` event for handling callback scenarios related to calling `NotifyPlugin.close()` @baozjj ([#5958](https://github.com/Tencent/tdesign-vue-next/pull/5958))
- `Tabs`: When dragging to a `draggable = false` area, the droppable state will not be displayed @RSS1102 ([#5990](https://github.com/Tencent/tdesign-vue-next/pull/5990))

### 🐞 Bug Fixes
- `Form`: Fix the issue where validation rules incorrectly trigger on multi-level name corresponding FormItems @uyarn ([#6022](https://github.com/Tencent/tdesign-vue-next/pull/6022))
- `ImageViewer`: Add image index parameter to trigger method, please refer to examples for specific usage @betavs ([#6016](https://github.com/Tencent/tdesign-vue-next/pull/6016))
- `Notification`: Fix the issue where calling `NotifyPlugin.close()` incorrectly triggers `onCloseBtnClick` callback @baozjj ([#5958](https://github.com/Tencent/tdesign-vue-next/pull/5958))
- `QRCode`: Fix the issue where component cannot render when initial value is empty @Wesley-0808 ([#5982](https://github.com/Tencent/tdesign-vue-next/pull/5982))
- `Skeleton`: Fix incorrect behavior of extra rendering `theme` default configuration when using `rowCol` @uyarn ([#6009](https://github.com/Tencent/tdesign-vue-next/pull/6009))
- `Textarea`: Fix the issue where setting `autosize` does not fully auto-expand height when content is too long, resulting in a scrollbar @engvuchen ([#6019](https://github.com/Tencent/tdesign-vue-next/pull/6019))
- `Tree`: Fix the issue where custom icons are all set to open state, causing incorrect icon colors @RylanBot  ([#5993](https://github.com/Tencent/tdesign-vue-next/pull/5993))
- `TreeSelect`: 
  - Fix the issue where prefix icons of expanded state nodes are not displayed properly in filter scenarios @uyarn ([#6025](https://github.com/Tencent/tdesign-vue-next/pull/6025))
  - Fix the issue where expanded state triggers unnecessary updates after selecting nodes @uyarn ([#6025](https://github.com/Tencent/tdesign-vue-next/pull/6025))
- `Typography`: 
  - Fix the issue where custom copy content is invalid @Wesley-0808 ([#5977](https://github.com/Tencent/tdesign-vue-next/pull/5977))
  - Fix the issue where defined `mark` color is incorrectly applied to text color @Wesley-0808 ([#5705](https://github.com/Tencent/tdesign-vue-next/pull/5705))
- `Watermark`: Fix the issue where when a multi-line image-text watermark image is configured with grayscale, the entire canvas content also becomes grayscale @Wesley-0808 ([#5991](https://github.com/Tencent/tdesign-vue-next/pull/5991))
- `FakeArrow`: Fix the issue with incorrect `overlayStyle` type definition @haozang54-source ([#5971](https://github.com/Tencent/tdesign-vue-next/pull/5971))

## 🌈 1.16.1 `2025-09-01` 

### 🐞 Bug Fixes
- `Tabs`: Fix console error when removing options after adding `TabPanel` onRemove event in version `1.16.0` @uyarn ([#5955](https://github.com/Tencent/tdesign-vue-next/pull/5955))


## 🌈 1.16.0 `2025-08-28` 

### 🚀 Features
- Add `--td-text-color-watermark` variable for scenarios requiring transparency such as watermarks @uyarn  ([#5932](https://github.com/Tencent/tdesign-vue-next/pull/5932))
- `Skeleton`: Fix the issue where `theme` default value does not match documentation description, `paragraph` effect needs to be manually set after upgrade `theme` ⚠️ @liweijie0812 ([#5872](https://github.com/Tencent/tdesign-vue-next/pull/5872))
- `TabPanel`: Add `remove` event to facilitate independent Panel handling of related logic after removal @RSS1102 ([#5853](https://github.com/Tencent/tdesign-vue-next/pull/5853))
- `Table`: Add feature to reset scrollbar to top after switching pagination @RSS1102 ([#5885](https://github.com/Tencent/tdesign-vue-next/pull/5885))
- `Tabs`: Move remove event from delete icon to outer container to ensure icon replacement functionality works properly, please note this change if you override delete icon style ⚠️ @RSS1102 ([#5853](https://github.com/Tencent/tdesign-vue-next/pull/5853))

### 🐞 Bug Fixes
- `DateRangePicker`: 
  - Fix abnormal `disableTime` functionality issue @uyarn ([#5940](https://github.com/Tencent/tdesign-vue-next/pull/5940))
  - Fix the issue where `disableDate` function usage return parameter callback does not match documentation, please note this change if you previously based on incorrect parameters ⚠️ @uyarn ([#5940](https://github.com/Tencent/tdesign-vue-next/pull/5940))
- `Select`: Fix warning issue with `tips` API slot usage @Kalinrun ([#5910](https://github.com/Tencent/tdesign-vue-next/pull/5910))
- `Skeleton`: Fix skeleton animation `animation-delay` property default value issue @anlyyao ([common#2248](https://github.com/Tencent/tdesign-common/pull/2248))
- `Transfer`: Fix the issue where passing function array to `operation` renders incorrectly @RSS1102 ([#5794](https://github.com/Tencent/tdesign-vue-next/pull/5794))
- `Tree`: Fix abnormality where tree node `draggable` still takes effect in disabled state @RylanBot ([#5914](https://github.com/Tencent/tdesign-vue-next/pull/5914))
- `Watermark`: Fix watermark component issues with content coverage due to opacity and usage in SSR scenarios @uyarn  ([#5932](https://github.com/Tencent/tdesign-vue-next/pull/5932))


## 🌈 1.15.5 `2025-08-18` 

### 🐞 Bug Fixes
- `DatePicker`: Fix incorrect year in date range selection panel in version `1.15.3` @uyarn ([#5901](https://github.com/Tencent/tdesign-vue-next/pull/5901))
- `InputNumber`: Fix abnormal display issue after version `1.15.3` when setting `allowInputOverLimit` to false without setting minimum value @YuShengHou ([#5898](https://github.com/Tencent/tdesign-vue-next/pull/5898))


## 🌈 1.15.4 `2025-08-15` 

### 🐞 Bug Fixes
- `Textarea`: Fix the issue where `allowInputOverMax` does not take effect under `maxcharacter` configuration @RSS1102 ([#5888](https://github.com/Tencent/tdesign-vue-next/pull/5888))


## 🌈 1.15.3 `2025-08-14` 

### 🚀 Features
- `Card`: Add `headerClassName`, `headerStyle`, `bodyClassName`, `bodyStyle`, `footerClassName`, `footerStyle` for customizing styles of each part of the card component @An0510 ([#5867](https://github.com/Tencent/tdesign-vue-next/pull/5867))
- `InputNumber`: When value is undefined or null and `allowInputOverLimit` is false, it needs to be reset to minimum value @dhj-l ([#5881](https://github.com/Tencent/tdesign-vue-next/pull/5881))

### 🐞 Bug Fixes
- `Cascader`: Fix abnormal display defect when mouse moves into dropdown panel in filterable scenario @byrdkm17 ([#5866](https://github.com/Tencent/tdesign-vue-next/pull/5866))
- `ColorPicker`: Fix the issue where `popupProps.onVisibleChange` callback function does not execute @RylanBot ([#5839](https://github.com/Tencent/tdesign-vue-next/pull/5839))
- `DatePicker`: Optimize panel content display effect after selecting the same panel year in year selection mode @uyarn ([#5882](https://github.com/Tencent/tdesign-vue-next/pull/5882))
- `Input`: Fix the issue where Enter key triggers `onEnter` event when Chinese input method is active @dhj-l ([#5862](https://github.com/Tencent/tdesign-vue-next/pull/5862))
- `QRCode`: Fix the issue where QR code does not refresh when `value` changes with `type='svg'` @RSS1102 ([#5864](https://github.com/Tencent/tdesign-vue-next/pull/5864))
- `Select`: Fix console warning about `size` property in version `1.15.2` @RSS1102 ([#5844](https://github.com/Tencent/tdesign-vue-next/pull/5844))
- `SelectInput`: Fix component flickering issue when deleting tags @novlan1 ([#5868](https://github.com/Tencent/tdesign-vue-next/pull/5868))
- `Typography`: Fix the issue where Title component cannot use `class` @Wesley-0808 ([#5842](https://github.com/Tencent/tdesign-vue-next/pull/5842))
- `Checkbox`: Fix the issue where `onClick` event triggers twice after clicking @RSS1102 ([#5825](https://github.com/Tencent/tdesign-vue-next/pull/5825))

### 📈 Performance
- `Statistic`: Change `color` property type to string to support any color value supported by [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) @RSS1102 ([#5843](https://github.com/Tencent/tdesign-vue-next/pull/5843))

### 📝 Documentation
- `Table`: Improve `scrollToElement` function parameter description @YuShengHou ([#5870](https://github.com/Tencent/tdesign-vue-next/pull/5870))


## 🌈 1.15.2 `2025-07-31` 

### 🚀 Features
- `DateRangePicker`: Support `needConfirm` API @uyarn ([#5795](https://github.com/Tencent/tdesign-vue-next/pull/5795))

### 🐞 Bug Fixes
- `ColorPicker`:
  - Fix abnormal functionality issue when setting `swatch-colors` value to `null` @betavs ([#5793](https://github.com/Tencent/tdesign-vue-next/pull/5793))
  - Reduce multiple conversions of colors across color spaces to reduce errors @RylanBot ([#5814](https://github.com/Tencent/tdesign-vue-next/pull/5814))
- `Menu`: Fix the issue where top menu cannot highlight properly when subcomponents exist with multiple layers of encapsulation in `expandType=popup` mode @uyarn ([#5821](https://github.com/Tencent/tdesign-vue-next/pull/5821))
- `PopConfirm`: Fix the issue where popup does not close when clicking outside area when initial `visible` is true @RSS1102 ([#5790](https://github.com/Tencent/tdesign-vue-next/pull/5790))
- `Popup`: Fix the issue where popup does not close when clicking outside area when initial `visible` is true @RSS1102 ([#5790](https://github.com/Tencent/tdesign-vue-next/pull/5790))
- `Select`: Fix error where multiple selection options can still be deleted when Form is set to disabled or readonly @An0510 ([#5775](https://github.com/Tencent/tdesign-vue-next/pull/5775))
- `DatePicker`: Fix the issue where highlight still shows when switching years in single week mode @baozjj ([#5812](https://github.com/Tencent/tdesign-vue-next/pull/5812))
- `Descriptions`: Fix abnormal left and right padding issue in borderless mode @liweijie0812 ([common#2219](https://github.com/Tencent/tdesign-common/pull/2219))
- `Select`: Incorrectly deleting non-existent tags in options @RSS1102 ([#5781](https://github.com/Tencent/tdesign-vue-next/pull/5781))
- `Table`: 
    - Fix the issue where pressing `A` key triggers select all in non-multiple selection mode @liweijie0812 ([#5809](https://github.com/Tencent/tdesign-vue-next/pull/5809))
    - Fix the issue where column border line causes column name content to move when `resizable` is enabled @QuentinHsu ([common#2224](https://github.com/Tencent/tdesign-common/pull/2224))
- `Watermark`: Fix the issue where text watermark content is not clearly displayed in dark mode @liweijie0812 ([#5782](https://github.com/Tencent/tdesign-vue-next/pull/5782))


## 🌈 1.15.1 `2025-07-18` 

### 🚀 Features
- `QRCode`: Add editor code hints @liweijie0812 ([#5758](https://github.com/Tencent/tdesign-vue-next/pull/5758))



## 🌈 1.15.0 `2025-07-17` 

### 🚀 Features
- `QRCode`: Add `QRCode` QR code component, import on-demand through `unplugin` plugin, install `@tdesign-vue-next/auto-import-resolver`, change import `TDesignResolver` to `import { TDesignResolver } from '@tdesign-vue-next/auto-import-resolver';` @Wesley-0808 ([#5719](https://github.com/Tencent/tdesign-vue-next/pull/5719))

- `Variables`: `--td-font-size-title-large` adjusted from `20px` to `18px`, add `--td-font-size-title-extraLarge` variable with value `20px`, please note this change if you previously used this variable ⚠️ @uyarn  ([#5752](https://github.com/Tencent/tdesign-vue-next/pull/5752))
- `SelectInput`: Support using input functionality in single selection mode in conjunction with custom display content `valueDisplay`, this functionality is also supported by components such as `Select`, `TreeSelect`, `Cascader`; this functionality may affect scenarios using `valueDisplay` in single selection mode, please note this change when upgrading ⚠️ @uyarn ([#5751](https://github.com/Tencent/tdesign-vue-next/pull/5751))
- `Helper`: Fix the issue of missing `SwiperItem` type and related hints in code hints, while updating component API related information @liweijie0812 ([#5722](https://github.com/Tencent/tdesign-vue-next/pull/5722))
- `Locale`: Support proper display of singular/plural scenarios in English version of built-in multi-language @YunYouJun ([#5680](https://github.com/Tencent/tdesign-vue-next/pull/5680))
- `PaginationMini`: Optimize prompt text display @baozjj ([#5670](https://github.com/Tencent/tdesign-vue-next/pull/5670))
- `Upload`: Add `trigger` API for upload image style to customize content that triggers upload @D-xuanmo ([#5678](https://github.com/Tencent/tdesign-vue-next/pull/5678))

### 🐞 Bug Fixes
- `Cascader`: Optimize the issue where clicking on part of non-leaf node options incorrectly triggers selection @uyarn ([#5748](https://github.com/Tencent/tdesign-vue-next/pull/5748))
- `Checkbox`: Fix functionality issue of select all in readonly or disabled options that are already selected @uyarn ([#5749](https://github.com/Tencent/tdesign-vue-next/pull/5749))
- `DatePicker`: Handle abnormal tag deletion in week and quarter modes in multiple selection scenarios @betavs ([#5732](https://github.com/Tencent/tdesign-vue-next/pull/5732))
- `DateRangePickerPanel`: Fix the issue where `onCellClick` returns incorrect value when initially empty @Kyle-Alpha  ([#5681](https://github.com/Tencent/tdesign-vue-next/pull/5681))
- `DrawerPlugin`: Fix return value type @Cat1007 ([#5679](https://github.com/Tencent/tdesign-vue-next/pull/5679))
- `Input`: Optimize the issue where `prefixIcon` does not follow changes in different sizes @uyarn  ([#5752](https://github.com/Tencent/tdesign-vue-next/pull/5752))
- `InputAdornment`: Fix the issue where passing through native properties is invalid @cfool ([#5726](https://github.com/Tencent/tdesign-vue-next/pull/5726))
- `Loading`: Fix the issue of incorrect icon position in WeChat on `iPadOS` @Nero978  ([#5717](https://github.com/Tencent/tdesign-vue-next/pull/5717))
- `Upload`: Enhance support for `.jpg` file type @QuentinHsu  ([#5754](https://github.com/Tencent/tdesign-vue-next/pull/5754))


## 🌈 1.14.2 `2025-06-30` 

### 🐞 Bug Fixes
- `Alert`: Optimize the issue where unfiltered comment nodes lead to misjudgment of collapse button after enabling `max-line` @baozjj ([#5650](https://github.com/Tencent/tdesign-vue-next/pull/5650))
- `Button`: Fix the issue where `form` property does not take effect @uyarn ([#5676](https://github.com/Tencent/tdesign-vue-next/pull/5676))
- `Message`: Fix the issue where message instance is repeatedly created due to createVNode replacing createApp after `1.14.0`, causing `closeAll` functionality abnormality @baozjj ([#5669](https://github.com/Tencent/tdesign-vue-next/pull/5669))

###  📝 Documentation
- `Theme Generator`: Fix the issue where site box-shadow display is abnormal in dark mode due to theme generator influence @liweijie0812


## 🌈 1.14.1 `2025-06-27` 

### 🐞 Bug Fixes
- `Select`: 
  - Fix abnormal placeholder display issue when current selected items do not exist in options in multiple selection remote search scenario @uyarn ([#5660](https://github.com/Tencent/tdesign-vue-next/pull/5660))
  - Fix abnormal delete option functionality issue when current selected items do not exist in options in multiple selection remote search scenario @uyarn ([#5660](https://github.com/Tencent/tdesign-vue-next/pull/5660))


## 🌈 1.14.0 `2025-06-26` 

### 🚀 Features
- `Alert`: Add `closeBtn` API to be consistent with other components, `close` will be deprecated in future versions, please adjust to use `closeBtn` as soon as possible @ngyyuusora ([#5621](https://github.com/Tencent/tdesign-vue-next/pull/5621))
- `DialogPlugin`: Add support for appContext binding and passing, for supporting scenarios using router or global directives in plugin scenarios @Cat1007 ([#5559](https://github.com/Tencent/tdesign-vue-next/pull/5559))
- `DrawerPlugin`: Add support for appContext binding and passing, for supporting scenarios using router or global directives in plugin scenarios @Cat1007 ([#5559](https://github.com/Tencent/tdesign-vue-next/pull/5559))
- `LoadingPlugin`: Add support for appContext binding and passing, for supporting scenarios using router or global directives in plugin scenarios @Cat1007 ([#5559](https://github.com/Tencent/tdesign-vue-next/pull/5559))
- `MessagePlugin`: Add support for appContext binding and passing, for supporting scenarios using router or global directives in plugin scenarios @Cat1007 ([#5559](https://github.com/Tencent/tdesign-vue-next/pull/5559))
- `NotificationPlugin`: Add support for appContext binding and passing, for supporting scenarios using router or global directives in plugin scenarios @Cat1007 ([#5559](https://github.com/Tencent/tdesign-vue-next/pull/5559))
- `Popup`: Optimize the issue where floating layer arrow does not follow floating layer offset when space is insufficient, resulting in inaccurate arrow position @Cat1007 ([#5038](https://github.com/Tencent/tdesign-vue-next/pull/5038))
- `Select`: In remote search scenarios, support directly using `valueType=value` scenario to retain selected option data for display, please refer to example code for details @RSS1102 ([#5638](https://github.com/Tencent/tdesign-vue-next/pull/5638))
- `Tree`: 
  - Add hover prompt for each node in multiple selection scenario, consistent with single selection scenario @RSS1102 ([#5632](https://github.com/Tencent/tdesign-vue-next/pull/5632))
  - Fix the issue where clicking the expand button of an option incorrectly triggers `onClick` event, please note this change if you previously implemented related functionality based on this abnormal logic ⚠️ @Soya-xy ([#5512](https://github.com/Tencent/tdesign-vue-next/pull/5512))

### 🐞 Bug Fixes
- `Cascader`: Fix the issue where component reports error internally when `valueType="full"` and value is undefined @liweijie0812 ([#5581](https://github.com/Tencent/tdesign-vue-next/pull/5581))
- `ColorPicker`: Fix incorrect positioning issue when clicking slider to add color point in gradient mode @betavs ([#5565](https://github.com/Tencent/tdesign-vue-next/pull/5565))
- `DialogPlugin`: Fix abnormal behavior of plugin usage `destroyOnClose` @Cat1007 ([#5559](https://github.com/Tencent/tdesign-vue-next/pull/5559))
- `DrawerPlugin`: Fix abnormal behavior of plugin usage `destroyOnClose` @Cat1007 ([#5559](https://github.com/Tencent/tdesign-vue-next/pull/5559))
- `Form`: Fix the issue where `id` property does not take effect @zhangpaopao0609 ([#5640](https://github.com/Tencent/tdesign-vue-next/pull/5640))
- `Popup`: Fix the abnormality where `triggerElement` cannot be used normally for element selectors when it is a string type @uyarn ([#5651](https://github.com/Tencent/tdesign-vue-next/pull/5651))
- `Select`: Add `selectInputProps` to pass through multiple selection properties to `valueDisplay` @RSS1102 ([#5594](https://github.com/Tencent/tdesign-vue-next/pull/5594))
- `Textarea`: Optimize scrollbar style issue @RSS1102 ([#5647](https://github.com/Tencent/tdesign-vue-next/pull/5647))
- `TimeRangePicker`: Fix the issue where clicking panel confirm button does not reset invalid format input @QuentinHsu ([#5622](https://github.com/Tencent/tdesign-vue-next/pull/5622))

### 📝 Documentation
- `Alert`: Optimize Alert demo interaction, display "Show Alert" button after closing to restore display @baozjj ([#5646](https://github.com/Tencent/tdesign-vue-next/pull/5646))


## 🌈 1.13.2 `2025-06-04` 

### 🐞 Bug Fixes
- `ColorPicker`: Fix the issue where `onChange` and `onRecentChange` callbacks are ineffective @RylanBot ([#5545](https://github.com/Tencent/tdesign-vue-next/pull/5545))
- `Input`: Fix the issue where input box loses reactivity after actively losing focus in `composition` method @QuentinHsu ([#5538](https://github.com/Tencent/tdesign-vue-next/pull/5538))
- `InputNumber`: Fix display difference issue caused by rounding after enabling `decimalPlaces` @QuentinHsu ([#5522](https://github.com/Tencent/tdesign-vue-next/pull/5522))
- `Select`: Fix the issue where values that do not exist in options cannot be displayed properly in multiple selection scenario in version `1.13.1` @RSS1102 ([#5553](https://github.com/Tencent/tdesign-vue-next/pull/5553))
- `Table`: Optimize the issue where selected column data is inconsistent with displayed column data when closing column configuration popup @RSS1102 ([#5546](https://github.com/Tencent/tdesign-vue-next/pull/5546))

### 🚧 Others
- `Drawer`: Fix the issue where `cancelBtn` and `confirmBtn` types are missing `null` type declaration @RSS1102 ([#5555](https://github.com/Tencent/tdesign-vue-next/pull/5555))


## 🌈 1.13.1 `2025-05-29` 

### 🚀 Features
- `ConfigProvider`: `FormConfig` adds `requiredMarkPosition` for global configuration of `requiredMark` position @Wesley-0808 ([#5510](https://github.com/Tencent/tdesign-vue-next/pull/5510))
- `Progress`: When `theme=plump`, when the progress bar fill area size is large enough to accommodate percentage content, the content will automatically be displayed in the progress bar fill area, otherwise it will be displayed to the right of the progress bar fill area, please refer to documentation examples for specific presentation @RSS1102 @Soya-xy ([#5460](https://github.com/Tencent/tdesign-vue-next/pull/5460))
- `Select`: `valueDisplay` parameter `value` returns complete option content for scenarios using other parameters for display customization @RSS1102 ([#5509](https://github.com/Tencent/tdesign-vue-next/pull/5509))

### 🐞 Bug Fixes
- `Dropdown`: Fix display issue with extra margin in default dropdown menu style @QuentinHsu  ([common#2151](https://github.com/Tencent/tdesign-common/pull/2151)) 
- `Progress`: Fix abnormality where default `label` cannot be displayed properly after declaring `label` parameter @Soya-xy @l123wx  ([#5507](https://github.com/Tencent/tdesign-vue-next/pull/5507))  ([#5517](https://github.com/Tencent/tdesign-vue-next/pull/5517))
- `Select`: Fix defect where non-selectable options that are already in selected items can still be deleted through tag button and keyboard in multiple selection mode @Wesley-0808 ([#5488](https://github.com/Tencent/tdesign-vue-next/pull/5488))
- `Transfer`: Optimize component error issue in dynamic data loading scenarios @Wesley-0808 ([#5475](https://github.com/Tencent/tdesign-vue-next/pull/5475))
- `MessagePlugin`: Fix the issue where new `message` cannot be displayed after the node where `attach` is located is cleared in plugin invocation scenario @MrElvin ([#5477](https://github.com/Tencent/tdesign-vue-next/pull/5477))

### 🚧 Others
- Globally handle the issue where APIs that simultaneously exist in `Boolean` and `Slot` methods cannot display default rendering nodes properly after declaring API @Soya-xy ([#5507](https://github.com/Tencent/tdesign-vue-next/pull/5507))
- Optimize slot method judgment to be compatible with more component types @uyarn ([#5521](https://github.com/Tencent/tdesign-vue-next/pull/5521))


## 🌈 1.13.0 `2025-05-14` 

### 🚀 Features
- `ColorPicker`: @RylanBot ([#5319](https://github.com/Tencent/tdesign-vue-next/pull/5319)) Please note this change if using gradient mode ⚠️
  - Automatically switch between solid color and gradient mode based on color values from「trigger / recent colors / preset colors」
  - When only gradient mode is enabled, filter non-gradient color values in「preset colors / current color」
  - Add format `HEX8`, remove `HSB`
- `Dialog`: Add `lazy` API, when this configuration is enabled, Dialog will not be rendered directly by default, for lazy loading scenarios, please note this change if you previously depended on `destroyOnClose` to implement initialization without loading ⚠️ @RSS1102 ([#5307](https://github.com/Tencent/tdesign-vue-next/pull/5307))
- `Drawer`: Add `lazy` API, when this configuration is enabled, Drawer will not be rendered directly by default, for lazy loading scenarios @RSS1102, please note this change if you previously depended on `destroyOnClose` to implement initialization without loading ⚠️ ([#5375](https://github.com/Tencent/tdesign-vue-next/pull/5375))
- `TagInput`: Optimize mouse cursor to display as move style in draggable position adjustment state @liweijie0812 ([#5424](https://github.com/Tencent/tdesign-vue-next/pull/5424))
- `TimePicker`: Add `onConfirm` and `onClear` callback methods @Wesley-0808 ([#5349](https://github.com/Tencent/tdesign-vue-next/pull/5349))

### 🐞 Bug Fixes
- `Breadcrumb`: Fix reactivity and console warning issues caused by version `1.12.0` changes @Wesley-0808 ([#5414](https://github.com/Tencent/tdesign-vue-next/pull/5414))
- `Cascader`: 
  - Fix the issue where dropdown panel has default margin @reallimengzhe  ([#5427](https://github.com/Tencent/tdesign-vue-next/pull/5427))
  - Fix abnormal display issue when options contain extra-long text in different sizes @Shabi-x @uyarn ([#5373](https://github.com/Tencent/tdesign-vue-next/pull/5373))
- `ColorPicker`: @RylanBot
  - Fix abnormal functionality issue when adding recently used colors ([#5428](https://github.com/Tencent/tdesign-vue-next/pull/5428))
  - Abnormal return value formatting when transparency channel is enabled ([#5319](https://github.com/Tencent/tdesign-vue-next/pull/5319))
- `Comment`: Slot content renders incorrectly @QuentinHsu ([#5446](https://github.com/Tencent/tdesign-vue-next/pull/5446))
- `DatePicker`: Fix the issue where `label` slot is invalid @RSS1102 ([#5393](https://github.com/Tencent/tdesign-vue-next/pull/5393))
- `DateRangePicker`: Fix the issue of missing `readonly` type definition @Wesley-0808 ([#5430](https://github.com/Tencent/tdesign-vue-next/pull/5430))
- `Drawer`: Fix the issue where `DrawerPlugin` returns incorrect instance type @Wesley-0808 ([#5444](https://github.com/Tencent/tdesign-vue-next/pull/5444))
- `RadioGroup`: @betavs ([#5417](https://github.com/Tencent/tdesign-vue-next/pull/5417))
  - Fix the issue where incorrect timing of preventing default behavior prevents proper space input 
  - Fix the issue where `onChange` event is repeatedly triggered during keyboard operation
- `Select`: Fix the issue where selection binding value is incorrect when `valueType` is `object` and set simultaneously with `keys` @morningbao ([#5374](https://github.com/Tencent/tdesign-vue-next/pull/5374))
- `Space`: 
  - Fix the issue where styles are incorrectly applied in nested component scenarios @RylanBot ([#5418](https://github.com/Tencent/tdesign-vue-next/pull/5418))
  - Fix the issue where `fragment` virtual node is not expanded @QuentinHsu ([#5388](https://github.com/Tencent/tdesign-vue-next/pull/5388))
  - Fix the issue where `Teleport` structure is unexpectedly rendered as `SpaceItem` node, causing extra spacing occupation @QuentinHsu ([#5388](https://github.com/Tencent/tdesign-vue-next/pull/5388))
- `Tag`: Fix the issue where `title` property is not rendered when `max-width` is not set @betavs ([#5413](https://github.com/Tencent/tdesign-vue-next/pull/5413))
- `Textarea`: Fix incorrect initial height calculation issue in `autosize` mode @RSS1102 ([#5451](https://github.com/Tencent/tdesign-vue-next/pull/5451))
- `Keyboard`: Fix popup closing conflict issue when using `ESC` key to close popups in combined usage scenarios of `Dialog`, `Drawer` or `other popup components` @Wesley-0808 ([#5143](https://github.com/Tencent/tdesign-vue-next/pull/5143))

### 🚧 Others
- `TagInput`: Optimize `TagInput` logic for handling empty values @yuhengshen ([#5357](https://github.com/Tencent/tdesign-vue-next/pull/5357))


## 🌈 1.12.0 `2025-04-24`
### 🚀 Features
- `Breadcrumb`: Add `ellipsis`, `maxItems`, `itemsAfterCollapse`, `itemsBeforeCollapse` related APIs for collapsed breadcrumb scenarios, please refer to documentation examples for specific usage @Wesley-0808 ([#5261](https://github.com/Tencent/tdesign-vue-next/pull/5261))
- `ColorPicker`: Add `onClear` clear button event callback @mikasayw ([#5109](https://github.com/Tencent/tdesign-vue-next/pull/5109))
- `DatePicker`: Add `readonly` property for readonly configuration @mikasayw ([#5293](https://github.com/Tencent/tdesign-vue-next/pull/5293))
- `Drawer`: 
  - Add `DrawerPlugin`, support`plugin function-style`invocation @Wesley-0808 ([#5067](https://github.com/Tencent/tdesign-vue-next/pull/5067))
  - Add `drawerClassName` API for defining drawer's own related class names @Wesley-0808 ([#5067](https://github.com/Tencent/tdesign-vue-next/pull/5067))
- `Form`: Add `requiredMarkPosition` to define the position of required symbols @Wesley-0808 ([#5223](https://github.com/Tencent/tdesign-vue-next/pull/5223))
- `Icon`: Add `logo-miniprogram` mini program, `logo-cnb` cloud native build, `seal` seal, `quote` quote and other icons @taowensheng1997 @uyarn @RADWIMPS426 ([#5355](https://github.com/Tencent/tdesign-vue-next/pull/5355))
- `Select`: Trigger `remove` event callback when unchecking selected items in panel @QuentinHsu ([#5333](https://github.com/Tencent/tdesign-vue-next/pull/5333))
- `Swiper`: Add `cardScale` to support custom scaling ratio in card mode @joinmouse ([#5272](https://github.com/Tencent/tdesign-vue-next/pull/5272))
- `Upload`: Support custom error text in `image-flow` mode @ngyyuusora ([#5326](https://github.com/Tencent/tdesign-vue-next/pull/5326))

### 🐞 Bug Fixes
- `ColorPicker`: Fix the issue where color switching is invalid @mikasayw ([#5282](https://github.com/Tencent/tdesign-vue-next/pull/5282))
- `Drawer`: Optimize the issue where Drawer page content is selected during drag resizing process @joinmouse ([#5233](https://github.com/Tencent/tdesign-vue-next/pull/5233))
- `DatePicker`: Fix the issue where `clearable` still takes effect when `readonly` is `true` @xiaojueshi ([#5303](https://github.com/Tencent/tdesign-vue-next/pull/5303)) ([#5305](https://github.com/Tencent/tdesign-vue-next/pull/5305))
- `InputNumber`:
  - Fix the issue of repeated rendering of `tips` slot @mikasayw ([#5286](https://github.com/Tencent/tdesign-vue-next/pull/5286))
  - Optimize boundary issues of number input box @Sight-wcg([#5358](https://github.com/Tencent/tdesign-vue-next/pull/5358))
- `Menu`: Fix the issue where `menu-item`'s `onClick` event triggers twice @RSS1102 ([#5235](https://github.com/Tencent/tdesign-vue-next/pull/5235))
- `Select`: 
  - Fix the issue where `tips` slot is invalid @liweijie0812 ([#5250](https://github.com/Tencent/tdesign-vue-next/pull/5250))
  - Fix abnormal effect issue when `check-all` is an empty string @betavs ([#5221](https://github.com/Tencent/tdesign-vue-next/pull/5221))
  - Fix abnormal option display issue when `label` is not set in version `1.11.x` @RSS1102 ([#5257](https://github.com/Tencent/tdesign-vue-next/pull/5257))
  - Fix the issue where `onEnter` callback parameter is lost in multiple selection scenario, while maintaining consistent enter interaction logic for multiple and single selection @uyarn ([#5361](https://github.com/Tencent/tdesign-vue-next/pull/5361))
  - Fix the issue where `keys` property configuration does not take effect when `content` is used as value @hello-ishine ([#5199](https://github.com/Tencent/tdesign-vue-next/pull/5199))
- `Table`:
  - Fix the issue where select all current page data is not correctly returned when `reserveSelectedRowOnPaginate` is `false` @RSS1102 ([#5248](https://github.com/Tencent/tdesign-vue-next/pull/5248))
  - Fix abnormal row selection behavior caused by unconfigured `checkProps` in column @uyarn ([#5362](https://github.com/Tencent/tdesign-vue-next/pull/5362))
- `Select`: Fix the issue where select all option cannot be selected through keyboard operation in multiple selection scenario @uyarn ([#5361](https://github.com/Tencent/tdesign-vue-next/pull/5361))
- `Swiper`: Optimize default container height to avoid abnormal navigator position issue @uyarn ([#5278](https://github.com/Tencent/tdesign-vue-next/pull/5278))
- `Tabs`:
  - Optimize scenario where Tabs unload error appears when not initialized during route switching @RSS1102 ([#5359](https://github.com/Tencent/tdesign-vue-next/pull/5359))
  - Optimize sliding effect when tabs have extra-long labels @wonkzhang([#5316](https://github.com/Tencent/tdesign-vue-next/pull/5316))
- `Textarea`: Adjust focus timing to delay until component is fully rendered @RSS1102 ([#5153](https://github.com/Tencent/tdesign-vue-next/pull/5153))
- `TreeSelect`: Fix unexpected error when `valueType='object'` without initialized selected data @RSS1102 ([#5322](https://github.com/Tencent/tdesign-vue-next/pull/5322))

### 📝 Documentation
- `Swiper`: Optimize the issue of missing example styles when component jumps to sandbox demo @uyarn ([#5278](https://github.com/Tencent/tdesign-vue-next/pull/5278))
- `Dialog`: Optimize documentation content, unify content description @Wesley-0808 ([#5067](https://github.com/Tencent/tdesign-vue-next/pull/5067))


## 🌈 1.11.5 `2025-03-25` 
### 🐞 Bug Fixes
- `Table`: 
  - Fix the issue where setting `drag-sort` drag event reports error when table content is not rendered @RSS1102 ([#5224](https://github.com/Tencent/tdesign-vue-next/pull/5224))
  - Fix the issue where expanded detail content text cannot be selected in `Table` @RSS1102 ([#5224](https://github.com/Tencent/tdesign-vue-next/pull/5224))
  - Fix abnormal style issue of selectable row table in Firefox browser @uyarn([#5225](https://github.com/Tencent/tdesign-vue-next/pull/5225))
- `Menu`: Fix the issue where `string` type is missing in `to` definition in `menu-item`'s `props` @calandnong ([#5198](https://github.com/Tencent/tdesign-vue-next/pull/5198))
- `TreeSelect`: Fix missing definition issue of `panelTopContent` and `panelBottomContent` @uyarn ([#5220](https://github.com/Tencent/tdesign-vue-next/pull/5220))
- `Bundle`: Fix usage issue of `esm` product in version `1.11.0` @zhangpaopao0609 ([#5192](https://github.com/Tencent/tdesign-vue-next/pull/5192))


## 🌈 1.11.4 `2025-03-15` 

### 🚀 Features
- `Button`: Add related class names for default `shape` to facilitate related customization @Saraph1nes  ([#5187](https://github.com/Tencent/tdesign-vue-next/pull/5187))
### 🐞 Bug Fixes
- `Table` : Fix abnormal arrow position issue when floating layer is in upward state in version `1.11.3` @uyarn ([common#2088](https://github.com/Tencent/tdesign-common/pull/2088))
- `Plugin`: Fix DescriptionsItem component prompt issue in `WebStorm` @liweijie0812 ([#5182](https://github.com/Tencent/tdesign-vue-next/pull/5182))

## 🌈 1.11.3 `2025-03-13` 
### 🚀 Features
- `ConfigProvider`: Add support for internationalization configuration capability of `@tdesign-vue-next/chat` @uyarn @zydemail
 ([#5179](https://github.com/Tencent/tdesign-vue-next/pull/5179))
### 🐞 Bug Fixes
- `Dialog`: Fix the issue where `t-dialog__cancel` style is still retained when customizing `cancelBtn` text @RSS1102 ([#5157](https://github.com/Tencent/tdesign-vue-next/pull/5157))
- `Table`: Fix the issue where setting `drag-sort` drag event reports error when table content is not rendered @Wesley-0808 ([#5140](https://github.com/Tencent/tdesign-vue-next/pull/5140))
- `Select`: Fix that `filterable` does not need to be set when using `filter` @RSS1102 ([#5169](https://github.com/Tencent/tdesign-vue-next/pull/5169))
- `DatePicker`: Fix incorrect date disable range @RSS1102 ([#5119](https://github.com/Tencent/tdesign-vue-next/pull/5119))
- `ColorPicker`: Fix the issue where clicking clear button does not trigger `onChange` callback @wakisun ([#5111](https://github.com/Tencent/tdesign-vue-next/pull/5111))
- `Select`: Fix the issue where when `valueType = 'object'`, filtering data with existing selected data causes incorrect Tag display for select all. @RSS1102 ([#5167](https://github.com/Tencent/tdesign-vue-next/pull/5167))
- `DatePicker`: Fix `prefixIcon` slot warning issue @uyarn ([#5179](https://github.com/Tencent/tdesign-vue-next/pull/5179))
- `Bundle` : Fix abnormal path issue of some type files in product @zhangpaopao0609 ([#5174](https://github.com/Tencent/tdesign-vue-next/pull/5174))

## 🌈 1.11.2 `2025-03-05` 
### 🚀 Features
- `ImageViewer`: Add `imageReferrerpolicy` API, suitable for configuring Referrerpolicy scenarios @Wesley-0808 ([#5134](https://github.com/Tencent/tdesign-vue-next/pull/5134))
- `ImageViewer`: Add `onDownload` API for custom download callback @Wesley-0808 ([#5134](https://github.com/Tencent/tdesign-vue-next/pull/5134))
### 🐞 Bug Fixes
- `Dialog`: Fix the issue where `footer` content cannot be dynamically changed in version `1.11.0` @Wesley-0808 ([#5152](https://github.com/Tencent/tdesign-vue-next/pull/5152))
### 🚧 Others
- `helper`: Fix abnormal prompt issue of some components in `Webstorm` @liweijie0812 ([#5136](https://github.com/Tencent/tdesign-vue-next/pull/5136))

## 🌈 1.11.1 `2025-03-01` 
### 🐞 Bug Fixes
- `bundle`: Fix dependency error issue of `cjs` product in version `1.11.0` @uyarn ([#5116](https://github.com/Tencent/tdesign-vue-next/pull/5116))
- `List`: Fix abnormal `scrollTo` instance method issue in version `1.11.0` @uyarn ([#5117](https://github.com/Tencent/tdesign-vue-next/pull/5117))
- `Dialog`: Fix console error issue in version `1.11.0` @Wesley-0808 ([#5126](https://github.com/Tencent/tdesign-vue-next/pull/5126))
- `Table`: Fix the issue where pressing `Ctrl C` copy shortcut clears selected rows @Wesley-0808 ([#5124](https://github.com/Tencent/tdesign-vue-next/pull/5124))

## 🌈 1.11.0 `2025-02-27` 
### 🚀 Features
- `AutoComplete`: Add `empty` API for configuring dropdown content display in empty state @liweijie0812 ([#4908](https://github.com/Tencent/tdesign-vue-next/pull/4908))
- `Dialog`: Add `dialogCard` component for non-flow-removed document scenarios @Wesley-0808 ([#5002](https://github.com/Tencent/tdesign-vue-next/pull/5002))
- `Table`: Add `validateTableCellData` instance method for validating table editable cell data @Wesley-0808 ([#5105](https://github.com/Tencent/tdesign-vue-next/pull/5105))
### 🐞 Bug Fixes
- `Select`: 
  - Default search method prioritizes displaying exact match items @Cat1007 ([#5051](https://github.com/Tencent/tdesign-vue-next/pull/5051))
  - The issue where clicking clear button in multiple selection scenario repeatedly triggers `change` event @betavs ([#5092](https://github.com/Tencent/tdesign-vue-next/pull/5092))
  - Fix abnormal select all behavior when select all option exists in filterable scenario @RSS1102  @uyarn ([#5104](https://github.com/Tencent/tdesign-vue-next/pull/5104))
- `Tree`: Fix abnormal functionality issue when dynamically switching `expandAll` @RSS1102 ([#4988](https://github.com/Tencent/tdesign-vue-next/pull/4988))
- `Form`: Fix the issue where `status` property is not applied to validation state @RSS1102 ([#5008](https://github.com/Tencent/tdesign-vue-next/pull/5008))
- `Statistic`: Fix precision error issue during value animation when decimalPlaces=0 @liweijie0812 ([#5055](https://github.com/Tencent/tdesign-vue-next/pull/5055))
- `TreeSelect`: Automatically expand selected nodes on first render @RSS1102 ([#5003](https://github.com/Tencent/tdesign-vue-next/pull/5003))

### 📝 Documentation
- `docs`: `ConfigProvider` adds `globalConfig` API documentation, `Layout` subcomponent `Content` adds API documentation @liweijie0812 ([#5090](https://github.com/Tencent/tdesign-vue-next/pull/5090))
- `docs`:  Change global configuration page route to `config-provider`, consistent with other components @liweijie0812 ([#5090](https://github.com/Tencent/tdesign-vue-next/pull/5090))
### 🚧 Others
- `plugin`: Add editor prompt functionality for components such as `ConfigProvider`, `Typography` @liweijie0812 ([#5090](https://github.com/Tencent/tdesign-vue-next/pull/5090))
- `dependency`: Adjust component dependency `lodash` to `lodash-es` @zhangpaopao0609 ([#4959](https://github.com/Tencent/tdesign-vue-next/pull/4959))

## 🌈 1.10.7 `2025-01-24` 
### 🚀 Features
- `Icon`: Add `logo-alipay`, `logo-behance-filled` and other icons, modify `logo-wecom` icon, remove unreasonable `logo-wecom-filled` icon @uyarn ([#4926](https://github.com/Tencent/tdesign-vue-next/pull/4926))
- `Table`: Support `scrollToElement` method usage in non-virtual scroll scenarios @Cat1007 ([#4946](https://github.com/Tencent/tdesign-vue-next/pull/4946))
- `DatePicker`: Add `multiple` API to support multiple selection scenarios, please refer to examples for specific usage @uyarn ([#4854](https://github.com/Tencent/tdesign-vue-next/pull/4854))
### 🐞 Bug Fixes
- `Select`: 
  - Fix rendering error issue when title does not have `group` in grouping scenario @RSS1102 ([#4896](https://github.com/Tencent/tdesign-vue-next/pull/4896))
  - Fix console type error warning when `option value` is `boolean` @SaberA1ter ([#4932](https://github.com/Tencent/tdesign-vue-next/pull/4932))
  - Fix the issue where default style is missing when using `empty` API to customize empty state content @liweijie0812 ([#4909](https://github.com/Tencent/tdesign-vue-next/pull/4909))
  - Fix incorrect usage issue of select all with option `disabled` state @msg-fobbit ([#4947](https://github.com/Tencent/tdesign-vue-next/pull/4947))
- `Progress`: Fix the issue where `status` is invalid when `progress` is 100 @rofixro ([#4895](https://github.com/Tencent/tdesign-vue-next/pull/4895))
- `AutoComplete`: Fix abnormal display issue when options are empty @betavs ([#4907](https://github.com/Tencent/tdesign-vue-next/pull/4907))
- `Breadcrumb`: Fix the issue where clicking triggers both when `herf` and `to` exist simultaneously @rofixro ([#4916](https://github.com/Tencent/tdesign-vue-next/pull/4916))
- `Table`: Fix the issue where default keyboard horizontal scroll operation for wide tables is not supported @uyarn ([#4904](https://github.com/Tencent/tdesign-vue-next/pull/4904))
- `ImageViewer`: Fix flickering issue when clicking overlay to close when `closeOnOverlay` is enabled @huangchen1031 ([#4931](https://github.com/Tencent/tdesign-vue-next/pull/4931))
- `ColorPicker`: Fix the issue where `tabs` position does not follow changes when first opened in gradient mode support @natural1024 ([#4903](https://github.com/Tencent/tdesign-vue-next/pull/4903))
- `Cascader`: Fix style error issue caused by `children` length being `1` at a certain level @msg-fobbit ([#4951](https://github.com/Tencent/tdesign-vue-next/pull/4951))
- `Tabs`: Fix style issue when using slidable `Tabs` with `action` @Wesley-0808 ([#4953](https://github.com/Tencent/tdesign-vue-next/pull/4953))
- `DatePicker`: Fix the issue where week mode selection range style is missing in cross-year scenarios for date range picker @uyarn ([#4854](https://github.com/Tencent/tdesign-vue-next/pull/4854))
### 📝 Documentation
- `Loading`: Remove duplicate examples @RSS1102 ([#4949](https://github.com/Tencent/tdesign-vue-next/pull/4949))
- `Descriptions`: Add usage instructions for `labelStyle` @RSS1102 ([#4950](https://github.com/Tencent/tdesign-vue-next/pull/4950))
- `Plugin`: Update plugin prompt content @liweijie0812 ([#4892](https://github.com/Tencent/tdesign-vue-next/pull/4892))


## 🌈 1.10.6 `2024-12-31` 
### 🚀 Features
- `List`: Add `scrollTo` method to support scrolling to specified element, please refer to examples for usage @natural1024 ([#4863](https://github.com/Tencent/tdesign-vue-next/pull/4863))
- `Radio`: Add `theme` API to determine `Radio` style rendered by `options` method @myronliu347 @liweijie0812 ([#4872](https://github.com/Tencent/tdesign-vue-next/pull/4872))
### 🐞 Bug Fixes
- `Table`: 
  - Fix the issue where `isFilterValueExist` cannot properly handle `null` value causing inability to clear filters normally @HHaoWang ([#4829](https://github.com/Tencent/tdesign-vue-next/pull/4829))
  - Fix `filterIcon` not taking effect @liweijie0812 ([#4837](https://github.com/Tencent/tdesign-vue-next/pull/4837))
  - Fix abnormal functionality issue of `updateEditedCellValue` in version `1.10.0` @uyarn ([#4869](https://github.com/Tencent/tdesign-vue-next/pull/4869))
  - Fix the issue where deleted rows still exist when using `validateTableData` method for validation after row deletion operation @uyarn ([#4878](https://github.com/Tencent/tdesign-vue-next/pull/4878))
- `Cascader`: 
  - Unexpectedly triggers `change` event when `valueType` is `full` @betavs ([#4870](https://github.com/Tencent/tdesign-vue-next/pull/4870))
  - Incorrect invalid value validation logic and code optimization @betavs ([#4870](https://github.com/Tencent/tdesign-vue-next/pull/4870))
- `Dialog`: 
  - When both `header` and `closeBtn` are `false`, do not render `header dom` @chensid @ylunwang ([#4841](https://github.com/Tencent/tdesign-vue-next/pull/4841))
  - Fix missing default enabled behavior of `closeOnClickOverlay` and missing mount to `body` behavior after version `1.10.4` @uyarn ([#4877](https://github.com/Tencent/tdesign-vue-next/pull/4877))
- `Swiper`: Fix invalid modification of `current` when `autopaly=false` @liweijie0812 ([#4845](https://github.com/Tencent/tdesign-vue-next/pull/4845))
- `Upload`: Optimize upload component image display style @huangchen1031 ([#4853](https://github.com/Tencent/tdesign-vue-next/pull/4853))
- `Slider`: Slider can drag normally on mobile devices @zd5043039119 ([#4860](https://github.com/Tencent/tdesign-vue-next/pull/4860))
- `DatePicker`: Optimize date range selection panel initialization display logic, keeping right panel greater than left panel @uyarn ([#4879](https://github.com/Tencent/tdesign-vue-next/pull/4879))
- `DateRangePicker`: Fix logic error in start and end value simultaneous existence judgment @betavs ([#4868](https://github.com/Tencent/tdesign-vue-next/pull/4868))
- `Tree`: Fix the issue where defining `value` using `keys` cannot be used together with `scrollTo` @uyarn ([#4880](https://github.com/Tencent/tdesign-vue-next/pull/4880))
### 📝 Documentation
- `Tree`: Add FAQ about unique key value cannot be duplicated issue @RSS1102  @uyarn ([#4852](https://github.com/Tencent/tdesign-vue-next/pull/4852))

## 🌈 1.10.5 `2024-12-10` 
### 🚀 Features
- `TimePicker`: Support `readonly` property @RSS1102 ([#4812](https://github.com/Tencent/tdesign-vue-next/pull/4812))
- `DatePicker`: Support `readonly` property @RSS1102 ([#4790](https://github.com/Tencent/tdesign-vue-next/pull/4790))
### 🐞 Bug Fixes
- `Tabs`: 
  - Fix production version error caused by render function @Cat1007 ([#4787](https://github.com/Tencent/tdesign-vue-next/pull/4787))
  - Optimize indicator width misalignment issue under `scale` @Cat1007 ([#4786](https://github.com/Tencent/tdesign-vue-next/pull/4786))
- `Transfer`: 
  - Fix defect where tree component option disable can still be selected under select all @uyarn ([#4810](https://github.com/Tencent/tdesign-vue-next/pull/4810))
  - Fix abnormal drag sort backward movement functionality @uyarn ([#4810](https://github.com/Tencent/tdesign-vue-next/pull/4810))
- `Table`: 
  - Fix the issue where pagination component does not follow changes when setting `size` for paginable table @uyarn ([#4828](https://github.com/Tencent/tdesign-vue-next/pull/4828))
  - Fix `enhanced-table` `disableDataPage` property value passing issue @lxzlx624 ([#4781](https://github.com/Tencent/tdesign-vue-next/pull/4781))
- `Dropdown`: Example `prefixIcon` field should be adjusted to function form @Lnncoco ([#4769](https://github.com/Tencent/tdesign-vue-next/pull/4769))
- `Pagination`: Add `class` to facilitate distinguishing component state @uyarn ([#4828](https://github.com/Tencent/tdesign-vue-next/pull/4828))
- `ColorPicker`: Fix `colorMode` text internationalization @liweijie0812 ([#4778](https://github.com/Tencent/tdesign-vue-next/pull/4778))
- `Dropdown`: Console error issue when `options` is empty @betavs ([#4785](https://github.com/Tencent/tdesign-vue-next/pull/4785))
- `Drawer`: Fix the issue where `closeOnOverlayClick` property default value is `true` causing inability to set global parameters () @PengYYYYY ([#4801](https://github.com/Tencent/tdesign-vue-next/pull/4801))
- `DatePicker`: Fix the issue where `preset` selection fails when `needConfirm` is `false` @Cat1007 ([#4792](https://github.com/Tencent/tdesign-vue-next/pull/4792))
- `Input`: Fix abnormal component state issue when global readonly is set in `Form` @xiaojueshi ([#4818](https://github.com/Tencent/tdesign-vue-next/pull/4818))
- `Tree`: Fix the issue where container width change causes scrollback to top after tree enables virtual scroll @uyarn ([#4826](https://github.com/Tencent/tdesign-vue-next/pull/4826))

### 📝 Documentation
- `Chat`: Add advanced component `AI Chat Dialogue` entry @zydemail ([#4777](https://github.com/Tencent/tdesign-vue-next/pull/4777))


## 🌈 1.10.4 `2024-11-20` 
### 🚀 Features
- `Icon`: @uyarn ([#4729](https://github.com/Tencent/tdesign-vue-next/pull/4729))
  - Icon library released version `0.4.0`, adding 907 new icons
  - Naming optimization, `blockchain` renamed to `transform-1`, `gesture-pray-1` renamed to `gesture-open`, `gesture-ranslation-1` renamed to `wave-bye`, `gesture-up-1` renamed to `gesture-typing`, `gesture-up-2` renamed to `gesture-right-slip`, `logo-wechat` renamed to `logo-wechat-stroke-filled`
  - Remove incorrect icons such as `tree-list`, `logo-adobe-photoshop-1`
- `Nuxt` : `@tdesign-vue-next/nuxt` released version `0.1.5`, automatically imports `Typography`, `Empty` components and new icons
- `Switch`: Add `before-change` API for scenarios requiring asynchronous requests @centuryPark ([#4699](https://github.com/Tencent/tdesign-vue-next/pull/4699))
- `Cascader`: In single selection mode when `trigger` is `hover`, panel automatically closes after selecting option @uyarn ([#4717](https://github.com/Tencent/tdesign-vue-next/pull/4717))
- `Checkbox`: Add `title` API for displaying disabled reasons in option display scenarios @liweijie0812 ([#4737](https://github.com/Tencent/tdesign-vue-next/pull/4737))
- `RadioGroup`: Add `readonly` API @liweijie0812 ([#4737](https://github.com/Tencent/tdesign-vue-next/pull/4737))
- `Form`: Change all `readonly` API default values to undefined, fix abnormal behavior when form `readonly` is true and form input components `readonly` is false @liweijie0812 ([#4737](https://github.com/Tencent/tdesign-vue-next/pull/4737))
- `AnchorItem`: Add `customScroll API` to support disabling default scroll animation, allowing users to customize anchor scroll behavior @boogie-ben ([#4386](https://github.com/Tencent/tdesign-vue-next/pull/4386))
- `Dialog`: Add API `BeforeOpen` triggered before dialog executes open animation effect, `BeforeClose` triggered before dialog executes disappear animation effect  @Wesley-0808 ([#4733](https://github.com/Tencent/tdesign-vue-next/pull/4733))
- `Drawer`: Add API `BeforeOpen` triggered before drawer executes open animation effect, `BeforeClose` triggered before drawer executes close animation effect @Wesley-0808 ([#4733](https://github.com/Tencent/tdesign-vue-next/pull/4733))
### 🐞 Bug Fixes
- `Input`: 
  - Fix the issue where `InputPreValue` does not update to input value when using Chinese input method under `AutoWidth` state @Wesley-0808 ([#4688](https://github.com/Tencent/tdesign-vue-next/pull/4688))
  -  Optimize auto width misalignment issue under `scale` @Cat1007 ([#4713](https://github.com/Tencent/tdesign-vue-next/pull/4713))
  - Fix incomplete display issue of `autowidth` in `transform` container introduced in version `1.10.3` @Cat1007 ([#4754](https://github.com/Tencent/tdesign-vue-next/pull/4754))
- `TreeSelect`: 
  - Fix `v-model` error when asynchronously loading and `valueType="object"` @ylunwang ([#4734](https://github.com/Tencent/tdesign-vue-next/pull/4734))
  - Fix selection logic when asynchronously loading and `valueMode="onlyLeaf"` ([common#1976](https://github.com/Tencent/tdesign-common/pull/1976)) @ylunwang ([#4734](https://github.com/Tencent/tdesign-vue-next/pull/4734))
- `Menu`: 
  - `menu-group`'s `title` slot is invalid @chensid ([#4755](https://github.com/Tencent/tdesign-vue-next/pull/4755))
  - Fix the issue where extra `warning` is generated when project does not include `vue-router` @dsh0416 ([#4719](https://github.com/Tencent/tdesign-vue-next/pull/4719))
- `TagInput`: Fix defect where selected items can still be deleted via `Backspace` key in `readonly` mode @RSS1102 ([#4696](https://github.com/Tencent/tdesign-vue-next/pull/4696))
- `Avatar`: Clear previous image loading failure placeholder after avatar link switch @Cat1007 ([#4724](https://github.com/Tencent/tdesign-vue-next/pull/4724))
- `ColorPicker`: Recently used colors need to be selected before deletion @superNos ([#4720](https://github.com/Tencent/tdesign-vue-next/pull/4720))
- `Tabs`: Incorrect default selected style for `tabs` in `dialog` @chensid ([#4722](https://github.com/Tencent/tdesign-vue-next/pull/4722))
- `Cascader`: Fix abnormal `title` rendering issue when option `label` is non-string @uyarn ([#4759](https://github.com/Tencent/tdesign-vue-next/pull/4759))
- `InputNumber`: Fix the issue where `format` incorrectly acts on `value` under `largeNumber` @uyarn ([#4695](https://github.com/Tencent/tdesign-vue-next/pull/4695))
### 📝 Documentation
- `Icon`: Optimize icon search functionality, support Chinese and English icon search @uyarn ([#4729](https://github.com/Tencent/tdesign-vue-next/pull/4729))


## 🌈 1.10.3 `2024-10-27` 
### 🚀 Features
- `TimePicker`: Add `autoSwap` API to support maintaining selected left and right time size order after version `1.10.2` @uyarn ([#4662](https://github.com/Tencent/tdesign-vue-next/pull/4662))
- `Select`: Add `label` parameter to `valueDisplay` @uyarn ([#4645](https://github.com/Tencent/tdesign-vue-next/pull/4645))
### 🐞 Bug Fixes
- `Select`: 
  - Fix abnormal rendering issue when using virtual scroll with filtering and custom rendered content @uyarn ([#4677](https://github.com/Tencent/tdesign-vue-next/pull/4677))
  - Fix incorrect interaction behavior where Enter key clears input box in filterable scenario @uyarn ([#4677](https://github.com/Tencent/tdesign-vue-next/pull/4677))
  - Add fault tolerance judgment for some node events @uyarn ([#4677](https://github.com/Tencent/tdesign-vue-next/pull/4677))
  - Fix the issue of using `loading` with bottom scroll event `onScrollToBottom` together @lllllllqw ([#4625](https://github.com/Tencent/tdesign-vue-next/pull/4625))
- `Descriptions`:  
  - Fix display issue when setting `span` under `layout` as `vertical` @zhangpaopao0609 ([#4656](https://github.com/Tencent/tdesign-vue-next/pull/4656))
  - Fix rendering issue when `span` is greater than `column` configuration  @zhangpaopao0609 ([#4656](https://github.com/Tencent/tdesign-vue-next/pull/4656))
- `Tree`: Fix the issue where custom icon cannot be clicked when there are no child nodes @RSS1102 ([#4638](https://github.com/Tencent/tdesign-vue-next/pull/4638))
- `Space`: Fix the issue of redundant spaces when using `v-if` @Luffy-developer ([#4663](https://github.com/Tencent/tdesign-vue-next/pull/4663))
- `InputNumber`: The issue where focus event still triggers when disabled @betavs ([#4661](https://github.com/Tencent/tdesign-vue-next/pull/4661))
- `DatePicker`: panel top arrow doesn't work when using week mode @RSS1102 ([#4673](https://github.com/Tencent/tdesign-vue-next/pull/4673))
- `Table`: Header merging via colspan under multi-level header @wangyang0210 ([#4669](https://github.com/Tencent/tdesign-vue-next/pull/4669))
- `Input`: Fix the issue where trailing zeros in decimal places cannot be entered when Input type="number" @wilonjiang ([#4660](https://github.com/Tencent/tdesign-vue-next/pull/4660))
- `Drawer`: Fix page shake issue when opening `drawer` @uyarn ([#4671](https://github.com/Tencent/tdesign-vue-next/pull/4671))
- `Dialog`: Fix page shake issue when opening `dialog` @RSS1102  @uyarn ([#4671](https://github.com/Tencent/tdesign-vue-next/pull/4671))
### 📝 Documentation
- `Tree`: Fix `valueMode` API spelling error issue @Simon-He95 ([#4622](https://github.com/Tencent/tdesign-vue-next/pull/4622))
- `Docs`: Fix the issue where `Codesandbox` examples fail to start or need to open devbox to run @RSS1102 ([#4610](https://github.com/Tencent/tdesign-vue-next/pull/4610))
### 🚧 Others
- `Table`: Fix extra `。` in `table` API documentation @Wesley-0808 ([#4683](https://github.com/Tencent/tdesign-vue-next/pull/4683))

## 🌈 1.10.2 `2024-09-27` 
### 🚀 Features
- `Table`: Add `t-table__row--expanded` and `t-table__row--folded` in expandable/collapsible scenarios to distinguish expanded and collapsed rows @uyarn ([#4586](https://github.com/Tencent/tdesign-vue-next/pull/4586))
- `Rate`: Add `clearable` API to support clearing rating @uyarn ([#4603](https://github.com/Tencent/tdesign-vue-next/pull/4603))
- `TimePicker`: Support time range picker automatic adjustment of left and right ranges @uyarn ([#4606](https://github.com/Tencent/tdesign-vue-next/pull/4606))
- `i18n`: Internationalization adds Italian `it_IT` and Russian `ru_RU` @liweijie0812 ([#4592](https://github.com/Tencent/tdesign-vue-next/pull/4592))

### 🐞 Bug Fixes
- `Select`: 
  - Fix rendering effect when option title is empty string or cleared @uyarn ([#4602](https://github.com/Tencent/tdesign-vue-next/pull/4602))
  - Fix the issue where `blur` event is not triggered normally after selecting option @uyarn ([#4602](https://github.com/Tencent/tdesign-vue-next/pull/4602))
  - Fix the error where options still display disabled when `Form` enables `disabled` and `Select` disables `disabled` @uyarn ([#4580](https://github.com/Tencent/tdesign-vue-next/pull/4580))
- `DatePicker`: 
  - Fix incorrect return format issue for year boundary dates under week picker @uyarn ([#4606](https://github.com/Tencent/tdesign-vue-next/pull/4606))
  - Optimize the issue of using week picker with `firstDayOfWeek`, please refer to week picker example code for details @uyarn ([#4606](https://github.com/Tencent/tdesign-vue-next/pull/4606))
- `TreeSelect`: Fix default behavior when clicking parent node option in multiple selection state to be selection @uyarn ([#4579](https://github.com/Tencent/tdesign-vue-next/pull/4579))
- `Tree`: Fix the issue where `expandOnClickNode` does not take effect correctly after configuration in multiple selection mode @uyarn ([#4579](https://github.com/Tencent/tdesign-vue-next/pull/4579))
- `Transfer`: `search` event missing `trigger` parameter @betavs ([#4590](https://github.com/Tencent/tdesign-vue-next/pull/4590))
- `InputNumber`: Fix incorrect type definition of number input box decimal places, changed from `String` to `Number` type @D-xuanmo ([#4599](https://github.com/Tencent/tdesign-vue-next/pull/4599))
- `RangInput`: Fix error when value is empty with `clearable` enabled @liweijie0812 ([#4608](https://github.com/Tencent/tdesign-vue-next/pull/4608))
- `ConfigProvider`: Fix loss of reactivity in global configuration issue @aolyang ([#4612](https://github.com/Tencent/tdesign-vue-next/pull/4612))
- `DateRangePicker`: Fix the issue where `defaultTime` is not correctly handled when configuring time-related formats @uyarn ([#4606](https://github.com/Tencent/tdesign-vue-next/pull/4606))
- `Upload`: Fix the issue where links are not clickable when disabled under some `theme` @uyarn ([#4614](https://github.com/Tencent/tdesign-vue-next/pull/4614))
- `Drawer`: Optimize shadow style for non-modal boxes  @RSS1102  @uyarn ([#4614](https://github.com/Tencent/tdesign-vue-next/pull/4614))
- `ColorPicker`: Fix style issue caused by setting `inputProps.width`  @RyouSY @uyarn ([#4614](https://github.com/Tencent/tdesign-vue-next/pull/4614))
- `Typography`: Fix `title` font size issue @uyarn ([#4614](https://github.com/Tencent/tdesign-vue-next/pull/4614))
- `Swiper`: Fix the issue where segmented navigation arrow color is not adapted in dark mode @uyarn ([#4614](https://github.com/Tencent/tdesign-vue-next/pull/4614))
- `ImageViewer`: Optimize default zoom ratio of image viewer to reduce flicker effect of wheel zoom @RSS1102 ([#4583](https://github.com/Tencent/tdesign-vue-next/pull/4583))
- `Textarea`: Fix abnormal component issue when setting `autosize` and switching pages @RSS1102 ([#4539](https://github.com/Tencent/tdesign-vue-next/pull/4539))

## 🌈 1.10.1 `2024-09-11` 
### 🐞 Bug Fixes
- `Table`: Fix abnormality in some pagination switching scenarios caused by state update issues in nodes with `ellipsis` configuration enabled @uyarn ([#4555](https://github.com/Tencent/tdesign-vue-next/pull/4555))

## 🌈 1.10.0 `2024-09-10` 
### 🚀 Features
- `Empty`: Add `Empty` empty state component @HaixingOoO ([#4519](https://github.com/Tencent/tdesign-vue-next/pull/4519))
- `Typography`: Add `Typography` typography component @byq1213 ([#4293](https://github.com/Tencent/tdesign-vue-next/pull/4293))
- `Cascader`:  
  - Add cascader panel support for customizing dropdown option content ability @uyarn ([#4513](https://github.com/Tencent/tdesign-vue-next/pull/4513))
  -  Add `panelTopContent` and `panelBottomContent` API @uyarn ([#4546](https://github.com/Tencent/tdesign-vue-next/pull/4546))
- `Form`: 
  - Add `whitespace` validation default error message @liweijie0812 ([#4508](https://github.com/Tencent/tdesign-vue-next/pull/4508))
  - Add `id` API, form's native `id` attribute, supports working with buttons outside the form through `form` attribute to trigger form events @uyarn ([#4538](https://github.com/Tencent/tdesign-vue-next/pull/4538))
- `Tag`: 
  - Add `title` API to control text displayed on mouse hover @liweijie0812 ([#4517](https://github.com/Tencent/tdesign-vue-next/pull/4517))
  - Modify the `dom` node where `maxWidth` takes effect to facilitate controlling text content length @liweijie0812 ([#4532](https://github.com/Tencent/tdesign-vue-next/pull/4532))
- `ConfigProvider`: Add `descriptions.colonText` `rate.rateText` `setpes.checkIcon` support for global configuration @liweijie0812 ([#4476](https://github.com/Tencent/tdesign-vue-next/pull/4476))
- `RadioGroup`: Add `name` property to `change` event callback @taninsist ([#4491](https://github.com/Tencent/tdesign-vue-next/pull/4491))
- `Button`: Add `form` API, native `form` attribute, supports triggering form events of corresponding `id` form through `form` attribute @uyarn ([#4538](https://github.com/Tencent/tdesign-vue-next/pull/4538))
- `InputNumber`: Extend `decimalPlaces` type to support flexible rounding configuration @zhangpaopao0609 ([#4536](https://github.com/Tencent/tdesign-vue-next/pull/4536))
### 🐞 Bug Fixes
- `List`: 
  - Fix abnormal container not null checked issue when using virtual scroll list with `v-if` display scenario @zhengchengshi ([#4541](https://github.com/Tencent/tdesign-vue-next/pull/4541))
  - Fix the issue where some `API` does not take effect due to incorrect `props` of `list-item` @summer-077 ([#4544](https://github.com/Tencent/tdesign-vue-next/pull/4544))
- `Tag`: Fix error issue in scenarios where globally replacing `closeBtn` icon @uyarn ([#4494](https://github.com/Tencent/tdesign-vue-next/pull/4494))
- `TimePicker`: Fix the issue where `format` only supports `HH:mm:ss` format @liweijie0812 ([#4505](https://github.com/Tencent/tdesign-vue-next/pull/4505))
- `Table`: Fix the issue where ellipsis style is lost after drag adjusting column width @uyarn ([#4545](https://github.com/Tencent/tdesign-vue-next/pull/4545))
### 🚧 Others
- `Table`: Fix pagination documentation display example error issue @uyarn ([#4501](https://github.com/Tencent/tdesign-vue-next/pull/4501))
- `Menu`: Update related documentation about `MenuItem`'s `routerLink` @Nero978 ([#4543](https://github.com/Tencent/tdesign-vue-next/pull/4543))

## 🌈 1.9.9 `2024-08-16` 
### 🚀 Features
- `RangeInput`: Support borderless `borderless` mode @liweijie0812 ([#4442](https://github.com/Tencent/tdesign-vue-next/pull/4442))
- `DateRangePicker`: Support borderless `borderless` mode @liweijie0812 ([#4442](https://github.com/Tencent/tdesign-vue-next/pull/4442))
- `TimeRangePicker`: Support borderless `borderless` mode @liweijie0812 ([#4442](https://github.com/Tencent/tdesign-vue-next/pull/4442))
### 🐞 Bug Fixes
- `Cascader`: 
  - Fix the issue where clicking clear button triggers `change` event multiple times @uyarn ([#4478](https://github.com/Tencent/tdesign-vue-next/pull/4478))
   - Fix the issue where clicking clear button after entering value without selecting value in filterable mode incorrectly selects option @uyarn ([#4478](https://github.com/Tencent/tdesign-vue-next/pull/4478))
- `Tabs`: 
  - Fix the issue where component has abnormal removal operation due to replacing component `event` event when globally replacing icons @uyarn ([#4485](https://github.com/Tencent/tdesign-vue-next/pull/4485))
  - Fix size issue of `t-tabs__bar` in `dialog` @RyouSY ([#4438](https://github.com/Tencent/tdesign-vue-next/pull/4438))
- `Upload`: Fix the issue where some icons do not support global replacement @uyarn ([#4434](https://github.com/Tencent/tdesign-vue-next/pull/4434))
- `Dialog`: Fix type issue when setting `cancelBtn` and `confirmBtn` to `null` @chouchouji ([#4439](https://github.com/Tencent/tdesign-vue-next/pull/4439))
- `Input`: Fix inaccurate `maxlength` issue @novlan1 ([#4429](https://github.com/Tencent/tdesign-vue-next/pull/4429))
- `TagInput`: Fix defect where `tagProps` does not apply to collapsed tags @uyarn ([#4465](https://github.com/Tencent/tdesign-vue-next/pull/4465))
- `Pagination`: Fix the issue where `onChange` cannot get latest `pageSize` when `pageSize` changes in `pagination` @1379255913 ([#4450](https://github.com/Tencent/tdesign-vue-next/pull/4450))
- `RangeInput`: Clear icon cannot display normally @betavs ([#4453](https://github.com/Tencent/tdesign-vue-next/pull/4453))
- `Dropdown`: Fix incorrect position calculation issue after user modifies `DropdownItem` height due to lack of dynamic calculation @uyarn ([#4484](https://github.com/Tencent/tdesign-vue-next/pull/4484))
- `Table`: Fix incorrect order within ancestor nodes when drag sorting @uyarn ([common#1880](https://github.com/Tencent/tdesign-common/pull/1880))
- `InputNumber`: Fix decimal precision calculation, missing boundary logic starting with `0` leading to calculation errors @uyarn ([common#1879](https://github.com/Tencent/tdesign-common/pull/1879))
### 🚧 Others
- `Progress`: TS type renamed `StatusEnum`=>`ProgressStatus`,`ThemeEnum`=>`ProgressTheme` @liweijie0812 ([#4426](https://github.com/Tencent/tdesign-vue-next/pull/4426))
- `RangeInput`: Add `liveDemo` @liweijie0812 ([#4442](https://github.com/Tencent/tdesign-vue-next/pull/4442))


## 🌈 1.9.8 `2024-07-23` 
### 🚀 Features
- `Form`: Support affecting `TagInput` component through form's `readonly` property @xiaojueshi ([#4370](https://github.com/Tencent/tdesign-vue-next/pull/4370))
- `Icon`: Add ordered list icon `list-numbered`, optimize drawing path of `lock-off` @double-deng ([#4378](https://github.com/Tencent/tdesign-vue-next/pull/4378))
- `TreeSelect`: `valueDisplay` callback returns entire node information for input box callback display @uyarn ([#4389](https://github.com/Tencent/tdesign-vue-next/pull/4389))
- `Dropdown`: Add implementation of `panelTopContent` and `panelBottomContent` API @uyarn ([#4388](https://github.com/Tencent/tdesign-vue-next/pull/4388))
- `ImageViewer`: Add `attach` API to support custom mount node for `ImageViewer` @josonyang ([#4405](https://github.com/Tencent/tdesign-vue-next/pull/4405))
- `Tree`: Use `getTreeData` to get tree structure, support `children` being `true` case @josonyang ([#4405](https://github.com/Tencent/tdesign-vue-next/pull/4405))
- `DatePicker`: Add `needConfirm` API to support date time picker saving selected time without clicking confirm button @Cat1007 ([#4411](https://github.com/Tencent/tdesign-vue-next/pull/4411))
### 🐞 Bug Fixes
- `DateRangePicker`: @liweijie0812
    - Fix the issue where disable does not take effect when `Form` form is disabled  ([#4380](https://github.com/Tencent/tdesign-vue-next/pull/4380))
    - Fix abnormal `label` style issue  ([common#1845](https://github.com/Tencent/tdesign-common/pull/1845))
- `TagInput`: Fix the issue where `Form` component `disabled` property cannot affect `TagInput` component @xiaojueshi ([#4353](https://github.com/Tencent/tdesign-vue-next/pull/4353))
- `Icon`: Fix naming error issue of icon `chart-column` @uyarn ([#4378](https://github.com/Tencent/tdesign-vue-next/pull/4378))
- `Input`: Fix the issue where plain/cipher text can still be switched in disabled state @jby0107 ([#4387](https://github.com/Tencent/tdesign-vue-next/pull/4387))
- `Avatar`: Fix the issue where `max` property does not take effect in multi-level nesting @1379255913 ([#4326](https://github.com/Tencent/tdesign-vue-next/pull/4326))
- `Table`: Fix defect where `thClassName` does not support function and array usage @theBestVayne ([#4406](https://github.com/Tencent/tdesign-vue-next/pull/4406))
- `Breadcrumb`: Fix defect where `_blank` configuration opens two new `Tab` pages @uyarn ([#4421](https://github.com/Tencent/tdesign-vue-next/pull/4421))
- `Notification`: Fix the issue where some node prefixes do not follow `classPrefix` changes @uyarn ([#4421](https://github.com/Tencent/tdesign-vue-next/pull/4421))
### 🚧 Others
- `Table`: Fix text error about `footerAffixedBottom` API in documentation @Tsuj100 ([#4384](https://github.com/Tencent/tdesign-vue-next/pull/4384))

## 🌈 1.9.7 `2024-06-28` 
### 🚀 Features
- `Tree`: 
  - Add `allowDrop` API to support drag and drop restriction ability @TabSpace ([#4312](https://github.com/Tencent/tdesign-vue-next/pull/4312))
  - `ScrollTo` supports `key` property, supports scrolling to specified node through node unique value, see example code for details @uyarn ([#4334](https://github.com/Tencent/tdesign-vue-next/pull/4334))
- `Descriptions`:  Add `tableLayout` property @zhangpaopao0609 ([#4257](https://github.com/Tencent/tdesign-vue-next/pull/4257))
- `Tabs`: Add `scrollPosition` for selected slider scroll final stop position @oljc ([#4269](https://github.com/Tencent/tdesign-vue-next/pull/4269))
- `Dialog`: Add `dialogStyle` and `dialogClassName` API, acting on the dialog itself, facilitating adjustment of dialog own style @uyarn ([#4347](https://github.com/Tencent/tdesign-vue-next/pull/4347))
- `Plugin`: Separately export styles of components related to `Plugin`, supporting some scenarios that modify prefix @uyarn ([#4343](https://github.com/Tencent/tdesign-vue-next/pull/4343))
- `InputNumber`: Support `Form` component's `readonly` API  @xiaojueshi ([#4321](https://github.com/Tencent/tdesign-vue-next/pull/4321))
### 🐞 Bug Fixes
- `Select`: 
  - Fix the issue where `context.value` obtained by `onEnter` event is incorrect after selecting option with keyboard up/down keys @1379255913 ([#4303](https://github.com/Tencent/tdesign-vue-next/pull/4303))
  - Fix defect where `Option` in `OptionGroup` must use `v-for` to work @1379255913 ([#4318](https://github.com/Tencent/tdesign-vue-next/pull/4318))
- `DatePicker`: 
  - Fix incorrect header display issue when switching `mode` in date picker @wilonjiang ([#4292](https://github.com/Tencent/tdesign-vue-next/pull/4292))
  - Fix the issue where component parsing fails due to unmatched `format` when switching `mode` @wilonjiang ([#4292](https://github.com/Tencent/tdesign-vue-next/pull/4292))
- `Table`: 
  - Fix column width inconsistency issue when using `tableLayout: auto` with fixed header @Cat1007 ([#4285](https://github.com/Tencent/tdesign-vue-next/pull/4285))
  - Remove unnecessary flag reset in `ellipsis.tsx` @xiaojueshi ([#4349](https://github.com/Tencent/tdesign-vue-next/pull/4349))
- `Tree`: 
  - Fix the issue where component does not expose `scrollTo` method, keep `scrollToElement` method @uyarn ([#4334](https://github.com/Tencent/tdesign-vue-next/pull/4334))
  - Fix abnormal node position issue when scrolling multiple times to specified scroll node through `scrollTo` @uyarn ([#4334](https://github.com/Tencent/tdesign-vue-next/pull/4334))
- `Pagination`: Internal current value not modified when selector changes @betavs ([#4284](https://github.com/Tencent/tdesign-vue-next/pull/4284))
- `Cascader`:  Fix the issue where clicking on option without `children` does not show previous list @1379255913 ([#4301](https://github.com/Tencent/tdesign-vue-next/pull/4301))

## 🌈 1.9.6 `2024-06-06` 
### 🚀 Features
- `Form`: Add `readonly` property to support configuring form as readonly @xiaojueshi ([#4176](https://github.com/Tencent/tdesign-vue-next/pull/4176))
- `Button`: Add `loadingProps` API @novlan1 ([#4219](https://github.com/Tencent/tdesign-vue-next/pull/4219))
- `Breadcrumb`: Optimize judgment condition for displaying `tooltip` when display text `overflow` @xiaojueshi ([#4220](https://github.com/Tencent/tdesign-vue-next/pull/4220))
- `Table`: Optimize judgment condition for displaying `tooltip` when display text `overflow` @xiaojueshi ([#4220](https://github.com/Tencent/tdesign-vue-next/pull/4220))
- `SelectInput`: Add `size` property @1379255913 ([#4229](https://github.com/Tencent/tdesign-vue-next/pull/4229))
- `Watermark`: Enhance watermark anti-tampering capability @oljc ([#4233](https://github.com/Tencent/tdesign-vue-next/pull/4233))
- `Tabs`: Support scrolling operations through wheel or touchpad @oljc ([#4222](https://github.com/Tencent/tdesign-vue-next/pull/4222))
- `DatePicker`: Optimize change logic of date range picker header range, after selection if left range is greater than right range, default adjustment is that left range is always smaller than right range  @uyarn ([#4263](https://github.com/Tencent/tdesign-vue-next/pull/4263))
- `Input`: Add `spellCheck` for whether to enable spell checking @liweijie0812 ([#4265](https://github.com/Tencent/tdesign-vue-next/pull/4265))
- `TreeSelect`:  Expose `treeRef` externally @novlan1 ([#4235](https://github.com/Tencent/tdesign-vue-next/pull/4235))
- `ImageViewer`: Support native `svg` rendering @josonyang ([#4249](https://github.com/Tencent/tdesign-vue-next/pull/4249))
- `Drawer`: Add maximum and minimum limits when dragging, add `onSizeDragEnd` callback function @ZWkang ([#4009](https://github.com/Tencent/tdesign-vue-next/pull/4009))

### 🐞 Bug Fixes

- `Cascader`: 
  - Fix missing `slot` functionality issue for `prefixIcon`, `suffix` and `suffixIcon` @1379255913 ([#4229](https://github.com/Tencent/tdesign-vue-next/pull/4229))
  - Fix `autofocus` functionality failure issue @uyarn ([#4266](https://github.com/Tencent/tdesign-vue-next/pull/4266))
- `Tabs`:  Fix slider positioning issue @ZTH520 ([#4207](https://github.com/Tencent/tdesign-vue-next/pull/4207))
- `List`: Fix abnormality issue when enabling virtual scroll @uyarn ([#4208](https://github.com/Tencent/tdesign-vue-next/pull/4208))
- `Table`: Fix combined usage scenario of fixed row and virtual scroll @Cat1007 ([#4145](https://github.com/Tencent/tdesign-vue-next/pull/4145))
- `Select`:  Fix abnormal keyboard selection issue after entering filter conditions when remote search is combined with filtering @ZTH520 ([#4218](https://github.com/Tencent/tdesign-vue-next/pull/4218))
- `Table`: Fix warning logic issue of `filter.type` @uyarn ([#4226](https://github.com/Tencent/tdesign-vue-next/pull/4226))
- `InputNumber`: Fix the issue where when `allowInputOverLimit=false` and judging size value, if `value` is `undefined`, Infinity appears @HaixingOoO  @uyarn ([#4262](https://github.com/Tencent/tdesign-vue-next/pull/4262))
- `DatePicker`: Fix year parsing error issue under specified `format` and `valueType` @Ericleungs ([#4161](https://github.com/Tencent/tdesign-vue-next/pull/4161))


## 🌈 1.9.5 `2024-05-16` 
### 🚀 Features
- `Input`: Add `borderless` API to support borderless mode @uyarn ([#4159](https://github.com/Tencent/tdesign-vue-next/pull/4159))
- `AutoComplete`: Add `borderless` API to support borderless mode @liweijie0812 ([#4192](https://github.com/Tencent/tdesign-vue-next/pull/4192))
- `ColorPicker`: Add `borderless` API to support borderless mode @liweijie0812 ([#4192](https://github.com/Tencent/tdesign-vue-next/pull/4192))
- `TagInput`: Add `borderless` API to support borderless mode @liweijie0812 ([#4192](https://github.com/Tencent/tdesign-vue-next/pull/4192))
- `DatePicker`: @liweijie0812 ([#4192](https://github.com/Tencent/tdesign-vue-next/pull/4192))
 - Add `borderless` API to support borderless mode 
 - Add `label` API to support custom left text
- `TimePicker`:
  - Add `borderless` API to support borderless mode @liweijie0812 ([#4192](https://github.com/Tencent/tdesign-vue-next/pull/4192))
  - Add `valueDisplay` API to support custom display content @liweijie0812 ([#4192](https://github.com/Tencent/tdesign-vue-next/pull/4192))
  - Add `label` API to support custom left text @liweijie0812 ([#4195](https://github.com/Tencent/tdesign-vue-next/pull/4195))
  - Now button no longer displays when setting `preset` API @uyarn ([#4191](https://github.com/Tencent/tdesign-vue-next/pull/4191))
- `Upload`: Add `default` and `content` parameter pass-through in `trigger-button-props` @betavs ([#4126](https://github.com/Tencent/tdesign-vue-next/pull/4126))
- `Radio`: Disable priority `Radio.disabled` > `RadioGroup.disabled` > `Form.disabled` @liweijie0812 ([#4182](https://github.com/Tencent/tdesign-vue-next/pull/4182))
- `Scroll`: Adjust scrollbar compatibility implementation method, optimize issue requiring `autoprefixer` version update in version `1.9.4` @LoopZhou

### 🐞 Bug Fixes
- `Table`: 
  - Fix error in scrolling to specified row under virtual scroll @Cat1007 ([#4129](https://github.com/Tencent/tdesign-vue-next/pull/4129))
  - Modify table judgment of content overflow @thc-07 ([#4093](https://github.com/Tencent/tdesign-vue-next/pull/4093))
- `Upload`: 
  - Fix abnormal style issue under error type in image upload @uyarn ([#4197](https://github.com/Tencent/tdesign-vue-next/pull/4197))
  - `data` property definition missing `Function` type @betavs ([#4127](https://github.com/Tencent/tdesign-vue-next/pull/4127))
- `Select`: When selection box is inputable, each input triggers popup-visible-change event @Liao-js ([#4137](https://github.com/Tencent/tdesign-vue-next/pull/4137))
- `Transfer`: Fix abnormal issue where default selected values that are not allowed to be removed can still be removed in transfer box @liect ([#4147](https://github.com/Tencent/tdesign-vue-next/pull/4147))
- `Textarea`: Compatible with error reporting issue caused by element not existing when component is destroyed @PDieE ([#4144](https://github.com/Tencent/tdesign-vue-next/pull/4144))
- `Form`: Fix abnormal behavior when form `disabled` is `true` and form input components `disabled` is `false` @uyarn ([#4189](https://github.com/Tencent/tdesign-vue-next/pull/4189))
- `Menu`: Increase style priority of `t-popup__menu`, solve abnormal style issue caused by consistent style priority in dist @uyarn ([#4197](https://github.com/Tencent/tdesign-vue-next/pull/4197))
- `Select`: Optimize issue where selected style overrides disabled style @fython ([#4197](https://github.com/Tencent/tdesign-vue-next/pull/4197))
- `Cascader`: Fix the issue where `Cascader` triggers `change` event multiple times when deleting options in multiple selection state @algerkong ([#4140](https://github.com/Tencent/tdesign-vue-next/pull/4140))
- `ColorPicker`: Fix the issue where channel button position does not change when switching preview color @fennghuang ([#4177](https://github.com/Tencent/tdesign-vue-next/pull/4177))

### 🚧 Others
- `Tabs`: Update slidable tabs example documentation @fennghuang ([#4167](https://github.com/Tencent/tdesign-vue-next/pull/4167))
- `Upload`: Fix abnormal `locale` jump link issue @uyarn ([#4197](https://github.com/Tencent/tdesign-vue-next/pull/4197))

## 🌈 1.9.4 `2024-04-18` 
### 🚀 Features
- `Textarea`: 
  - Add `allow-input-over-max` property @betavs ([#4086](https://github.com/Tencent/tdesign-vue-next/pull/4086))
  - Add `onValidate` event @betavs ([#4086](https://github.com/Tencent/tdesign-vue-next/pull/4086))
- `Scroll`: Fix abnormal style issue in components with scrollbars such as Table and Select caused by `Chrome 121` version supporting scroll width @loopzhou (common#1765). Please note that projects initialized based on @vue/cli-service 4.x and below versions will be affected by this fix due to outdated `autoprefixer` version, please upgrade @vue/cli-service to 5.0 and above

### 🐞 Bug Fixes
- `DatePicker`: Do not perform initialization parse for `valueType = 'Date'` @Cat1007 ([#4066](https://github.com/Tencent/tdesign-vue-next/pull/4066))
- `Loading`: `hide` function incorrectly closes all `Loading` instances. @XBIsland ([#4081](https://github.com/Tencent/tdesign-vue-next/pull/4081))
- `Popup`: Fix display issue caused by abnormal `document` judgment due to `shadowroot` in `webcomponent` scenario @decadef20 ([#4091](https://github.com/Tencent/tdesign-vue-next/pull/4091))
- `Descriptions`: Fix error when content is empty @zhangpaopao0609 ([#4092](https://github.com/Tencent/tdesign-vue-next/pull/4092))
- `Textarea`: `autosize` does not take effect in `Firefox`. @XBIsland ([#4104](https://github.com/Tencent/tdesign-vue-next/pull/4104))
- `DatePicker`: Fix abnormal selection issue in week and quarter modes in version `1.9.3` @uyarn ([#4096](https://github.com/Tencent/tdesign-vue-next/pull/4096))
- `Tabs`: Fix abnormal position issue when manually adding `tab` after drag sorting @Liao-js ([#4108](https://github.com/Tencent/tdesign-vue-next/pull/4108))
- `Cascader`: Fix custom rendered content not supporting multiple selection @ZTH520 ([#4109](https://github.com/Tencent/tdesign-vue-next/pull/4109))
- `TimePicker`:  Fix incorrect preset value issue when no specific range is selected @uyarn ([#4123](https://github.com/Tencent/tdesign-vue-next/pull/4123))
- `Skeleton`: Fix inability to cancel incoming `loading` before reaching `delay` time when setting `delay` delay and `loading` is `true` @boogie-ben ([#4119](https://github.com/Tencent/tdesign-vue-next/pull/4119))
- `BreadcrumbItem`: Fix reading `content` content; fix calling non-function `slot?.default()` issue when text overflows @boogie-ben ([#4120](https://github.com/Tencent/tdesign-vue-next/pull/4120))


## 🌈 1.9.3 `2024-03-29`
### 🐞 Bug Fixes
- `Form`: Fix warning issue in version `1.9.1` @uyarn ([#4060](https://github.com/Tencent/tdesign-vue-next/pull/4060))
- `Loading`: Fix warning for external `directive` usage and naming error in version `1.9.1` @uyarn ([#4060](https://github.com/Tencent/tdesign-vue-next/pull/4060))
- `DatePicker`: Fix abnormal issue using `Date` in version `1.9.1` @uyarn

## 🌈 1.9.1 `2024-03-28` 
### 🚀 Features
- `Breadcrumb`: `breadcrumb-item` adds `click` event @uyarn ([#4017](https://github.com/Tencent/tdesign-vue-next/pull/4017))
- `Tag`: Add `color` API to support custom colors @maoyiluo ([#4023](https://github.com/Tencent/tdesign-vue-next/pull/4023))
- `TagInput`: Extend delete functionality of `collapsedItems` 
- `DatePicker`: Add `valueDisplay` and `selectInputProps` API to support customizing display content @uyarn ([#4038](https://github.com/Tencent/tdesign-vue-next/pull/4038))
### 🐞 Bug Fixes
- `Descriptions`: 
  - Fix missing editor prompt issue for `t-descriptions-item` component @uyarn ([#4006](https://github.com/Tencent/tdesign-vue-next/pull/4006))
  - Optimize adaptive width issue @uyarn ([#4006](https://github.com/Tencent/tdesign-vue-next/pull/4006))
- `Loading`:
  -  Fix `preventScrollThrough` parameter invalid when calling `LoadingPlugin`. @XBIsland ([#4040](https://github.com/Tencent/tdesign-vue-next/pull/4040))
  -  Fix `v-loading` directive invalid when using `unplugin-vue-components` for on-demand loading @XBIsland ([#4048](https://github.com/Tencent/tdesign-vue-next/pull/4048))
- `Table`: 
  - `activeRowList` assignment error when `activeRowType = multiple`. @XBIsland ([#4010](https://github.com/Tencent/tdesign-vue-next/pull/4010))
  - Fix incorrect virtual scroll table total height calculation when data length changes @Cat1007 ([#4016](https://github.com/Tencent/tdesign-vue-next/pull/4016))
- `Notification`: `NotifyPlugin` returns incorrect `NotificationInstance` causing `NotifyPlugin.close` function to incorrectly close component. @XBIsland ([#4014](https://github.com/Tencent/tdesign-vue-next/pull/4014))
- `Form`: Avoid issue where `form-item`'s `label` property still assigns value when `for` is empty @sechi747 ([#4027](https://github.com/Tencent/tdesign-vue-next/pull/4027))
- `Cascader`: Fix style failure issue caused by abnormal `value` data backfill ([#4021](https://github.com/Tencent/tdesign-vue-next/pull/4021)) @XBIsland ([#4025](https://github.com/Tencent/tdesign-vue-next/pull/4025))
- `Tnput`: Fix keyboard operation cannot trigger `blur` event during `hover`. ([#3963](https://github.com/Tencent/tdesign-vue-next/pull/3963)) ([#3903](https://github.com/Tencent/tdesign-vue-next/pull/3903)) ([#3639](https://github.com/Tencent/tdesign-vue-next/pull/3639)) @XBIsland ([#4032](https://github.com/Tencent/tdesign-vue-next/pull/4032))
- `Locale`: Fix abnormal English language pack issue for `Image` and `ImageViewer` @uyarn ([#4038](https://github.com/Tencent/tdesign-vue-next/pull/4038))
- `DatePicker`: Fix calculation error issue when `format` and `valueType` are inconsistent @uyarn ([#4058](https://github.com/Tencent/tdesign-vue-next/pull/4058))
- `Tabs`: Fix console warning issue when using `action` @uyarn ([#4057](https://github.com/Tencent/tdesign-vue-next/pull/4057))
- `ColorPicker`: Fix the issue where `linear-gradient` mode cannot drag to adjust color (#4015) @XBIsland ([#4022](https://github.com/Tencent/tdesign-vue-next/pull/4022))
- `Icon`: Optimize `Icon` description in no network scenario, highlight solution @xiexin12138 ([#4024](https://github.com/Tencent/tdesign-vue-next/pull/4024))
### 🚧 Others
- `Menu`: Remove controversial properties from `demo` @sinbadmaster ([#4049](https://github.com/Tencent/tdesign-vue-next/pull/4049))


## 🌈 1.9.0 `2024-03-07` 
### 🚀 Features
- `Description`:
  - Adjust `layout` type definition to string multiple types @chaishi ([#3939](https://github.com/Tencent/tdesign-vue-next/pull/3939))
  - Support nested description components @zhangpaopao0609 ([#3970](https://github.com/Tencent/tdesign-vue-next/pull/3970))
- `Form`: `trigger` supports `submit` @liweijie0812 ([#3910](https://github.com/Tencent/tdesign-vue-next/pull/3910))
- `Demo`: Support `Typescript` code examples @chaishi @uyarn @RSS1102 @HaixingOoO  ([#3929](https://github.com/Tencent/tdesign-vue-next/pull/3929))
- `Statistic`: `color` black style adapted to dark mode [(common#1721)](https://github.com/Tencent/tdesign-common/pull/1721) @liweijie0812 ([#3910](https://github.com/Tencent/tdesign-vue-next/pull/3910))
- `Slider`: Support hiding slider number float layer through `label=null` or `label=false` @chaishi ([#3997](https://github.com/Tencent/tdesign-vue-next/pull/3997))
- `Table`: Support global configuration of `size` @Lyan-u ([#3993](https://github.com/Tencent/tdesign-vue-next/pull/3993))
- `Nuxt`: Remove nuxt module from product, adjust to install `@tdesign-vue-next/nuxt` for use, solve abnormal functionality issue when using `es/nuxt`, please refer to Quick Start introduction for detailed usage @uyarn @liweijie0812 ([#4001](https://github.com/Tencent/tdesign-vue-next/pull/4001))
### 🐞 Bug Fixes
- `Table`: 
  - Fix `footer` implementation under virtual scroll @Cat1007 ([#3965](https://github.com/Tencent/tdesign-vue-next/pull/3965))
  - Tree structure table, fix invalid expand node issue when asynchronously setting `data` and `expandedTreeNodes` simultaneously (delayed setting is valid), @chaishi ([#3967](https://github.com/Tencent/tdesign-vue-next/pull/3967))
  - Fixed column table, fix column width being squeezed issue in `Dialog`, @chaishi ([#3967](https://github.com/Tencent/tdesign-vue-next/pull/3967))
  - Improve `Table` component `Typescript` type definition @chaishi ([#3936](https://github.com/Tencent/tdesign-vue-next/pull/3936))
  - Fix column drag sort issue @chaishi ([#3968](https://github.com/Tencent/tdesign-vue-next/pull/3968))
  - Fix the issue where `footer` is not refreshed normally when `footer` height updates @Cat1007 ([#3975](https://github.com/Tencent/tdesign-vue-next/pull/3975))
- `Drawer`: Fix the issue where `closeBtn` property `Boolean` type conversion does not take effect @trojanyao ([#3427](https://github.com/Tencent/tdesign-vue-next/pull/3427))
- `Form`: Validation judgment not strict issue @betavs ([#3960](https://github.com/Tencent/tdesign-vue-next/pull/3960))
- `Select`: Fix select createAble selection not triggering change event issue @hkaikai ([#3962](https://github.com/Tencent/tdesign-vue-next/pull/3962))
- `Nuxt`: Fix the issue where `Form` component cannot build normally when used in `nuxt` @richardji202 ([#3977](https://github.com/Tencent/tdesign-vue-next/pull/3977))
- `ColorPicker`: `color` value not synchronized and updated @betavs ([#4005](https://github.com/Tencent/tdesign-vue-next/pull/4005))
- `Drawer`: Fix the issue where `closeBtn` property `Boolean` type conversion does not take effect @trojanyao ([#3427](https://github.com/Tencent/tdesign-vue-next/pull/3427))
- `Affix`: Fix `margin` calculation to avoid `error` @Cat1007 ([#3972](https://github.com/Tencent/tdesign-vue-next/pull/3972))

### 🚧 Others
- `Code`: Editor code hints updated @liweijie0812 ([#3927](https://github.com/Tencent/tdesign-vue-next/pull/3927))


## 🌈 1.8.1 `2024-01-31` 
### 🚀 Features
- `Loading`: Support custom `v-loading` configuration, please refer to example code for details @uyarn ([#3911](https://github.com/Tencent/tdesign-vue-next/pull/3911))
### 🐞 Bug Fixes
- `Tabs`: 
  - Fix level issue affecting `action` area operation @uyarn ([#3881](https://github.com/Tencent/tdesign-vue-next/pull/3881))
  - Logic fault tolerance processing @betavs ([#3891](https://github.com/Tencent/tdesign-vue-next/pull/3891))
- `Form`: 
  - `FormRule` rule `trigger` value type missing `all` option @betavs ([#3875](https://github.com/Tencent/tdesign-vue-next/pull/3875))
  - Fix abnormal calculation of `^` character issue @uyarn ([#3881](https://github.com/Tencent/tdesign-vue-next/pull/3881))
- `Drawer`:
  - When `visible` is `false`, pressing `esc` triggers `onEscKeydown` and `onCancel` events @betavs ([#3836](https://github.com/Tencent/tdesign-vue-next/pull/3836))
  - Fix the issue where any key triggers `Drawer` when `closeOnEscKeydown` is enabled @ruanlinxin ([#3904](https://github.com/Tencent/tdesign-vue-next/pull/3904))
- `Input`: Fix the issue where `focused` style is not removed in disabled state @wilonjiang ([#3840](https://github.com/Tencent/tdesign-vue-next/pull/3840))
- `TreeSelect`: Fix the issue where search box content is not synchronized with `filter` function when filtering is enabled @PeterJayawesome ([#3862](https://github.com/Tencent/tdesign-vue-next/pull/3862))
- `VirtualScroll`: Modify `buffer` implementation in `virtual`, fix incorrect translateY calculation logic @Cat1007 ([#3776](https://github.com/Tencent/tdesign-vue-next/pull/3776))
- `Slider`: @uyarn
  - Fix abnormal usage issue when `step` is set to less than `1` ([#3883](https://github.com/Tencent/tdesign-vue-next/pull/3883))
  - Fix the issue where `onChange` event in `inputProps` cannot be triggered normally ([#3906](https://github.com/Tencent/tdesign-vue-next/pull/3906))
- `Loading`: Fix the issue of not setting `z-index` default value @betavs ([#3881](https://github.com/Tencent/tdesign-vue-next/pull/3881))
- `DatePicker`: Fix abnormal functionality issue when separately configuring `on-visible-change` in `popupProps` @uyarn ([#3908](https://github.com/Tencent/tdesign-vue-next/pull/3908))
- `TagInput`: Fix the issue where `size` in `taginput` does not take effect on default `collapsedItems` @SadWood ([#3847](https://github.com/Tencent/tdesign-vue-next/pull/3847))
- `Radio`: Fix console error issue when pressing Enter @liweijie0812 ([#3896](https://github.com/Tencent/tdesign-vue-next/pull/3896))

### 🚧 Others
- `Form`: `trigger api` documentation updated @liweijie0812 ([#3882](https://github.com/Tencent/tdesign-vue-next/pull/3882))
- `Tree`: Example code changed from `OptionsAPI` to `CompositionAPI` @chaishi ([#3899](https://github.com/Tencent/tdesign-vue-next/pull/3899))
- `Descriptions`: Display colon example text error @czq297297 ([#3841](https://github.com/Tencent/tdesign-vue-next/pull/3841))



## 🌈 1.8.0 `2024-01-09` 
### 🚀 Features
- `Descriptions`: Add `Descriptions` description component @zhangpaopao0609 ([#3787](https://github.com/Tencent/tdesign-vue-next/pull/3787))
- `Slider`: Implement `changeEnd` event  @Lyan-u ([#3780](https://github.com/Tencent/tdesign-vue-next/pull/3780))
- `Form`: Add `title` property to `Form Item` validation information for displaying complete information when mouse hovers @sosohime ([#3779](https://github.com/Tencent/tdesign-vue-next/pull/3779))
- `ImageViewer`: Add default zoom ratio @timi137137 ([#3678](https://github.com/Tencent/tdesign-vue-next/pull/3678))
- `Radio`: Add `readonly` property @betavs ([#3814](https://github.com/Tencent/tdesign-vue-next/pull/3814))
### 🐞 Bug Fixes
- `Table`: 
  - Fix issue where asynchronously loaded rows become first row in row drag sort scenario @chaishi ([#3819](https://github.com/Tencent/tdesign-vue-next/pull/3819))
  - Drag sort scenario, fix issue where newly added elements through `push` of `data` appear in first column @chaishi ([#3822](https://github.com/Tencent/tdesign-vue-next/pull/3822))
  - Fix side effects on virtual `DOM` after `sortablejs` operates on `DOM`. @huangchen1031 ([#3825](https://github.com/Tencent/tdesign-vue-next/pull/3825))
  - Fix the issue where `EnhancedTable` tree table header operation select all selects already disabled selection rows @huangchen1031 @uyarn ([#3832](https://github.com/Tencent/tdesign-vue-next/pull/3832))
- `Cascader`: Fix error when setting `value` to value not existing in `options` in `mutiple & show-all-levels = false` scenario @Zz-ZzzZ ([#3810](https://github.com/Tencent/tdesign-vue-next/pull/3810))
- `DatePicker`: Internationalization switching invalid() @liweijie0812 ([#3818](https://github.com/Tencent/tdesign-vue-next/pull/3818))
- `TagInput`: Solve the issue of being clickable when `disabled` is true @betavs ([#3831](https://github.com/Tencent/tdesign-vue-next/pull/3831))
- `Radio`: Handle issue where `change` event is triggered even in selected state @betavs ([#3782](https://github.com/Tencent/tdesign-vue-next/pull/3782))

## 🌈 1.7.2 `2023-12-22` 
### 🚀 Features
- `Upload`: 
  - Set `uploadPastedFiles` default value to `true` @chaishi ([#3754](https://github.com/Tencent/tdesign-vue-next/pull/3754))
  - Input box type upload component, add class name `t-upload--theme-file-input` @chaishi ([#3754](https://github.com/Tencent/tdesign-vue-next/pull/3754))
- `Table`: @chaishi ([#3758](https://github.com/Tencent/tdesign-vue-next/pull/3758))
  - Row selection functionality, add `rowSelectionType` to define single/multiple selection, used to support row selection control through `selectOnRowClick` even without configuring `columns: [{ rowKey: "row-select", type: 'single' }]`
  - Row selection functionality, add `rowSelectionAllowUncheck` to control whether uncheck is allowed in single selection scenario
- `ImageViewer`: Image preview, when loading fails, do not display error text, only display icon @chaishi ([#3754](https://github.com/Tencent/tdesign-vue-next/pull/3754))
- `Menu`: Close menu after selection, maintain consistent interaction behavior with other components() @uyarn ([#3764](https://github.com/Tencent/tdesign-vue-next/pull/3764))
- `RadioGroup`: Optimize component style experience, do not execute animation in initial state when `variant` is `default-filled` @loganylwu ([#3765](https://github.com/Tencent/tdesign-vue-next/pull/3765))
- `Card`: `card` component supports passing `loadingProps` parameter @iiimix ([#3731](https://github.com/Tencent/tdesign-vue-next/pull/3731))
- `DatePicker`:  Support `cancelRangeSelectLimit` `API` @githubid0719 ([#3718](https://github.com/Tencent/tdesign-vue-next/pull/3718))
- `Dropdown`: Remove special style handling for `left` `item` @uyarn ([#3752](https://github.com/Tencent/tdesign-vue-next/pull/3752))

### 🐞 Bug Fixes

- `ImageViewer`: 
  - Remove default value setting to use default value in `globalConfig`, avoid abnormalities in different language environments @sinbadmaster ([#3709](https://github.com/Tencent/tdesign-vue-next/pull/3709))
  - Modify keyboard event binding object to avoid affecting global keyboard events @sinbadmaster ([#3712](https://github.com/Tencent/tdesign-vue-next/pull/3712))
- `Table`: 
  - Fix incorrect `trigger` value issue in `column-controller-visible-change` event parameter @chaishi ([#3716](https://github.com/Tencent/tdesign-vue-next/pull/3716))
  - Virtual scroll scenario, fix sticky `Affix` header scroll synchronization issue @Cat1007 ([#3746](https://github.com/Tencent/tdesign-vue-next/pull/3746))
  - Horizontal scroll scenario, fix issue where header does not follow scroll when pressing mouse (without releasing) to scroll horizontally in `Windows` scenario @chaishi ([#3753](https://github.com/Tencent/tdesign-vue-next/pull/3753))
  - Filterable table, fix issue where filter icon is not highlighted when filter value is `0`, @chaishi ([#3753](https://github.com/Tencent/tdesign-vue-next/pull/3753))
  - Initialization failure in `fixedRowHeight` scenario causing virtual scroll to not take effect @Cat1007 ([#3739](https://github.com/Tencent/tdesign-vue-next/pull/3739))
  -  Fix table precision, avoid unexpected scrollbars due to precision errors between header and table @Cat1007 ([#3747](https://github.com/Tencent/tdesign-vue-next/pull/3747))
- `Tree`: 
  - Handle `height` property invalid issue  @betavs ([#3717](https://github.com/Tencent/tdesign-vue-next/pull/3717))
  - Solve abnormal selected state initialization issue @TabSpace ([#3742](https://github.com/Tencent/tdesign-vue-next/pull/3742))
- `ImageViewer`: Mouse wheel zoom conforms to operational intuition @sinbadmaster ([#3738](https://github.com/Tencent/tdesign-vue-next/pull/3738))
- `DateRangePicker`: Fix issue where left and right months are the same when opening panel for the first time after selecting dates in the same month in December @Lyan-u ([#3727](https://github.com/Tencent/tdesign-vue-next/pull/3727))
- `Dialog`: Fix timing of `DialogPlugin` obtaining element operation `className` @Cat1007 ([#3732](https://github.com/Tencent/tdesign-vue-next/pull/3732))
- `DatePicker`: Fix the issue where suffix icon color changes after date selection is disabled @HaixingOoO  @uyarn ([#3752](https://github.com/Tencent/tdesign-vue-next/pull/3752))
- `Table`: Fix `Shift` continuous selection failure issue in version `1.7.1`, @chaishi ([#3753](https://github.com/Tencent/tdesign-vue-next/pull/3753))
- `Select`: Fix the issue where filtered input content is not properly cleared when reopening after version `1.6.0` @uyarn ([#3762](https://github.com/Tencent/tdesign-vue-next/pull/3762))
- `TreeSelect`: Fix the issue where filtered input content is not cleared when reopening under filterable mode @uyarn ([#3762](https://github.com/Tencent/tdesign-vue-next/pull/3762))
- `Upload`: Fix issue where state cannot return to component initial state after canceling drag upload, @chaishi ([#3754](https://github.com/Tencent/tdesign-vue-next/pull/3754))
- `InputNumber`: When `allowInputOverLimit` is `false`, `onBlur` does not trigger when number exceeds maximum value @zhaodesen ([#3722](https://github.com/Tencent/tdesign-vue-next/pull/3722))
- `Pagination`: Change total number unit from `项` to `条`, maintain content consistency @dinghuihua ([common#1687](https://github.com/Tencent/tdesign-common/pull/1687))
### 🚧 Others
- `Dialog`: Add unified dialog management hooks @AuYuHui ([#3635](https://github.com/Tencent/tdesign-vue-next/pull/3635))


## 🌈 1.7.1 `2023-12-07` 
### 🚀 Features
- `Table`: Support `thClassName` to separately add class name to table header @chaishi ([#3669](https://github.com/Tencent/tdesign-vue-next/pull/3669))
- `TimePicker`: `props.presets` preset quick time selection @liweijie0812 ([#3665](https://github.com/Tencent/tdesign-vue-next/pull/3665))
- `Dropdown`: Add conversion when `DropdownItem` passes `boolean attribute`(#3692) @Zz-ZzzZ ([#3702](https://github.com/Tencent/tdesign-vue-next/pull/3702))
### 🐞 Bug Fixes
- `Tree`: 
  - Improve `tree` node disabled state logic @TabSpace ([#3653](https://github.com/Tencent/tdesign-vue-next/pull/3653))
  - `value`, `active`, `expanded` properties support array operations to trigger view changes @TabSpace ([#3682](https://github.com/Tencent/tdesign-vue-next/pull/3682))
- `Select`: 
  - Remote search no longer performs local filtering, supports scenarios where options are remotely `trim`med or additionally processed @uyarn ([#3707](https://github.com/Tencent/tdesign-vue-next/pull/3707))
   - Fix defect where keyboard enter key cannot directly select filtered options in non-virtual scroll scenario @uyarn ([#3707](https://github.com/Tencent/tdesign-vue-next/pull/3707))
- `Loading`: `ts` type lost, `volar` hints invalid @liweijie0812 ([#3684](https://github.com/Tencent/tdesign-vue-next/pull/3684))
- `AutoComplete`: Use `lodash/escapeRegExp` to convert keyword text @ZWkang ([#3661](https://github.com/Tencent/tdesign-vue-next/pull/3661))
- `Table`: Local data pagination scenario, fix invalid row selection issue, [#3669](https://github.com/Tencent/tdesign-vue-next/pull/3669) @chaishi ([#3669](https://github.com/Tencent/tdesign-vue-next/pull/3669))
- `DropdownItem`: Handle clickable issue in disabled state @betavs ([#3696](https://github.com/Tencent/tdesign-vue-next/pull/3696))
- `Tabs`: Optimize initialization scroll scenario, further optimize scenarios in the middle @uyarn ([#3699](https://github.com/Tencent/tdesign-vue-next/pull/3699))
- `Popup`: Fix console error @liweijie0812 ([#3705](https://github.com/Tencent/tdesign-vue-next/pull/3705))
- `Pagination`: Pagination component `foldedMaxPageBtn` optimization @DYS1230 ([#3704](https://github.com/Tencent/tdesign-vue-next/pull/3704))
- `BreadcrumbItem`: Fix issue where `target` property set to `_blank` does not open in new tab() @selicens ([#3637](https://github.com/Tencent/tdesign-vue-next/pull/3637))
- `AutoComplete`: Enter does not trigger selection event when no item is selected @liweijie0812 ([#3700](https://github.com/Tencent/tdesign-vue-next/pull/3700))
### 🚧 Others
- `BaseUsage`: Code formatting for basic examples section @coderYangLiu ([#3654](https://github.com/Tencent/tdesign-vue-next/pull/3654))
- `Doc`: Update `CONTRIBUTING.md` @uyarn ([#3681](https://github.com/Tencent/tdesign-vue-next/pull/3681))

## 🌈 1.7.0 `2023-11-22` 
### 🚀 Features
- `Statistic`: Add `Statistic` statistical value component @liweijie0812 ([#3329](https://github.com/Tencent/tdesign-vue-next/pull/3329))
- `Loading`: When calling using `Plugin` or directive, hiding `Loading` will remove the `app` instance @Zz-ZzzZ ([#3576](https://github.com/Tencent/tdesign-vue-next/pull/3576))
- `Space`: Support old browsers to display spacing between child elements normally, () @chaishi ([#3565](https://github.com/Tencent/tdesign-vue-next/pull/3565))
- `Input`: `value` supports data type `number` @chaishi ([#3600](https://github.com/Tencent/tdesign-vue-next/pull/3600))
- `Tabs`: Add logic to calculate scroll distance for extra-long scenarios after scrolling @uyarn ([#3624](https://github.com/Tencent/tdesign-vue-next/pull/3624))
- `Tabs`: Support use of `action` @uyarn ([#3624](https://github.com/Tencent/tdesign-vue-next/pull/3624))
### 🐞 Bug Fixes
- `Affix`: Add element null check to avoid element not exist error @chaishi ([#3584](https://github.com/Tencent/tdesign-vue-next/pull/3584))
- `Radio`: `useKeyboard` matches `space` through regex, fix misidentifying delete key (`backspace`) as space key (`space`) @liweijie0812 ([#3599](https://github.com/Tencent/tdesign-vue-next/pull/3599))
- `Checkbox`: `useKeyboardEvent ` matches `space` through regex, fix misidentifying delete key (`backspace`) as space key (`space`) @liweijie0812 ([#3599](https://github.com/Tencent/tdesign-vue-next/pull/3599))
- `Collapse`: Custom right operation click triggered collapse event  () @liweijie0812 ([#3581](https://github.com/Tencent/tdesign-vue-next/pull/3581))
- `Hooks`: Fix error when not using callback `Props` function when using `dragSort` @SuperManito ([#3592](https://github.com/Tencent/tdesign-vue-next/pull/3592))
- `Select`: Fix issue where options cannot be selected by enter key in multiple selection mode after version `1.6.6` @wilonjiang ([#3608](https://github.com/Tencent/tdesign-vue-next/pull/3608))
- `Cascader`: Fix error when default value does not exist in options @PengYYYYY ([#3611](https://github.com/Tencent/tdesign-vue-next/pull/3611))
- `Dialog`: Fix error when closing more than three nested levels with `attach="body"` `destroyOnClose` @AuYuHui ([#3619](https://github.com/Tencent/tdesign-vue-next/pull/3619))
- `Table`: Fix column configuration function failure issue in multi-level header scenario @chaishi ([#3622](https://github.com/Tencent/tdesign-vue-next/pull/3622))
### 🚧 Others
- `Table`: Optimize example code @chaishi ([#3584](https://github.com/Tencent/tdesign-vue-next/pull/3584))

## 🌈 1.6.8 `2023-11-07` 
### 🚀 Features
- `ImageViewer`: Add support for `closeOnEscKeydown`, used to control whether ESC key can exit preview, @chaishi ([#3566](https://github.com/Tencent/tdesign-vue-next/pull/3566))
- `Upload`:  @chaishi
   - Image preview function, add support for passing through all image preview properties `imageViewerProps` ([#3566](https://github.com/Tencent/tdesign-vue-next/pull/3566))
   - ⚠️ Add image upload size limit reminder, businesses with additional separate implementation of this function should note whether there is duplicate display of size limit reminder ([#3566](https://github.com/Tencent/tdesign-vue-next/pull/3566))
   - In multi-file/image upload scenario, when `autoUpload=false`, support using Props property/function/slot and other methods to customize upload button and cancel upload button ([#3566](https://github.com/Tencent/tdesign-vue-next/pull/3566))
   - In multi-file/image upload scenario, when `autoUpload=false`, distinguish between uploaded state and pending upload state ([#3566](https://github.com/Tencent/tdesign-vue-next/pull/3566))
   - Batch file upload supports displaying upload failure reason in list ([#3566](https://github.com/Tencent/tdesign-vue-next/pull/3566))
   - Add support for `fileListDisplay=null` to control single file or file list not to display ([#3573](https://github.com/Tencent/tdesign-vue-next/pull/3573))
### 🐞 Bug Fixes
- `Table`: 
   - Fix cell editing failure issue caused by `v1.6.7` @chaishi ([#3577](https://github.com/Tencent/tdesign-vue-next/pull/3577))
   - Multi-level header + column width adjustment scenario, fix dynamic column header width calculation error @Cat1007 ([#3552](https://github.com/Tencent/tdesign-vue-next/pull/3552))
   - When providing column configuration options, by default only provide leaf columns as configuration options, as the finest granularity configuration method @Cat1007 ([#3555](https://github.com/Tencent/tdesign-vue-next/pull/3555))
   - Fix column width reset judgment issue when columns change @Cat1007 ([#3568](https://github.com/Tencent/tdesign-vue-next/pull/3568))
   - Fix issue where unexpected scrollbars appear due to header being too small or header height update error when dynamic columns change @Cat1007 ([#3557](https://github.com/Tencent/tdesign-vue-next/pull/3557))
- `TreeSelect`: Handle abnormal imported style file issue @betavs ([#3556](https://github.com/Tencent/tdesign-vue-next/pull/3556))
- `Upload`: @chaishi
   - Fix issue where upload file cannot be replaced when `max=1 multiple=false` ([#3566](https://github.com/Tencent/tdesign-vue-next/pull/3566))
   - Image upload scenario, fix issue where disabled card cannot be displayed ([#3573](https://github.com/Tencent/tdesign-vue-next/pull/3573))
- `Tree`: Provide api to get tree structure data: getTreeData @TabSpace ([#3571](https://github.com/Tencent/tdesign-vue-next/pull/3571))
- `Dialog`: Fix error when updating className and overwriting component's original className when calling in Plugin mode @Zz-ZzzZ ([#3570](https://github.com/Tencent/tdesign-vue-next/pull/3570))


## 🌈 1.6.7 `2023-11-01` 
### 🚀 Features
- `Table`: 
  - Editable cell scenario, support updating value of any cell in current row edit state through `updateEditedCellValue` method @chaishi ([#3522](https://github.com/Tencent/tdesign-vue-next/pull/3522))
  - Editable cell, support using `updateEditedCellValue` to update entire row edit state data @chaishi ([#3536](https://github.com/Tencent/tdesign-vue-next/pull/3536))
  - Under multi-level header, dynamic column configuration supports specifying parent column to display all its child columns @Cat1007 ([#3539](https://github.com/Tencent/tdesign-vue-next/pull/3539))
- `Slider`: Add function method parameter support for `label` ([#3470](https://github.com/Tencent/tdesign-vue-next/pull/3470))@liect ([#3502](https://github.com/Tencent/tdesign-vue-next/pull/3502))
- `Timeline`: `TimelineItem` adds `onClick` event @liweijie0812 ([#3512](https://github.com/Tencent/tdesign-vue-next/pull/3512))
- `Select`: Support ability to scroll to visible option range when selecting by keyboard @uyarn ([#3542](https://github.com/Tencent/tdesign-vue-next/pull/3542))
### 🐞 Bug Fixes
- `Table`: 
  - `primaryTableRef` not bound, causing its exported methods to be unusable @AuYuHui ([#3528](https://github.com/Tencent/tdesign-vue-next/pull/3528))
  - Editable cell, fix issue where `editedRow` received by other columns is not the latest data when cell data in a column changes @chaishi ([#3536](https://github.com/Tencent/tdesign-vue-next/pull/3536))
- `Select`: 
  - Fix error in selecting filtered items by keyboard enter under virtual scroll @uyarn ([#3542](https://github.com/Tencent/tdesign-vue-next/pull/3542))
  - Fix style defects for small and large sizes in multiple selection mode by @Zzongke ([#3542](https://github.com/Tencent/tdesign-vue-next/pull/3542))
- `Tree`: 
  - Improve controlled logic, solve delay in component state passing when `onChange` event is triggered @TabSpace ([#3509](https://github.com/Tencent/tdesign-vue-next/pull/3509))
  - Solve `watch` timing issue @TabSpace ([#3526](https://github.com/Tencent/tdesign-vue-next/pull/3526))
- `Upload`: 
  - Fix the issue where progress cannot be displayed when `upload` is manual upload @ziyi99 ([#3531](https://github.com/Tencent/tdesign-vue-next/pull/3531))
  - Fix the issue where `Drop` event is not triggered after drag ends when dragged file does not meet `accept` configuration @ziyi99 ([#3532](https://github.com/Tencent/tdesign-vue-next/pull/3532))
- `Tabs`: Dynamically modifying `TabNav` tab count causes slide button to not meet expectations @betavs ([#3517](https://github.com/Tencent/tdesign-vue-next/pull/3517))
- `Timeline`: Fix incorrect default value of `TimelineItem`'s `dotColor` @liweijie0812 ([#3512](https://github.com/Tencent/tdesign-vue-next/pull/3512))
- `Pagination`: Fix triggering `onCurrentChange` event when current page is passively changed @Zz-ZzzZ ([#3511](https://github.com/Tencent/tdesign-vue-next/pull/3511))
- `Menu`: Fix style issue when menu is collapsed by @RayJason ([#3542](https://github.com/Tencent/tdesign-vue-next/pull/3542))
- `Radio`: Fix corner style defect when there is only one option  @uyarn ([#3542](https://github.com/Tencent/tdesign-vue-next/pull/3542))
- `ColorPicker`: Fix recently used color abnormality issue @liect ([#3515](https://github.com/Tencent/tdesign-vue-next/pull/3515))
- `TreeSelect`: Fix not using `keys` alias @liect ([#3520](https://github.com/Tencent/tdesign-vue-next/pull/3520))

## 🌈 1.6.5 `2023-10-20` 
### 🚀 Features
- `TagInput`: Support scrolling in extra-long scroll mode, perform add/delete operations on options @liweijie0812 ([#3501](https://github.com/Tencent/tdesign-vue-next/pull/3501))
- `Tabs`: `destroyOnHide` default value reverts to true, please use with `destroyOnHide` set to false for lazy loading, see example for details @liweijie0812 ([#3504](https://github.com/Tencent/tdesign-vue-next/pull/3504))
### 🐞 Bug Fixes
- `Tree`: Fix the issue where not rendering when `node`'s `value` is `0` @Zz-ZzzZ ([#3500](https://github.com/Tencent/tdesign-vue-next/pull/3500))
- `SelectInput`: Fix issue where input box auto-focuses in non-multiple selection scenarios for components based on `SelectInput` such as `Select` after `1.6.2` @uyarn ([#3506](https://github.com/Tencent/tdesign-vue-next/pull/3506))
- `DatePicker`: Fix console error issue when selecting after `1.6.2` @uyarn ([#3506](https://github.com/Tencent/tdesign-vue-next/pull/3506))
### 🚧 Others
- `Select`: Fix example errors @liect ([#3503](https://github.com/Tencent/tdesign-vue-next/pull/3503))



## 🌈 1.6.4 `2023-10-19` 
### 🚀 Features
- `Table`: Filterable table, support automatic closing of filter floating layer after single selection filter (`Radio`) completes selection when setting `confirmEvents: ['onChange']` @chaishi ([#3478](https://github.com/Tencent/tdesign-vue-next/pull/3478))
- `Tabs`: Change `destroyOnHide` default value to `false` @liweijie0812 ([#3467](https://github.com/Tencent/tdesign-vue-next/pull/3467))
- `Tabs`: Add `lazy` to support tab lazy loading @liweijie0812 ([#3467](https://github.com/Tencent/tdesign-vue-next/pull/3467))
### 🐞 Bug Fixes
- `Cascader`: 
  - Fix abnormal style expression caused by using `proxy` value for top-level `class` @PengYYYYY ([#3488](https://github.com/Tencent/tdesign-vue-next/pull/3488))
  - Multiple selection scenario, search function not enabled, width adaptive mode, fix issue where width changes on mouse hover ([#1623](https://github.com/Tencent/tdesign-common/pull/1623))
- `SelectInput`: 
  - `renderPrefixContent` returns `[null,undefined]` or `[undefined,undefined]`, passing to `input props.label`, causing `input` to render empty `t-input__prefix` node @liweijie0812 ([#3479](https://github.com/Tencent/tdesign-vue-next/pull/3479))
  - Fix inability to input or focus on focusable elements such as "input box", "number input box" in dropdown @chaishi ([#3492](https://github.com/Tencent/tdesign-vue-next/pull/3492))
- `ImageViewer`: Control bar widget center data, precision loss issue when step value is not `0.5` @xiaojueshi ([#3476](https://github.com/Tencent/tdesign-vue-next/pull/3476))
- `DatePicker`: `prefixIcon` slot does not take effect @liweijie0812 ([#3479](https://github.com/Tencent/tdesign-vue-next/pull/3479))
- `TagInput`: Multiple selection scenario, search function not enabled, width adaptive mode, fix issue where width changes on mouse hover ([#1623](https://github.com/Tencent/tdesign-common/pull/1623))
- `Select`: Multiple selection scenario, search function not enabled, width adaptive mode, fix issue where width changes on mouse hover ([#1623](https://github.com/Tencent/tdesign-common/pull/1623))
- `TreeSelect`: Multiple selection scenario, search function not enabled, width adaptive mode, fix issue where width changes on mouse hover ([#1623](https://github.com/Tencent/tdesign-common/pull/1623))
- `Grid`: Fix type issue where `Row` and `Col` child component configuration properties are all required @uyarn ([#3491](https://github.com/Tencent/tdesign-vue-next/pull/3491))

## 🌈 1.6.2 `2023-10-12` 
### 🚀 Features
- `Tag`: `CheckTag` supports multiple style tag configurations @chaishi ([#3419](https://github.com/Tencent/tdesign-vue-next/pull/3419))
- `Tag`: Support tag group `CheckTagGroup` selection @chaishi ([#3419](https://github.com/Tencent/tdesign-vue-next/pull/3419))
### 🐞 Bug Fixes
- `Badge`: Border rounded square style([common#1617](https://github.com/Tencent/tdesign-common/pull/1617)) @liweijie0812 ([#3461](https://github.com/Tencent/tdesign-vue-next/pull/3461))
- `Badge`: When `dot` is enabled, ignore shape setting @liweijie0812 ([#3461](https://github.com/Tencent/tdesign-vue-next/pull/3461))
- `Table`: Fix invalid controlled property `activeRowKeys` for row highlighting @chaishi ([#3463](https://github.com/Tencent/tdesign-vue-next/pull/3463))

## 🌈 1.6.1 `2023-10-11` 
### 🚀 Features
- `Table`: 
  - Keyboard operation, editable cell, support using `Tab` key to switch editable cells for quick modification @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
  - Keyboard operation, optimize row highlight keyboard operation and style, compatible with row selection function @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
  - Keyboard operation, row selection function supports keyboard operations for select, cancel select, select all, cancel select all without setting row highlight @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
  - Tree structure table, support scrolling to specified row through row unique identifier (previously only supported scrolling to specified row through row index) @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
  - Support entire table lazy loading @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
- `Popup`: Component adds instance methods `update/getOverlay/getOverlayState`, used to update or get floating layer content, state, etc. @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
- `Select`: Support keyboard operation dropdown option selection or cancellation @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
- `Cascader`: Support using `valueDisplay` to customize content presentation of selected items @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
- `Tree`: Provide virtual scroll capability @TabSpace ([#3410](https://github.com/Tencent/tdesign-vue-next/pull/3410))
- `Badge`: `content`, `count` slot support @liweijie0812 ([#3454](https://github.com/Tencent/tdesign-vue-next/pull/3454))

### 🐞 Bug Fixes
- `Input`: Correct focus and blur events, when component is already in focus state, clicking `label/suffix/prefix/icon` and other elements no longer repeatedly triggers blur and focus events @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
- `TagInput`: Correct focus and blur events, when component is already in focus state, clicking tags no longer repeatedly triggers blur and focus events @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
- `Select`: 
  - Correct focus and blur events, no longer auto blur when dropdown option is selected to continue switching options @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
  - Abnormal functionality when using keyboard up/down keys to select after filtering @liweijie0812 ([#3420](https://github.com/Tencent/tdesign-vue-next/pull/3420))
  - Fix dropdown option flashing @betavs ([#3418](https://github.com/Tencent/tdesign-vue-next/pull/3418))
- `Cascader`: 
  - Correct focus and blur events, no longer auto blur when dropdown option is selected to continue switching options @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
   - Fix `cascader` rendering redundant `tag-input__prefix` element causing abnormal expression @PengYYYYY ([#3446](https://github.com/Tencent/tdesign-vue-next/pull/3446))
  - `source` abnormality issue in `change` event @PengYYYYY ([#3456](https://github.com/Tencent/tdesign-vue-next/pull/3456))
- `Tree`: Solve the issue where `setData` method cannot trigger property changes @TabSpace ([#3410](https://github.com/Tencent/tdesign-vue-next/pull/3410))
- `Form`: Fix the issue where parameter is empty when `statusIcon` is function or slot @SBDaQingWa ([#3449](https://github.com/Tencent/tdesign-vue-next/pull/3449))
### 🚧 Others
- docs: Add `CodeSandbox` support @LadyChatterleyLover ([#3422](https://github.com/Tencent/tdesign-vue-next/pull/3422))

## 🌈 1.6.8 `2023-11-07` 
### 🚀 Features
- `ImageViewer`: Add support for `closeOnEscKeydown` to control whether ESC key closes preview @chaishi ([#3566](https://github.com/Tencent/tdesign-vue-next/pull/3566))
- `Upload`: @chaishi
   - Image preview feature now supports passing through all image preview properties via `imageViewerProps` ([#3566](https://github.com/Tencent/tdesign-vue-next/pull/3566))
   - ⚠️ Added image upload size limit reminder, businesses that already implement this feature should check for duplicate size limit reminders ([#3566](https://github.com/Tencent/tdesign-vue-next/pull/3566))
   - Multi-file/image upload scenarios, when `autoUpload=false`, support customizing upload button and cancel upload button using Props/function/slot methods ([#3566](https://github.com/Tencent/tdesign-vue-next/pull/3566))
   - Multi-file/image upload scenarios, when `autoUpload=false`, distinguish between uploaded state and pending upload state ([#3566](https://github.com/Tencent/tdesign-vue-next/pull/3566))
   - Batch file upload supports displaying upload failure reasons in the list ([#3566](https://github.com/Tencent/tdesign-vue-next/pull/3566))
   - Add support for `fileListDisplay=null` to control single file or file list not being displayed ([#3573](https://github.com/Tencent/tdesign-vue-next/pull/3573))
### 🐞 Bug Fixes
- `Table`: 
   - Fix cell editing failure issue introduced in `v1.6.7` @chaishi ([#3577](https://github.com/Tencent/tdesign-vue-next/pull/3577))
   - Multi-level header + column width adjustment scenario, fix incorrect calculation of dynamic column header width @Cat1007 ([#3552](https://github.com/Tencent/tdesign-vue-next/pull/3552))
   - When providing column configuration options, only provide leaf columns as configuration options by default, as the finest granularity configuration method @Cat1007 ([#3555](https://github.com/Tencent/tdesign-vue-next/pull/3555))
   - Fix judgment issue of column width reset when columns change @Cat1007 ([#3568](https://github.com/Tencent/tdesign-vue-next/pull/3568))
   - Fix the issue where unexpected scroll bars appear due to header being too small or header height update error when dynamic columns change @Cat1007 ([#3557](https://github.com/Tencent/tdesign-vue-next/pull/3557))
- `TreeSelect`: Handle abnormal imported style files @betavs ([#3556](https://github.com/Tencent/tdesign-vue-next/pull/3556))
- `Upload`: @chaishi
   - Fix issue where files cannot be replaced when `max=1 multiple=false` ([#3566](https://github.com/Tencent/tdesign-vue-next/pull/3566))
   - Image upload scenario, fix issue where disabled card cannot be displayed ([#3573](https://github.com/Tencent/tdesign-vue-next/pull/3573))
- `Tree`: Provide API to get tree structure data: getTreeData @TabSpace ([#3571](https://github.com/Tencent/tdesign-vue-next/pull/3571))
- `Dialog`: Fix error and className override when calling as Plugin @Zz-ZzzZ ([#3570](https://github.com/Tencent/tdesign-vue-next/pull/3570))


## 🌈 1.6.7 `2023-11-01` 
### 🚀 Features
- `Table`: 
  - Editable cell scenario, support updating current row editing state any cell value through `updateEditedCellValue` method @chaishi ([#3522](https://github.com/Tencent/tdesign-vue-next/pull/3522))
  - Editable cell, support updating entire row editing state data using `updateEditedCellValue` @chaishi ([#3536](https://github.com/Tencent/tdesign-vue-next/pull/3536))
  - Multi-level header, dynamic column configuration supports specifying parent column to display all its child columns @Cat1007 ([#3539](https://github.com/Tencent/tdesign-vue-next/pull/3539))
- `Slider`: Add function parameter support for `label` ([#3470](https://github.com/Tencent/tdesign-vue-next/pull/3470))@liect ([#3502](https://github.com/Tencent/tdesign-vue-next/pull/3502))
- `Timeline`: `TimelineItem` add `onClick` event @liweijie0812 ([#3512](https://github.com/Tencent/tdesign-vue-next/pull/3512))
- `Select`: Support scrolling to visible option range when selecting via keyboard @uyarn ([#3542](https://github.com/Tencent/tdesign-vue-next/pull/3542))
### 🐞 Bug Fixes
- `Table`: 
  - `primaryTableRef` not bound, causing its exported methods to be unusable @AuYuHui ([#3528](https://github.com/Tencent/tdesign-vue-next/pull/3528))
  - Editable cell, fix issue where other columns receive non-latest `editedRow` when a column's cell data changes @chaishi ([#3536](https://github.com/Tencent/tdesign-vue-next/pull/3536))
- `Select`: 
  - Fix incorrect keyboard enter selection of filtered items in virtual scrolling @uyarn ([#3542](https://github.com/Tencent/tdesign-vue-next/pull/3542))
  - Fix style defects for small and large sizes in multiple selection by @Zzongke ([#3542](https://github.com/Tencent/tdesign-vue-next/pull/3542))
- `Tree`: 
  - Improve controlled logic, resolve delay in component state delivery when `onChange` event triggers @TabSpace ([#3509](https://github.com/Tencent/tdesign-vue-next/pull/3509))
  - Resolve `watch` timing issue @TabSpace ([#3526](https://github.com/Tencent/tdesign-vue-next/pull/3526))
- `Upload`: 
  - Fix issue where progress cannot be displayed when `upload` is manual upload @ziyi99 ([#3531](https://github.com/Tencent/tdesign-vue-next/pull/3531))
  - Fix issue where `Drop` event is not triggered after drag ends when dragged file does not meet `accept` configuration @ziyi99 ([#3532](https://github.com/Tencent/tdesign-vue-next/pull/3532))
- `Tabs`: Dynamic modification of `TabNav` tab quantity causes slide button to not meet expectations @betavs ([#3517](https://github.com/Tencent/tdesign-vue-next/pull/3517))
- `Timeline`: Fix incorrect default value of `TimelineItem`'s `dotColor` @liweijie0812 ([#3512](https://github.com/Tencent/tdesign-vue-next/pull/3512))
- `Pagination`: Fix triggering `onCurrentChange` event when current page is passively changed @Zz-ZzzZ ([#3511](https://github.com/Tencent/tdesign-vue-next/pull/3511))
- `Menu`: Fix menu collapse style issue by @RayJason ([#3542](https://github.com/Tencent/tdesign-vue-next/pull/3542))
- `Radio`: Fix corner style defect for single option @uyarn ([#3542](https://github.com/Tencent/tdesign-vue-next/pull/3542))
- `ColorPicker`: Fix recently used colors abnormality @liect ([#3515](https://github.com/Tencent/tdesign-vue-next/pull/3515))
- `TreeSelect`: Fix not using `keys` alias @liect ([#3520](https://github.com/Tencent/tdesign-vue-next/pull/3520))

## 🌈 1.6.5 `2023-10-20` 
### 🚀 Features
- `TagInput`: Support scrolling in ultra-long scroll mode, performing add/delete operations on options @liweijie0812 ([#3501](https://github.com/Tencent/tdesign-vue-next/pull/3501))
- `Tabs`: `destroyOnHide` default value reverted to true, please use with `destroyOnHide` set to false for lazy loading, see example for details @liweijie0812 ([#3504](https://github.com/Tencent/tdesign-vue-next/pull/3504))
### 🐞 Bug Fixes
- `Tree`: Fix issue where node with `value` of `0` is not rendered @Zz-ZzzZ ([#3500](https://github.com/Tencent/tdesign-vue-next/pull/3500))
- `SelectInput`: Fix auto-focus input box issue after `1.6.2` for non-multiple selection scenarios based on `SelectInput` components like `Select` @uyarn ([#3506](https://github.com/Tencent/tdesign-vue-next/pull/3506))
- `DatePicker`: Fix console error after selection after `1.6.2` @uyarn ([#3506](https://github.com/Tencent/tdesign-vue-next/pull/3506))
### 🚧 Others
- `Select`: Fix example errors @liect ([#3503](https://github.com/Tencent/tdesign-vue-next/pull/3503))



## 🌈 1.6.4 `2023-10-19` 
### 🚀 Features
- `Table`: Filterable table, support setting `confirmEvents: ['onChange']` to automatically close filter popup after radio filter (`Radio`) selection @chaishi ([#3478](https://github.com/Tencent/tdesign-vue-next/pull/3478))
- `Tabs`: `destroyOnHide` default value changed to `false` @liweijie0812 ([#3467](https://github.com/Tencent/tdesign-vue-next/pull/3467))
- `Tabs`: Add `lazy` to support tab lazy loading @liweijie0812 ([#3467](https://github.com/Tencent/tdesign-vue-next/pull/3467))
### 🐞 Bug Fixes
- `Cascader`: 
  - Fix top-level `class` using `proxy` value, causing abnormal style performance @PengYYYYY ([#3488](https://github.com/Tencent/tdesign-vue-next/pull/3488))
  - Multiple selection scenario, search function not enabled, width auto-adapt mode, fix width change issue when hovering mouse ([#1623](https://github.com/Tencent/tdesign-common/pull/1623))
- `SelectInput`: 
  - `renderPrefixContent` returns `[null,undefined]` or `[undefined,undefined]`, passed to `input props.label`, causing `input` to render empty `t-input__prefix` node @liweijie0812 ([#3479](https://github.com/Tencent/tdesign-vue-next/pull/3479))
  - Fix inability to input or focus on "input box", "number input box" and other focusable elements in dropdown @chaishi ([#3492](https://github.com/Tencent/tdesign-vue-next/pull/3492))
- `ImageViewer`: Control bar center data precision loss when step value is not `0.5` @xiaojueshi ([#3476](https://github.com/Tencent/tdesign-vue-next/pull/3476))
- `DatePicker`: `prefixIcon` slot not working @liweijie0812 ([#3479](https://github.com/Tencent/tdesign-vue-next/pull/3479))
- `TagInput`: Multiple selection scenario, search function not enabled, width auto-adapt mode, fix width change issue when hovering mouse ([#1623](https://github.com/Tencent/tdesign-common/pull/1623))
- `Select`: Multiple selection scenario, search function not enabled, width auto-adapt mode, fix width change issue when hovering mouse ([#1623](https://github.com/Tencent/tdesign-common/pull/1623))
- `TreeSelect`: Multiple selection scenario, search function not enabled, width auto-adapt mode, fix width change issue when hovering mouse ([#1623](https://github.com/Tencent/tdesign-common/pull/1623))
- `Grid`: Fix type issue where both `Row` and `Col` subcomponent configuration properties are required @uyarn ([#3491](https://github.com/Tencent/tdesign-vue-next/pull/3491))

## 🌈 1.6.2 `2023-10-12` 
### 🚀 Features
- `Tag`: `CheckTag` supports multiple style tag configurations @chaishi ([#3419](https://github.com/Tencent/tdesign-vue-next/pull/3419))
- `Tag`: Support tag group `CheckTagGroup` selection @chaishi ([#3419](https://github.com/Tencent/tdesign-vue-next/pull/3419))
### 🐞 Bug Fixes
- `Badge`: Border rounded square style ([common#1617](https://github.com/Tencent/tdesign-common/pull/1617)) @liweijie0812 ([#3461](https://github.com/Tencent/tdesign-vue-next/pull/3461))
- `Badge`: Enable `dot` to ignore shape setting @liweijie0812 ([#3461](https://github.com/Tencent/tdesign-vue-next/pull/3461))
- `Table`: Fix row highlight controlled property `activeRowKeys` invalid issue @chaishi ([#3463](https://github.com/Tencent/tdesign-vue-next/pull/3463))

## 🌈 1.6.1 `2023-10-11` 
### 🚀 Features
- `Table`: 
  - Keyboard operation, editable cells, support using `Tab` key to switch editable cells for quick modification operations @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
  - Keyboard operation, optimize row highlight keyboard operations and styles, compatible with row selection feature @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
  - Keyboard operation, row selection feature supports keyboard operations to select, deselect, select all, deselect all without setting row highlight @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
  - Tree structure table, support scrolling to specified row through row unique identifier (previously only through row index) @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
  - Support entire table lazy loading @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
- `Popup`: Component adds instance methods `update/getOverlay/getOverlayState` for updating or getting overlay content, state, etc @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
- `Select`: Support keyboard operation to select or cancel dropdown options @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
- `Cascader`: Support using `valueDisplay` to customize selected item content presentation @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
- `Tree`: Provide virtual scrolling capability @TabSpace ([#3410](https://github.com/Tencent/tdesign-vue-next/pull/3410))
- `Badge`: `content`, `count` slot support @liweijie0812 ([#3454](https://github.com/Tencent/tdesign-vue-next/pull/3454))

### 🐞 Bug Fixes
- `Input`: Focus and blur event correction, when component is already in focus state, clicking `label/suffix/prefix/icon` elements no longer repeatedly triggers one blur and focus event @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
- `TagInput`: Focus and blur event correction, when component is already in focus state, clicking tag no longer repeatedly triggers one blur and focus event @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
- `Select`: 
  - Focus and blur event correction, dropdown option selection no longer auto-blur to allow continuing to switch options @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
  - Keyboard up/down arrow selection function abnormal after filtering @liweijie0812 ([#3420](https://github.com/Tencent/tdesign-vue-next/pull/3420))
  - Fix dropdown option flash @betavs ([#3418](https://github.com/Tencent/tdesign-vue-next/pull/3418))
- `Cascader`: 
  - Focus and blur event correction, dropdown option selection no longer auto-blur to allow continuing to switch options @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
   - Fix `cascader` rendering extra `tag-input__prefix` element causing abnormal performance @PengYYYYY ([#3446](https://github.com/Tencent/tdesign-vue-next/pull/3446))
  - `source` abnormality in `change` event @PengYYYYY ([#3456](https://github.com/Tencent/tdesign-vue-next/pull/3456))
- `Tree`: Resolve issue where `setData` method cannot trigger property changes @TabSpace ([#3410](https://github.com/Tencent/tdesign-vue-next/pull/3410))
- `Form`: Fix the issue where parameter is empty when `statusIcon` is function or slot @SBDaQingWa ([#3449](https://github.com/Tencent/tdesign-vue-next/pull/3449))
### 🚧 Others
- docs: Add `CodeSandbox` support @LadyChatterleyLover ([#3422](https://github.com/Tencent/tdesign-vue-next/pull/3422))

## 🌈 1.5.7 `2023-09-21` 
### 🚀 Features
- `Table`: Support configuring all component text through property `local` @chaishi ([#3380](https://github.com/Tencent/tdesign-vue-next/pull/3380))
- `Card`: `title` uses `div` instead of `span` to be more compliant in custom scenarios @uyarn ([#3385](https://github.com/Tencent/tdesign-vue-next/pull/3385))
### 🐞 Bug Fixes
- `Dialog`: 
  - Fix `Dialog plugin` event destroys `Dialog` without destroying `wrapper`, causing multiple `wrapper`s on page @Zzongke ([#3383](https://github.com/Tencent/tdesign-vue-next/pull/3383))
  - Fix issue where `confirmLoading` is invalid when confirm button properties are not defined (i.e., `confirmBtn` is not set) @chaishi ([#3393](https://github.com/Tencent/tdesign-vue-next/pull/3393))
- `Table`: Column configuration popup, not destroyed by default when closed @chaishi ([#3380](https://github.com/Tencent/tdesign-vue-next/pull/3380))
- `Checkbox`: Fix exception caused by `checkbox-group`'s `innerValue.value` being `undefined` @Nice-PLQ ([#3405](https://github.com/Tencent/tdesign-vue-next/pull/3405))
- `List`: Fix `list-item` losing `props` exception in version `1.5.6` @uyarn ([#3376](https://github.com/Tencent/tdesign-vue-next/pull/3376))
## 🌈 1.5.6 `2023-09-14` 
### 🚀 Features
- `Table`: 
  - Editable cells, support passing through editing component event properties `edit.props.onChange` @chaishi ([#3353](https://github.com/Tencent/tdesign-vue-next/pull/3353))
  - Highlightable row table, support mouse click to highlight table row, support keyboard operations to highlight rows (ArrowDown/ArrowUp/Space/ESC/Shift), support continuous highlight row region @chaishi ([#3353](https://github.com/Tencent/tdesign-vue-next/pull/3353))
  - Hoverable table, in addition to mouse hovering table rows, now supports keyboard operations to hover table rows @chaishi ([#3353](https://github.com/Tencent/tdesign-vue-next/pull/3353))
  - Selectable row table, support keyboard operations (ArrowDown/ArrowUp/Space/ESC/Shift) @chaishi ([#3353](https://github.com/Tencent/tdesign-vue-next/pull/3353))
  - In addition to global configuration supporting language configuration, now supports language configuration for individual components through property `local` @chaishi ([#3362](https://github.com/Tencent/tdesign-vue-next/pull/3362))
  - Column configuration feature, support defining `columnControllerTopContent` and `columnControllerBottomContent` to define top or bottom content of column configuration popup @chaishi ([#3362](https://github.com/Tencent/tdesign-vue-next/pull/3362))
  - Column configuration feature, support grouped display of column configuration information, generally used for scenarios where table columns are particularly numerous and need categorical display @chaishi ([#3362](https://github.com/Tencent/tdesign-vue-next/pull/3362))
- `SelectInput`: Add `valueDisplayOptions`, can be configured to also use built-in placeholder and input echo implementation when using `valueDisplay` @ngyyuusora ([#3342](https://github.com/Tencent/tdesign-vue-next/pull/3342))
- `List`: Support virtual scrolling @uyarn ([#3360](https://github.com/Tencent/tdesign-vue-next/pull/3360))
- `TreeSelect`: Support usage of `panelTopContent` and `panelBottomContent` @uyarn ([#3355](https://github.com/Tencent/tdesign-vue-next/pull/3355))

### 🐞 Bug Fixes
- `Table`: 
  - Fix issue where pagination component information appears truncated when opening table in Dialog popup @chaishi ([#3352](https://github.com/Tencent/tdesign-vue-next/pull/3352))
  - Column configuration feature, fix issue where each time custom column configuration popup is opened, a new popup is created without removing old popup @chaishi ([#3362](https://github.com/Tencent/tdesign-vue-next/pull/3362))
- `Dialog`: 
  - Fix issue where pagination component information appears truncated when opening table in Dialog popup @chaishi ([#3352](https://github.com/Tencent/tdesign-vue-next/pull/3352))
  - Type issue, fix DialogPlugin({ cancenBtn: '取消' }) type missing reminder @chaishi ([#3352](https://github.com/Tencent/tdesign-vue-next/pull/3352))
- `Cascader`: Fix `borderless` invalid @PengYYYYY ([#3359](https://github.com/Tencent/tdesign-vue-next/pull/3359))
- `Pagination`: Fix issue where pagination component information appears truncated when opening table in Dialog popup @chaishi ([#3352](https://github.com/Tencent/tdesign-vue-next/pull/3352))
- `Input`: Fix auto-width calculation error in scenarios where it doesn't display by default and only displays after meeting certain conditions @chaishi ([#3352](https://github.com/Tencent/tdesign-vue-next/pull/3352))
- `useResizeObserver`: Fix missing container element null check @chaishi ([#3372](https://github.com/Tencent/tdesign-vue-next/pull/3372))
### 🚧 Others
- `Tree`: Update filterable tree Demo @liweijie0812 ([#3326](https://github.com/Tencent/tdesign-vue-next/pull/3326))
## 🌈 1.5.4 `2023-09-07` 
### 🚀 Features
- `Table`: @chaishi
  - Filterable table, `onFilterChange` event adds parameter `trigger: 'filter-change' | 'confirm' | 'reset' | 'clear'`, indicating the source that triggered the filter condition change ([#3316](https://github.com/Tencent/tdesign-vue-next/pull/3316))
  - Filterable table, support using `filter.label` to separately define filter item alias, can be different from `title` ([#3321](https://github.com/Tencent/tdesign-vue-next/pull/3321))
- `Watermark`: Text adds `fontFamily` property @LadyChatterleyLover ([#3314](https://github.com/Tencent/tdesign-vue-next/pull/3314))
- `Dialog`: @chaishi
   - Support using `confirmLoading` to control confirm button loading state ([#3343](https://github.com/Tencent/tdesign-vue-next/pull/3343))
   - Component instance function adds `confirmDialog.setConfirmLoading(true)` and `confirmDialog.update({ confirmLoading: true })` for setting confirm button loading state ([#3343](https://github.com/Tencent/tdesign-vue-next/pull/3343))
- `TreeSelect`: Tree select supports suffix and suffixIcon @ngyyuusora ([#3290](https://github.com/Tencent/tdesign-vue-next/pull/3290))
### 🐞 Bug Fixes
- `Form`: Fix form component scrollToFirstError invalid issue @dreamlords ([#3294](https://github.com/Tencent/tdesign-vue-next/pull/3294))
- `Table`: @chaishi
   - Filterable table, fix issue where `resetValue` fails to reset to specified `resetValue` value when clearing filters ([#3316](https://github.com/Tencent/tdesign-vue-next/pull/3316))
   - Filterable table, fix issue where filter icon is not highlighted when filter item value is `false` ([#3321](https://github.com/Tencent/tdesign-vue-next/pull/3321))
   - Tree structure, draggable row order adjustment, fix incorrect position of expanded child nodes of last node ([#3296](https://github.com/Tencent/tdesign-vue-next/pull/3296))
   - Tree structure, fix `tree.defaultExpandAll` invalid issue in `v1.5.3` ([#3296](https://github.com/Tencent/tdesign-vue-next/pull/3296))
   - Tree structure table, fix expandedTreeNodes.sync and @expanded-tree-nodes-change invalid when using expandTreeNodeOnClick
   - Support using column configuration even without columnController @ngyyuusora ([#3301](https://github.com/Tencent/tdesign-vue-next/pull/3301))
