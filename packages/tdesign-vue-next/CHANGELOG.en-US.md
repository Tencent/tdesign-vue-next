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
