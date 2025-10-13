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
