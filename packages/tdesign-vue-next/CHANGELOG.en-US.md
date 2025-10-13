---
title: Changelog
spline: explain
toc: false
docClass: timeline
---

## 🌈 1.17.1 `2025-10-09` 

### 🐞 Bug Fixes
- `Descriptions`: Fix the 无bordermodeunder margin issue @liweijie0812 ([#6043](https://github.com/Tencent/tdesign-vue-next/pull/6043))
- `Watermark`: Fix the issue of `1.17.0` SSR scenariounder构建whenerror @Wesley-0808 ([#6047](https://github.com/Tencent/tdesign-vue-next/pull/6047))
- `Calendar`: Fix the issue of when设定日历 rangevalueas同一年内when，终止month之after monthoptionnotnormaldisabled @shumuuu ([#6045](https://github.com/Tencent/tdesign-vue-next/pull/6045))


## 🌈 1.17.0 `2025-09-25` 

### 🚀 Features
- `Watermark`: Add `layout` API，Support生成not同布局 watermark @Wesley-0808 ([#5991](https://github.com/Tencent/tdesign-vue-next/pull/5991))
- `Icon`:
- `tdesign-icons-vue-next` Release `0.4.x` version，Add`align-bottom`、`no-result`、`no-result-filled`、 `tree-list`、`wifi-no`、 `wifi-no-filled`、`logo-stackblitz-filled`、`logo-stackblitz`、`logo-wecom-filled` icons；Remove `video-camera-3`、`video-camera-3-filled`、`list` icons，此before有依赖以上Removeiconsupgradeplease note ⚠️ @uyarn ([#5968](https://github.com/Tencent/tdesign-vue-next/pull/5968))
- 按needloading方式use icons资源Supportcan变粗细function，via`strokeWidth`propertyconfiguration, 具体use参考documentation和example @uyarn ([#5968](https://github.com/Tencent/tdesign-vue-next/pull/5968))
- 按needloading方式use icons资源Support多色填充function，via`strokeColor` 和 `fillColor` propertyconfiguration，具体use参考documentation和example @uyarn ([#5968](https://github.com/Tencent/tdesign-vue-next/pull/5968))
- `ImageViewer`: Adddefault trigger render ，defaultaswhenbeforeuse image作asdefault trigger，降低component use难度，具体参考相关example改动 @EthanShen10086 ([#5935](https://github.com/Tencent/tdesign-vue-next/pull/5935))
- `Notification`: Add `onClose` event，for处理call `NotifyPlugin.close()` 相关callbackscenario @baozjj ([#5958](https://github.com/Tencent/tdesign-vue-next/pull/5958))
- `Tabs`: dragto `draggable = false` 区域when，willnotshowcan放置state @RSS1102 ([#5990](https://github.com/Tencent/tdesign-vue-next/pull/5990))

### 🐞 Bug Fixes
- `Form`: Fix the issue of validationrulein多级 name forshould FormItem errortrigger @uyarn ([#6022](https://github.com/Tencent/tdesign-vue-next/pull/6022))
- `ImageViewer`: trigger methodAddpass inimage index parameter，具体usemethod参考example @betavs ([#6016](https://github.com/Tencent/tdesign-vue-next/pull/6016))
- `Notification`: Fix the issue of call `NotifyPlugin.close()` errortrigger `onCloseBtnClick` callback @baozjj ([#5958](https://github.com/Tencent/tdesign-vue-next/pull/5958))
- `QRCode`: Fix the issue of initial value valueas空when，componentunable torender @Wesley-0808 ([#5982](https://github.com/Tencent/tdesign-vue-next/pull/5982))
- `Skeleton`: Fixuse `rowCol` when，extrarender `theme` defaultconfiguration errorbehavior @uyarn ([#6009](https://github.com/Tencent/tdesign-vue-next/pull/6009))
- `Textarea`: Fix the issue of contenttoo longcaseunder，设置 `autosize` notcompleteautomatically撑开height，存in有scrollbar @engvuchen ([#6019](https://github.com/Tencent/tdesign-vue-next/pull/6019))
- `Tree`: Fix the issue of 自definition icon 全被设as open state，causeiconscolorerror @RylanBot ([#5993](https://github.com/Tencent/tdesign-vue-next/pull/5993))
- `TreeSelect`:
- Fix the issue of filterscenariounder，expandstatenodebefore置iconsnotnormaldisplay @uyarn ([#6025](https://github.com/Tencent/tdesign-vue-next/pull/6025))
- Fix the issue of selectednodeafterexpandstatetriggernot必要 Update @uyarn ([#6025](https://github.com/Tencent/tdesign-vue-next/pull/6025))
- `Typography`:
- Fix the issue of 自definitioncopycontentinvalid @Wesley-0808 ([#5977](https://github.com/Tencent/tdesign-vue-next/pull/5977))
- Fixdefinition `mark` colorerrorshouldfor文字color @Wesley-0808 ([#5705](https://github.com/Tencent/tdesign-vue-next/pull/5705))
- `Watermark`: Fix the issue of 多行image and textwatermarkimageconfiguration灰度when，整个canvascontent也will灰度 @Wesley-0808 ([#5991](https://github.com/Tencent/tdesign-vue-next/pull/5991))
- `FakeArrow`: Fix the issue of `overlayStyle` typedefinitionerror @haozang54-source ([#5971](https://github.com/Tencent/tdesign-vue-next/pull/5971))

## 🌈 1.16.1 `2025-09-01` 

### 🐞 Bug Fixes
- `Tabs`: Fix the issue of `1.16.0` Add `TabPanel` onRemove eventaftercause Removeoptionwhenconsoleerror @uyarn ([#5955](https://github.com/Tencent/tdesign-vue-next/pull/5955))


## 🌈 1.16.0 `2025-08-28` 

### 🚀 Features
- Add `--td-text-color-watermark` variable forwatermarketc.need要opacity scenario @uyarn ([#5932](https://github.com/Tencent/tdesign-vue-next/pull/5932))
- `Skeleton`: Fix the issue of `theme` defaultvaluenot符合documentation描述，need要 `paragraph` 效果upgradeaftermanually设置`theme` ⚠️ @liweijie0812 ([#5872](https://github.com/Tencent/tdesign-vue-next/pull/5872))
- `TabPanel`: Add `remove` event，convenient for独立Panel 处理Removeafter 相关logic @RSS1102 ([#5853](https://github.com/Tencent/tdesign-vue-next/pull/5853))
- `Table`: Addswitchpaginationafter重置scrollbar回to顶部 特性 @RSS1102 ([#5885](https://github.com/Tencent/tdesign-vue-next/pull/5885))
- `Tabs`: will remove eventfromdeleteicons移to外层container, ensureinsteadiconsfunctionnormaluse，if you overridedeleteiconsstyleplease note此变更 ⚠️ @RSS1102 ([#5853](https://github.com/Tencent/tdesign-vue-next/pull/5853))

### 🐞 Bug Fixes
- `DateRangePicker`:
- Fix the issue of `disableTime` functionabnormality @uyarn ([#5940](https://github.com/Tencent/tdesign-vue-next/pull/5940))
- Fix the issue of `disableDate` function用法returnparametercallbackanddocumentationnot符，此before有基inerrorparameterplease note此变更 ⚠️ @uyarn ([#5940](https://github.com/Tencent/tdesign-vue-next/pull/5940))
- `Select`: Fix the `tips` API slotuse方式 warning issue @Kalinrun ([#5910](https://github.com/Tencent/tdesign-vue-next/pull/5910))
- `Skeleton`: Fix the skeleton动画 `animation-delay` propertydefaultvalue issue @anlyyao ([common#2248](https://github.com/Tencent/tdesign-common/pull/2248))
- `Transfer`: Fix the issue of `operation` passfunction数组rendererror @RSS1102 ([#5794](https://github.com/Tencent/tdesign-vue-next/pull/5794))
- `Tree`: Fix the abnormality of treenodeenable `draggable` after，in disabled stateunderstilltake effect @RylanBot ([#5914](https://github.com/Tencent/tdesign-vue-next/pull/5914))
- `Watermark`: Fix the watermarkcomponent因asopacity issue覆盖contentandin SSR scenariounder useissue @uyarn ([#5932](https://github.com/Tencent/tdesign-vue-next/pull/5932))


## 🌈 1.15.5 `2025-08-18` 

### 🐞 Bug Fixes
- `DatePicker`: Fix the issue of `1.15.3` versionindaterangeselectpanelyearerror @uyarn ([#5901](https://github.com/Tencent/tdesign-vue-next/pull/5901))
- `InputNumber`: Fix the `1.15.3` versionafter设置`allowInputOverLimit` as false butnot设置最小value displayabnormality issue @YuShengHou ([#5898](https://github.com/Tencent/tdesign-vue-next/pull/5898))


## 🌈 1.15.4 `2025-08-15` 

### 🐞 Bug Fixes
- `Textarea`: Fix the issue of `allowInputOverMax` unable toin `maxcharacter` configurationundertake effect @RSS1102 ([#5888](https://github.com/Tencent/tdesign-vue-next/pull/5888))


## 🌈 1.15.3 `2025-08-14` 

### 🚀 Features
- `Card`: Add `headerClassName`、`headerStyle`、`bodyClassName`、`bodyStyle`、`footerClassName`、`footerStyle`，convenient forforcustomize卡片component 各partialstyle @An0510 ([#5867](https://github.com/Tencent/tdesign-vue-next/pull/5867))
- `InputNumber`: whenvalueas undefined or null，and`allowInputOverLimit`as false when，need重置as最小value @dhj-l ([#5881](https://github.com/Tencent/tdesign-vue-next/pull/5881))

### 🐞 Bug Fixes
- `Cascader`: Fix the defect of canfilterscenariounder，鼠标移入dropdownpanelafter展现abnormality @byrdkm17 ([#5866](https://github.com/Tencent/tdesign-vue-next/pull/5866))
- `ColorPicker`: Fix the issue of `popupProps.onVisibleChange` callbackfunctionnot执行 @RylanBot ([#5839](https://github.com/Tencent/tdesign-vue-next/pull/5839))
- `DatePicker`: Optimizeyearselectmodeunderselect同panelyearafterpanelcontent display效果 @uyarn ([#5882](https://github.com/Tencent/tdesign-vue-next/pull/5882))
- `Input`: Fix the issue of Chineseinput method激活when回车trigger `onEnter` event @dhj-l ([#5862](https://github.com/Tencent/tdesign-vue-next/pull/5862))
- `QRCode`: Fix the issue of `type='svg'` when `value` value变化而QR codenot刷新 @RSS1102 ([#5864](https://github.com/Tencent/tdesign-vue-next/pull/5864))
- `Select`: Fix the `1.15.2` versioninconsole关in `size` property warning issue @RSS1102 ([#5844](https://github.com/Tencent/tdesign-vue-next/pull/5844))
- `SelectInput`: Fix the issue of deletetagwhencomponent闪烁 @novlan1 ([#5868](https://github.com/Tencent/tdesign-vue-next/pull/5868))
- `Typography`: Fix the issue of Title componentunable touse `class` @Wesley-0808 ([#5842](https://github.com/Tencent/tdesign-vue-next/pull/5842))
- `Checkbox`: Fix the issue of 点击之after `onClick` eventtrigger两次 @RSS1102 ([#5825](https://github.com/Tencent/tdesign-vue-next/pull/5825))

### 📈 Performance
- `Statistic`: 修改 `color` propertytypeas字符串，以Supportany [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) Support colorvalue @RSS1102 ([#5843](https://github.com/Tencent/tdesign-vue-next/pull/5843))

### 📝 Documentation
- `Table`: 完善 `scrollToElement` functionparameterdescription @YuShengHou ([#5870](https://github.com/Tencent/tdesign-vue-next/pull/5870))


## 🌈 1.15.2 `2025-07-31` 

### 🚀 Features
- `DateRangePicker`: Support `needConfirm` API @uyarn ([#5795](https://github.com/Tencent/tdesign-vue-next/pull/5795))

### 🐞 Bug Fixes
- `ColorPicker`：
- Fix the issue of 设置 `swatch-colors` valueas `null` whenfunctionabnormality @betavs ([#5793](https://github.com/Tencent/tdesign-vue-next/pull/5793))
- 减少color跨色彩空间 多次转换，降低误差 @RylanBot ([#5814](https://github.com/Tencent/tdesign-vue-next/pull/5814))
- `Menu`: Fix the issue of 顶部menuin`expandType=popup`modeunder子component存in多层封装afterunable tonormal高亮 @uyarn ([#5821](https://github.com/Tencent/tdesign-vue-next/pull/5821))
- `PopConfirm`: Fix the issue of wheninitial `visible` as true when，点击外部区域whenpopupnotclose @RSS1102 ([#5790](https://github.com/Tencent/tdesign-vue-next/pull/5790))
- `Popup`: Fix the issue of wheninitial `visible` as true when，点击外部区域whenpopupnotclose @RSS1102 ([#5790](https://github.com/Tencent/tdesign-vue-next/pull/5790))
- `Select`: Fix Form 设置as disabled or readonly when，多选optionstillcandelete error @An0510 ([#5775](https://github.com/Tencent/tdesign-vue-next/pull/5775))
- `DatePicker`: Fix the issue of 单weekmodeunderswitchyearwhen高亮stillshow @baozjj ([#5812](https://github.com/Tencent/tdesign-vue-next/pull/5812))
- `Descriptions`: Fix the 无bordermodeunder左右内margin abnormality issue @liweijie0812 ([common#2219](https://github.com/Tencent/tdesign-common/pull/2219))
- `Select`: errordeleteoptioninnot存in tag @RSS1102 ([#5781](https://github.com/Tencent/tdesign-vue-next/pull/5781))
- `Table`:
- Fix the issue of table非多选mode，按`A`键trigger全选 @liweijie0812 ([#5809](https://github.com/Tencent/tdesign-vue-next/pull/5809))
- Fix the issue of `resizable` enablewhen，列border线cause 列名content移动 @QuentinHsu ([common#2224](https://github.com/Tencent/tdesign-common/pull/2224))
- `Watermark`: Fix the issue of darkmodeunder，文字watermarkcontentshownot明显 @liweijie0812 ([#5782](https://github.com/Tencent/tdesign-vue-next/pull/5782))


## 🌈 1.15.1 `2025-07-18` 

### 🚀 Features
- `QRCode`: Add编辑器codeprompt @liweijie0812 ([#5758](https://github.com/Tencent/tdesign-vue-next/pull/5758))



## 🌈 1.15.0 `2025-07-17` 

### 🚀 Features
- `QRCode`: Add `QRCode` QR codecomponent，via `unplugin` 插件按need引入,安装 `@tdesign-vue-next/auto-import-resolver`，导入 `TDesignResolver` 改as `import { TDesignResolver } from '@tdesign-vue-next/auto-import-resolver';` @Wesley-0808 ([#5719](https://github.com/Tencent/tdesign-vue-next/pull/5719))

- `Variables`: `--td-font-size-title-large` from `20px` Adjustas `18px`, Add `--td-font-size-title-extraLarge` variable，valueas `20px`，此before有use此variable，please note此变更 ⚠️ @uyarn ([#5752](https://github.com/Tencent/tdesign-vue-next/pull/5752))
- `SelectInput`: Support单选modeundercan输入functionand自definitiondisplaycontent `valueDisplay` 配合use，`Select`、`TreeSelect`、`Cascader` etc.component此function同样Support；此functioncan能affect单选under `valueDisplay` use scenario，upgradeplease note此变更 ⚠️ @uyarn ([#5751](https://github.com/Tencent/tdesign-vue-next/pull/5751))
- `Helper`: Fix the issue of codepromptinmissing `SwiperItem` type和相关prompt，同whenUpdatecomponent API 相关信息 @liweijie0812 ([#5722](https://github.com/Tencent/tdesign-vue-next/pull/5722))
- `Locale`: Support内置multi-language Englishversion 单复数scenarionormaldisplay @YunYouJun ([#5680](https://github.com/Tencent/tdesign-vue-next/pull/5680))
- `PaginationMini`: Optimizeprompttextdisplay @baozjj ([#5670](https://github.com/Tencent/tdesign-vue-next/pull/5670))
- `Upload`: uploadimage风格Add `trigger` API，for自definitiontriggerupload content @D-xuanmo ([#5678](https://github.com/Tencent/tdesign-vue-next/pull/5678))

### 🐞 Bug Fixes
- `Cascader`: Optimize点击非叶子nodeoption partial区域errortriggerselected issue @uyarn ([#5748](https://github.com/Tencent/tdesign-vue-next/pull/5748))
- `Checkbox`: Fix the 全选functioninreadonlyordisabledoption，but已selectedscenariounder function issue @uyarn ([#5749](https://github.com/Tencent/tdesign-vue-next/pull/5749))
- `DatePicker`: 处理多选caseunderweek和quartermode tagdeleteabnormality issue @betavs ([#5732](https://github.com/Tencent/tdesign-vue-next/pull/5732))
- `DateRangePickerPanel`: Fix the issue of `onCellClick` ininitialas空whenreturnvaluenot正确 @Kyle-Alpha ([#5681](https://github.com/Tencent/tdesign-vue-next/pull/5681))
- `DrawerPlugin`: Fixreturnvaluetype @Cat1007 ([#5679](https://github.com/Tencent/tdesign-vue-next/pull/5679))
- `Input`: Optimizenot同尺寸under `prefixIcon` not跟随变化 issue @uyarn ([#5752](https://github.com/Tencent/tdesign-vue-next/pull/5752))
- `InputAdornment`: Fix the issue of pass through原生propertyinvalid @cfool ([#5726](https://github.com/Tencent/tdesign-vue-next/pull/5726))
- `Loading`: Fix the issue of in `iPadOS` 微信iniconspositionerror @Nero978 ([#5717](https://github.com/Tencent/tdesign-vue-next/pull/5717))
- `Upload`: 增强for `.jpg` filetype Support @QuentinHsu ([#5754](https://github.com/Tencent/tdesign-vue-next/pull/5754))


## 🌈 1.14.2 `2025-06-30` 

### 🐞 Bug Fixes
- `Alert`: Optimize `max-line` enableafter，notfilter注释nodecause折叠button误判 issue @baozjj ([#5650](https://github.com/Tencent/tdesign-vue-next/pull/5650))
- `Button`: Fix the issue of `form` propertynottake effect @uyarn ([#5676](https://github.com/Tencent/tdesign-vue-next/pull/5676))
- `Message`: Fix the issue of `1.14.0` after由in createVNode 替代 createApp cause message instanceduplicate创建，`closeAll` functionabnormality @baozjj ([#5669](https://github.com/Tencent/tdesign-vue-next/pull/5669))

###  📝 Documentation
- `主题生成器`: Fix the issue of 站点受theme generatoraffectdarkmodeunderbox-shadowdisplayabnormality @liweijie0812


## 🌈 1.14.1 `2025-06-27` 

### 🐞 Bug Fixes
- `Select`:
- Fix the issue of 多选远程searchscenariounder， whenbeforeselected项not存in options 内when，placeholder displayabnormality @uyarn ([#5660](https://github.com/Tencent/tdesign-vue-next/pull/5660))
- Fix the issue of 多选远程searchscenariounder，whenbeforeselected项not存in options 内when，deleteoptionfunctionabnormality @uyarn ([#5660](https://github.com/Tencent/tdesign-vue-next/pull/5660))


## 🌈 1.14.0 `2025-06-26` 

### 🚀 Features
- `Alert`: Add `closeBtn` API，and其他componentmaintain一致，`close` willinnot来versiondeprecated，请尽快Adjustas`closeBtn` use @ngyyuusora ([#5621](https://github.com/Tencent/tdesign-vue-next/pull/5621))
- `DialogPlugin`: AddSupport appContext 绑定和pass in，forSupportin插件scenarioinuse router orglobal指令 scenario @Cat1007 ([#5559](https://github.com/Tencent/tdesign-vue-next/pull/5559))
- `DrawerPlugin`: AddSupport appContext 绑定和pass in，forSupportin插件scenarioinuse router orglobal指令 scenario @Cat1007 ([#5559](https://github.com/Tencent/tdesign-vue-next/pull/5559))
- `LoadingPlugin`: AddSupport appContext 绑定和pass in，forSupportin插件scenarioinuse router orglobal指令 scenario @Cat1007 ([#5559](https://github.com/Tencent/tdesign-vue-next/pull/5559))
- `MessagePlugin`: AddSupport appContext 绑定和pass in，forSupportin插件scenarioinuse router orglobal指令 scenario @Cat1007 ([#5559](https://github.com/Tencent/tdesign-vue-next/pull/5559))
- `NotificationPlugin`: AddSupport appContext 绑定和pass in，forSupportin插件scenarioinuse router orglobal指令 scenario @Cat1007 ([#5559](https://github.com/Tencent/tdesign-vue-next/pull/5559))
- `Popup`: Optimize浮层箭头in空间not足scenarioundernot跟随浮层偏移，cause箭头positionnot准确 issue @Cat1007 ([#5038](https://github.com/Tencent/tdesign-vue-next/pull/5038))
- `Select`: 远程searchscenarioin，Supportdirectlyuse `valueType= value` scenario保留已selected option 数据display，具体can参考examplecode @RSS1102 ([#5638](https://github.com/Tencent/tdesign-vue-next/pull/5638))
- `Tree`:
- 多选scenariounder每个nodeAdd hover prompt，and单选scenariomaintain一致 @RSS1102 ([#5632](https://github.com/Tencent/tdesign-vue-next/pull/5632))
- Fix the issue of 点击option expandbuttonerrortrigger `onClick` event，此before有基in此abnormalitylogic实现相关function 业务please note此变更 ⚠️ @Soya-xy ([#5512](https://github.com/Tencent/tdesign-vue-next/pull/5512))

### 🐞 Bug Fixes
- `Cascader`: Fix the issue of `valueType="full"` ，value as undefined whencomponent内部error @liweijie0812 ([#5581](https://github.com/Tencent/tdesign-vue-next/pull/5581))
- `ColorPicker`: Fix the issue of 渐变modeunder点击滑块add色点when定位error @betavs ([#5565](https://github.com/Tencent/tdesign-vue-next/pull/5565))
- `DialogPlugin`: Fix the issue of 插件用法 `destroyOnClose` 表现notnormal @Cat1007 ([#5559](https://github.com/Tencent/tdesign-vue-next/pull/5559))
- `DrawerPlugin`: Fix the issue of 插件用法 `destroyOnClose` 表现notnormal @Cat1007 ([#5559](https://github.com/Tencent/tdesign-vue-next/pull/5559))
- `Form`: Fix the issue of `id` propertynottake effect @zhangpaopao0609 ([#5640](https://github.com/Tencent/tdesign-vue-next/pull/5640))
- `Popup`: Fix the abnormality of when `triggerElement` as字符串typewhen，cannotnormalfor元素select器 @uyarn ([#5651](https://github.com/Tencent/tdesign-vue-next/pull/5651))
- `Select`: add `selectInputProps` pass through多选propertyto `valueDisplay` @RSS1102 ([#5594](https://github.com/Tencent/tdesign-vue-next/pull/5594))
- `Textarea`: Optimizescrollbar styleissue @RSS1102 ([#5647](https://github.com/Tencent/tdesign-vue-next/pull/5647))
- `TimeRangePicker`: Fix the issue of 点击panel确定buttonnot重置非法format输入 @QuentinHsu ([#5622](https://github.com/Tencent/tdesign-vue-next/pull/5622))

### 📝 Documentation
- `Alert`: Optimize Alert demointeraction，incloseaftershow“show Alert”button以恢复show @baozjj ([#5646](https://github.com/Tencent/tdesign-vue-next/pull/5646))


## 🌈 1.13.2 `2025-06-04` 

### 🐞 Bug Fixes
- `ColorPicker`: Fix the issue of `onChange` 和 `onRecentChange` callbackineffective @RylanBot ([#5545](https://github.com/Tencent/tdesign-vue-next/pull/5545))
- `Input`: Fix the issue of input boxin `composition` methodin主动失去焦点after，丢失reactive @QuentinHsu ([#5538](https://github.com/Tencent/tdesign-vue-next/pull/5538))
- `InputNumber`: Fix the issue of enable`decimalPlaces`after输入因进位causedisplay差异 @QuentinHsu ([#5522](https://github.com/Tencent/tdesign-vue-next/pull/5522))
- `Select`: Fix the issue of `1.13.1` versionin多选scenarionot存inoptionin valuecannotnormaldisplay @RSS1102 ([#5553](https://github.com/Tencent/tdesign-vue-next/pull/5553))
- `Table`: Optimizeclose列configurationpopupwhen，select列数据and所display列数据not一致 issue @RSS1102 ([#5546](https://github.com/Tencent/tdesign-vue-next/pull/5546))

### 🚧 Others
- `Drawer`: Fix the issue of `cancelBtn` 和 `confirmBtn` typemissing`null` type声明 @RSS1102 ([#5555](https://github.com/Tencent/tdesign-vue-next/pull/5555))


## 🌈 1.13.1 `2025-05-29` 

### 🚀 Features
- `ConfigProvider`: `FormConfig` Add `requiredMarkPosition` forglobalconfiguration`requiredMark` position @Wesley-0808 ([#5510](https://github.com/Tencent/tdesign-vue-next/pull/5510))
- `Progress`: when `theme=plump` when，when进度条填色区域大小足够容under百分比contentwhen，contentautomaticallywillshowin进度条填色区域内，否则willshowin进度条填色区域 右侧，具体呈现please refer todocumentationexample @RSS1102 @Soya-xy ([#5460](https://github.com/Tencent/tdesign-vue-next/pull/5460))
- `Select`: `valueDisplay` parameter `value` returncompleteoptioncontent，foruse其他parameterdisplaycustomize scenario @RSS1102 ([#5509](https://github.com/Tencent/tdesign-vue-next/pull/5509))

### 🐞 Bug Fixes
- `Dropdown`: Fix the defaultdropdownmenustyle存inextramargin display issue @QuentinHsu ([common#2151](https://github.com/Tencent/tdesign-common/pull/2151))
- `Progress`: Fix the abnormality of 声明`label`parameteraftercannotnormaldisplaydefault `label` @Soya-xy @l123wx ([#5507](https://github.com/Tencent/tdesign-vue-next/pull/5507)) ([#5517](https://github.com/Tencent/tdesign-vue-next/pull/5517))
- `Select`: Fix the defect of 多选modeunder，存innotcan选 option已inselected项inwhen，stillcanviatagbutton和键盘delete @Wesley-0808 ([#5488](https://github.com/Tencent/tdesign-vue-next/pull/5488))
- `Transfer`: Optimizedynamicloading数据scenariounder componenterrorissue @Wesley-0808 ([#5475](https://github.com/Tencent/tdesign-vue-next/pull/5475))
- `MessagePlugin`: Fix the issue of 插件callscenariounder，`attach` 所innode被清空after，新 `message` unable toshow @MrElvin ([#5477](https://github.com/Tencent/tdesign-vue-next/pull/5477))

### 🚧 Others
- global处理同when存in`Boolean`和`Slot`方式 API in声明 API afterunable tonormaldisplaydefaultrendernode issue @Soya-xy ([#5507](https://github.com/Tencent/tdesign-vue-next/pull/5507))
- Optimizeslotmethod 判断compatible更多componenttype use @uyarn ([#5521](https://github.com/Tencent/tdesign-vue-next/pull/5521))


## 🌈 1.13.0 `2025-05-14` 

### 🚀 Features
- `ColorPicker`: @RylanBot ([#5319](https://github.com/Tencent/tdesign-vue-next/pull/5319)) use渐变mode 业务please note此变更 ⚠️
- automatically根据「trigger器 / 最近color / 预设color」 色valueswitch单色和渐变mode
- 只enable渐变modewhen，filter「预设color / whenbeforecolor」in 非渐变色value
- Add format `HEX8`，Remove `HSB`
- `Dialog`: Add `lazy` API , 打开此configurationdefaultnotdirectlyrender Dialog， for懒loading scenario，此before有依赖 `destroyOnClose` 实现initial化notloading 业务please note此变更 ⚠️ @RSS1102 ([#5307](https://github.com/Tencent/tdesign-vue-next/pull/5307))
- `Drawer`: Add `lazy` API , 打开此configurationdefaultnotdirectlyrender Drawer，for懒loading scenario @RSS1102，此before有依赖 `destroyOnClose` 实现initial化notloading 业务please note此变更 ⚠️ ([#5375](https://github.com/Tencent/tdesign-vue-next/pull/5375))
- `TagInput`: OptimizecandragAdjustpositionstateunder，鼠标光标showas移动style @liweijie0812 ([#5424](https://github.com/Tencent/tdesign-vue-next/pull/5424))
- `TimePicker`: Add`onConfirm` 和`onClear` callbackmethod @Wesley-0808 ([#5349](https://github.com/Tencent/tdesign-vue-next/pull/5349))

### 🐞 Bug Fixes
- `Breadcrumb`: Fix the issue of `1.12.0` version改动cause reactive和consolewarning @Wesley-0808 ([#5414](https://github.com/Tencent/tdesign-vue-next/pull/5414))
- `Cascader`:
- Fix the issue of dropdownpaneldefault存inmargin @reallimengzhe ([#5427](https://github.com/Tencent/tdesign-vue-next/pull/5427))
- Fix the issue of option存intoo long文字when，innot同尺寸undershowabnormality @Shabi-x @uyarn ([#5373](https://github.com/Tencent/tdesign-vue-next/pull/5373))
- `ColorPicker`: @RylanBot
- Fix the issue of add最近usecolorfunctionabnormality ([#5428](https://github.com/Tencent/tdesign-vue-next/pull/5428))
- enable透明通道when returnvalueformatabnormality ([#5319](https://github.com/Tencent/tdesign-vue-next/pull/5319))
- `Comment`: slotcontentrendererror @QuentinHsu ([#5446](https://github.com/Tencent/tdesign-vue-next/pull/5446))
- `DatePicker`: Fix the issue of `label` slotinvalid @RSS1102 ([#5393](https://github.com/Tencent/tdesign-vue-next/pull/5393))
- `DateRangePicker`: Fix the issue of missing `readonly` typedefinition @Wesley-0808 ([#5430](https://github.com/Tencent/tdesign-vue-next/pull/5430))
- `Drawer`: Fix the issue of `DrawerPlugin` returninstancetypeerror @Wesley-0808 ([#5444](https://github.com/Tencent/tdesign-vue-next/pull/5444))
- `RadioGroup`: @betavs ([#5417](https://github.com/Tencent/tdesign-vue-next/pull/5417))
- Fix the issue of 阻止defaultbehaviorwhen机errorcauseunable to正确输入空格
- Fix the issue of 键盘操作whenduplicatetrigger `onChange` event
- `Select`: Fix the issue of `valueType` as `object` andand `keys` 同when设置when，select绑定valueerror @morningbao ([#5374](https://github.com/Tencent/tdesign-vue-next/pull/5374))
- `Space`:
- Fix the issue of 嵌套componentcaseunder，style被errorshould用 @RylanBot ([#5418](https://github.com/Tencent/tdesign-vue-next/pull/5418))
- Fix the issue of `fragment`虚拟nodenotexpand @QuentinHsu ([#5388](https://github.com/Tencent/tdesign-vue-next/pull/5388))
- Fix the issue of `Teleport`结构意外renderas`SpaceItem`node，causeextra占用间距 @QuentinHsu ([#5388](https://github.com/Tencent/tdesign-vue-next/pull/5388))
- `Tag`: Fix the issue of `max-width` not设置notrender `title` property @betavs ([#5413](https://github.com/Tencent/tdesign-vue-next/pull/5413))
- `Textarea`: Fix the issue of `autosize` modeunderinitialheight计算not正确 @RSS1102 ([#5451](https://github.com/Tencent/tdesign-vue-next/pull/5451))
- `Keyboard`: Fix the issue of `Dialog`、 `Drawer` or `其他弹窗组件` 组合usescenario，use`ESC`按键closepopup冲突 @Wesley-0808 ([#5143](https://github.com/Tencent/tdesign-vue-next/pull/5143))

### 🚧 Others
- `TagInput`: Optimize `TagInput` 处理空value logic @yuhengshen ([#5357](https://github.com/Tencent/tdesign-vue-next/pull/5357))


## 🌈 1.12.0 `2025-04-24`
### 🚀 Features
- `Breadcrumb`: Add `ellipsis`、`maxItems`、`itemsAfterCollapse`、`itemsBeforeCollapse` 相关 API，for折叠面包屑 scenario，具体useplease refer todocumentationexample @Wesley-0808 ([#5261](https://github.com/Tencent/tdesign-vue-next/pull/5261))
- `ColorPicker`: Add `onClear` 清除buttoneventcallback @mikasayw ([#5109](https://github.com/Tencent/tdesign-vue-next/pull/5109))
- `DatePicker`: Add `readonly` property，forreadonlyconfiguration @mikasayw ([#5293](https://github.com/Tencent/tdesign-vue-next/pull/5293))
- `Drawer`:
- Add `DrawerPlugin`，Support`插件函数式`call @Wesley-0808 ([#5067](https://github.com/Tencent/tdesign-vue-next/pull/5067))
- Add `drawerClassName` API，fordefinitiondrawer本身 相关class name @Wesley-0808 ([#5067](https://github.com/Tencent/tdesign-vue-next/pull/5067))
- `Form`: Add `requiredMarkPosition`，candefinition必填符号 position @Wesley-0808 ([#5223](https://github.com/Tencent/tdesign-vue-next/pull/5223))
- `Icon`: Add `logo-miniprogram` mini program、`logo-cnb` cloud native build、`seal` seal、`quote` quoteetc.icons @taowensheng1997 @uyarn @RADWIMPS426 ([#5355](https://github.com/Tencent/tdesign-vue-next/pull/5355))
- `Select`: 取消勾选panelin 已optionwhentrigger `remove` eventcallback @QuentinHsu ([#5333](https://github.com/Tencent/tdesign-vue-next/pull/5333))
- `Swiper`: Add `cardScale`，Support自definition卡片modeunder 缩放比例 @joinmouse ([#5272](https://github.com/Tencent/tdesign-vue-next/pull/5272))
- `Upload`: `image-flow` modeunderSupport自definitionerrortext @ngyyuusora ([#5326](https://github.com/Tencent/tdesign-vue-next/pull/5326))

### 🐞 Bug Fixes
- `ColorPicker`: Fix the issue of switchcolorinvalid @mikasayw ([#5282](https://github.com/Tencent/tdesign-vue-next/pull/5282))
- `Drawer`: OptimizedragAdjust大小 processin，Drawer pagecontentwill被selected issue @joinmouse ([#5233](https://github.com/Tencent/tdesign-vue-next/pull/5233))
- `DatePicker`: Fix the issue of `readonly`as `true` when， `clearable` stilltake effect @xiaojueshi ([#5303](https://github.com/Tencent/tdesign-vue-next/pull/5303)) ([#5305](https://github.com/Tencent/tdesign-vue-next/pull/5305))
- `InputNumber`:
- Fix the issue of `tips`slotduplicaterender @mikasayw ([#5286](https://github.com/Tencent/tdesign-vue-next/pull/5286))
- Optimize数字input box 边界issue @Sight-wcg([#5358](https://github.com/Tencent/tdesign-vue-next/pull/5358))
- `Menu`: Fix the issue of `menu-item` `onClick` eventtrigger两次 @RSS1102 ([#5235](https://github.com/Tencent/tdesign-vue-next/pull/5235))
- `Select`:
- Fix the issue of `tips` slotinvalid @liweijie0812 ([#5250](https://github.com/Tencent/tdesign-vue-next/pull/5250))
- Fix the issue of when `check-all` as空字符串when 效果abnormality @betavs ([#5221](https://github.com/Tencent/tdesign-vue-next/pull/5221))
- Fix the issue of `1.11.x`versionin，not设置 `label` whenoptiondisplayabnormality @RSS1102 ([#5257](https://github.com/Tencent/tdesign-vue-next/pull/5257))
- Fix the issue of 多选scenariounder `onEnter` callbackparameter丢失，同whenmaintain多选单选回车interactionlogic一致 @uyarn ([#5361](https://github.com/Tencent/tdesign-vue-next/pull/5361))
- Fix the `keys` propertyconfiguration `content` 作as value whennottake effect issue @hello-ishine ([#5199](https://github.com/Tencent/tdesign-vue-next/pull/5199))
- `Table`:
- Fix the issue of when `reserveSelectedRowOnPaginate` as`false` when，not正确return全选whenbeforepage数据 @RSS1102 ([#5248](https://github.com/Tencent/tdesign-vue-next/pull/5248))
- Fix the issue of column `checkProps` notconfigurationcause 点击行selectedbehaviorabnormality @uyarn ([#5362](https://github.com/Tencent/tdesign-vue-next/pull/5362))
- `Select`: Fix the issue of 多选scenariounderunable tovia键盘操作selected全选option @uyarn ([#5361](https://github.com/Tencent/tdesign-vue-next/pull/5361))
- `Swiper`: Optimizedefaultcontainerheight，avoid navigator positionabnormality issue @uyarn ([#5278](https://github.com/Tencent/tdesign-vue-next/pull/5278))
- `Tabs`:
- Optimize路由switchprocessin，Tabs notinitial化appear卸载error scenario @RSS1102 ([#5359](https://github.com/Tencent/tdesign-vue-next/pull/5359))
- Optimizeoption卡存intoo long label when 滑动效果 @wonkzhang([#5316](https://github.com/Tencent/tdesign-vue-next/pull/5316))
- `Textarea`: Adjust focus when机延迟tocomponentcompletelyrender之after @RSS1102 ([#5153](https://github.com/Tencent/tdesign-vue-next/pull/5153))
- `TreeSelect`: Fixwhen `valueType='object'` when无initial化selected数据whenproduce意外error @RSS1102 ([#5322](https://github.com/Tencent/tdesign-vue-next/pull/5322))

### 📝 Documentation
- `Swiper`: Optimizecomponent跳转sandboxdemomissingexamplestyle issue @uyarn ([#5278](https://github.com/Tencent/tdesign-vue-next/pull/5278))
- `Dialog`: Optimizedocumentationcontent，unifiedcontent描述 @Wesley-0808 ([#5067](https://github.com/Tencent/tdesign-vue-next/pull/5067))


## 🌈 1.11.5 `2025-03-25` 
### 🐞 Bug Fixes
- `Table`:
- Fix the issue of tablecontentnotrenderwhen，设置 `drag-sort` 拖动eventerror @RSS1102 ([#5224](https://github.com/Tencent/tdesign-vue-next/pull/5224))
- Fix the issue of `Table` expand 详细content文字unable to被selected @RSS1102 ([#5224](https://github.com/Tencent/tdesign-vue-next/pull/5224))
- Fix the canselected行tablein火狐浏览器in styleabnormality issue @uyarn([#5225](https://github.com/Tencent/tdesign-vue-next/pull/5225))
- `Menu`: Fix the issue of `menu-item` `props` in `to` definitionwhenmissing `string` type @calandnong ([#5198](https://github.com/Tencent/tdesign-vue-next/pull/5198))
- `TreeSelect`: Fix the `panelTopContent` 和 `panelBottomContent` definitionmissing issue @uyarn ([#5220](https://github.com/Tencent/tdesign-vue-next/pull/5220))
- `Bundle`: Fix the `1.11.0` version `esm` 产物 use issue @zhangpaopao0609 ([#5192](https://github.com/Tencent/tdesign-vue-next/pull/5192))


## 🌈 1.11.4 `2025-03-15` 

### 🚀 Features
- `Button`: default `shape` 补充相关class name,convenient for相关customize @Saraph1nes ([#5187](https://github.com/Tencent/tdesign-vue-next/pull/5187))
### 🐞 Bug Fixes
- `Table` : Fix the `1.11.3` versionin浮层向上statewhen 箭头positionabnormality issue @uyarn ([common#2088](https://github.com/Tencent/tdesign-common/pull/2088))
- `Plugin`: Fix the `WebStorm` in DescriptionsItem component prompt issue @liweijie0812 ([#5182](https://github.com/Tencent/tdesign-vue-next/pull/5182))

## 🌈 1.11.3 `2025-03-13` 
### 🚀 Features
- `ConfigProvider`: AddSupport `@tdesign-vue-next/chat` internationalizationconfiguration能力 @uyarn @zydemail
([#5179](https://github.com/Tencent/tdesign-vue-next/pull/5179))
### 🐞 Bug Fixes
- `Dialog`: Fix the 自definition `cancelBtn` textwhenstill保留 `t-dialog__cancel` style issue @RSS1102 ([#5157](https://github.com/Tencent/tdesign-vue-next/pull/5157))
- `Table`: Fix the issue of tablecontentnotrenderwhen，设置`drag-sort` 拖动eventerror @Wesley-0808 ([#5140](https://github.com/Tencent/tdesign-vue-next/pull/5140))
- `Select`: Fixuse `filter` when无need设置 `filterable` @RSS1102 ([#5169](https://github.com/Tencent/tdesign-vue-next/pull/5169))
- `DatePicker`: Fixdatedisabledrangeerror @RSS1102 ([#5119](https://github.com/Tencent/tdesign-vue-next/pull/5119))
- `ColorPicker`: Fix the 点击清除buttonnottrigger `onChange` callback issue @wakisun ([#5111](https://github.com/Tencent/tdesign-vue-next/pull/5111))
- `Select`: Fix the issue of when `valueType = 'object'` when，in有已select数据 caseunder筛选数据，全选produceerror Tag show。 @RSS1102 ([#5167](https://github.com/Tencent/tdesign-vue-next/pull/5167))
- `DatePicker`: Fix the issue of `prefixIcon` slotwarning @uyarn ([#5179](https://github.com/Tencent/tdesign-vue-next/pull/5179))
- `Bundle` : Fix the issue of 产物inpartialtypefile路径abnormality @zhangpaopao0609 ([#5174](https://github.com/Tencent/tdesign-vue-next/pull/5174))

## 🌈 1.11.2 `2025-03-05` 
### 🚀 Features
- `ImageViewer`: Add`imageReferrerpolicy`API，适forconfigurationReferrerpolicy scenario @Wesley-0808 ([#5134](https://github.com/Tencent/tdesign-vue-next/pull/5134))
- `ImageViewer`: Add`onDownload`API，for自definitiondownloadcallback @Wesley-0808 ([#5134](https://github.com/Tencent/tdesign-vue-next/pull/5134))
### 🐞 Bug Fixes
- `Dialog`: Fix the issue of `1.11.0`version`footer`contentcannotdynamic变更 @Wesley-0808 ([#5152](https://github.com/Tencent/tdesign-vue-next/pull/5152))
### 🚧 Others
- `helper`: Fix the issue of partialcomponentin `Webstorm` promptabnormality @liweijie0812 ([#5136](https://github.com/Tencent/tdesign-vue-next/pull/5136))

## 🌈 1.11.1 `2025-03-01` 
### 🐞 Bug Fixes
- `bundle`: Fix the `1.11.0`version `cjs` 产物 依赖error issue @uyarn ([#5116](https://github.com/Tencent/tdesign-vue-next/pull/5116))
- `List`: Fix the issue of `1.11.0`version`scrollTo`instancemethodabnormality @uyarn ([#5117](https://github.com/Tencent/tdesign-vue-next/pull/5117))
- `Dialog`: Fix the `1.11.0`versionconsoleerror issue @Wesley-0808 ([#5126](https://github.com/Tencent/tdesign-vue-next/pull/5126))
- `Table`: Fix the issue of 按under`Ctrl C`copy快捷键cause清空selected行 @Wesley-0808 ([#5124](https://github.com/Tencent/tdesign-vue-next/pull/5124))

## 🌈 1.11.0 `2025-02-27` 
### 🚀 Features
- `AutoComplete`: Add `empty` API，forconfiguration空stateunder dropdowncontentdisplay @liweijie0812 ([#4908](https://github.com/Tencent/tdesign-vue-next/pull/4908))
- `Dialog`: Add`dialogCard`component，for非脱离documentation流scenario @Wesley-0808 ([#5002](https://github.com/Tencent/tdesign-vue-next/pull/5002))
- `Table`: Add`validateTableCellData`instancemethod，forvalidationtablecan编辑单元格数据 @Wesley-0808 ([#5105](https://github.com/Tencent/tdesign-vue-next/pull/5105))
### 🐞 Bug Fixes
- `Select`:
- defaultsearchmethod优先display全etc.项 @Cat1007 ([#5051](https://github.com/Tencent/tdesign-vue-next/pull/5051))
- 多选caseunder点击清除buttonduplicatetrigger `change` event issue @betavs ([#5092](https://github.com/Tencent/tdesign-vue-next/pull/5092))
- Fix the abnormality of canfilterscenariounder存in全选optionwhen，全选behavior @RSS1102 @uyarn ([#5104](https://github.com/Tencent/tdesign-vue-next/pull/5104))
- `Tree`: Fix the dynamicswitch `expandAll` functionabnormality issue @RSS1102 ([#4988](https://github.com/Tencent/tdesign-vue-next/pull/4988))
- `Form`: Fix the issue of `status` propertynotshould用tovalidationstate上 @RSS1102 ([#5008](https://github.com/Tencent/tdesign-vue-next/pull/5008))
- `Statistic`: Fix the issue of decimalPlaces=0 whenvalue动画期间precisionerror @liweijie0812 ([#5055](https://github.com/Tencent/tdesign-vue-next/pull/5055))
- `TreeSelect`: firstrenderwhenautomaticallyexpand选定node @RSS1102 ([#5003](https://github.com/Tencent/tdesign-vue-next/pull/5003))

### 📝 Documentation
- `docs`: `ConfigProvider` Add `globalConfig` APIdocumentation，`Layout` 子component `Content` Add API documentation @liweijie0812 ([#5090](https://github.com/Tencent/tdesign-vue-next/pull/5090))
- `docs`: globalconfigurationpage路由修改as`config-provider`，and其他componentmaintain一致 @liweijie0812 ([#5090](https://github.com/Tencent/tdesign-vue-next/pull/5090))
### 🚧 Others
- `plugin`: Add`ConfigProvider`、`Typography` etc.component 编辑器promptfunction @liweijie0812 ([#5090](https://github.com/Tencent/tdesign-vue-next/pull/5090))
- `dependency`: Adjustcomponent依赖 `lodash` as `lodash-es` @zhangpaopao0609 ([#4959](https://github.com/Tencent/tdesign-vue-next/pull/4959))

## 🌈 1.10.7 `2025-01-24` 
### 🚀 Features
- `Icon`: Add`logo-alipay`、`logo-behance-filled`etc.icons，修改`logo-wecom`icons，Removenot合理 `logo-wecom-filled`icons @uyarn ([#4926](https://github.com/Tencent/tdesign-vue-next/pull/4926))
- `Table`: Support `scrollToElement` methodin非虚拟scroll caseunderuse @Cat1007 ([#4946](https://github.com/Tencent/tdesign-vue-next/pull/4946))
- `DatePicker`: Add`multiple` API，forSupport多选scenario，具体useplease refer toexample @uyarn ([#4854](https://github.com/Tencent/tdesign-vue-next/pull/4854))
### 🐞 Bug Fixes
- `Select`:
- Fix the issue of 分组caseundertitlenot存in `group` rendererror @RSS1102 ([#4896](https://github.com/Tencent/tdesign-vue-next/pull/4896))
- Fix `option value` as `boolean` whenconsoletypeerror警告 @SaberA1ter ([#4932](https://github.com/Tencent/tdesign-vue-next/pull/4932))
- Fix the issue of use`empty` API 自definition空statecontentmissingdefaultstyle @liweijie0812 ([#4909](https://github.com/Tencent/tdesign-vue-next/pull/4909))
- Fix the 全选配合option `disabled` stateuse error issue @msg-fobbit ([#4947](https://github.com/Tencent/tdesign-vue-next/pull/4947))
- `Progress`: Fix the issue of `progress` as100when，`status` invalid @rofixro ([#4895](https://github.com/Tencent/tdesign-vue-next/pull/4895))
- `AutoComplete`: Fix the issue of optionas空whenshow效果abnormality @betavs ([#4907](https://github.com/Tencent/tdesign-vue-next/pull/4907))
- `Breadcrumb`: Fix `herf` 和 `to` 同when存inwhen点击afterwill先aftertrigger @rofixro ([#4916](https://github.com/Tencent/tdesign-vue-next/pull/4916))
- `Table`: Fix the issue of notSupportdefault 键盘横向操作scroll宽table @uyarn ([#4904](https://github.com/Tencent/tdesign-vue-next/pull/4904))
- `ImageViewer`: Fix the issue of enable `closeOnOverlay` when，点击蒙层close存in闪烁case @huangchen1031 ([#4931](https://github.com/Tencent/tdesign-vue-next/pull/4931))
- `ColorPicker`: Fix the issue of Support渐变modeunder，第一次打开when `tabs` positionnot跟随变化 @natural1024 ([#4903](https://github.com/Tencent/tdesign-vue-next/pull/4903))
- `Cascader`: Fix the 某一级 `children` 长度as `1` whencause styleerror issue @msg-fobbit ([#4951](https://github.com/Tencent/tdesign-vue-next/pull/4951))
- `Tabs`: Fix the can滑动`Tabs`配合`action`use style issue @Wesley-0808 ([#4953](https://github.com/Tencent/tdesign-vue-next/pull/4953))
- `DatePicker`: Fix the issue of daterangeselect器in跨年scenariounder，weekmodeselectedrangestylemissing @uyarn ([#4854](https://github.com/Tencent/tdesign-vue-next/pull/4854))
### 📝 Documentation
- `Loading`: Removeduplicate example @RSS1102 ([#4949](https://github.com/Tencent/tdesign-vue-next/pull/4949))
- `Descriptions`: addforin `labelStyle` usedescription @RSS1102 ([#4950](https://github.com/Tencent/tdesign-vue-next/pull/4950))
- `Plugin`: Update插件promptcontent @liweijie0812 ([#4892](https://github.com/Tencent/tdesign-vue-next/pull/4892))


## 🌈 1.10.6 `2024-12-31` 
### 🚀 Features
- `List`: Add`scrollTo`method，Supportscrollto指定元素，can参考exampleuse @natural1024 ([#4863](https://github.com/Tencent/tdesign-vue-next/pull/4863))
- `Radio`: Add `theme` API，for决定 `options` 方式render `Radio` style @myronliu347 @liweijie0812 ([#4872](https://github.com/Tencent/tdesign-vue-next/pull/4872))
### 🐞 Bug Fixes
- `Table`:
- Fix the issue of `isFilterValueExist` unable tonormal处理 `null` valuecauseunable tonormal清除筛选 @HHaoWang ([#4829](https://github.com/Tencent/tdesign-vue-next/pull/4829))
- Fix `filterIcon` nottake effect @liweijie0812 ([#4837](https://github.com/Tencent/tdesign-vue-next/pull/4837))
- Fix the `1.10.0` version `updateEditedCellValue` functionabnormality issue @uyarn ([#4869](https://github.com/Tencent/tdesign-vue-next/pull/4869))
- Fix the issue of delete行操作afteruse `validateTableData` methodvalidationstill存indelete行 @uyarn ([#4878](https://github.com/Tencent/tdesign-vue-next/pull/4878))
- `Cascader`:
- when `valueType` as `full` whenwill意外trigger `change` event @betavs ([#4870](https://github.com/Tencent/tdesign-vue-next/pull/4870))
- validationinvalidvaluelogicerror并Optimizecode @betavs ([#4870](https://github.com/Tencent/tdesign-vue-next/pull/4870))
- `Dialog`:
- when `header` 和 `closeBtn` 都as `false` when，notrender `header dom` @chensid @ylunwang ([#4841](https://github.com/Tencent/tdesign-vue-next/pull/4841))
- Fix the `1.10.4`versionafter`closeOnClickOverlay`defaultenablebehavior和挂载`body`behavior missing issue @uyarn ([#4877](https://github.com/Tencent/tdesign-vue-next/pull/4877))
- `Swiper`: Fix `autopaly=false`, 修改 `current` invalid @liweijie0812 ([#4845](https://github.com/Tencent/tdesign-vue-next/pull/4845))
- `Upload`: uploadcomponentimagedisplaystyleOptimize @huangchen1031 ([#4853](https://github.com/Tencent/tdesign-vue-next/pull/4853))
- `Slider`: 滑块can以normalin移动端设备in拖动 @zd5043039119 ([#4860](https://github.com/Tencent/tdesign-vue-next/pull/4860))
- `DatePicker`: Optimizedaterangeselectpanelinitial化display logic，maintain右侧panel大in左侧panel @uyarn ([#4879](https://github.com/Tencent/tdesign-vue-next/pull/4879))
- `DateRangePicker`: Fix the 开始结束value同when存in logic判断error issue @betavs ([#4868](https://github.com/Tencent/tdesign-vue-next/pull/4868))
- `Tree`: Fix the issue of use`keys`definition`value`unable to配合 `scrollTo` 一起use @uyarn ([#4880](https://github.com/Tencent/tdesign-vue-next/pull/4880))
### 📝 Documentation
- `Tree`: Add关in唯一键valuenotcanduplicate issueFAQ @RSS1102 @uyarn ([#4852](https://github.com/Tencent/tdesign-vue-next/pull/4852))

## 🌈 1.10.5 `2024-12-10` 
### 🚀 Features
- `TimePicker`: Support `readonly` property @RSS1102 ([#4812](https://github.com/Tencent/tdesign-vue-next/pull/4812))
- `DatePicker`: Support `readonly` property @RSS1102 ([#4790](https://github.com/Tencent/tdesign-vue-next/pull/4790))
### 🐞 Bug Fixes
- `Tabs`:
- 修正renderfunctioncause 生产versionerror @Cat1007 ([#4787](https://github.com/Tencent/tdesign-vue-next/pull/4787))
- Optimize `scale` under 指示器width错位 issue @Cat1007 ([#4786](https://github.com/Tencent/tdesign-vue-next/pull/4786))
- `Transfer`:
- Fix the defect of treecomponentoptiondisabledin全选understillcanselected @uyarn ([#4810](https://github.com/Tencent/tdesign-vue-next/pull/4810))
- Fixdragsort向after移动 functionabnormality @uyarn ([#4810](https://github.com/Tencent/tdesign-vue-next/pull/4810))
- `Table`:
- Fix the issue of canpagination table设置`size` paginationcomponentnot跟随变化 @uyarn ([#4828](https://github.com/Tencent/tdesign-vue-next/pull/4828))
- Fix the `enhanced-table` `disableDataPage` property传value issue @lxzlx624 ([#4781](https://github.com/Tencent/tdesign-vue-next/pull/4781))
- `Dropdown`: example里 `prefixIcon` 字段should该Adjustasfunction形式 @Lnncoco ([#4769](https://github.com/Tencent/tdesign-vue-next/pull/4769))
- `Pagination`: Add`class`convenient for区分componentstate @uyarn ([#4828](https://github.com/Tencent/tdesign-vue-next/pull/4828))
- `ColorPicker`: Fix `colorMode` textinternationalization @liweijie0812 ([#4778](https://github.com/Tencent/tdesign-vue-next/pull/4778))
- `Dropdown`: when `options` as空when，consoleerror issue @betavs ([#4785](https://github.com/Tencent/tdesign-vue-next/pull/4785))
- `Drawer`: Fix the issue of `closeOnOverlayClick` propertydefaultvalueas `true` causeglobalparameterunable to设置 () @PengYYYYY ([#4801](https://github.com/Tencent/tdesign-vue-next/pull/4801))
- `DatePicker`: 修正 `needConfirm` as `false` scenariounder，`preset` selectineffective issue @Cat1007 ([#4792](https://github.com/Tencent/tdesign-vue-next/pull/4792))
- `Input`: Fix the in `Form` 设置globalreadonlyunder，component stateabnormality issue @xiaojueshi ([#4818](https://github.com/Tencent/tdesign-vue-next/pull/4818))
- `Tree`: Fix the issue of treeenable虚拟scrollaftercontainerwidth发生变化willcause回滚to顶部 @uyarn ([#4826](https://github.com/Tencent/tdesign-vue-next/pull/4826))

### 📝 Documentation
- `Chat`: Add高阶component `AI Chat 对话` 入口 @zydemail ([#4777](https://github.com/Tencent/tdesign-vue-next/pull/4777))


## 🌈 1.10.4 `2024-11-20` 
### 🚀 Features
- `Icon`: @uyarn ([#4729](https://github.com/Tencent/tdesign-vue-next/pull/4729))
- icon libraryRelease `0.4.0`version，Add 907 个新icons
- 命名Optimize，`blockchain` renamed to `transform-1`，`gesture-pray-1` renamed to `gesture-open`，`gesture-ranslation-1` renamed to `wave-bye`， `gesture-up-1` renamed to `gesture-typing`，`gesture-up-2` renamed to`gesture-right-slip`，`logo-wechat` renamed to`logo-wechat-stroke-filled`
- Remove `tree-list`、`logo-adobe-photoshop-1` etc.erroricons
- `Nuxt` : `@tdesign-vue-next/nuxt` Release `0.1.5` version, automatically导入 `Typography`、`Empty` component和新icons
- `Switch`: Add `before-change` API , forneed要发起asynchronous请求 scenario @centuryPark ([#4699](https://github.com/Tencent/tdesign-vue-next/pull/4699))
- `Cascader`: 单选modeunderwhen `trigger` as `hover` when，selectedoptionafterautomaticallyclosepanel @uyarn ([#4717](https://github.com/Tencent/tdesign-vue-next/pull/4717))
- `Checkbox`: Add `title` API，forinoptiondisplaydisabled原因etc.scenario @liweijie0812 ([#4737](https://github.com/Tencent/tdesign-vue-next/pull/4737))
- `RadioGroup`: Add `readonly` API @liweijie0812 ([#4737](https://github.com/Tencent/tdesign-vue-next/pull/4737))
- `Form`: 全部 `readonly`API defaultvalue改undefined ，Fix the form `readonly` as true，form输入类component `readonly` as false when 表现abnormality issue @liweijie0812 ([#4737](https://github.com/Tencent/tdesign-vue-next/pull/4737))
- `AnchorItem`: Add `customScroll API`，Supportclosedefaultscroll动画，由用户can自definitionanchorscroll behavior @boogie-ben ([#4386](https://github.com/Tencent/tdesign-vue-next/pull/4386))
- `Dialog`: Add API `BeforeOpen` dialog执行打开动画效果beforetrigger，`BeforeClose` dialog执行消失动画效果beforetrigger @Wesley-0808 ([#4733](https://github.com/Tencent/tdesign-vue-next/pull/4733))
- `Drawer`: Add API `BeforeOpen` drawer执行打开动画效果beforetrigger，`BeforeClose` drawer执行close动画效果beforetrigger @Wesley-0808 ([#4733](https://github.com/Tencent/tdesign-vue-next/pull/4733))
### 🐞 Bug Fixes
- `Input`:
- Fix the issue of `AutoWidth` stateunder，useChineseinput methodwhen，`InputPreValue` notwillUpdateas输入value @Wesley-0808 ([#4688](https://github.com/Tencent/tdesign-vue-next/pull/4688))
- Optimize `scale` under automaticallywidth错位 issue @Cat1007 ([#4713](https://github.com/Tencent/tdesign-vue-next/pull/4713))
- Fix the `1.10.3` version引入 `autowidth` in `transform` containerunder displaynot全 issue @Cat1007 ([#4754](https://github.com/Tencent/tdesign-vue-next/pull/4754))
- `TreeSelect`:
- Fixasynchronousloadingand `valueType="object"` caseunder，`v-model` error @ylunwang ([#4734](https://github.com/Tencent/tdesign-vue-next/pull/4734))
- Fixasynchronousloadingand `valueMode="onlyLeaf"` caseunder selectedlogic ([common#1976](https://github.com/Tencent/tdesign-common/pull/1976)) @ylunwang ([#4734](https://github.com/Tencent/tdesign-vue-next/pull/4734))
- `Menu`:
- `menu-group` `title` slotinvalid @chensid ([#4755](https://github.com/Tencent/tdesign-vue-next/pull/4755))
- Fixwhen项目not包含 `vue-router` when，willproduceextra `warning` @dsh0416 ([#4719](https://github.com/Tencent/tdesign-vue-next/pull/4719))
- `TagInput`: Fix the defect of in `readonly` modeunderstillcan以via `Backspace` 按键delete已option @RSS1102 ([#4696](https://github.com/Tencent/tdesign-vue-next/pull/4696))
- `Avatar`: 头像链接switchafter，清除上一张imageloading失败 占位符 @Cat1007 ([#4724](https://github.com/Tencent/tdesign-vue-next/pull/4724))
- `ColorPicker`: 最近usecolorneed要selected才能delete @superNos ([#4720](https://github.com/Tencent/tdesign-vue-next/pull/4720))
- `Tabs`: `dialog` in `tabs` defaultselectedstylenot正确 @chensid ([#4722](https://github.com/Tencent/tdesign-vue-next/pull/4722))
- `Cascader`: Fix the issue of whenoption `label` 非字符串when `title` renderabnormality @uyarn ([#4759](https://github.com/Tencent/tdesign-vue-next/pull/4759))
- `InputNumber`: Fix the issue of `largeNumber` under `format` error作for `value` 上 @uyarn ([#4695](https://github.com/Tencent/tdesign-vue-next/pull/4695))
### 📝 Documentation
- `Icon`: Optimizeicons检索function，SupportinEnglishsearchicons @uyarn ([#4729](https://github.com/Tencent/tdesign-vue-next/pull/4729))


## 🌈 1.10.3 `2024-10-27` 
### 🚀 Features
- `TimePicker`: Add `autoSwap` API，Support`1.10.2` version之afterstillSupportmaintain选定 左右侧time大小顺序 @uyarn ([#4662](https://github.com/Tencent/tdesign-vue-next/pull/4662))
- `Select`: `valueDisplay` Add`label`parameter @uyarn ([#4645](https://github.com/Tencent/tdesign-vue-next/pull/4645))
### 🐞 Bug Fixes
- `Select`:
- Fix the issue of use虚拟scroll配合filter加自definitionrendercontentwhenrenderabnormality @uyarn ([#4677](https://github.com/Tencent/tdesign-vue-next/pull/4677))
- Fixcanfilterscenariounder回车键will清空input box errorinteractionbehavior @uyarn ([#4677](https://github.com/Tencent/tdesign-vue-next/pull/4677))
- partialnodeeventAdd容错判断 @uyarn ([#4677](https://github.com/Tencent/tdesign-vue-next/pull/4677))
- Fix the issue of `loading` 配合触底event `onScrollToBottom` 一起use @lllllllqw ([#4625](https://github.com/Tencent/tdesign-vue-next/pull/4625))
- `Descriptions`:
- Fix the `layout`as `vertical` under 设置 `span` display issue @zhangpaopao0609 ([#4656](https://github.com/Tencent/tdesign-vue-next/pull/4656))
- Fix the `span` 大in `column` configuration render issue @zhangpaopao0609 ([#4656](https://github.com/Tencent/tdesign-vue-next/pull/4656))
- `Tree`: Fixnot子nodewhen，自definitioniconsunable to点击 @RSS1102 ([#4638](https://github.com/Tencent/tdesign-vue-next/pull/4638))
- `Space`: Fix the issue of use`v-if` caseunder存inredundant空格 @Luffy-developer ([#4663](https://github.com/Tencent/tdesign-vue-next/pull/4663))
- `InputNumber`: disabledwhen焦点eventstillwilltrigger issue @betavs ([#4661](https://github.com/Tencent/tdesign-vue-next/pull/4661))
- `DatePicker`: panel top arrow doesn't work when using week mode @RSS1102 ([#4673](https://github.com/Tencent/tdesign-vue-next/pull/4673))
- `Table`: 多级表头under viacolspan合并表头 @wangyang0210 ([#4669](https://github.com/Tencent/tdesign-vue-next/pull/4669))
- `Input`: Fix the issue of Input type="number" when，unable to输入decimal位末尾 0 @wilonjiang ([#4660](https://github.com/Tencent/tdesign-vue-next/pull/4660))
- `Drawer`: Fix the issue of 打开 `drawer` whenpage抖动 @uyarn ([#4671](https://github.com/Tencent/tdesign-vue-next/pull/4671))
- `Dialog`: Fix the issue of 打开 `dialog` whenpage抖动 @RSS1102 @uyarn ([#4671](https://github.com/Tencent/tdesign-vue-next/pull/4671))
### 📝 Documentation
- `Tree`: Fix the `valueMode` API 拼写error issue @Simon-He95 ([#4622](https://github.com/Tencent/tdesign-vue-next/pull/4622))
- `Docs`: Fix the issue of `Codesandbox`example启动失败orneed要打开 devbox 才can以运行 @RSS1102 ([#4610](https://github.com/Tencent/tdesign-vue-next/pull/4610))
### 🚧 Others
- `Table`: Fix`table` APIdocumentationin多余 `。` @Wesley-0808 ([#4683](https://github.com/Tencent/tdesign-vue-next/pull/4683))

## 🌈 1.10.2 `2024-09-27` 
### 🚀 Features
- `Table`: canexpandcollapsescenariounderAdd `t-table__row--expanded` 和 `t-table__row--folded` for区分expand和collapse 行 @uyarn ([#4586](https://github.com/Tencent/tdesign-vue-next/pull/4586))
- `Rate`: Add`clearable` API, forSupport清空评分 @uyarn ([#4603](https://github.com/Tencent/tdesign-vue-next/pull/4603))
- `TimePicker`: Supporttimeintervalselect器automaticallyAdjust左右interval @uyarn ([#4606](https://github.com/Tencent/tdesign-vue-next/pull/4606))
- `i18n`: internationalizationAdd 意大利语 `it_IT` 俄语 `ru_RU` @liweijie0812 ([#4592](https://github.com/Tencent/tdesign-vue-next/pull/4592))

### 🐞 Bug Fixes
- `Select`:
- Fixoption titleas空字符串or置空when render效果 @uyarn ([#4602](https://github.com/Tencent/tdesign-vue-next/pull/4602))
- Fix the issue of selectedoptionafternotnormaltrigger`blur`event @uyarn ([#4602](https://github.com/Tencent/tdesign-vue-next/pull/4602))
- Fixwhen `Form` enable `disabled`，`Select` close `disabled` stateunderoptionstilldisplaydisabled error @uyarn ([#4580](https://github.com/Tencent/tdesign-vue-next/pull/4580))
- `DatePicker`:
- Fix the issue of weekselect器under，year边界datereturnformaterror @uyarn ([#4606](https://github.com/Tencent/tdesign-vue-next/pull/4606))
- Optimizeweekselect器配合 `firstDayOfWeek` use issue，详情please refer toweekselect器examplecode @uyarn ([#4606](https://github.com/Tencent/tdesign-vue-next/pull/4606))
- `TreeSelect`: Fix多选stateunderdefault点击父nodeoption behaviorasselected @uyarn ([#4579](https://github.com/Tencent/tdesign-vue-next/pull/4579))
- `Tree`: Fix the issue of 多选underconfiguration `expandOnClickNode` afternot正确take effect @uyarn ([#4579](https://github.com/Tencent/tdesign-vue-next/pull/4579))
- `Transfer`: `search` eventmissing `trigger` parameter @betavs ([#4590](https://github.com/Tencent/tdesign-vue-next/pull/4590))
- `InputNumber`: Fix the 数字input boxdecimal位数typedefinitionerror issue，由 `String` 改as `Number` type @D-xuanmo ([#4599](https://github.com/Tencent/tdesign-vue-next/pull/4599))
- `RangInput`: Fixenable `clearable ` valueas空error @liweijie0812 ([#4608](https://github.com/Tencent/tdesign-vue-next/pull/4608))
- `ConfigProvider`: Fix the globalconfiguration丢失reactive issue @aolyang ([#4612](https://github.com/Tencent/tdesign-vue-next/pull/4612))
- `DateRangePicker`: Fix the issue of configurationtime相关formatwhen，not正确处理`defaultTime` @uyarn ([#4606](https://github.com/Tencent/tdesign-vue-next/pull/4606))
- `Upload`: Fix the issue of partial`theme`underdisabledunder链接notcan点击 @uyarn ([#4614](https://github.com/Tencent/tdesign-vue-next/pull/4614))
- `Drawer`: Optimize非模态框 阴影style @RSS1102 @uyarn ([#4614](https://github.com/Tencent/tdesign-vue-next/pull/4614))
- `ColorPicker`: Fix the 设置`inputProps.width`cause style issue @RyouSY @uyarn ([#4614](https://github.com/Tencent/tdesign-vue-next/pull/4614))
- `Typography`: Fix the `title` 字体大小 issue @uyarn ([#4614](https://github.com/Tencent/tdesign-vue-next/pull/4614))
- `Swiper`: Fix the issue of 分段式导航in暗色modeunder箭头colornot适配 @uyarn ([#4614](https://github.com/Tencent/tdesign-vue-next/pull/4614))
- `ImageViewer`: Optimizeimage查看器default 缩放比例，减少滚轮缩放效果 闪烁感 @RSS1102 ([#4583](https://github.com/Tencent/tdesign-vue-next/pull/4583))
- `Textarea`: Fix the issue of 设置 `autosize` andswitchpagewhencomponentabnormality @RSS1102 ([#4539](https://github.com/Tencent/tdesign-vue-next/pull/4539))

## 🌈 1.10.1 `2024-09-11` 
### 🐞 Bug Fixes
- `Table`: Fix the issue of enable`ellipsis`configuration node因asstateUpdateissuecausepartialscenariopaginationswitchwhen存inabnormality @uyarn ([#4555](https://github.com/Tencent/tdesign-vue-next/pull/4555))

## 🌈 1.10.0 `2024-09-10` 
### 🚀 Features
- `Empty`: Add `Empty` 空statecomponent @HaixingOoO ([#4519](https://github.com/Tencent/tdesign-vue-next/pull/4519))
- `Typography`: Add `Typography` 排版component @byq1213 ([#4293](https://github.com/Tencent/tdesign-vue-next/pull/4293))
- `Cascader`:
- AddcascadepanelSupport自definitiondropdownoptioncontent 能力 @uyarn ([#4513](https://github.com/Tencent/tdesign-vue-next/pull/4513))
- Add `panelTopContent` 和 `panelBottomContent` API @uyarn ([#4546](https://github.com/Tencent/tdesign-vue-next/pull/4546))
- `Form`:
- add `whitespace` validationdefaulterror信息 @liweijie0812 ([#4508](https://github.com/Tencent/tdesign-vue-next/pull/4508))
- Add`id` API，form原生 `id` property，Supportfor配合非form内 buttonvia `form` property来triggerformevent @uyarn ([#4538](https://github.com/Tencent/tdesign-vue-next/pull/4538))
- `Tag`:
- Add `title` API 控制鼠标悬停show text @liweijie0812 ([#4517](https://github.com/Tencent/tdesign-vue-next/pull/4517))
- 修改 `maxWidth` take effect `dom` node，convenient for控制textcontent长度 @liweijie0812 ([#4532](https://github.com/Tencent/tdesign-vue-next/pull/4532))
- `ConfigProvider`: Add `descriptions.colonText` `rate.rateText` `setpes.checkIcon` Supportglobalconfiguration @liweijie0812 ([#4476](https://github.com/Tencent/tdesign-vue-next/pull/4476))
- `RadioGroup`: `change` eventcallbackadd `name` property @taninsist ([#4491](https://github.com/Tencent/tdesign-vue-next/pull/4491))
- `Button`: Add `form` API，原生 `form` property，Supportforvia `form` propertytriggerforshould `id` `form` formevent @uyarn ([#4538](https://github.com/Tencent/tdesign-vue-next/pull/4538))
- `InputNumber`: `decimalPlaces` type扩展，Support灵活 进位configuration @zhangpaopao0609 ([#4536](https://github.com/Tencent/tdesign-vue-next/pull/4536))
### 🐞 Bug Fixes
- `List`:
- Fix the issue of use虚拟scrolllistwhenuse `v-if` display scenariocontainernot判空abnormality @zhengchengshi ([#4541](https://github.com/Tencent/tdesign-vue-next/pull/4541))
- Fix the issue of `list-item` `props` errorcausepartial `API` nottake effect @summer-077 ([#4544](https://github.com/Tencent/tdesign-vue-next/pull/4544))
- `Tag`: Fix the issue of globalinstead `closeBtn` icons scenarioundererror @uyarn ([#4494](https://github.com/Tencent/tdesign-vue-next/pull/4494))
- `TimePicker`: Fix the issue of `format` 仅Support `HH:mm:ss` format @liweijie0812 ([#4505](https://github.com/Tencent/tdesign-vue-next/pull/4505))
- `Table`: Fix the issue of dragAdjust列宽之afterexceed省略style丢失 @uyarn ([#4545](https://github.com/Tencent/tdesign-vue-next/pull/4545))
### 🚧 Others
- `Table`: Fix the paginationdocumentation displayexampleerror issue @uyarn ([#4501](https://github.com/Tencent/tdesign-vue-next/pull/4501))
- `Menu`: Update关in`MenuItem` `routerLink` 相关documentation @Nero978 ([#4543](https://github.com/Tencent/tdesign-vue-next/pull/4543))

## 🌈 1.9.9 `2024-08-16` 
### 🚀 Features
- `RangeInput`: Support无border `borderless` mode @liweijie0812 ([#4442](https://github.com/Tencent/tdesign-vue-next/pull/4442))
- `DateRangePicker`: Support无border `borderless` mode @liweijie0812 ([#4442](https://github.com/Tencent/tdesign-vue-next/pull/4442))
- `TimeRangePicker`: Support无border `borderless` mode @liweijie0812 ([#4442](https://github.com/Tencent/tdesign-vue-next/pull/4442))
### 🐞 Bug Fixes
- `Cascader`:
- Fix the issue of 点击清空button多次trigger `change` event @uyarn ([#4478](https://github.com/Tencent/tdesign-vue-next/pull/4478))
- Fix the issue of incanfilterunder输入valueafternotselectedvaluewhen，点击清空buttonaftererrorselectedoption @uyarn ([#4478](https://github.com/Tencent/tdesign-vue-next/pull/4478))
- `Tabs`:
- Fix the issue of componentinglobalinsteadiconsunder，存ininsteadcomponent `event` eventcauseRemove操作abnormality @uyarn ([#4485](https://github.com/Tencent/tdesign-vue-next/pull/4485))
- Fix the `t-tabs__bar` in `dialog` in 尺寸 issue @RyouSY ([#4438](https://github.com/Tencent/tdesign-vue-next/pull/4438))
- `Upload`: Fix the issue of partialiconsnotSupportglobalinstead @uyarn ([#4434](https://github.com/Tencent/tdesign-vue-next/pull/4434))
- `Dialog`: Fix the `cancelBtn` 和 `confirmBtn` 设置as`null` type issue @chouchouji ([#4439](https://github.com/Tencent/tdesign-vue-next/pull/4439))
- `Input`: Fix the `maxlength` not准确 issue @novlan1 ([#4429](https://github.com/Tencent/tdesign-vue-next/pull/4429))
- `TagInput`: Fix the defect of `tagProps` not作用to折叠 tag上 @uyarn ([#4465](https://github.com/Tencent/tdesign-vue-next/pull/4465))
- `Pagination`: Fix the issue of `pagination` in `pageSize` 改变when，`onChange` unable to获取最新 `pageSize` @1379255913 ([#4450](https://github.com/Tencent/tdesign-vue-next/pull/4450))
- `RangeInput`: 清空iconscannotnormalshow @betavs ([#4453](https://github.com/Tencent/tdesign-vue-next/pull/4453))
- `Dropdown`: Fix the issue of 由innotdynamic计算causeuse方修改 `DropdownItem` heightafter计算positionerror @uyarn ([#4484](https://github.com/Tencent/tdesign-vue-next/pull/4484))
- `Table`: Fix the issue of dragsortwhen，祖先node内 顺序error @uyarn ([common#1880](https://github.com/Tencent/tdesign-common/pull/1880))
- `InputNumber`: Fix the issue of decimal点precision计算，以 `0` 开头 计算边界logicmissingcause计算error @uyarn ([common#1879](https://github.com/Tencent/tdesign-common/pull/1879))
### 🚧 Others
- `Progress`: TStype改名 `StatusEnum`=>`ProgressStatus`,`ThemeEnum`=>`ProgressTheme` @liweijie0812 ([#4426](https://github.com/Tencent/tdesign-vue-next/pull/4426))
- `RangeInput`: Add `liveDemo` @liweijie0812 ([#4442](https://github.com/Tencent/tdesign-vue-next/pull/4442))


## 🌈 1.9.8 `2024-07-23` 
### 🚀 Features
- `Form`: Supportviaform `readonly`propertyaffect`TagInput`component @xiaojueshi ([#4370](https://github.com/Tencent/tdesign-vue-next/pull/4370))
- `Icon`: Add有序listicons `list-numbered`，Optimize`lock-off` 绘制路径 @double-deng ([#4378](https://github.com/Tencent/tdesign-vue-next/pull/4378))
- `TreeSelect`: `valueDisplay` 回Adjust个node信息，forinput box callbackdisplay @uyarn ([#4389](https://github.com/Tencent/tdesign-vue-next/pull/4389))
- `Dropdown`: Add`panelTopContent` 和 `panelBottomContent` API 实现 @uyarn ([#4388](https://github.com/Tencent/tdesign-vue-next/pull/4388))
- `ImageViewer`: Add `attach` API，Support自definition `ImageViewer` 挂载node @josonyang ([#4405](https://github.com/Tencent/tdesign-vue-next/pull/4405))
- `Tree`: use `getTreeData` 获取tree结构，Support `children`as `true` case @josonyang ([#4405](https://github.com/Tencent/tdesign-vue-next/pull/4405))
- `DatePicker`: Add `needConfirm` API，Supportdatetimeselect器notneed要点击确认button保存selecttime @Cat1007 ([#4411](https://github.com/Tencent/tdesign-vue-next/pull/4411))
### 🐞 Bug Fixes
- `DateRangePicker`: @liweijie0812
- Fix the issue of `Form` form处indisabledwhen，disablednottake effect ([#4380](https://github.com/Tencent/tdesign-vue-next/pull/4380))
- Fix the issue of `label` styleabnormality ([common#1845](https://github.com/Tencent/tdesign-common/pull/1845))
- `TagInput`: Fix `Form` component `disabled` propertyunable toaffectto `TagInput` component @xiaojueshi ([#4353](https://github.com/Tencent/tdesign-vue-next/pull/4353))
- `Icon`: Fix the icons`chart-column` 命名error issue @uyarn ([#4378](https://github.com/Tencent/tdesign-vue-next/pull/4378))
- `Input`: Fix the issue of disabledstateunderstillcan以switch明文密文 @jby0107 ([#4387](https://github.com/Tencent/tdesign-vue-next/pull/4387))
- `Avatar`: Fix the issue of `max`propertyin多层嵌套undernottake effect @1379255913 ([#4326](https://github.com/Tencent/tdesign-vue-next/pull/4326))
- `Table`: Fix the defect of `thClassName` notSupportfunction和数组use @theBestVayne ([#4406](https://github.com/Tencent/tdesign-vue-next/pull/4406))
- `Breadcrumb`: Fix the defect of `_blank`configuration打开两次新 `Tab` page @uyarn ([#4421](https://github.com/Tencent/tdesign-vue-next/pull/4421))
- `Notification`: Fix the issue of partialnodebefore缀not跟随`classPrefix`变化 @uyarn ([#4421](https://github.com/Tencent/tdesign-vue-next/pull/4421))
### 🚧 Others
- `Table`: Fixdocumentation关in`footerAffixedBottom` API texterror @Tsuj100 ([#4384](https://github.com/Tencent/tdesign-vue-next/pull/4384))

## 🌈 1.9.7 `2024-06-28` 
### 🚀 Features
- `Tree`:
- Add `allowDrop` API，Support拖放限制 能力 @TabSpace ([#4312](https://github.com/Tencent/tdesign-vue-next/pull/4312))
- `ScrollTo` Support `key` property，Supportvianode唯一valuescrollto指定node，详见examplecode @uyarn ([#4334](https://github.com/Tencent/tdesign-vue-next/pull/4334))
- `Descriptions`: Add `tableLayout` property @zhangpaopao0609 ([#4257](https://github.com/Tencent/tdesign-vue-next/pull/4257))
- `Tabs`: Add `scrollPosition` selected滑块scroll最终停留position @oljc ([#4269](https://github.com/Tencent/tdesign-vue-next/pull/4269))
- `Dialog`: Add `dialogStyle` 和 `dialogClassName` API，作forpopup本身，convenient forforpopup本身styleAdjust @uyarn ([#4347](https://github.com/Tencent/tdesign-vue-next/pull/4347))
- `Plugin`: 单独导出涉and `Plugin` 相关component style，Support修改before缀 partialscenariouse @uyarn ([#4343](https://github.com/Tencent/tdesign-vue-next/pull/4343))
- `InputNumber`: Support `Form` component `readonly` API @xiaojueshi ([#4321](https://github.com/Tencent/tdesign-vue-next/pull/4321))
### 🐞 Bug Fixes
- `Select`:
- Fix the issue of 键盘上under键selectedoptionafter `onEnter` event获取 `context.value` error @1379255913 ([#4303](https://github.com/Tencent/tdesign-vue-next/pull/4303))
- Fix the defect of `Option`in`OptionGroup`in必须use `v-for` 才can以use @1379255913 ([#4318](https://github.com/Tencent/tdesign-vue-next/pull/4318))
- `DatePicker`:
- Fix the issue of switch `mode`when，dateselect器switch头部showerror @wilonjiang ([#4292](https://github.com/Tencent/tdesign-vue-next/pull/4292))
- Fix the issue of switch `mode` when，`format` not匹配causecomponent解析失败 @wilonjiang ([#4292](https://github.com/Tencent/tdesign-vue-next/pull/4292))
- `Table`:
- 修正 `tableLayout: auto` 和固定表头搭配use 列宽notsynchronousissue @Cat1007 ([#4285](https://github.com/Tencent/tdesign-vue-next/pull/4285))
- delete `ellipsis.tsx` innot必要 标志重置 @xiaojueshi ([#4349](https://github.com/Tencent/tdesign-vue-next/pull/4349))
- `Tree`:
- Fix the issue of componentnot暴露`scrollTo`method，保留`scrollToElement`method @uyarn ([#4334](https://github.com/Tencent/tdesign-vue-next/pull/4334))
- Fix the issue of via`scrollTo` 指定scrollnode，多次scrollnodepositionabnormality @uyarn ([#4334](https://github.com/Tencent/tdesign-vue-next/pull/4334))
- `Pagination`: select器更改when内部whenbeforevaluenot修改 @betavs ([#4284](https://github.com/Tencent/tdesign-vue-next/pull/4284))
- `Cascader`: Fix无 `children` option点击whennotwillshow之before list @1379255913 ([#4301](https://github.com/Tencent/tdesign-vue-next/pull/4301))

## 🌈 1.9.6 `2024-06-06` 
### 🚀 Features
- `Form`: Add `readonly` property，Supportconfigurationformreadonly @xiaojueshi ([#4176](https://github.com/Tencent/tdesign-vue-next/pull/4176))
- `Button`: Add `loadingProps` API @novlan1 ([#4219](https://github.com/Tencent/tdesign-vue-next/pull/4219))
- `Breadcrumb`: Optimizedisplay文字 `overflow` display `tooltip` 判断条件 @xiaojueshi ([#4220](https://github.com/Tencent/tdesign-vue-next/pull/4220))
- `Table`: Optimizedisplay文字 `overflow` display `tooltip` 判断条件 @xiaojueshi ([#4220](https://github.com/Tencent/tdesign-vue-next/pull/4220))
- `SelectInput`: Add `size` property @1379255913 ([#4229](https://github.com/Tencent/tdesign-vue-next/pull/4229))
- `Watermark`: 增强watermark防篡改能力 @oljc ([#4233](https://github.com/Tencent/tdesign-vue-next/pull/4233))
- `Tabs`: Supportvia滚轮or者触摸板scroll操作 @oljc ([#4222](https://github.com/Tencent/tdesign-vue-next/pull/4222))
- `DatePicker`: Optimizedateintervalselect器头部interval 变化logic，selectafter左侧interval大in右侧interval，则defaultAdjustas左侧intervalalways比右侧interval小 @uyarn ([#4263](https://github.com/Tencent/tdesign-vue-next/pull/4263))
- `Input`: Add `spellCheck` whetherenable拼写检查 @liweijie0812 ([#4265](https://github.com/Tencent/tdesign-vue-next/pull/4265))
- `TreeSelect`: for外暴露 `treeRef` @novlan1 ([#4235](https://github.com/Tencent/tdesign-vue-next/pull/4235))
- `ImageViewer`: Support原生 `svg` render @josonyang ([#4249](https://github.com/Tencent/tdesign-vue-next/pull/4249))
- `Drawer`: Adddragwhen 最大最小限制，Add `onSizeDragEnd` callbackfunction @ZWkang ([#4009](https://github.com/Tencent/tdesign-vue-next/pull/4009))

### 🐞 Bug Fixes

- `Cascader`:
- Fix the issue of `prefixIcon`、`suffix` 和 `suffixIcon` `slot` functionmissing @1379255913 ([#4229](https://github.com/Tencent/tdesign-vue-next/pull/4229))
- Fix the issue of `autofocus` functionineffective @uyarn ([#4266](https://github.com/Tencent/tdesign-vue-next/pull/4266))
- `Tabs`: Fix the 滑块定位 issue @ZTH520 ([#4207](https://github.com/Tencent/tdesign-vue-next/pull/4207))
- `List`: Fix the enable虚拟scroll abnormality issue @uyarn ([#4208](https://github.com/Tencent/tdesign-vue-next/pull/4208))
- `Table`: 修正固定行和虚拟scroll 组合usescenario @Cat1007 ([#4145](https://github.com/Tencent/tdesign-vue-next/pull/4145))
- `Select`: Fix the issue of 远程search配合filter，输入筛选条件after，use键盘selectabnormality @ZTH520 ([#4218](https://github.com/Tencent/tdesign-vue-next/pull/4218))
- `Table`: Fix the `filter.type` warninglogic issue @uyarn ([#4226](https://github.com/Tencent/tdesign-vue-next/pull/4226))
- `InputNumber`: Fix the issue of `allowInputOverLimit=false` 大小value判断when，`value` as `undefined` when，willappearshow Infinity @HaixingOoO @uyarn ([#4262](https://github.com/Tencent/tdesign-vue-next/pull/4262))
- `DatePicker`: Fix the in指定 `format` 和 `valueType` under，year解析error issue @Ericleungs ([#4161](https://github.com/Tencent/tdesign-vue-next/pull/4161))


## 🌈 1.9.5 `2024-05-16` 
### 🚀 Features
- `Input`: Add `borderless` API，Support无bordermode @uyarn ([#4159](https://github.com/Tencent/tdesign-vue-next/pull/4159))
- `AutoComplete`: Add `borderless` API，Support无bordermode @liweijie0812 ([#4192](https://github.com/Tencent/tdesign-vue-next/pull/4192))
- `ColorPicker`: Add `borderless` API，Support无bordermode @liweijie0812 ([#4192](https://github.com/Tencent/tdesign-vue-next/pull/4192))
- `TagInput`: Add `borderless` API，Support无bordermode @liweijie0812 ([#4192](https://github.com/Tencent/tdesign-vue-next/pull/4192))
- `DatePicker`: @liweijie0812 ([#4192](https://github.com/Tencent/tdesign-vue-next/pull/4192))
- Add `borderless` API，Support无bordermode
- Add `label` API ，Support自definitiondefinition左侧text
- `TimePicker`:
- Add `borderless` API，Support无bordermode @liweijie0812 ([#4192](https://github.com/Tencent/tdesign-vue-next/pull/4192))
- Add `valueDisplay` API ，Support自definitiondisplaycontent @liweijie0812 ([#4192](https://github.com/Tencent/tdesign-vue-next/pull/4192))
- Add `label` API ，Support自definitiondefinition左侧text @liweijie0812 ([#4195](https://github.com/Tencent/tdesign-vue-next/pull/4195))
- 此刻buttonin设置 `preset` API whennot再display @uyarn ([#4191](https://github.com/Tencent/tdesign-vue-next/pull/4191))
- `Upload`: Add `trigger-button-props` in `default` 和 `content` parameterpass through @betavs ([#4126](https://github.com/Tencent/tdesign-vue-next/pull/4126))
- `Radio`: disabled优先级 `Radio.disabled` > `RadioGroup.disabled` > `Form.disabled` @liweijie0812 ([#4182](https://github.com/Tencent/tdesign-vue-next/pull/4182))
- `Scroll`: Adjustscrollbarcompatible 实现方式，Optimize `1.9.4` versionneed要依赖 `autoprefixer` versionUpdate issue @LoopZhou

### 🐞 Bug Fixes
- `Table`:
- 修正虚拟scrollunderscrollto指定行 error @Cat1007 ([#4129](https://github.com/Tencent/tdesign-vue-next/pull/4129))
- 修改table判断contentwhether溢出 @thc-07 ([#4093](https://github.com/Tencent/tdesign-vue-next/pull/4093))
- `Upload`:
- Fix the issue of imageuploaderrortypeunder styleabnormality @uyarn ([#4197](https://github.com/Tencent/tdesign-vue-next/pull/4197))
- `data` propertydefinitionmissing `Function` type @betavs ([#4127](https://github.com/Tencent/tdesign-vue-next/pull/4127))
- `Select`: inselect框can输入when，每次输入都willtrigger popup-visible-change event @Liao-js ([#4137](https://github.com/Tencent/tdesign-vue-next/pull/4137))
- `Transfer`: Fix the transfer存indefault已选andnot允许Remove valuestillcanRemove abnormality issue @liect ([#4147](https://github.com/Tencent/tdesign-vue-next/pull/4147))
- `Textarea`: compatiblecomponent销毁caseunder，元素not存incauseerror issue @PDieE ([#4144](https://github.com/Tencent/tdesign-vue-next/pull/4144))
- `Form`: Fix the form`disabled`as`true`，form输入类component`disabled`as`false`when 表现abnormality issue @uyarn ([#4189](https://github.com/Tencent/tdesign-vue-next/pull/4189))
- `Menu`: 提升 `t-popup__menu` style优先级，解决dist内style优先级一致causestyleabnormality issue @uyarn ([#4197](https://github.com/Tencent/tdesign-vue-next/pull/4197))
- `Select`: Optimize已选style覆盖已disabledstyle issue @fython ([#4197](https://github.com/Tencent/tdesign-vue-next/pull/4197))
- `Cascader`: Fix the issue of `Cascader` 多选stateunder deleteoptionwhentrigger多次 `change` event @algerkong ([#4140](https://github.com/Tencent/tdesign-vue-next/pull/4140))
- `ColorPicker`: Fix the issue of switch预览colorwhen，通道buttonpositionnot变 @fennghuang ([#4177](https://github.com/Tencent/tdesign-vue-next/pull/4177))

### 🚧 Others
- `Tabs`: Updatecan滑动 option卡exampledocumentation @fennghuang ([#4167](https://github.com/Tencent/tdesign-vue-next/pull/4167))
- `Upload`: Fix the issue of `locale`跳转链接abnormality @uyarn ([#4197](https://github.com/Tencent/tdesign-vue-next/pull/4197))

## 🌈 1.9.4 `2024-04-18` 
### 🚀 Features
- `Textarea`:
- Add `allow-input-over-max` property @betavs ([#4086](https://github.com/Tencent/tdesign-vue-next/pull/4086))
- Add`onValidate` event @betavs ([#4086](https://github.com/Tencent/tdesign-vue-next/pull/4086))
- `Scroll`: Fix the 由in `Chrome 121` versionSupport scroll width 之aftercause Table、Select andpartialappearscrollbarcomponent styleabnormality issue @loopzhou (common#1765)。please note，基in @vue/cli-service 4.x and以underversioninitial化 项目由in依赖 `autoprefixer` version过低，will因as这个Fix受affect编译，请整体upgrade@vue/cli-serviceto5.0以上

### 🐞 Bug Fixes
- `DatePicker`: forin `valueType = 'Date'` notinitial化 parse @Cat1007 ([#4066](https://github.com/Tencent/tdesign-vue-next/pull/4066))
- `Loading`: `hide` functionerrorcloseall `Loading` instance. @XBIsland ([#4081](https://github.com/Tencent/tdesign-vue-next/pull/4081))
- `Popup`: Fix the in `webcomponent` scenariounder由in `shadowroot` cause `document` 判断abnormalitycause display issue @decadef20 ([#4091](https://github.com/Tencent/tdesign-vue-next/pull/4091))
- `Descriptions`: Fixcontentas空when候 error @zhangpaopao0609 ([#4092](https://github.com/Tencent/tdesign-vue-next/pull/4092))
- `Textarea`: `autosize` in `Firefox` innottake effect。 @XBIsland ([#4104](https://github.com/Tencent/tdesign-vue-next/pull/4104))
- `DatePicker`: Fix the issue of `1.9.3`versioninweek和quartermodeselectabnormality @uyarn ([#4096](https://github.com/Tencent/tdesign-vue-next/pull/4096))
- `Tabs`: Fix the dragsortaftermanuallyAdd `tab` positionabnormality issue @Liao-js ([#4108](https://github.com/Tencent/tdesign-vue-next/pull/4108))
- `Cascader`: Fix自definitionrendercontentnotSupport多选 @ZTH520 ([#4109](https://github.com/Tencent/tdesign-vue-next/pull/4109))
- `TimePicker`: Fix the issue of notselected具体intervalwhen预设valueerror @uyarn ([#4123](https://github.com/Tencent/tdesign-vue-next/pull/4123))
- `Skeleton`: Fix设置 `delay` 延迟并and `loading` as `true` when，unable tointo达 `delay` timebefore取消准备to来 `loading` @boogie-ben ([#4119](https://github.com/Tencent/tdesign-vue-next/pull/4119))
- `BreadcrumbItem`: Fix the issue of 读取 `content` content；text溢出whencall `slot?.default()` 非function @boogie-ben ([#4120](https://github.com/Tencent/tdesign-vue-next/pull/4120))


## 🌈 1.9.3 `2024-03-29`
### 🐞 Bug Fixes
- `Form`: Fix the `1.9.1`version warning issue @uyarn ([#4060](https://github.com/Tencent/tdesign-vue-next/pull/4060))
- `Loading`: Fix`1.9.1`versionfor外暴露 `directive` use warningand命名error @uyarn ([#4060](https://github.com/Tencent/tdesign-vue-next/pull/4060))
- `DatePicker`: Fix the `1.9.1`versionuse`Date` abnormality issue @uyarn

## 🌈 1.9.1 `2024-03-28` 
### 🚀 Features
- `Breadcrumb`: `breadcrumb-item`Add `click` event @uyarn ([#4017](https://github.com/Tencent/tdesign-vue-next/pull/4017))
- `Tag`: Add`color` API，Support自definitioncolor @maoyiluo ([#4023](https://github.com/Tencent/tdesign-vue-next/pull/4023))
- `TagInput`: 扩展 `collapsedItems` deletefunction
- `DatePicker`: Add `valueDisplay` 和 `selectInputProps` API，Supportfordisplaycontent自definition @uyarn ([#4038](https://github.com/Tencent/tdesign-vue-next/pull/4038))
### 🐞 Bug Fixes
- `Descriptions`:
- Fix the 编辑器for `t-descriptions-item` component promptmissing issue @uyarn ([#4006](https://github.com/Tencent/tdesign-vue-next/pull/4006))
- Optimize自适shouldwidth issue @uyarn ([#4006](https://github.com/Tencent/tdesign-vue-next/pull/4006))
- `Loading`:
- Fix `LoadingPlugin` callwhen `preventScrollThrough` parameterinvalid。 @XBIsland ([#4040](https://github.com/Tencent/tdesign-vue-next/pull/4040))
- Fixuse `unplugin-vue-components` 按needloading，`v-loading` 指令invalid @XBIsland ([#4048](https://github.com/Tencent/tdesign-vue-next/pull/4048))
- `Table`:
- `activeRowType = multiple`when，`activeRowList` 赋valueerror。 @XBIsland ([#4010](https://github.com/Tencent/tdesign-vue-next/pull/4010))
- 修正数据长度变化when，虚拟scrolltable总height计算error issue @Cat1007 ([#4016](https://github.com/Tencent/tdesign-vue-next/pull/4016))
- `Notification`: `NotifyPlugin` returnerror `NotificationInstance` cause `NotifyPlugin.close` functionerrorclosecomponent。 @XBIsland ([#4014](https://github.com/Tencent/tdesign-vue-next/pull/4014))
- `Form`: avoid`form-item` `label`propertywhen `for` as空whenstill赋value issue @sechi747 ([#4027](https://github.com/Tencent/tdesign-vue-next/pull/4027))
- `Cascader`: Fix the `value` 数据回填abnormalitycausestyleineffective issue ([#4021](https://github.com/Tencent/tdesign-vue-next/pull/4021)) @XBIsland ([#4025](https://github.com/Tencent/tdesign-vue-next/pull/4025))
- `Tnput`: Fix `hover` when键盘操作unable totrigger `blur` event。 ([#3963](https://github.com/Tencent/tdesign-vue-next/pull/3963)) ([#3903](https://github.com/Tencent/tdesign-vue-next/pull/3903)) ([#3639](https://github.com/Tencent/tdesign-vue-next/pull/3639)) @XBIsland ([#4032](https://github.com/Tencent/tdesign-vue-next/pull/4032))
- `Locale`: Fix the issue of `Image`和`ImageViewer` 英语language包abnormality @uyarn ([#4038](https://github.com/Tencent/tdesign-vue-next/pull/4038))
- `DatePicker`: Fix the issue of `format` and `valueType` not一致 scenariounder计算error @uyarn ([#4058](https://github.com/Tencent/tdesign-vue-next/pull/4058))
- `Tabs`: Fix the issue of use `action` whenconsolewarning @uyarn ([#4057](https://github.com/Tencent/tdesign-vue-next/pull/4057))
- `ColorPicker`: Fix the issue of `linear-gradient` modeunable to拖动Adjustcolor (#4015) @XBIsland ([#4022](https://github.com/Tencent/tdesign-vue-next/pull/4022))
- `Icon`: Optimize `Icon` 无网络scenario 描述，着重标出处理方案 @xiexin12138 ([#4024](https://github.com/Tencent/tdesign-vue-next/pull/4024))
### 🚧 Others
- `Menu`: 去除 `demo` in 争议property @sinbadmaster ([#4049](https://github.com/Tencent/tdesign-vue-next/pull/4049))


## 🌈 1.9.0 `2024-03-07` 
### 🚀 Features
- `Description`:
- `layout` typedefinitionAdjustas字符串多type @chaishi ([#3939](https://github.com/Tencent/tdesign-vue-next/pull/3939))
- Support嵌套 描述component @zhangpaopao0609 ([#3970](https://github.com/Tencent/tdesign-vue-next/pull/3970))
- `Form`: `trigger` Support `submit` @liweijie0812 ([#3910](https://github.com/Tencent/tdesign-vue-next/pull/3910))
- `Demo`: Support `Typescript` codeexample @chaishi @uyarn @RSS1102 @HaixingOoO ([#3929](https://github.com/Tencent/tdesign-vue-next/pull/3929))
- `Statistic`: `color`黑色风格适配darkmode [(common#1721)](https://github.com/Tencent/tdesign-common/pull/1721) @liweijie0812 ([#3910](https://github.com/Tencent/tdesign-vue-next/pull/3910))
- `Slider`: Supportvia `label=null` or `label=false` hide滑块数字浮层 @chaishi ([#3997](https://github.com/Tencent/tdesign-vue-next/pull/3997))
- `Table`: Supportglobalconfiguration `size` @Lyan-u ([#3993](https://github.com/Tencent/tdesign-vue-next/pull/3993))
- `Nuxt`: Remove产物in nuxt module，Adjustas安装`@tdesign-vue-next/nuxt`use，解决use`es/nuxt` functionabnormality issue，详细use方式please refer to快速开始in 介绍 @uyarn @liweijie0812 ([#4001](https://github.com/Tencent/tdesign-vue-next/pull/4001))
### 🐞 Bug Fixes
- `Table`:
- 修正虚拟scrollunder `footer` 实现 @Cat1007 ([#3965](https://github.com/Tencent/tdesign-vue-next/pull/3965))
- tree结构table，Fix the 同whenasynchronous设置 `data` 和 `expandedTreeNodes` when，expandnodeinvalid issue（延迟设置有效）， @chaishi ([#3967](https://github.com/Tencent/tdesign-vue-next/pull/3967))
- 固定list格，in `Dialog` in固定列width被挤压issue， @chaishi ([#3967](https://github.com/Tencent/tdesign-vue-next/pull/3967))
- 完善 `Table` component `Typescript` typedefinition @chaishi ([#3936](https://github.com/Tencent/tdesign-vue-next/pull/3936))
- Fix the 列dragsort issue @chaishi ([#3968](https://github.com/Tencent/tdesign-vue-next/pull/3968))
- 修正in `footer` heightUpdate scenariounder, `footer` not被normal刷新 issue @Cat1007 ([#3975](https://github.com/Tencent/tdesign-vue-next/pull/3975))
- `Drawer`: Fix the issue of `closeBtn` property `Boolean` type转换nottake effect @trojanyao ([#3427](https://github.com/Tencent/tdesign-vue-next/pull/3427))
- `Form`: validation判断not严谨 issue @betavs ([#3960](https://github.com/Tencent/tdesign-vue-next/pull/3960))
- `Select`: Fix the select createAble selectednottriggerchangeevent issue @hkaikai ([#3962](https://github.com/Tencent/tdesign-vue-next/pull/3962))
- `Nuxt`: Fix the issue of in`nuxt`inuse `Form` componentunable tonormal构建 @richardji202 ([#3977](https://github.com/Tencent/tdesign-vue-next/pull/3977))
- `ColorPicker`: `color` valuenotsynchronousUpdate @betavs ([#4005](https://github.com/Tencent/tdesign-vue-next/pull/4005))
- `Drawer`: Fix the issue of `closeBtn` property `Boolean` type转换nottake effect @trojanyao ([#3427](https://github.com/Tencent/tdesign-vue-next/pull/3427))
- `Affix`: 修正 `margin` 计算，avoidappear `error` @Cat1007 ([#3972](https://github.com/Tencent/tdesign-vue-next/pull/3972))

### 🚧 Others
- `Code`: 编辑器codepromptUpdate @liweijie0812 ([#3927](https://github.com/Tencent/tdesign-vue-next/pull/3927))


## 🌈 1.8.1 `2024-01-31` 
### 🚀 Features
- `Loading`: Support自definition `v-loading` configuration，具体参考examplecode @uyarn ([#3911](https://github.com/Tencent/tdesign-vue-next/pull/3911))
### 🐞 Bug Fixes
- `Tabs`:
- Fix the issue of 层级issueaffect `action`区域操作 @uyarn ([#3881](https://github.com/Tencent/tdesign-vue-next/pull/3881))
- logic容错处理 @betavs ([#3891](https://github.com/Tencent/tdesign-vue-next/pull/3891))
- `Form`:
- `FormRule` rulein `trigger` valuetypemissing `all` option @betavs ([#3875](https://github.com/Tencent/tdesign-vue-next/pull/3875))
- Fix the issue of 计算 `^` 字符abnormality @uyarn ([#3881](https://github.com/Tencent/tdesign-vue-next/pull/3881))
- `Drawer`:
- `visible` as `false` when，按 `esc` willtrigger `onEscKeydown` 和 `onCancel` event @betavs ([#3836](https://github.com/Tencent/tdesign-vue-next/pull/3836))
- Fix the `closeOnEscKeydown` enablewhen任意按键都willtrigger `Drawer` issue @ruanlinxin ([#3904](https://github.com/Tencent/tdesign-vue-next/pull/3904))
- `Input`: Fix the issue of disabledstateunder `focused` stylenot消除 @wilonjiang ([#3840](https://github.com/Tencent/tdesign-vue-next/pull/3840))
- `TreeSelect`: Fix the issue of canfilterenablewhensearch框contentand `filter` functionnotsynchronousUpdate @PeterJayawesome ([#3862](https://github.com/Tencent/tdesign-vue-next/pull/3862))
- `VirtualScroll`: 修改 `virtual` in `buffer` 实现,修正错位 translateY 计算logic @Cat1007 ([#3776](https://github.com/Tencent/tdesign-vue-next/pull/3776))
- `Slider`: @uyarn
- Fix the `step` 设置小in `1` when useabnormality issue ([#3883](https://github.com/Tencent/tdesign-vue-next/pull/3883))
- Fix the issue of `inputProps` `onChange` eventunable tonormaltrigger ([#3906](https://github.com/Tencent/tdesign-vue-next/pull/3906))
- `Loading`: Fix the issue of not设置 `z-index` defaultvalue @betavs ([#3881](https://github.com/Tencent/tdesign-vue-next/pull/3881))
- `DatePicker`: Fix the issue of 单独configuration `popupProps` `on-visible-change` functionabnormality @uyarn ([#3908](https://github.com/Tencent/tdesign-vue-next/pull/3908))
- `TagInput`: Fix the issue of `taginput` in `size` fordefault `collapsedItems` nottake effect @SadWood ([#3847](https://github.com/Tencent/tdesign-vue-next/pull/3847))
- `Radio`: Fix the issue of 回车whenconsoleerror @liweijie0812 ([#3896](https://github.com/Tencent/tdesign-vue-next/pull/3896))

### 🚧 Others
- `Form`: `trigger api` documentationUpdate @liweijie0812 ([#3882](https://github.com/Tencent/tdesign-vue-next/pull/3882))
- `Tree`: examplecode由 `OptionsAPI` 更as `CompositionAPI` @chaishi ([#3899](https://github.com/Tencent/tdesign-vue-next/pull/3899))
- `Descriptions`: display冒号example文字error @czq297297 ([#3841](https://github.com/Tencent/tdesign-vue-next/pull/3841))



## 🌈 1.8.0 `2024-01-09` 
### 🚀 Features
- `Descriptions`: Add `Descriptions` 描述component @zhangpaopao0609 ([#3787](https://github.com/Tencent/tdesign-vue-next/pull/3787))
- `Slider`: 实现 `changeEnd` event @Lyan-u ([#3780](https://github.com/Tencent/tdesign-vue-next/pull/3780))
- `Form`: as `Form Item` validation信息Add `title` property，for鼠标停留whendisplaycomplete信息 @sosohime ([#3779](https://github.com/Tencent/tdesign-vue-next/pull/3779))
- `ImageViewer`: Adddefault缩放比例 @timi137137 ([#3678](https://github.com/Tencent/tdesign-vue-next/pull/3678))
- `Radio`: Add `readonly` property @betavs ([#3814](https://github.com/Tencent/tdesign-vue-next/pull/3814))
### 🐞 Bug Fixes
- `Table`:
- Fix the 行dragsortscenario，asynchronousloading行will变to第一行 issue @chaishi ([#3819](https://github.com/Tencent/tdesign-vue-next/pull/3819))
- dragsortscenario，Fix the via `push` Add `data` 元素after，被add 新元素appearin第一列 issue @chaishi ([#3822](https://github.com/Tencent/tdesign-vue-next/pull/3822))
- Fix `sortablejs` 操作 `DOM` afterfor虚拟 `DOM` produce 副作用。 @huangchen1031 ([#3825](https://github.com/Tencent/tdesign-vue-next/pull/3825))
- Fix the issue of `EnhancedTable` tree型table表头操作全选，willselected已disabledselect 行 @huangchen1031 @uyarn ([#3832](https://github.com/Tencent/tdesign-vue-next/pull/3832))
- `Cascader`: Fix `mutiple & show-all-levels = false` scenariounder设置`value`as`options`内not存in valueerror @Zz-ZzzZ ([#3810](https://github.com/Tencent/tdesign-vue-next/pull/3810))
- `DatePicker`: internationalizationswitchinvalid() @liweijie0812 ([#3818](https://github.com/Tencent/tdesign-vue-next/pull/3818))
- `TagInput`: 解决 `disabled` as真when，can以点击 issue @betavs ([#3831](https://github.com/Tencent/tdesign-vue-next/pull/3831))
- `Radio`: 处理selectedstate也willtrigger `change` event issue @betavs ([#3782](https://github.com/Tencent/tdesign-vue-next/pull/3782))

## 🌈 1.7.2 `2023-12-22` 
### 🚀 Features
- `Upload`:
- 设置 `uploadPastedFiles` defaultvalueas `true` @chaishi ([#3754](https://github.com/Tencent/tdesign-vue-next/pull/3754))
- input boxtype uploadcomponent，Addclass name `t-upload--theme-file-input` @chaishi ([#3754](https://github.com/Tencent/tdesign-vue-next/pull/3754))
- `Table`: @chaishi ([#3758](https://github.com/Tencent/tdesign-vue-next/pull/3758))
- 行selectedfunction，Add `rowSelectionType` fordefinition是单选/多选 forSupport即使notconfiguration `columns: [{ rowKey: "row-select", type: 'single' }]` caseunder，也能via `selectOnRowClick` 行selected 控制
- 行selectedfunction，Add `rowSelectionAllowUncheck` for控制单选scenario，whether允许取消selected
- `ImageViewer`: image预览，loading失败when，notshowerrortext，只showicons @chaishi ([#3754](https://github.com/Tencent/tdesign-vue-next/pull/3754))
- `Menu`: selectedafterclosemenu，and其他componentmaintaininteractionbehavior一致() @uyarn ([#3764](https://github.com/Tencent/tdesign-vue-next/pull/3764))
- `RadioGroup`: Optimizecomponentstyle体验，`variant`as`default-filled`wheninitialstatenot执行动画 @loganylwu ([#3765](https://github.com/Tencent/tdesign-vue-next/pull/3765))
- `Card`: `card` componentSupportpass in `loadingProps` parameter @iiimix ([#3731](https://github.com/Tencent/tdesign-vue-next/pull/3731))
- `DatePicker`: Support `cancelRangeSelectLimit` `API` @githubid0719 ([#3718](https://github.com/Tencent/tdesign-vue-next/pull/3718))
- `Dropdown`: Removefor `left` `item` style特殊处理 @uyarn ([#3752](https://github.com/Tencent/tdesign-vue-next/pull/3752))

### 🐞 Bug Fixes

- `ImageViewer`:
- 去除defaultvalue设置以use `globalConfig` in defaultvalue,avoidinnot同language环境inappearabnormality @sinbadmaster ([#3709](https://github.com/Tencent/tdesign-vue-next/pull/3709))
- 修改键盘event绑定for象,avoidaffectglobal键盘event @sinbadmaster ([#3712](https://github.com/Tencent/tdesign-vue-next/pull/3712))
- `Table`:
- Fix the `column-controller-visible-change` eventparameter `trigger` valuenot正确 issue @chaishi ([#3716](https://github.com/Tencent/tdesign-vue-next/pull/3716))
- 虚拟scrollscenario，Fix the 吸顶 `Affix` 表头unable toscrollsynchronous issue @Cat1007 ([#3746](https://github.com/Tencent/tdesign-vue-next/pull/3746))
- 横向scrollscenario，Fix the in `Windows` scenarioin，按under鼠标（not松开鼠标）横向scrollwhen，表头not跟随scroll issue @chaishi ([#3753](https://github.com/Tencent/tdesign-vue-next/pull/3753))
- can筛选table，Fix the 筛选valueas `0` when，筛选图表not高亮 issue， @chaishi ([#3753](https://github.com/Tencent/tdesign-vue-next/pull/3753))
- `fixedRowHeight` scenariounderinitial化失败，cause虚拟scrollnottake effect @Cat1007 ([#3739](https://github.com/Tencent/tdesign-vue-next/pull/3739))
- 修正tableprecision,avoid表头和tableappearprecision误差因此预期外 scrollbar @Cat1007 ([#3747](https://github.com/Tencent/tdesign-vue-next/pull/3747))
- `Tree`:
- 处理 `height` propertyinvalid issue @betavs ([#3717](https://github.com/Tencent/tdesign-vue-next/pull/3717))
- 解决selected态initial化abnormality issue @TabSpace ([#3742](https://github.com/Tencent/tdesign-vue-next/pull/3742))
- `ImageViewer`: 滚轮缩放符合操作直觉 @sinbadmaster ([#3738](https://github.com/Tencent/tdesign-vue-next/pull/3738))
- `DateRangePicker`: Fix the issue of `12` 月whenselect同一个月内 dateafter，第一次打开panel左右month一样 @Lyan-u ([#3727](https://github.com/Tencent/tdesign-vue-next/pull/3727))
- `Dialog`: 修正 `DialogPlugin` 获取元素操作 `className` when机 @Cat1007 ([#3732](https://github.com/Tencent/tdesign-vue-next/pull/3732))
- `DatePicker`: Fix the issue of dateselectdisabledafter，after缀iconscolor改变 @HaixingOoO @uyarn ([#3752](https://github.com/Tencent/tdesign-vue-next/pull/3752))
- `Table`: Fix the `1.7.1` in，`Shift` 连续selectedineffective issue， @chaishi ([#3753](https://github.com/Tencent/tdesign-vue-next/pull/3753))
- `Select`: Fix the issue of `1.6.0` versionafter canfilterunder re-打开notnormal清除filter输入content @uyarn ([#3762](https://github.com/Tencent/tdesign-vue-next/pull/3762))
- `TreeSelect`: Fix the issue of canfilterunder，re-打开not清除filter输入content @uyarn ([#3762](https://github.com/Tencent/tdesign-vue-next/pull/3762))
- `Upload`: Fix the 取消draguploadafter，stateunable to回tocomponentinitialstate issue， @chaishi ([#3754](https://github.com/Tencent/tdesign-vue-next/pull/3754))
- `InputNumber`: `allowInputOverLimit` as `false` when，数字超过最大value `onBlur` nottrigger @zhaodesen ([#3722](https://github.com/Tencent/tdesign-vue-next/pull/3722))
- `Pagination`: will总数单位 `项` 改as `条` , maintaincontent一致性 @dinghuihua ([common#1687](https://github.com/Tencent/tdesign-common/pull/1687))
### 🚧 Others
- `Dialog`: Addunified管理popup hooks @AuYuHui ([#3635](https://github.com/Tencent/tdesign-vue-next/pull/3635))


## 🌈 1.7.1 `2023-12-07` 
### 🚀 Features
- `Table`: Support `thClassName` 单独给表头addclass name @chaishi ([#3669](https://github.com/Tencent/tdesign-vue-next/pull/3669))
- `TimePicker`: `props.presets`预设快捷timeselect @liweijie0812 ([#3665](https://github.com/Tencent/tdesign-vue-next/pull/3665))
- `Dropdown`: add`DropdownItem`pass`boolean attribute`when 转换(#3692) @Zz-ZzzZ ([#3702](https://github.com/Tencent/tdesign-vue-next/pull/3702))
### 🐞 Bug Fixes
- `Tree`:
- `tree` nodedisabledstatelogic改进 @TabSpace ([#3653](https://github.com/Tencent/tdesign-vue-next/pull/3653))
- `value`, `active`, `expanded` property, Support数组操作trigger视图变更 @TabSpace ([#3682](https://github.com/Tencent/tdesign-vue-next/pull/3682))
- `Select`:
- 远程searchnot再本地filter，Support远程foroption `trim` or者extra处理 scenario @uyarn ([#3707](https://github.com/Tencent/tdesign-vue-next/pull/3707))
- Fix the defect of 非虚拟scrollscenariounder，unable to键盘回车键directlyselectedfilterafter option @uyarn ([#3707](https://github.com/Tencent/tdesign-vue-next/pull/3707))
- `Loading`: `ts` type丢失, `volar` promptinvalid @liweijie0812 ([#3684](https://github.com/Tencent/tdesign-vue-next/pull/3684))
- `AutoComplete`: use `lodash/escapeRegExp` 转换关键字text @ZWkang ([#3661](https://github.com/Tencent/tdesign-vue-next/pull/3661))
- `Table`: 本地数据paginationscenario，Fix the 行selectedinvalid issue，[#3669](https://github.com/Tencent/tdesign-vue-next/pull/3669) @chaishi ([#3669](https://github.com/Tencent/tdesign-vue-next/pull/3669))
- `DropdownItem`: 处理disabledstatecan点击 issue @betavs ([#3696](https://github.com/Tencent/tdesign-vue-next/pull/3696))
- `Tabs`: Optimizeinitial化scroll scenario，for处inin间 partialscenario进一步Optimize @uyarn ([#3699](https://github.com/Tencent/tdesign-vue-next/pull/3699))
- `Popup`: Fixconsoleerror @liweijie0812 ([#3705](https://github.com/Tencent/tdesign-vue-next/pull/3705))
- `Pagination`: paginationcomponent `foldedMaxPageBtn` Optimize @DYS1230 ([#3704](https://github.com/Tencent/tdesign-vue-next/pull/3704))
- `BreadcrumbItem`: Fix `target` propertyas `_blank` whennotin新tagpage打开() @selicens ([#3637](https://github.com/Tencent/tdesign-vue-next/pull/3637))
- `AutoComplete`: 没selected项回车nottriggerselectedevent @liweijie0812 ([#3700](https://github.com/Tencent/tdesign-vue-next/pull/3700))
### 🚧 Others
- `BaseUsage`: 基础examplepartial codeformat @coderYangLiu ([#3654](https://github.com/Tencent/tdesign-vue-next/pull/3654))
- `Doc`: Update `CONTRIBUTING.md` @uyarn ([#3681](https://github.com/Tencent/tdesign-vue-next/pull/3681))

## 🌈 1.7.0 `2023-11-22` 
### 🚀 Features
- `Statistic`: Add `Statistic` 统计valuecomponent @liweijie0812 ([#3329](https://github.com/Tencent/tdesign-vue-next/pull/3329))
- `Loading`: whenuse `Plugin` or指令callwhen，hide `Loading` willwillRemove `app` instance @Zz-ZzzZ ([#3576](https://github.com/Tencent/tdesign-vue-next/pull/3576))
- `Space`: Support老旧浏览器也能normalshow子元素之间 间距，() @chaishi ([#3565](https://github.com/Tencent/tdesign-vue-next/pull/3565))
- `Input`: `value` Support数据type `number` @chaishi ([#3600](https://github.com/Tencent/tdesign-vue-next/pull/3600))
- `Tabs`: Addscrollafterfortoo longscenario计算scroll距离 logic @uyarn ([#3624](https://github.com/Tencent/tdesign-vue-next/pull/3624))
- `Tabs`: Support`action` use @uyarn ([#3624](https://github.com/Tencent/tdesign-vue-next/pull/3624))
### 🐞 Bug Fixes
- `Affix`: Add元素判空，avoidappear元素not存inerror @chaishi ([#3584](https://github.com/Tencent/tdesign-vue-next/pull/3584))
- `Radio`: `useKeyboard` via正则匹配 `space`, Fix误判断delete键（`backspace`）as空格键（`space`） @liweijie0812 ([#3599](https://github.com/Tencent/tdesign-vue-next/pull/3599))
- `Checkbox`: `useKeyboardEvent ` via正则匹配 `space`, Fix误判断delete键（`backspace`）as空格键（`space`） @liweijie0812 ([#3599](https://github.com/Tencent/tdesign-vue-next/pull/3599))
- `Collapse`: 自definition右侧操作点击trigger折叠event () @liweijie0812 ([#3581](https://github.com/Tencent/tdesign-vue-next/pull/3581))
- `Hooks`: Fixinuse `dragSort` whennotusecallback `Props` functionappear error @SuperManito ([#3592](https://github.com/Tencent/tdesign-vue-next/pull/3592))
- `Select`: Fix the `1.6.6`versionafter，多选modeunder，unable toviaenter键selectedoption issue @wilonjiang ([#3608](https://github.com/Tencent/tdesign-vue-next/pull/3608))
- `Cascader`: Fixdefaultvalueinoptioninnot存inwhen error @PengYYYYY ([#3611](https://github.com/Tencent/tdesign-vue-next/pull/3611))
- `Dialog`: Fix `attach="body"` `destroyOnClose` 嵌套超过三层closeerror @AuYuHui ([#3619](https://github.com/Tencent/tdesign-vue-next/pull/3619))
- `Table`: Fix the 多级表头scenario，列configurationfunctionineffective issue @chaishi ([#3622](https://github.com/Tencent/tdesign-vue-next/pull/3622))
### 🚧 Others
- `Table`: Optimizeexamplecode @chaishi ([#3584](https://github.com/Tencent/tdesign-vue-next/pull/3584))

## 🌈 1.6.8 `2023-11-07` 
### 🚀 Features
- `ImageViewer`: AddSupport `closeOnEscKeydown`，for控制whether允许 ESC 退出预览， @chaishi ([#3566](https://github.com/Tencent/tdesign-vue-next/pull/3566))
- `Upload`: @chaishi
- image预览function，AddSupportpass throughimage预览全部property `imageViewerProps` ([#3566](https://github.com/Tencent/tdesign-vue-next/pull/3566))
- ⚠️ Addimageupload大小exceed限制提醒，有extra单独实现此function 业务need注意whether存induplicateshow大小限制提醒issue ([#3566](https://github.com/Tencent/tdesign-vue-next/pull/3566))
- 多file/imageuploadscenariounder，`autoUpload=false` when，Supportuse Props property/function/slotetc.method自definitionuploadbutton和取消uploadbutton ([#3566](https://github.com/Tencent/tdesign-vue-next/pull/3566))
- 多file/imageuploadscenariounder，`autoUpload=false` when，区分已uploadstate和待uploadstate ([#3566](https://github.com/Tencent/tdesign-vue-next/pull/3566))
- 批量fileuploadSupportinlistinshowupload失败 原因 ([#3566](https://github.com/Tencent/tdesign-vue-next/pull/3566))
- AddSupport `fileListDisplay=null` 控制单fileorfilelistnotshow ([#3573](https://github.com/Tencent/tdesign-vue-next/pull/3573))
### 🐞 Bug Fixes
- `Table`:
- Fix the `v1.6.7` cause 单元格编辑ineffective issue @chaishi ([#3577](https://github.com/Tencent/tdesign-vue-next/pull/3577))
- 多级表头 + 列宽Adjustscenario，修正dynamiclist头width计算error issue @Cat1007 ([#3552](https://github.com/Tencent/tdesign-vue-next/pull/3552))
- in提供列configurationoptionwhen,default只提供叶子列作asconfigurationoption,作as最细粒度configuration 方式 @Cat1007 ([#3555](https://github.com/Tencent/tdesign-vue-next/pull/3555))
- 修正列变动when,列宽重置 判断issue @Cat1007 ([#3568](https://github.com/Tencent/tdesign-vue-next/pull/3568))
- 修正dynamic列变化when，表头过小or表头heightUpdateerrorcause意外 scrollbarappear issue @Cat1007 ([#3557](https://github.com/Tencent/tdesign-vue-next/pull/3557))
- `TreeSelect`: 处理导入 stylefileabnormalityissue @betavs ([#3556](https://github.com/Tencent/tdesign-vue-next/pull/3556))
- `Upload`: @chaishi
- Fix the `max=1 multiple=false` caseunder，unable toinsteaduploadfile issue ([#3566](https://github.com/Tencent/tdesign-vue-next/pull/3566))
- imageuploadscenario，Fix the disabled态卡片unable toshow issue ([#3573](https://github.com/Tencent/tdesign-vue-next/pull/3573))
- `Tree`: 提供获取tree结构数据 api: getTreeData @TabSpace ([#3571](https://github.com/Tencent/tdesign-vue-next/pull/3571))
- `Dialog`: Fix 以Plug in 方式callwhen，UpdateclassNamewillerror并andwill覆盖component 原className @Zz-ZzzZ ([#3570](https://github.com/Tencent/tdesign-vue-next/pull/3570))


## 🌈 1.6.7 `2023-11-01` 
### 🚀 Features
- `Table`:
- can编辑单元格scenario，Supportvia `updateEditedCellValue` methodUpdatewhenbefore行编辑state任意单元格 value @chaishi ([#3522](https://github.com/Tencent/tdesign-vue-next/pull/3522))
- can编辑单元格，Supportuse `updateEditedCellValue` Update整行编辑态数据 @chaishi ([#3536](https://github.com/Tencent/tdesign-vue-next/pull/3536))
- 多级表头under，dynamic列configurationSupport指定父级列以display其under all子列 @Cat1007 ([#3539](https://github.com/Tencent/tdesign-vue-next/pull/3539))
- `Slider`: Add `label` function方式parameterSupport ([#3470](https://github.com/Tencent/tdesign-vue-next/pull/3470))@liect ([#3502](https://github.com/Tencent/tdesign-vue-next/pull/3502))
- `Timeline`: `TimelineItem` Add `onClick` event @liweijie0812 ([#3512](https://github.com/Tencent/tdesign-vue-next/pull/3512))
- `Select`: Supportvia键盘selectwhen同whenscrolltocan视optionrange 能力 @uyarn ([#3542](https://github.com/Tencent/tdesign-vue-next/pull/3542))
### 🐞 Bug Fixes
- `Table`:
- `primaryTableRef` not绑定，cause其导出 methodunable touse @AuYuHui ([#3528](https://github.com/Tencent/tdesign-vue-next/pull/3528))
- can编辑单元格，Fix the 某一列单元格数据发生变化when，其他列接收to `editedRow` not是最新数据 issue @chaishi ([#3536](https://github.com/Tencent/tdesign-vue-next/pull/3536))
- `Select`:
- Fix the issue of in虚拟scrollundervia键盘回车selectfilter项error @uyarn ([#3542](https://github.com/Tencent/tdesign-vue-next/pull/3542))
- Fix多选小尺寸和大尺寸 styledefect by @Zzongke ([#3542](https://github.com/Tencent/tdesign-vue-next/pull/3542))
- `Tree`:
- 完善受控logic，解决 `onChange` eventtriggerwhen，componentstatepass有延迟 issue @TabSpace ([#3509](https://github.com/Tencent/tdesign-vue-next/pull/3509))
- 解决 `watch` when机issue @TabSpace ([#3526](https://github.com/Tencent/tdesign-vue-next/pull/3526))
- `Upload`:
- Fix the issue of when `upload` asmanuallyuploadwhen，进度unable toshow @ziyi99 ([#3531](https://github.com/Tencent/tdesign-vue-next/pull/3531))
- Fix the issue of drag filenot符合 `accept` configurationwhen，drag结束afternotwilltrigger `Drop` event @ziyi99 ([#3532](https://github.com/Tencent/tdesign-vue-next/pull/3532))
- `Tabs`: dynamic修改 `TabNav` option卡数量cause滑动buttonnot符合预期 @betavs ([#3517](https://github.com/Tencent/tdesign-vue-next/pull/3517))
- `Timeline`: Fix `TimelineItem` `dotColor` defaultvalueerror @liweijie0812 ([#3512](https://github.com/Tencent/tdesign-vue-next/pull/3512))
- `Pagination`: Fixwhenbeforepagein被动更改whentrigger `onCurrentChange` event @Zz-ZzzZ ([#3511](https://github.com/Tencent/tdesign-vue-next/pull/3511))
- `Menu`: Fix the menucollapsewhen style issue by @RayJason ([#3542](https://github.com/Tencent/tdesign-vue-next/pull/3542))
- `Radio`: Fix只有一个option 边角styledefect @uyarn ([#3542](https://github.com/Tencent/tdesign-vue-next/pull/3542))
- `ColorPicker`: Fix the 最近usecolorabnormality issue @liect ([#3515](https://github.com/Tencent/tdesign-vue-next/pull/3515))
- `TreeSelect`: Fixnotuse `keys` 别名 @liect ([#3520](https://github.com/Tencent/tdesign-vue-next/pull/3520))

## 🌈 1.6.5 `2023-10-20` 
### 🚀 Features
- `TagInput`: Supportintoo longscrollmodeunderscroll，foroption增删操作 @liweijie0812 ([#3501](https://github.com/Tencent/tdesign-vue-next/pull/3501))
- `Tabs`: `destroyOnHide` defaultvalue回退as true，懒loadinguse请配合 `destroyOnHide` 设置as false use，详情请看example @liweijie0812 ([#3504](https://github.com/Tencent/tdesign-vue-next/pull/3504))
### 🐞 Bug Fixes
- `Tree`: Fix the issue of when `node` `value` as `0` whennotwillrender @Zz-ZzzZ ([#3500](https://github.com/Tencent/tdesign-vue-next/pull/3500))
- `SelectInput`: Fix the issue of `1.6.2`之after非多选scenariounder基in`SelectInput` componentif`Select`etc.，automaticallyfocusinput box @uyarn ([#3506](https://github.com/Tencent/tdesign-vue-next/pull/3506))
- `DatePicker`: Fix the issue of `1.6.2`之afterselectedconsoleerror @uyarn ([#3506](https://github.com/Tencent/tdesign-vue-next/pull/3506))
### 🚧 Others
- `Select`: Fixexample error @liect ([#3503](https://github.com/Tencent/tdesign-vue-next/pull/3503))



## 🌈 1.6.4 `2023-10-19` 
### 🚀 Features
- `Table`: can筛选table，Support设置 `confirmEvents: ['onChange']` after，单选筛选器(`Radio`) select完成afterautomaticallyclose筛选器浮层 @chaishi ([#3478](https://github.com/Tencent/tdesign-vue-next/pull/3478))
- `Tabs`: `destroyOnHide` defaultvalue改 `false` @liweijie0812 ([#3467](https://github.com/Tencent/tdesign-vue-next/pull/3467))
- `Tabs`: Add `lazy` Supportoption卡懒loading @liweijie0812 ([#3467](https://github.com/Tencent/tdesign-vue-next/pull/3467))
### 🐞 Bug Fixes
- `Cascader`:
- Fix顶层 `class` use `proxy` value，causestyle表现abnormality @PengYYYYY ([#3488](https://github.com/Tencent/tdesign-vue-next/pull/3488))
- 多选scenario，notenablesearchfunction，width自适shouldmode，Fix the 鼠标悬浮whenwidthwill发生变化 issue ([#1623](https://github.com/Tencent/tdesign-common/pull/1623))
- `SelectInput`:
- `renderPrefixContent` return `[null,undefined]` or `[undefined,undefined]`，pass给 `input props.label`, cause `input` render空 `t-input__prefix` node @liweijie0812 ([#3479](https://github.com/Tencent/tdesign-vue-next/pull/3479))
- Fixdropdown内unable to输入orfocus“input box”、“数字input box”etc.canfocus元素 @chaishi ([#3492](https://github.com/Tencent/tdesign-vue-next/pull/3492))
- `ImageViewer`: 控制栏控件in部数据，instepvaluenotas `0.5` when，precision丢失 issue @xiaojueshi ([#3476](https://github.com/Tencent/tdesign-vue-next/pull/3476))
- `DatePicker`: `prefixIcon` slotnottake effect @liweijie0812 ([#3479](https://github.com/Tencent/tdesign-vue-next/pull/3479))
- `TagInput`: 多选scenario，notenablesearchfunction，width自适shouldmode，Fix the 鼠标悬浮whenwidthwill发生变化 issue ([#1623](https://github.com/Tencent/tdesign-common/pull/1623))
- `Select`: 多选scenario，notenablesearchfunction，width自适shouldmode，Fix the 鼠标悬浮whenwidthwill发生变化 issue ([#1623](https://github.com/Tencent/tdesign-common/pull/1623))
- `TreeSelect`: 多选scenario，notenablesearchfunction，width自适shouldmode，Fix the 鼠标悬浮whenwidthwill发生变化 issue ([#1623](https://github.com/Tencent/tdesign-common/pull/1623))
- `Grid`: Fix the `Row` 和 `Col` 子componentconfiguration项property均as必填 type issue @uyarn ([#3491](https://github.com/Tencent/tdesign-vue-next/pull/3491))

## 🌈 1.6.2 `2023-10-12` 
### 🚀 Features
- `Tag`: `CheckTag` Support多种风格tagconfiguration @chaishi ([#3419](https://github.com/Tencent/tdesign-vue-next/pull/3419))
- `Tag`: Supporttag组 `CheckTagGroup` select @chaishi ([#3419](https://github.com/Tencent/tdesign-vue-next/pull/3419))
### 🐞 Bug Fixes
- `Badge`: border圆角方形style([common#1617](https://github.com/Tencent/tdesign-common/pull/1617)) @liweijie0812 ([#3461](https://github.com/Tencent/tdesign-vue-next/pull/3461))
- `Badge`: enable`dot` 忽略形状设置 @liweijie0812 ([#3461](https://github.com/Tencent/tdesign-vue-next/pull/3461))
- `Table`: Fix the 行高亮受控property `activeRowKeys` invalid issue @chaishi ([#3463](https://github.com/Tencent/tdesign-vue-next/pull/3463))

## 🌈 1.6.1 `2023-10-11` 
### 🚀 Features
- `Table`:
- 键盘操作，can编辑单元格，Supportuse `Tab` 键switchcan编辑 单元格，实现快速修改操作 @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
- 键盘操作，Optimize行高亮键盘操作和style，compatible行selectedfunction @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
- 键盘操作，行selectedfunctionSupportnot设置行高亮，也能use键盘操作selected、取消selected、全选、取消全选etc. @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
- tree结构table，Supportvia行唯一标识scrollto指定行（之before仅canvia行under标scrollto指定行） @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
- Support整个table懒loading @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
- `Popup`: componentAddinstancemethod `update/getOverlay/getOverlayState`，forUpdateor获取浮层content、stateetc. @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
- `Select`: Support键盘操作dropdownoptionselectedor取消 @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
- `Cascader`: Supportuse `valueDisplay` 自definitionselected项 content呈现 @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
- `Tree`: 提供虚拟scroll能力 @TabSpace ([#3410](https://github.com/Tencent/tdesign-vue-next/pull/3410))
- `Badge`: `content`、`count` slotSupport @liweijie0812 ([#3454](https://github.com/Tencent/tdesign-vue-next/pull/3454))

### 🐞 Bug Fixes
- `Input`: focus和blurevent纠正，whencomponent已经处infocusstatewhen，点击 `label/suffix/prefix/icon` etc.元素，not再duplicatetrigger一次blur和focusevent @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
- `TagInput`: focus和blurevent纠正，whencomponent已经处infocusstatewhen，点击tag，not再duplicatetrigger一次blur和focusevent @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
- `Select`:
- focus和blurevent纠正，dropdownoptionselectedwhennot再automaticallyblur，以便continueswitchoption @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
- 筛选afteruse键盘上under键selectfunctionabnormality @liweijie0812 ([#3420](https://github.com/Tencent/tdesign-vue-next/pull/3420))
- Fixdropdownoption闪现 @betavs ([#3418](https://github.com/Tencent/tdesign-vue-next/pull/3418))
- `Cascader`:
- focus和blurevent纠正，dropdownoptionselectedwhennot再automaticallyblur，以便continueswitchoption @chaishi ([#3414](https://github.com/Tencent/tdesign-vue-next/pull/3414))
- Fix `cascader` render多余 `tag-input__prefix` 元素cause表现abnormality @PengYYYYY ([#3446](https://github.com/Tencent/tdesign-vue-next/pull/3446))
- `change` eventin `source` abnormalityissue @PengYYYYY ([#3456](https://github.com/Tencent/tdesign-vue-next/pull/3456))
- `Tree`: 解决 `setData` methodunable totriggerproperty变更 issue @TabSpace ([#3410](https://github.com/Tencent/tdesign-vue-next/pull/3410))
- `Form`: Fix the issue of `statusIcon` asfunctionorslotwhen，parameteras空 @SBDaQingWa ([#3449](https://github.com/Tencent/tdesign-vue-next/pull/3449))
### 🚧 Others
- docs: Add `CodeSandbox` Support @LadyChatterleyLover ([#3422](https://github.com/Tencent/tdesign-vue-next/pull/3422))

## 🌈 1.5.7 `2023-09-21` 
### 🚀 Features
- `Table`: Supportviaproperty `local` configurationcomponentalltext @chaishi ([#3380](https://github.com/Tencent/tdesign-vue-next/pull/3380))
- `Card`: `title` use `div` 取代 `span` in自definitionscenariounder更符合规范 @uyarn ([#3385](https://github.com/Tencent/tdesign-vue-next/pull/3385))
### 🐞 Bug Fixes
- `Dialog`:
- Fix `Dialog plugin` event销毁 `Dialog` not销毁 `wrapper`，causemultiple `wrapper` inpage @Zzongke ([#3383](https://github.com/Tencent/tdesign-vue-next/pull/3383))
- Fix the notdefinition确认buttonpropertyscenariowhen（即not设置 `confirmBtn`），`confirmLoading` invalid issue @chaishi ([#3393](https://github.com/Tencent/tdesign-vue-next/pull/3393))
- `Table`: 列configuration弹框，closewhendefaultnot销毁 @chaishi ([#3380](https://github.com/Tencent/tdesign-vue-next/pull/3380))
- `Checkbox`: Fix `checkbox-group` `innerValue.value` as `undefined` causeabnormality @Nice-PLQ ([#3405](https://github.com/Tencent/tdesign-vue-next/pull/3405))
- `List`: Fix the abnormality of `1.5.6` version `list-item` 丢失 `props` @uyarn ([#3376](https://github.com/Tencent/tdesign-vue-next/pull/3376))
## 🌈 1.5.6 `2023-09-14` 
### 🚀 Features
- `Table`:
- can编辑单元格，Supportpass through编辑componenteventproperty `edit.props.onChange` @chaishi ([#3353](https://github.com/Tencent/tdesign-vue-next/pull/3353))
- can高亮行table，Support鼠标点击高亮table行，Support键盘操作高亮行（ArrowDown/ArrowUp/Space/ESC/Shift），Support连续高亮行区域 @chaishi ([#3353](https://github.com/Tencent/tdesign-vue-next/pull/3353))
- can悬浮table，除鼠标悬浮table行之外，本次AddSupport键盘操作悬浮table行 @chaishi ([#3353](https://github.com/Tencent/tdesign-vue-next/pull/3353))
- canselected行table，Support键盘操作（ArrowDown/ArrowUp/Space/ESC/Shift） @chaishi ([#3353](https://github.com/Tencent/tdesign-vue-next/pull/3353))
- 除globalconfigurationSupportlanguageconfiguration外，本次Addviaproperty `local` singlecomponentlanguageconfiguration @chaishi ([#3362](https://github.com/Tencent/tdesign-vue-next/pull/3362))
- 列configurationfunction，Supportdefinition `columnControllerTopContent` 和 `columnControllerBottomContent` definition列configuration弹框顶部or底部content @chaishi ([#3362](https://github.com/Tencent/tdesign-vue-next/pull/3362))
- 列configurationfunction，Support分组show列configuration信息，一般fortable列数量特别多，need要分类showscenario @chaishi ([#3362](https://github.com/Tencent/tdesign-vue-next/pull/3362))
- `SelectInput`: Add `valueDisplayOptions`，canconfigurationinuse `valueDisplay` when也use自带 占位符and输入回显实现 @ngyyuusora ([#3342](https://github.com/Tencent/tdesign-vue-next/pull/3342))
- `List`: Support虚拟scroll Support @uyarn ([#3360](https://github.com/Tencent/tdesign-vue-next/pull/3360))
- `TreeSelect`: Support`panelTopContent`和 `panelBottomContent` use @uyarn ([#3355](https://github.com/Tencent/tdesign-vue-next/pull/3355))

### 🐞 Bug Fixes
- `Table`:
- Fix the Dialog 弹框in打开table，tableinpaginationcomponent信息appearexceed省略 issue @chaishi ([#3352](https://github.com/Tencent/tdesign-vue-next/pull/3352))
- 列configurationfunction，Fix the 每次打开自definition列configuration弹框，都will创建一个新 弹框而旧弹框not消除 issue @chaishi ([#3362](https://github.com/Tencent/tdesign-vue-next/pull/3362))
- `Dialog`:
- Fix the Dialog 弹框in打开table，paginationcomponent信息appearexceed省略 issue @chaishi ([#3352](https://github.com/Tencent/tdesign-vue-next/pull/3352))
- typeissue，Fix the DialogPlugin({ cancenBtn: '取消' }) 提醒typemissing issue @chaishi ([#3352](https://github.com/Tencent/tdesign-vue-next/pull/3352))
- `Cascader`: Fix `borderless` invalid @PengYYYYY ([#3359](https://github.com/Tencent/tdesign-vue-next/pull/3359))
- `Pagination`: Fix the Dialog 弹框in打开table，paginationcomponent信息appearexceed省略 issue @chaishi ([#3352](https://github.com/Tencent/tdesign-vue-next/pull/3352))
- `Input`: Fix the defaultnotshow，满足某种条件after才show scenariounder，automaticallywidth计算error issue @chaishi ([#3352](https://github.com/Tencent/tdesign-vue-next/pull/3352))
- `useResizeObserver`: Fix the missingcontainer元素判空 issue @chaishi ([#3372](https://github.com/Tencent/tdesign-vue-next/pull/3372))
### 🚧 Others
- `Tree`: Updatecan筛选tree Demo @liweijie0812 ([#3326](https://github.com/Tencent/tdesign-vue-next/pull/3326))
## 🌈 1.5.4 `2023-09-07` 
### 🚀 Features
- `Table`: @chaishi
- can筛选table，`onFilterChange` eventAddparameter `trigger: 'filter-change' | 'confirm' | 'reset' | 'clear'`，表示trigger筛选条件变化 来源 ([#3316](https://github.com/Tencent/tdesign-vue-next/pull/3316))
- can筛选table，Supportuse `filter.label` 单独definition晒option别名，can以和 `title` titlenot一样 ([#3321](https://github.com/Tencent/tdesign-vue-next/pull/3321))
- `Watermark`: 文字Add`fontFamily`property @LadyChatterleyLover ([#3314](https://github.com/Tencent/tdesign-vue-next/pull/3314))
- `Dialog`: @chaishi
- Supportuse `confirmLoading` 控制确认buttonloadingstate ([#3343](https://github.com/Tencent/tdesign-vue-next/pull/3343))
- componentinstancefunctionAdd `confirmDialog.setConfirmLoading(true)` 和 `confirmDialog.update({ confirmLoading: true })` for设置确认buttonloadingstate ([#3343](https://github.com/Tencent/tdesign-vue-next/pull/3343))
- `TreeSelect`: treeselectSupportsuffix和suffixIcon @ngyyuusora ([#3290](https://github.com/Tencent/tdesign-vue-next/pull/3290))
### 🐞 Bug Fixes
- `Form`: Fix the issue of form component scrollToFirstError invalid @dreamlords ([#3294](https://github.com/Tencent/tdesign-vue-next/pull/3294))
- `Table`: @chaishi
- can筛选table，Fix the issue of `resetValue` in清空筛选when，not能重置to指定 `resetValue` value ([#3316](https://github.com/Tencent/tdesign-vue-next/pull/3316))
- can筛选table，Fix the 晒option valueas `false` when，筛选iconsnot能高亮 issue ([#3321](https://github.com/Tencent/tdesign-vue-next/pull/3321))
- tree结构，candragAdjust行顺序，Fix the 最after一个nodeexpand 子nodepositionnot正确 issue ([#3296](https://github.com/Tencent/tdesign-vue-next/pull/3296))
- tree结构，Fix the `v1.5.3` in `tree.defaultExpandAll` ineffective issue ([#3296](https://github.com/Tencent/tdesign-vue-next/pull/3296))
- tree结构table，Fix the expandedTreeNodes.sync 和 @expanded-tree-nodes-change use expandTreeNodeOnClick wheninvalid issue
- SupportnotusecolumnControllerwhen也can以use列configuration @ngyyuusora ([#3301](https://github.com/Tencent/tdesign-vue-next/pull/3301))
- can筛选table，解决 `title` usefunctionorslotdefinitionwhen，filter结果行textshowissue ([#3321](https://github.com/Tencent/tdesign-vue-next/pull/3321))
- can编辑table，Fix the multiplecan编辑table同when存inwhen，validation互相affect issue ([#3341](https://github.com/Tencent/tdesign-vue-next/pull/3341))
- `Image`: Fix the `fallback` in第一次loading失败afterinvalid issue @chaishi ([#3319](https://github.com/Tencent/tdesign-vue-next/pull/3319))
- `Select`: Fixdropdown多选stateundernotshowbefore缀icons @LadyChatterleyLover ([#3323](https://github.com/Tencent/tdesign-vue-next/pull/3323))
- `Menu`: Fix the defect of 双层menunotconfiguration`router`when to propertyunable to基in`vue-router`default跳转 @uyarn ([#3325](https://github.com/Tencent/tdesign-vue-next/pull/3325))
- `Breadcrumb`: Fix the defect of notconfiguration`router`when to propertyunable to基in`vue-router`default跳转 @uyarn ([#3325](https://github.com/Tencent/tdesign-vue-next/pull/3325))
- `Transfer`: Fixtransfercomponentunable tosearch深层级tree结构数据 @LadyChatterleyLover ([#3336](https://github.com/Tencent/tdesign-vue-next/pull/3336))
- `Form`: Fix the issue of form component scrollToFirstError invalid @dreamlords ([#3294](https://github.com/Tencent/tdesign-vue-next/pull/3294))


## 🌈 1.5.3 `2023-08-29` 
### 🚀 Features
- `Upload`: uploadcomponent `theme='image'` when，in `disabled` statenotshowuploadbutton @yuzunyue ([#3277](https://github.com/Tencent/tdesign-vue-next/pull/3277))
- `Input`: add `maxlength` property `String` type @Zz-ZzzZ ([#3271](https://github.com/Tencent/tdesign-vue-next/pull/3271))
- `Textarea`: add `maxlength` property `String` type @Zz-ZzzZ ([#3271](https://github.com/Tencent/tdesign-vue-next/pull/3271))
- `Table`: tree结构，not设置 `expandedTreeNodes` caseunder，`data` 数据发生变化when，automatically重置collapseallexpandnode。if果希望maintainexpandnode，请useproperty `expandedTreeNodes` 控制变化after 数据expandnode。原因：table数据变化beforeafter nodecan能will有not同，`expandedTreeNodes`自然也willnot同，component内部unable to预判新数据inexpand哪些node @chaishi ([#3283](https://github.com/Tencent/tdesign-vue-next/pull/3283))

### 🐞 Bug Fixes
- `Table`:
- dragsort + 本地数据paginationscenario，Fix the dragsorteventparameter `currentIndex/targetIndex/current/target` etc.not正确 issue @chaishi ([#3283](https://github.com/Tencent/tdesign-vue-next/pull/3283))
- dragsort + 本地数据paginationscenario，Fix the in第二page以after pagination数据indragAdjust顺序after，willautomatically跳转to第一page issue @chaishi ([#3283](https://github.com/Tencent/tdesign-vue-next/pull/3283))
- Supportpagination非受控用法 dragsortscenario @chaishi ([#3283](https://github.com/Tencent/tdesign-vue-next/pull/3283))
- `Button`: Fix the issue of `button` in `loading` stateunder依然can以trigger点击event @yuzunyue ([#3269](https://github.com/Tencent/tdesign-vue-next/pull/3269))
- `Upload`: Fix非automaticallyuploadwhenimage缩略图notshow @imp2002 ([#3276](https://github.com/Tencent/tdesign-vue-next/pull/3276))
- `Menu`: Fix the issue of via `v-for` render双层menuwhenpartialpropertyineffective @uyarn ([#3289](https://github.com/Tencent/tdesign-vue-next/pull/3289))
- `Tabs`: Fix the issue of in封装`tabs`componentwhen内部definition`slot`afteruse`v-for`notrender @Zz-ZzzZ ([#3288](https://github.com/Tencent/tdesign-vue-next/pull/3288))
- `Cascader`: Fix `cascader` 清空whenexpandstate表现 @PengYYYYY ([#3284](https://github.com/Tencent/tdesign-vue-next/pull/3284))
- `Message`: Fix `message` nottrigger `onClose` event @Zzongke ([#3258](https://github.com/Tencent/tdesign-vue-next/pull/3258))
### 🚧 Others
- `Table`: documentation修正 `tree.checkStrictly` defaultvalueas `false` @chaishi ([#3283](https://github.com/Tencent/tdesign-vue-next/pull/3283))

## 🌈 1.5.2 `2023-08-22` 
### 🚀 Features
- `Table`:
- Supportuse名as `ellipsis` or者 `ellipsis-<colKey>` slot自definitionexceed省略when 浮层content，usemethodcan参考examplecode @chaishi ([#3259](https://github.com/Tencent/tdesign-vue-next/pull/3259))
- tree结构，Supportviaproperty `expandedTreeNodes.sync` 自由控制expandnode，非必传property @chaishi ([#3260](https://github.com/Tencent/tdesign-vue-next/pull/3260))
- tree结构，Addcomponentinstancemethod `removeChildren`，forRemove子node @chaishi ([#3260](https://github.com/Tencent/tdesign-vue-next/pull/3260))
- `Switch`: `onchange` parameteradd `context: { e: MouseEvent }` @liweijie0812 ([#3247](https://github.com/Tencent/tdesign-vue-next/pull/3247))
- `Keys`: global `keys api` 引用 `common.ts` 导出variable @PengYYYYY ([#3243](https://github.com/Tencent/tdesign-vue-next/pull/3243))
- `Transfer`: Support `targetDraggable`，canfor目标listsort，具体use方式见examplecode @uyarn ([#3267](https://github.com/Tencent/tdesign-vue-next/pull/3267))
### 🐞 Bug Fixes
- `Menu`: @uyarn ([#3263](https://github.com/Tencent/tdesign-vue-next/pull/3263))
- Fix the issue of 普通双层menumode路由跳转functionineffective
- Fix the issue of 普通双层menu `click` event丢失
- `Table`:
- tree结构，Fix the componentinstancemethod expand全部 `expandAll` issue @chaishi ([#3260](https://github.com/Tencent/tdesign-vue-next/pull/3260))
- 点击行expand/点击行selected，Fix the `expandOnRowClick` 和 `selectOnRowClick` unable to独立控制行点击执行interaction issue @chaishi ([#3260](https://github.com/Tencent/tdesign-vue-next/pull/3260))
- `Upload`: Fix `showUploadProgress` propertynottake effect @imp2002 ([#3245](https://github.com/Tencent/tdesign-vue-next/pull/3245))
- `Switch`: Adjust `disabled` disabled优先级，`Switch.disabled > Form.disabled` @liweijie0812 ([#3247](https://github.com/Tencent/tdesign-vue-next/pull/3247))
- `Link`: Adjust `disabled` disabled优先级，`Link.disabled > Form.disabled` @liweijie0812 ([#3252](https://github.com/Tencent/tdesign-vue-next/pull/3252))
### 🚧 Others
- `Transfer`: treeexampleAdd `keys` configuration，convenient for解use方式 @uyarn ([#3267](https://github.com/Tencent/tdesign-vue-next/pull/3267))

## 🌈 1.5.1 `2023-08-15`
### 🚨 Breaking Changes
- `Icon`: @uyarn ([#3174](https://github.com/Tencent/tdesign-vue-next/pull/3174))
- Add 960 个icons
- Adjusticons命名，`photo` as `camera`，`books` as `bookmark`, `stop-cirle-1` as `stop-circle-stroke`；
- Remove `money-circle` icons，具体请查看iconspage

### 🚀 Features
- `Select`:
- Supportpass through `label` property，definition内部tag名称 @chaishi ([#3212](https://github.com/Tencent/tdesign-vue-next/pull/3212))
- Add `keys.disabled` forcustomize字段控制option disabled @PengYYYYY ([#3202](https://github.com/Tencent/tdesign-vue-next/pull/3202))
- `Table`: can编辑单元格scenario，Add `edit.keepEditMode` formaintain单元格alwaysas编辑mode @chaishi ([#3199](https://github.com/Tencent/tdesign-vue-next/pull/3199))
- `Link`: Addpass through `download` property，Support浏览器directlydownload () @xiaosansiji ([#3201](https://github.com/Tencent/tdesign-vue-next/pull/3201))
- `Guide`: completeSupport自definition高亮框 @zhangpaopao0609 ([#3111](https://github.com/Tencent/tdesign-vue-next/pull/3111))
- `Button`: Supportuse `tab` 键focus @chaishi ([#3218](https://github.com/Tencent/tdesign-vue-next/pull/3218))
- `Checkbox`: Supportuse空格键selectedor取消selected @chaishi ([#3218](https://github.com/Tencent/tdesign-vue-next/pull/3218))
- `Radio`: Supportuse空格键selectedor取消selected @chaishi ([#3218](https://github.com/Tencent/tdesign-vue-next/pull/3218))
- `Form`: `FormItem` componentSupport遗漏 property `status` 和 `tips`，fordefinitionnot同state 提升text；其in `tips` Supportslot形式 @chaishi ([#3225](https://github.com/Tencent/tdesign-vue-next/pull/3225))
- `InputNumber`: `tips` Supportuseslot自definition @chaishi ([#3225](https://github.com/Tencent/tdesign-vue-next/pull/3225))
- `TreeSelect`: Add `keys` 字段forcustomize数据inforshould 字段别名 @PengYYYYY ([#3202](https://github.com/Tencent/tdesign-vue-next/pull/3202))
- `Cascader`: Add `keys.disabled` forcustomize字段控制node disabled @PengYYYYY ([#3202](https://github.com/Tencent/tdesign-vue-next/pull/3202))
- `Tree`: Add `keys.disabled` forcustomize字段控制node disabled @PengYYYYY ([#3202](https://github.com/Tencent/tdesign-vue-next/pull/3202))
- `Transfer`: Add `keys.disabled` forcustomize字段控制option disabled @PengYYYYY ([#3202](https://github.com/Tencent/tdesign-vue-next/pull/3202))
- `ImageViewer`: Fiximage浏览 globalconfigurationinvalid @sinbadmaster ([#3236](https://github.com/Tencent/tdesign-vue-next/pull/3236))
- `MenuItem`: Fix点击after callbackfunctionerror @PengYYYYY ([#3237](https://github.com/Tencent/tdesign-vue-next/pull/3237))
### 🐞 Bug Fixes
- `Table`:
- Fix the issue of `dragSort` configurationas `row-handler-col` whendragsortnottake effect @nined9 ([#2717](https://github.com/Tencent/tdesign-vue-next/pull/2717))
- 虚拟scrollscenario，Fix the default scrollbar长度（position）和scrollafter not一致 issue @chaishi ([#3199](https://github.com/Tencent/tdesign-vue-next/pull/3199))
- `Popup`: `overlayEl` not绑定，第一次点开unable to定位toselected项 @AuYuHui ([#3189](https://github.com/Tencent/tdesign-vue-next/pull/3189))
- `Menu`: Fix the issue of 同一个 `MenuItem` 多次trigger `onChange` @leezng ([#3187](https://github.com/Tencent/tdesign-vue-next/pull/3187))
- `SelectInput`: Fix the width自适shouldmode `autoWidth` dropdownwidth过窄 issue @chaishi ([#3212](https://github.com/Tencent/tdesign-vue-next/pull/3212))
- `Select`: Fix the width自适shouldmode `autoWidth` dropdownwidth过窄 issue @chaishi ([#3212](https://github.com/Tencent/tdesign-vue-next/pull/3212))
- `Link`: Fix the issue of `target` propertynot传when，实际render `<a />` tagwillshow `target` 空property @xiaosansiji ([#3201](https://github.com/Tencent/tdesign-vue-next/pull/3201))
- `TreeSelect`: 自definitionshow `tag` closeabnormality @sinbadmaster ([#3217](https://github.com/Tencent/tdesign-vue-next/pull/3217))
- `Form`: Fix the `scrollToFirstError` unable toscrollto `<form-item :name="list[${index}].name"` 这样 list元素 issue @chaishi ([#3225](https://github.com/Tencent/tdesign-vue-next/pull/3225))
- `ImageViewer`: 清除image查看state @sinbadmaster ([#3224](https://github.com/Tencent/tdesign-vue-next/pull/3224))
- `MenuItem`: `onClick` eventparameterAdjust @dexterBo ([#3228](https://github.com/Tencent/tdesign-vue-next/pull/3228))
- `Tree`: Fix the `tree` component深度监听 issue @PengYYYYY ([#3232](https://github.com/Tencent/tdesign-vue-next/pull/3232))
### 🚧 Others
- `Demo`: Fix `form` `custom-validator` examplecode @PengYYYYY ([#3205](https://github.com/Tencent/tdesign-vue-next/pull/3205))
- `Icon`: Add分类display全部icons UI @uyarn ([#3174](https://github.com/Tencent/tdesign-vue-next/pull/3174))
- `InputNumber`: `tips` useunified class name `.t-tips` 和 `t-is-xxx` @chaishi ([#3225](https://github.com/Tencent/tdesign-vue-next/pull/3225))
- `Cascader`: 补充 `borderless` documentation @PengYYYYY ([#3202](https://github.com/Tencent/tdesign-vue-next/pull/3202))
- `Test`: Fix测试warning @PengYYYYY ([#3229](https://github.com/Tencent/tdesign-vue-next/pull/3229))
- `Affix`: Fix `offsetBottom/offsetTop` documentation描述 @xiaosansiji ([#3233](https://github.com/Tencent/tdesign-vue-next/pull/3233))
- `Treeselect`: Fix `keys` documentation描述 @xiaosansiji ([#3233](https://github.com/Tencent/tdesign-vue-next/pull/3233))
## 🌈 1.4.2 `2023-08-02` 
### 🚀 Features
- `Table`: can筛选table，whenbefore `filterValue` not设置filtervalue defaultvaluewhen，not再pass through `undefined` to筛选器component，somecomponent defaultvalue必须as数组，not允许是 `undefined` @chaishi ([#3164](https://github.com/Tencent/tdesign-vue-next/pull/3164))
- `Table`: can筛选table，Supportpass through `attrs/style/classNames` property、style、class nameetc.信息to自definitioncomponent @chaishi ([#3164](https://github.com/Tencent/tdesign-vue-next/pull/3164))
### 🐞 Bug Fixes
- `Table`: 固定表头固定列空数据scenario，“暂无数据”错位showissue @chaishi ([#3167](https://github.com/Tencent/tdesign-vue-next/pull/3167))
- `Table`: 远程paginationuse非受控用法when，switch超过 `defaultPageSize` page大decimal据displaynot全 @ngyyuusora ([#3173](https://github.com/Tencent/tdesign-vue-next/pull/3173))
### 🚧 Others
- `Image`: code整理 @chaishi ([#3167](https://github.com/Tencent/tdesign-vue-next/pull/3167))
## 🌈 1.4.1 `2023-07-27` 
### 🐞 Bug Fixes
- `Table`: can编辑tablevalidationerror信息stylenotfor齐 @chaishi ([#3155](https://github.com/Tencent/tdesign-vue-next/pull/3155))
- `Tree`: treeselect器单选unable toselected @uyarn ([#3159](https://github.com/Tencent/tdesign-vue-next/pull/3159))
### 🚧 Others
- `Common`: input box类component `tips` useunified textpromptstyle，注意 `tips` class name变更 @chaishi ([#3155](https://github.com/Tencent/tdesign-vue-next/pull/3155))
## 🌈 1.4.0 `2023-07-26` 
### 🚀 Features
- `TimePicker`:
- `disableTime` callbackAdd毫秒parameter @uyarn ([#3151](https://github.com/Tencent/tdesign-vue-next/pull/3151))
- Optimizedisplaynotcan选timeoptionwhenscrolltonotcan选option 体验 @uyarn ([#3151](https://github.com/Tencent/tdesign-vue-next/pull/3151))
- `Menu`: 重构侧边栏导航子menuexpand/collapse动画实现，Fix the issue of `SubMenu` menu项过多whenunable tocompletedisplay @xiaosansiji ([#3140](https://github.com/Tencent/tdesign-vue-next/pull/3140))
- `Image`: property `src` Supportpass in `File` filetypeshowimage @chaishi ([#3136](https://github.com/Tencent/tdesign-vue-next/pull/3136))
- `ImageViewer`: property `images` Supportpass in `File` filetype预览image @chaishi ([#3136](https://github.com/Tencent/tdesign-vue-next/pull/3136))
- `Upload`: fileuploadlistSupportshow缩略图，via `showThumbnail` property控制 @chaishi ([#3136](https://github.com/Tencent/tdesign-vue-next/pull/3136))

### 🐞 Bug Fixes
- `Table`:
- can编辑tablescenario，Support设置 `colKey` valueas链式property，if：`a.b.c` @chaishi ([#3137](https://github.com/Tencent/tdesign-vue-next/pull/3137))
- can编辑tablescenario，行编辑，`edit.props` 和 `edit.on` asfunctionwhen，Addparameter `updateEditedCellValue` forUpdate编辑state table数据 @chaishi ([#3137](https://github.com/Tencent/tdesign-vue-next/pull/3137))
- 列宽Adjust + 表头吸顶 + 列configuration自definition综合scenariounder，列宽变少when，tablewidthunable to恢复原来 width @chaishi ([#3137](https://github.com/Tencent/tdesign-vue-next/pull/3137))
- Fix the can编辑单元格scenario，执行 `validateTableData` functionafter，nottriggerevent `onValidate` issue @chaishi ([#3143](https://github.com/Tencent/tdesign-vue-next/pull/3143))
- `Tree`: Fix `active` eventin，parameter `context` in `actived` value和实际state相反 @gaoachao ([#3134](https://github.com/Tencent/tdesign-vue-next/pull/3134))
- `Button`: disabled优先级, `Button.disabled > Form.disabled` @liweijie0812 ([#3133](https://github.com/Tencent/tdesign-vue-next/pull/3133))
- `InputNumber`: `decimalPlaces` 存inwhen，value满足要求，用户not操作，就已经trigger `onChange` eventissue @chaishi ([#3145](https://github.com/Tencent/tdesign-vue-next/pull/3145))
- `Menu`: Fix the issue of `MenuItem` `click` 点击eventnotpass `event` parameter @xiaosansiji ([#3140](https://github.com/Tencent/tdesign-vue-next/pull/3140))
## 🌈 1.3.12 `2023-07-19`
### 🚀 Features
- `Checkbox`: @chaishi ([#3103](https://github.com/Tencent/tdesign-vue-next/pull/3103))
- AddSupport键盘控制optionselectedor取消selected
- AddSupport `lazyLoad`，forneed要render大量数据，or懒loading复杂content/imagescenario
### 🐞 Bug Fixes
- `Input`:
- input box `value` typeRemove `Number` @liweijie0812 ([#3100](https://github.com/Tencent/tdesign-vue-next/pull/3100))
- 恢复partialpropertydefaultvalue数据typedefinition @chaishi ([#3102](https://github.com/Tencent/tdesign-vue-next/pull/3102))
- Fix the `prefixIcon` `padding` style issue @uyarn ([#3113](https://github.com/Tencent/tdesign-vue-next/pull/3113))
- `Rate`: Fix the issue of `rate` inenable文字showand半星when，`tooltip` showabnormality @xixileng ([#3097](https://github.com/Tencent/tdesign-vue-next/pull/3097))
- `InputNumber`: Fix the issue of `input-number` contentas空when，valueas `undefined` ，shouldwhenas `null` @xixileng ([#3098](https://github.com/Tencent/tdesign-vue-next/pull/3098))
- `Checkbox`: Fix the `Form.disabled` formunable tounified控制 `Checkbox` componentdisabledstate issue @chaishi ([#3103](https://github.com/Tencent/tdesign-vue-next/pull/3103))
- `Select`: Fix the issue of `autofocus` nottake effect @xixileng ([#3112](https://github.com/Tencent/tdesign-vue-next/pull/3112))
- `Radio`: Optimizeoption组换行case @ontheroad1992 ([#3081](https://github.com/Tencent/tdesign-vue-next/pull/3081))
- `Icon`: Fix the issue of `manifest` 字段affect开发阶段请求 @uyarn ([#3113](https://github.com/Tencent/tdesign-vue-next/pull/3113))
- `TagInput`: Fix the issue of `tag-input` before缀not居inandwill发生抖动 @xixileng @uyarn ([#3113](https://github.com/Tencent/tdesign-vue-next/pull/3113))
- `Transfer`: Fix the `t-transfer__list-item` and `t-checkbox` 优先级 issue @uyarn ([#3113](https://github.com/Tencent/tdesign-vue-next/pull/3113))
- `Select`: Fix the issue of use `tab` 键focuswhenunable to输入content @xixileng ([#3119](https://github.com/Tencent/tdesign-vue-next/pull/3119))
- `Stickytool`: Fix the issue of `sticky-item` component内部unable toUpdate数据 @uyarn ([#3118](https://github.com/Tencent/tdesign-vue-next/pull/3118))
- `Dialog`: `dialog plugin` 执行 `destroy` methodwhen，销毁componentinstance @xixileng ([#3095](https://github.com/Tencent/tdesign-vue-next/pull/3095))
- `DatePicker`: Optimizeclose浮层after重置defaultselected区域 @honkinglin ([#3107](https://github.com/Tencent/tdesign-vue-next/pull/3107))
- `Grid`: `Row` parameter `gutter` type补充 `lg,xl,xxl` @liweijie0812 ([#3105](https://github.com/Tencent/tdesign-vue-next/pull/3105))
### 🚧 Others
- `Form`: examplecodein `email` use `t-auto-complete` componentinstead @liweijie0812 ([#3101](https://github.com/Tencent/tdesign-vue-next/pull/3101))
 
## 🌈 1.3.11 `2023-07-12` 
### 🚀 Features
- `Upload`: @chaishi ([#3074](https://github.com/Tencent/tdesign-vue-next/pull/3074))
- Addcomponentinstancemethod，`uploadFilePercent` forUpdatefileupload进度
- `theme=image`，Supportuse `fileListDisplay` 自definition UI content
- `theme=image`，Support点击名称打开新窗口访问image
- draguploadscenario，Support `accept` filetype限制
- 去除imagefile名color，use Link componentunifiedcolor
- addfiletypefiltermethod getFileList
- `Textarea`: Supportdynamic更改 `autosize` property @Zz-ZzzZ ([#3077](https://github.com/Tencent/tdesign-vue-next/pull/3077))
- `MenuItem`: Add `API: routerLink`，can指定menu项renderas `Router` 控制跳转 `a` tag @boogie-ben ([#3057](https://github.com/Tencent/tdesign-vue-next/pull/3057))
### 🐞 Bug Fixes
- `Menu`: @boogie-ben ([#3057](https://github.com/Tencent/tdesign-vue-next/pull/3057))
- Fix `MenuItem` renderas `a` tagwhen，`a` tag覆盖range扩大to整个menu项，而not是只有textpartial
- Fix the issue of menu项render `a` tag并and `menu` in `collapsed` statewhen，menu项content区hidecauseunable to点击跳转
- Fix the issue of renderas `a` tagwhen并in `popup` appearwhen，textfor齐andnormalmenu项 positionnot一致
- `Table`: Fix主动triggerpage码Updatewhentable序号列notre-计算 @tanhh326 ([#3071](https://github.com/Tencent/tdesign-vue-next/pull/3071))
- `Upload`: 自definitionuploadmethod，Fix the not能正确returnupload成功or失败after file issue @chaishi ([#3074](https://github.com/Tencent/tdesign-vue-next/pull/3074))
- `SelectInput`: Fixuse回退键delete `input` incontentwhen，willdelete `tag` @tanhh326 ([#3072](https://github.com/Tencent/tdesign-vue-next/pull/3072))
- `DateRangePicker`: Fix the issue of `suffix`、`prefix` unable to响should数据变化render @uyarn ([#3085](https://github.com/Tencent/tdesign-vue-next/pull/3085))
### 🚧 Others
- `Upload`: API add更多English描述 @chaishi ([#3074](https://github.com/Tencent/tdesign-vue-next/pull/3074))

## 🌈 1.3.10 `2023-07-05` 
### 🚀 Features
- `Table`: tree结构，add行层级class name，convenient for业务设置not同层级 style @chaishi ([#3037](https://github.com/Tencent/tdesign-vue-next/pull/3037))
- `Form`: FormRules，adddefault泛型type ，if此can以not再强制definitiondefinitiontype，directly写 `FormRule` 即can @chaishi ([#3040](https://github.com/Tencent/tdesign-vue-next/pull/3040))
- `DatePicker`: Add `onConfirm` event @liweijie0812 ([#3033](https://github.com/Tencent/tdesign-vue-next/pull/3033))

### 🐞 Bug Fixes
- `Input`: Fix the `limitNumber` partialin `disabled` stateunder style issue @uyarn ([#3034](https://github.com/Tencent/tdesign-vue-next/pull/3034))
- `Tree`: Fix单独设置 `checkable` property function @TabSpace @uyarn ([#3034](https://github.com/Tencent/tdesign-vue-next/pull/3034))
- `Table`: Fix启用 `multipleSort`，非受控用法not工作 @ngyyuusora ([#3024](https://github.com/Tencent/tdesign-vue-next/pull/3024))
- `Select`: Fixin多选when候 disabledstate @uyarn ([#3054](https://github.com/Tencent/tdesign-vue-next/pull/3054))
- `Calendar`: Fix自definitiondate 实际selectrangeanddefinitionnot符 @imp2002 ([#3049](https://github.com/Tencent/tdesign-vue-next/pull/3049))
- `TagInput`: Fixbefore置icons styledefect @uyarn ([#3058](https://github.com/Tencent/tdesign-vue-next/pull/3058))
- `SelectInput`: Fix the defect of blurwhennot清空输入content @uyarn ([#3058](https://github.com/Tencent/tdesign-vue-next/pull/3058))
- `Submenu`: Fix the `popup-props` pass through issue @Kafuu-Chinocya ([#3061](https://github.com/Tencent/tdesign-vue-next/pull/3061))
- `DatePicker`: Fix `value` as `null` when error @liweijie0812 ([#3053](https://github.com/Tencent/tdesign-vue-next/pull/3053))
- `InputNumber`: Fix输入valueas `0` when，not执行纠正 @imp2002 ([#3048](https://github.com/Tencent/tdesign-vue-next/pull/3048))
## 🌈 1.3.9 `2023-06-29` 
### 🚀 Features
- `Table`: 列宽Adjustscenario，Addevent `onColumnResizeChange`，in列宽Adjustaftertrigger @chaishi ([#3007](https://github.com/Tencent/tdesign-vue-next/pull/3007))
- `Image`: Support `referrerpolicy` @btea ([#3014](https://github.com/Tencent/tdesign-vue-next/pull/3014))

### 🐞 Bug Fixes
- `Checkbox`:
- 复选框listrender性能Optimize，selector取消某一个optionwhen，not再duplicaterender全部复选框 @chaishi ([#3011](https://github.com/Tencent/tdesign-vue-next/pull/3011))
- 复选框disabledlogic优先级顺序Fix，shouldwhenas：`Form.disabled < CheckboxGroup.disabled < Checkbox.disabled` @chaishi ([#3011](https://github.com/Tencent/tdesign-vue-next/pull/3011))
- Fix the 带disabledbutton 全选logic issue。 @chaishi ([#3011](https://github.com/Tencent/tdesign-vue-next/pull/3011))
- `Table`: 列configuration和列宽Adjustscenario，Fix the 列数量由多变少whennot能Updatewidth issue @chaishi ([#3007](https://github.com/Tencent/tdesign-vue-next/pull/3007))
- `Tabs`: Removedocumentationin `onChange` not存in parameter @Zz-ZzzZ ([#2974](https://github.com/Tencent/tdesign-vue-next/pull/2974))
- `Dropdown`: Fix the defect of via组合 `v-for` 和single item rendercomponent丢失node @uyarn ([#3026](https://github.com/Tencent/tdesign-vue-next/pull/3026))
- `Pagination`: `onchage` trigger获取 `current` 是旧value @liweijie0812 ([#3030](https://github.com/Tencent/tdesign-vue-next/pull/3030))
 
### 🚧 Others
- `Docs`: AddEnglishdocumentation站点
- `Dropdown`: Adjust `dropdown` example Add `trigger click` 用法 @uyarn ([#3026](https://github.com/Tencent/tdesign-vue-next/pull/3026))

## 🌈 1.3.8 `2023-06-20` 
### 🐞 Bug Fixes
- `ColorPicker`: @uyarn ([#2996](https://github.com/Tencent/tdesign-vue-next/pull/2996))
- initial化as渐变modewhen，Support空字符串作asinitialvalue
- Fix the `recentColors` etc.字段 type issue
- Fix the defect of 内部dropdownoptionnotpass through `popupProps`
- `Select`: Fix the issue of use `tagName` 作askeywhenconsoleappearwarning @uyarn ([#2980](https://github.com/Tencent/tdesign-vue-next/pull/2980))
- `Upload`: `ts` typeFix @kaishuige ([#2990](https://github.com/Tencent/tdesign-vue-next/pull/2990))
- `Table`: 本地数据sort，Fix the initialsortinvalid issue @chaishi ([#2999](https://github.com/Tencent/tdesign-vue-next/pull/2999))
- `TextArea`: Fix the issue of cannot响should设置 `value` valueafter autosize 自适shouldineffective @xiaosansiji ([#3002](https://github.com/Tencent/tdesign-vue-next/pull/3002))
- `Guide`: switchwhenbuttonappear动画 @zhangpaopao0609 ([#2997](https://github.com/Tencent/tdesign-vue-next/pull/2997))
- `Swiper`: Fix the issue of `navigation` slotineffective @uyarn ([#3003](https://github.com/Tencent/tdesign-vue-next/pull/3003))
### 🚧 Others
- `Dropdown`: Add带icons dropdownmenuexample @aomnisz ([#2995](https://github.com/Tencent/tdesign-vue-next/pull/2995))
- `Table`: Fix the documentationmissing吸顶表头examplecode issue @chaishi ([#2999](https://github.com/Tencent/tdesign-vue-next/pull/2999))

## 🌈 1.3.7 `2023-06-14` 
### 🚀 Features
- `Menu`: `Submenu` Add `popupProps` property，允许pass through设置底层 `Popup` popupproperty @xiaosansiji ([#2963](https://github.com/Tencent/tdesign-vue-next/pull/2963))
- `Input`: 回车eventnot再阻止event冒泡 @uyarn ([#2968](https://github.com/Tencent/tdesign-vue-next/pull/2968))
### 🐞 Bug Fixes
- `Select`:
- Fix the defect of 空字符串unable to作ascan选value @kaishuige ([#2950](https://github.com/Tencent/tdesign-vue-next/pull/2950))
- Fix the defect of unable tovia键盘回车操作selectedoptionand忽略已filteroption @uyarn ([#2968](https://github.com/Tencent/tdesign-vue-next/pull/2968))
- `InputNumber`: initialvalueas `undefined/null`，and存in `decimalPlaces` when，not再decimal点纠正 @chaishi ([#2948](https://github.com/Tencent/tdesign-vue-next/pull/2948))
- `Menu`: Fix the issue of 弹出类menucontentnotfor齐 @xiaosansiji ([#2957](https://github.com/Tencent/tdesign-vue-next/pull/2957))
- `Drawer`: 打开drawerafter，unable todirectly摁 `ESC` 退出，必须先点击drawer，才canclose @kaishuige ([#2958](https://github.com/Tencent/tdesign-vue-next/pull/2958))
- `Timeline`: Fix the defect of `timeline-item` contentnotSupport热Update @uyarn ([#2965](https://github.com/Tencent/tdesign-vue-next/pull/2965))
- `Table`: Fix the in多级表头inuse筛选function，showabnormality issue @youlvlv ([#2966](https://github.com/Tencent/tdesign-vue-next/pull/2966))
### 🚧 Others
- `Menu`: 去除子menu `inline` style，改asstyle类实现，convenient forviaglobal `Design Token` 方式Adjust尺寸和间距etc. @xiaosansiji ([#2957](https://github.com/Tencent/tdesign-vue-next/pull/2957))
- `Table`: Fix the can筛选table，自definition筛选筛选器 `type` typeerror issue @youlvlv ([#2964](https://github.com/Tencent/tdesign-vue-next/pull/2964))
## 🌈 1.3.6 `2023-06-07` 
### 🚀 Features
- `Menu`: 侧边导航menucollapsewhen，`Tooltip` displaymenucontent @xiaosansiji ([#2921](https://github.com/Tencent/tdesign-vue-next/pull/2921))
### 🐞 Bug Fixes
- `Menu`:
- Fix the issue of 顶部导航menuposition有误 @xiaosansiji ([#2927](https://github.com/Tencent/tdesign-vue-next/pull/2927))
- Fix the issue of `theme = dark` modeunderpopupmenumissingborderstyle @xiaosansiji ([#2927](https://github.com/Tencent/tdesign-vue-next/pull/2927))
- `InputNumber`:
- Fix the partialdecimal点数字unable to输入 issue @chaishi ([#2918](https://github.com/Tencent/tdesign-vue-next/pull/2918))
- Supportdefault数字formatdecimal点 @chaishi ([#2942](https://github.com/Tencent/tdesign-vue-next/pull/2942))
- `Radio`: Fix the `label` invalid issue @Aicmortal ([#2919](https://github.com/Tencent/tdesign-vue-next/pull/2919))
- `Select`: 修正when `options` 数据存in `className` 而causeoptionstylewill被意外污染 issue @PDieE ([#2920](https://github.com/Tencent/tdesign-vue-next/pull/2920))
- `ImageViewer`: Fiximage链接带有parameterwhen，downloadwhenfile扩展名丢失 @nined9 ([#2936](https://github.com/Tencent/tdesign-vue-next/pull/2936))
- `InputAdornment`: Fix the issue of `1.3.5`inFix空字符串causeslotnotnormalrender @uyarn ([#2944](https://github.com/Tencent/tdesign-vue-next/pull/2944))
- `Table`: in多级表头inuse筛选function，unable tonormal反显@youlvlv ([#2943](https://github.com/Tencent/tdesign-vue-next/pull/2943))
### 🚧 Others
- `Test`: `vitest config` 分离和 `cypress` upgrade @PengYYYYY ([#2913](https://github.com/Tencent/tdesign-vue-next/pull/2913))

## 🌈 1.3.5 `2023-05-30` 
### 🚀 Features
- `TagInput`: Add `focus` method 导出 @coderbaozi ([#2893](https://github.com/Tencent/tdesign-vue-next/pull/2893))
- `TimePicker`: notselectedvaluewhennot允许点击确认button @uyarn ([#2898](https://github.com/Tencent/tdesign-vue-next/pull/2898))
- `Cascader`: optionSupport自definitionstyle @ZekunWu ([#2878](https://github.com/Tencent/tdesign-vue-next/pull/2878))
### 🐞 Bug Fixes
- `Pagination`: Fix the tablecontentas空when，page码valuenotnormal issue @yanxugong ([#2886](https://github.com/Tencent/tdesign-vue-next/pull/2886))
- `Table`: Fix the in多级表头inuse筛选function，showabnormality issue @yanxugong ([#2892](https://github.com/Tencent/tdesign-vue-next/pull/2892))
- `Dialog`: 全屏stateunderclose `footer`,still占据 `body` height @ccccpj ([#2897](https://github.com/Tencent/tdesign-vue-next/pull/2897))
- `Backtop`: Fix the issue of `visibleHeight` 只作用一次 @uyarn ([#2898](https://github.com/Tencent/tdesign-vue-next/pull/2898))
- `Tooltip`: Fix the `1.3.4` version 箭头positionabnormality style issue @uyarn ([#2898](https://github.com/Tencent/tdesign-vue-next/pull/2898))
- `AutoComplete`: 修正when `options` in空数组和非空数组之间来回switchwhenwillcause `triggerElement` 失去焦点 issue @PDieE ([#2901](https://github.com/Tencent/tdesign-vue-next/pull/2901))
- `Tree`: 修正由in `Tree` componenterrorfilter `allowFoldNodeOnFilter` 而cause该parameterinvalid issue @PDieE ([#2906](https://github.com/Tencent/tdesign-vue-next/pull/2906))
- `InputAdornment`: Fix the issue of `prepend` or `append` as空字符串whenstillrendernode @uyarn ([#2910](https://github.com/Tencent/tdesign-vue-next/pull/2910))
- `ImageViewer`: `closeBtn` renderabnormality @sinbadmaster ([#2875](https://github.com/Tencent/tdesign-vue-next/pull/2875))
- `Test`: Fixunit test `log` 抛出大量abnormality @PengYYYYY ([#2896](https://github.com/Tencent/tdesign-vue-next/pull/2896))

## 🌈 1.3.4 `2023-05-19` 
### 🐞 Bug Fixes
- `Watermark`: Fix `watermark-content` parameterreactive丢失@Lmmmmmm-bb ([#2852](https://github.com/Tencent/tdesign-vue-next/pull/2852))
- `RadioGroup`: Fix父元素 `width` 设置as `100%`, 滑动块stylenotwillautomaticallyre-计算position和偏移 @Julone ([#2854](https://github.com/Tencent/tdesign-vue-next/pull/2854))
- `Message`: Fix the defect of 同whenshowmultiple `Message` when，willcloseerror @qweasdzxcpkh ([#2861](https://github.com/Tencent/tdesign-vue-next/pull/2861))
- `DatePicker`: Fix the 单独usepanelwhen `TimePicker` unable to更改 issue @coderbaozi ([#2842](https://github.com/Tencent/tdesign-vue-next/pull/2842))
- `TagInput`: Fix the issue of componentinitialvalueabnormality @uyarn ([#2864](https://github.com/Tencent/tdesign-vue-next/pull/2864))
- `Textarea`: Fix the issue of `autosize` as `null` error @uyarn ([#2864](https://github.com/Tencent/tdesign-vue-next/pull/2864))

### 🚧 Others
- `Image`: interactionexample @liweijie0812 ([#2845](https://github.com/Tencent/tdesign-vue-next/pull/2845))
- `DatePicker`: Updateprompttext @nined9 ([#2844](https://github.com/Tencent/tdesign-vue-next/pull/2844))

## 🌈 1.3.3 `2023-05-12` 
### 🚀 Features
- `ColorPicker`: Add `size` 和 `enableMultipleGradient` API @uyarn ([#2803](https://github.com/Tencent/tdesign-vue-next/pull/2803))
- `Upload`: componentSupport `uploadPastedFiles` configuration @yanxugong ([#2814](https://github.com/Tencent/tdesign-vue-next/pull/2814))
- `Select`: `onChange` event `context` Add`option`parameter for获取selected项completecontent @uyarn ([#2831](https://github.com/Tencent/tdesign-vue-next/pull/2831))
- `Tree`: `TreeItem` Add `draggable` property，允许somenodenotcandrag @decadef20 ([#2815](https://github.com/Tencent/tdesign-vue-next/pull/2815))
### 🐞 Bug Fixes
- `Select`:
- Fix the abnormality of `1.3.2` version console warning @uyarn ([#2809](https://github.com/Tencent/tdesign-vue-next/pull/2809))
- 限制can选数目invalid @AuYuHui ([#2828](https://github.com/Tencent/tdesign-vue-next/pull/2828))
- exceed最大限制afteroptioncan点击 @Zz-ZzzZ ([#2829](https://github.com/Tencent/tdesign-vue-next/pull/2829))
- `clearable` when `value` as `undefined` issue @wangyang0210 ([#2678](https://github.com/Tencent/tdesign-vue-next/pull/2678))
- `Popup`:
- Fix the issue of `onScrollToBottom` inpartialwindows环境underunable totrigger @uyarn ([#2834](https://github.com/Tencent/tdesign-vue-next/pull/2834))
- Fixcallcomponent暴露 `close()`whenerror @Zz-ZzzZ ([#2838](https://github.com/Tencent/tdesign-vue-next/pull/2838))
- `Table`: enable省略号 `ellipsis` 和虚拟scrollafter，快速scrollconsole报读取 `null` propertyabnormality @nined9 ([#2799](https://github.com/Tencent/tdesign-vue-next/pull/2799))
- `Image`: Fix `nuxt3` 环境under `onload` invalid @liweijie0812 ([#2840](https://github.com/Tencent/tdesign-vue-next/pull/2840))
### 🚧 Others
- `Tree`: Fix the issue of expand操作 `demo` inunable toswitch数据 @palmcivet ([#2806](https://github.com/Tencent/tdesign-vue-next/pull/2806))

## 🌈 1.3.2 `2023-04-28` 
### 🚀 Features
- `Select`: Support`panelTopContent`in虚拟scrolletc.need要scrolldropdownscenario use 具体use方式请看example @uyarn ([#2777](https://github.com/Tencent/tdesign-vue-next/pull/2777))
### 🐞 Bug Fixes
- `DatePicker`:
- Fix the 第二次点击panelcloseabnormality issue @honkinglin ([#2781](https://github.com/Tencent/tdesign-vue-next/pull/2781))
- Fix `valueType` `validator` validationerror @nined9 ([#2757](https://github.com/Tencent/tdesign-vue-next/pull/2757))
- `Select`: @uyarn ([#2777](https://github.com/Tencent/tdesign-vue-next/pull/2777))
- Fix the issue of `defaultValue` defaultvalueabnormality
- Fix the issue of 单选mode `inputClass` nottake effect
- `Table`:
- Fix the 取消表尾吸底when `requestAnimationFrame` in `Unmounted` 之afterstill执行一次cause abnormality issue @nined9 ([#2745](https://github.com/Tencent/tdesign-vue-next/pull/2745))
- Fix the abnormality of 设置固定行position信息whenappeartrnot存incasewhencauseerror @nined9 ([#2760](https://github.com/Tencent/tdesign-vue-next/pull/2760))
- `Pagination`: Fix the defect of switchlanguagewhennotre-rendercontent @uyarn ([#2775](https://github.com/Tencent/tdesign-vue-next/pull/2775))
- `Link`: form设置disablednottake effect @liweijie0812 ([#2783](https://github.com/Tencent/tdesign-vue-next/pull/2783))
- `Input`: Fix the issue of `input` component `type = hidden` when，componentborder依然被show @PengYYYYY ([#2776](https://github.com/Tencent/tdesign-vue-next/pull/2776))

### 🚧 Others
- `Datepicker`: Fixexamplecodeerror @honkinglin ([#2761](https://github.com/Tencent/tdesign-vue-next/pull/2761))
## 🌈 1.3.1 `2023-04-21` 

### 🚀 Features
- `Theme`: theme generatorupgradeto `v1` version @uyarn ([#2747](https://github.com/Tencent/tdesign-vue-next/pull/2747))

### 🐞 Bug Fixes
- `Popup`: Fix the issue of trigger元素hidewhen，`popper` stillshowtopage左上角() @nined9 ([#2713](https://github.com/Tencent/tdesign-vue-next/pull/2713))
- `Select`: Fix the issue of 多选option点击trigger多次cause虚拟scrollswitch普通modewhenunable toselected @uyarn ([#2734](https://github.com/Tencent/tdesign-vue-next/pull/2734))
- `Image`: Fix the `SSR` 环境under `loading` issue @liweijie0812 ([#2738](https://github.com/Tencent/tdesign-vue-next/pull/2738))
- `DatePicker`: Support `onPresetClick` event @honkinglin ([#2743](https://github.com/Tencent/tdesign-vue-next/pull/2743))
- `StickyTool`: Fix the issue of 单独引入 `StickyItem` notnormalrender @uyarn ([#2751](https://github.com/Tencent/tdesign-vue-next/pull/2751))
- `ColorPicker`: Fix the defect of 渐变modeunder `hex` 和 `rgb` modeunder输入unable to修改渐变点color @uyarn ([#2751](https://github.com/Tencent/tdesign-vue-next/pull/2751))
- `DatePicker`: Fix `valueType` parametervalidationerror
- `Icon`: Fix the issue of `manifest` unified入口导出 `esm` 模块，documentationasandwhenUpdate @Layouwen ([#2739](https://github.com/Tencent/tdesign-vue-next/pull/2739))

### 🚧 Others
- `Select`: `usage bordered` propertydeprecatedRemove @liweijie0812 ([#2723](https://github.com/Tencent/tdesign-vue-next/pull/2723))
- `Nuxt3`: Add `nuxt3` usedocumentation @liweijie0812 ([#2726](https://github.com/Tencent/tdesign-vue-next/pull/2726))

## 🌈 1.3.0 `2023-04-13` 
### 🚀 Features
- `BackTop`: Add `BackTop` component @shinyina ([#2665](https://github.com/Tencent/tdesign-vue-next/pull/2665))
- `StickyTool`: Add `StickyTool` component @ZekunWu ([#2517](https://github.com/Tencent/tdesign-vue-next/pull/2517))
- `RadioGroup`: `options.value` Support `boolean` @liweijie0812 ([#2659](https://github.com/Tencent/tdesign-vue-next/pull/2659))
- `Local`: Add繁体字configuration包 @chaishi ([#2685](https://github.com/Tencent/tdesign-vue-next/pull/2685))
- `Select`: `value` Support `boolean` @liweijie0812 ([#2694](https://github.com/Tencent/tdesign-vue-next/pull/2694))

### 🐞 Bug Fixes
- `Table`:
- 列宽Adjustfunction，Fix the 即使 `resizable=false` when，也willshowdragAdjust列宽icons和辅助线 issue @chaishi ([#2715](https://github.com/Tencent/tdesign-vue-next/pull/2715))
- 列宽Adjustfunction，Fix the issue of indrag任意列宽使table横向scrollbar消失之after列宽unable tonormalAdjust，即Support `resize.minWidth` @chaishi ([#2715](https://github.com/Tencent/tdesign-vue-next/pull/2715))
- 列宽Adjustfunction，Fix the issue of enable多级表头when点击子表头afterconsoleerror @chaishi ([#2715](https://github.com/Tencent/tdesign-vue-next/pull/2715))
- `Select`:
- Fix the issue of 存induplicate `value` `option` 变化whennotUpdatelabel @uyarn ([#2687](https://github.com/Tencent/tdesign-vue-next/pull/2687))
- Fix the defect of 多选option边缘区域点击nottriggerselected @uyarn ([#2687](https://github.com/Tencent/tdesign-vue-next/pull/2687))
- `RadioGroup`: optionwidthcannotdynamicUpdate，causestyleerror，文字溢出 @ZTH520 ([#2681](https://github.com/Tencent/tdesign-vue-next/pull/2681))
- `Tooltip`: Fixwhen `content` 是空字符or空slotwhen，notshowprompt @PengYYYYY ([#2653](https://github.com/Tencent/tdesign-vue-next/pull/2653))
- `Tree`: Fix the issue of 懒loading子nodewhen点击 `label` willtriggerselected @uyarn ([#2663](https://github.com/Tencent/tdesign-vue-next/pull/2663))
- `InputAdornment`: Fix the `slot` 方式 `class` 名missing issue @ccccpj ([#2656](https://github.com/Tencent/tdesign-vue-next/pull/2656))
- `InputNumber`: Fix the issue of decimal位操作以 `0` 结尾whenpartial边界scenarioabnormality @uyarn ([#2668](https://github.com/Tencent/tdesign-vue-next/pull/2668))
- `TreeSelect`: Fix绑定 `data` 数据Updateafter,componentnotwillre-render @algerkong ([#2683](https://github.com/Tencent/tdesign-vue-next/pull/2683))
- `DatePicker`: Fix `DatePicker` `prefixIcon` notpasswhenstillpass through `prefixIcon` functioncauseproduce非预期render @dexterBo ([#2658](https://github.com/Tencent/tdesign-vue-next/pull/2658))
- `Dropdown`: Fix the issue of dropdownmenuconfiguration `template` `content` or `prefixIcon` slotwhennotrender() @nined9 ([#2696](https://github.com/Tencent/tdesign-vue-next/pull/2696))
### 🚧 Others
- `Docs`: Optimize贡献指南和测试指南 @wangyang0210 ([#2706](https://github.com/Tencent/tdesign-vue-next/pull/2706))
- `Loading`: Add `v-loading` examplecode @uyarn ([#2714](https://github.com/Tencent/tdesign-vue-next/pull/2714))
- `Dialog`: add `slot` 相关 descriptionandexamplecode @Layouwen ([#2708](https://github.com/Tencent/tdesign-vue-next/pull/2708))

## 🌈 1.2.3 `2023-03-30` 
### 🚀 Features
- `Table`:
- filterfunction，Supportpass throughproperty `column.filter.props.onChange` @chaishi ([#2623](https://github.com/Tencent/tdesign-vue-next/pull/2623))
- Support设置 `filterRow=null` hidefilter结果行 @chaishi ([#2623](https://github.com/Tencent/tdesign-vue-next/pull/2623))
- `Popup`: Add `close()` instancemethod @ikeq ([#2617](https://github.com/Tencent/tdesign-vue-next/pull/2617))
### 🐞 Bug Fixes
- `Table`: @chaishi ([#2636](https://github.com/Tencent/tdesign-vue-next/pull/2636))
- Fix the `SSR` 环境 `document` error issue
- Fix the componentinstancemethodtype issue
- `Guide`: 解决 `popup` promptin重叠情形undernotUpdate @zhangpaopao0609 ([#2605](https://github.com/Tencent/tdesign-vue-next/pull/2605))
- `Swiper`: 修改轮播switchissue @btea ([#2614](https://github.com/Tencent/tdesign-vue-next/pull/2614))
- `Popup`: Fix叠加useerror @ikeq ([#2617](https://github.com/Tencent/tdesign-vue-next/pull/2617))
- `Select`: Fixuse `filterable` 和自definitiondropdownoptionwhen，dropdownlistdisplayabnormality @Lmmmmmm-bb ([#2619](https://github.com/Tencent/tdesign-vue-next/pull/2619))
- `TimePicker`: Fix the issue of use`px to rem`插件whenscroll逐渐错位 @SadWood ([#2627](https://github.com/Tencent/tdesign-vue-next/pull/2627))
- `Loading`: Fix the issue of use `loadingplugin`，willnot `loading` 效果 @beerui ([#2628](https://github.com/Tencent/tdesign-vue-next/pull/2628))
- `TagInput`: Fix the deleteevent和Chinese输入event issue @chiyu1996 ([#2631](https://github.com/Tencent/tdesign-vue-next/pull/2631))
- `DatePicker`: Fix the issue of `format` as `12` 小when制whenfunctionabnormality @uyarn ([#2632](https://github.com/Tencent/tdesign-vue-next/pull/2632))
- `Alert`: Fix the closebuttonas文字when 居in和字体大小 issue @Wen1kang @uyarn ([#2632](https://github.com/Tencent/tdesign-vue-next/pull/2632))
- `InputNumber`: Fix有 `max` valuewhen，清空value，`blur` willautomatically填充 `max` value @Lmmmmmm-bb ([#2620](https://github.com/Tencent/tdesign-vue-next/pull/2620))
- `Menu`: Fix多级menu折叠menuafter，第一次顺着expand悬浮多级子menuwhenwill全部消失 @Ericleungs ([#2634](https://github.com/Tencent/tdesign-vue-next/pull/2634))

### 🚧 Others
- `Form`: Update `Form` documentation，修正 ` telnumber rule` 描述 @xiaosansiji ([#2606](https://github.com/Tencent/tdesign-vue-next/pull/2606))
- `Table`: Updatecomponentinstancemethoddocumentation @chaishi ([#2623](https://github.com/Tencent/tdesign-vue-next/pull/2623))

## 🌈 1.2.2 `2023-03-22` 
### 🚀 Features
- `Table`: @chaishi ([#2590](https://github.com/Tencent/tdesign-vue-next/pull/2590))
- Supportuse `filterIcon` Supportnot同列shownot同 筛选icons
- Support横向scrollto固定列
- `Tabs`: tagpageoption卡canconfiguration禁止drag @liweijie0812 ([#2457](https://github.com/Tencent/tdesign-vue-next/pull/2457))
- `TimePicker`: Support`size`property @uyarn ([#2597](https://github.com/Tencent/tdesign-vue-next/pull/2597))
### 🐞 Bug Fixes
- `Table`:
- 单行selectedfunction，Fix the `allowUncheck: false` invalid issue @chaishi ([#2590](https://github.com/Tencent/tdesign-vue-next/pull/2590))
- Fix `lazyload` 重置 `bug` @yanxugong ([#2580](https://github.com/Tencent/tdesign-vue-next/pull/2580))
- Fix `getSortIcon is not a function` inwebpackin error @chaishi ([#2592](https://github.com/Tencent/tdesign-vue-next/pull/2592))
- `TreeSelect`:
- Fix the treeselectcomponent，intablecomponent里面when，show两个 `Tips` issue @chaishi ([#2590](https://github.com/Tencent/tdesign-vue-next/pull/2590))
- Fix the issue of `1.2.0`versionafterinitialvalueas空whenerror @uyarn ([#2597](https://github.com/Tencent/tdesign-vue-next/pull/2597))
- `Dropdown`: Support`v-for`renderdropdownoption，Support`v-for`and普通slot混用 @uyarn ([#2594](https://github.com/Tencent/tdesign-vue-next/pull/2594))
- `Menu`: Fixre-expandafter，`normal` mode 子menu就是空 。 @Ericleungs ([#2589](https://github.com/Tencent/tdesign-vue-next/pull/2589))

## 🌈 1.2.1 `2023-03-17` 
### 🐞 Bug Fixes
- `Form`: Fix the 复杂数据结构inuse `scrollToFirstError` propertyunable to提交 issue @k1nz ([#2572](https://github.com/Tencent/tdesign-vue-next/pull/2572))
- `Dropdown`: Fix the issue of eventcallbacknotdefinitioncauseconsoleerror @uyarn ([#2570](https://github.com/Tencent/tdesign-vue-next/pull/2570))
- `Nuxt`: Fixin `tooltip` 和 `pagination` componentin `Nuxt3` error @PengYYYYY ([#2575](https://github.com/Tencent/tdesign-vue-next/pull/2575))
- `ConfigProvider`: Fixcomponentwillin最外层Add一 空 `div` tag ([#2573](https://github.com/Tencent/tdesign-vue-next/pull/2573))
- `Popup`: Optimize `popup` 嵌套logic @ikeq ([#2514](https://github.com/Tencent/tdesign-vue-next/pull/2514))
## 🌈 1.2.0 `2023-03-15` 
### 🚀 Features
- `Table`: @chaishi ([#2515](https://github.com/Tencent/tdesign-vue-next/pull/2515))
- 列宽Adjustfunction，Update列宽Adjustruleas：列宽较小notexceedwhen，列宽Adjust表现aswhenbefore列和相邻列 变化；列宽exceed存in横向scrollbarwhen，列宽Adjust仅affectwhenbefore列和列总宽
- can编辑单元格(行)function，Support编辑modeunder，数据变化when实whenvalidation，`col.edit.validateTrigger`
- 只有固定列存inwhen，才willappearclass name `.t-table__content--scrollable-to-left` 和 `.t-table__content--scrollable-to-right`
- dragfunction，Supportdisabled固定列notcandragAdjust顺序
- `DatePicker`:
- Support `size` property @honkinglin ([#2553](https://github.com/Tencent/tdesign-vue-next/pull/2553))
- Support `defaultTime` @honkinglin ([#2525](https://github.com/Tencent/tdesign-vue-next/pull/2525))
- `InputNumber`: Support千分位粘贴 @uyarn ([#2563](https://github.com/Tencent/tdesign-vue-next/pull/2563))
- `Upload`: `theme=file-input` fileas空when，悬浮whennotshow清除button @chaishi ([#2515](https://github.com/Tencent/tdesign-vue-next/pull/2515))

### 🐞 Bug Fixes
- `Table`:
- 列宽Adjustfunction，Fix the `Dialog` in列宽Adjust issue， @chaishi ([#2515](https://github.com/Tencent/tdesign-vue-next/pull/2515))
- `EnhancedTable` 筛选function，Fix the `shallowRef` warning issue， @chaishi ([#2515](https://github.com/Tencent/tdesign-vue-next/pull/2515))
- can编辑单元格(行)function，Fix the input box回车willtrigger Form form submit event issue， @chaishi ([#2515](https://github.com/Tencent/tdesign-vue-next/pull/2515))
- can编辑单元格，Fix the dropdownselect类component `abortEditOnEvent` not包含 `onChange` when，依然willin数据变化whentrigger退出编辑态 issue @chaishi ([#2515](https://github.com/Tencent/tdesign-vue-next/pull/2515))
- `Dialog`:
- Fixin `modeless` under，同when设置 `draggable` 和 `destroyOnClose` inclosepopupwhenwillerror @PengYYYYY ([#2550](https://github.com/Tencent/tdesign-vue-next/pull/2550))
- Fixpopup `confirm-on-enter` eventininput method呼出输入whenstillwilltrigger @PengYYYYY ([#2550](https://github.com/Tencent/tdesign-vue-next/pull/2550))
- `Textarea`:
- Fix the 设置最大长度after，unable toAdjustheight issue @chaishi ([#2515](https://github.com/Tencent/tdesign-vue-next/pull/2515))
- Fix the 获取焦点after style issue @tiny-dust ([#1176](https://github.com/Tencenttdesign-common/pull/1176))
- `Select`: Fix the defect of switch虚拟scrollwhennottriggerscroll监听causescrollnotUpdate数据 @uyarn ([#2506](https://github.com/Tencent/tdesign-vue-next/pull/2506))
- `Badge`: Fix徽标errorbehavior @Aicmortal ([#2504](https://github.com/Tencent/tdesign-vue-next/pull/2504))
- `DatePicker`: Fix the monthas `0` whendisplaywhenbeforemonth issue @honkinglin ([#2503](https://github.com/Tencent/tdesign-vue-next/pull/2503))
- `Upload`: Fix the `method` invalid issue @chaishi ([#2515](https://github.com/Tencent/tdesign-vue-next/pull/2515))
- `Dropdown`: Fix the issue of use`popupProps.on-visible-change`写法causecomponentabnormality @uyarn ([#2545](https://github.com/Tencent/tdesign-vue-next/pull/2545))
- `Progress`: Fix `trackColor` configuration色valuenot效果 @PengYYYYY ([#2550](https://github.com/Tencent/tdesign-vue-next/pull/2550))
- `SelectInput`: Fix the issue of SelectInput `valueDisplay` 和 `label` slotpositionerror @uyarn ([#2549](https://github.com/Tencent/tdesign-vue-next/pull/2549))
- `DateRangePickerPanel`: componentin处理year when候not实际取tovalue，cause无论是not是in同一年，都will去找to两个date项目in最小 /最大 @Ericleungs ([#2555](https://github.com/Tencent/tdesign-vue-next/pull/2555))
- `Popconfirm`: Fix `visible-change` eventin `context.trigger` in `confirm` eventinnot携带标识 @PengYYYYY ([#2560](https://github.com/Tencent/tdesign-vue-next/pull/2560))
### 🚧 Others
- `Table`: Fix the documentation `rowClassName` 描述 issue @chaishi ([#2515](https://github.com/Tencent/tdesign-vue-next/pull/2515))
- `Watermark`: Fix `live demo` @uyarn ([#2520](https://github.com/Tencent/tdesign-vue-next/pull/2520))

## 🌈 1.1.1 `2023-03-02` 
### 🐞 Bug Fixes
- `Popup`: Fix `popup` `trigger` as空error @Aicmortal ([#2499](https://github.com/Tencent/tdesign-vue-next/pull/2499))
- `Select`: Fix the issue of 远程searchswitchnormalrenderand虚拟scroll @uyarn ([#2496](https://github.com/Tencent/tdesign-vue-next/pull/2496))
- `Textarea`: Fix the `1.1.0` version `textarea` style issue @uyarn ([#2496](https://github.com/Tencent/tdesign-vue-next/pull/2496))
## 🌈 1.1.0 `2023-03-02` 
### 🚀 Features
- `Image`: imagecomponentSupport特殊format 地址 `.avif` 和 `.webp` @chaishi ([#2463](https://github.com/Tencent/tdesign-vue-next/pull/2463))
- `ConfigProvider`: Add `Image` globalconfiguration `globalConfig.image.replaceImageSrc` forunifiedinsteadimage地址 @chaishi ([#2463](https://github.com/Tencent/tdesign-vue-next/pull/2463))
- `SelectInput`: `collapsedItems.count` 含义修正as折叠 tag数量 @chaishi ([#2447](https://github.com/Tencent/tdesign-vue-next/pull/2447))
- `Types`: Add公共 `types` file 导出 @PengYYYYY ([#2490](https://github.com/Tencent/tdesign-vue-next/pull/2490))
### 🐞 Bug Fixes
- `Dialog`:
- Fix the issue of `config-provider` underconfiguration `confirmBtnTheme` ineffective @uyarn ([#2474](https://github.com/Tencent/tdesign-vue-next/pull/2474))
- Fix the `dialog` 打开after 焦点获取 issue @PengYYYYY ([#2491](https://github.com/Tencent/tdesign-vue-next/pull/2491))
- `Loading`: Fix the propertypass through issue @Aicmortal ([#2442](https://github.com/Tencent/tdesign-vue-next/pull/2442))
- `Upload`: Fix the disabled态 formfor `upload` componentinvalid issue @yusongh ([#2472](https://github.com/Tencent/tdesign-vue-next/pull/2472))
- `Textarea`: 解决 `textarea` 字符限制text遮挡textcontent issue @duanbaosheng ([#2462](https://github.com/Tencent/tdesign-vue-next/pull/2462))
- `Menu`: `menu-item` 设置 href propertyafter styleissue @tiny-dust ([#2458](https://github.com/Tencent/tdesign-vue-next/pull/2458))
- `Teleport`: Fixuse `Teleport` componentunable to挂载towhenbeforecomponent内元素node

### 🚧 Others
- `Space`: 输出complete test cases @chaishi ([#2446](https://github.com/Tencent/tdesign-vue-next/pull/2446))
- `Site`: Fix测试徽章无数据display @PengYYYYY ([#2490](https://github.com/Tencent/tdesign-vue-next/pull/2490))
## 🌈 1.0.9 `2023-02-21` 
### 🚀 Features
- `Upload`: @chaishi ([#2418](https://github.com/Tencent/tdesign-vue-next/pull/2418))
- candrag 单image/单fileupload，Supportuse `fileListDisplay` 自definitionfile信息content
- 一个请求uploadmultiplefilewhen，去除duplicateparameter `file`，保留 `file[0]` `file[1]` 即can，同whenAddparameter `length` 表示本次uploadfile 数量
- `onError/onSuccess/onProgress` add关键eventparameter `XMLHttpRequest`，for获取upload请求更详细 信息
- `tips` Supportslot，Supportfunction
- Addupload请求超when也will执行 `onError`
- Supportevent `onCancelUpload`
- Support `mockProgressDuration`，for设置模拟upload进度间隔time，大file大一点，小file小一点
- `Dialog`: 确认buttonthemenot再跟随theme变动 @xiaosansiji ([#2434](https://github.com/Tencent/tdesign-vue-next/pull/2434))

### 🐞 Bug Fixes
- `Upload`: @chaishi ([#2418](https://github.com/Tencent/tdesign-vue-next/pull/2418))
- Fix the `onSelectChange` event第二个parameter `currentSelectedFiles` not正确 issue
- Fix the `autoUpload=false` scenariounder，即使 `beforeUpload` function全部return `false` 依然willtrigger `onChange` event issue
- Fix the `data` asfunctionwhen，parameteras空 issue，补充parameter `files`
- Fix the `theme=image-flow` when，unable touse `fileListDisplay` 自definitionimagelist issue
- Fix the file数量exceed `max` when，andnotcancontinueupload file，依然trigger change event issue
- Fix the `theme=file` or者 `theme=image-flow` when，`abridgeName` invalid issue
- Fix the `theme=image-flow` and `autoUpload=false` when，change event第一个parameter丢失 file.url issue
- Fix the 非automaticallyuploadscenario `change` event第二个parameter `file` value并非whenbeforefile issue
- Fix the 各类slotinvalid和eventinvalid issue
- `Nuxt`: Fix `nuxt` under 编译error @PengYYYYY ([#2417](https://github.com/Tencent/tdesign-vue-next/pull/2417))
- `Dialog`: Fix `class` propertyappear警告 @Aicmortal ([#2424](https://github.com/Tencent/tdesign-vue-next/pull/2424))
- `Swiper`: Fix `swiper` component `v-model:current`, `current` valuenot随着轮播变化 @Zzongke ([#2427](https://github.com/Tencent/tdesign-vue-next/pull/2427))
- `SelectInput`: Fix the `SelectInput` and基in其 输入类component(`Select` / `Cascader` / `TreeSelect`) 单选can输入modeunder回删unable tocompletely清空and其cause 一系列 issue @uyarn ([#2429](https://github.com/Tencent/tdesign-vue-next/pull/2429))
- `Drawer`: Fix the scrollbar检测 issue @honkinglin ([#2438](https://github.com/Tencent/tdesign-vue-next/pull/2438))

### 🚧 Others
- `Upload`: 输出complete test cases（135 个），平均覆盖率达 `95%+` @chaishi ([#2418](https://github.com/Tencent/tdesign-vue-next/pull/2418))

## 🌈 1.0.8 `2023-02-17` 
### 🚀 Features
- `Timeline`: @chaishi ([#2395](https://github.com/Tencent/tdesign-vue-next/pull/2395))
- alwaysmaintain结构 `t-timeline-item__dot-content` 存in
- Supportuseslot和propertyfunction `label` 自definitiontimetext
- `Avatar`: @chaishi ([#2404](https://github.com/Tencent/tdesign-vue-next/pull/2404))
- loading失败eventAddparameter `({ e: Event })`，for获取细节信息
- Add `content/default`，以便via `JSX` function自definitioncontent
- Add `imageProps` forpass through全部 `Image` componentproperty
- `AvatarGroup`: exceed省略 最after一个 `Avatar` addclass name `t-avatar__collapse`，for区分其他元素 @chaishi ([#2404](https://github.com/Tencent/tdesign-vue-next/pull/2404))

### 🐞 Bug Fixes
- `Dialog`: Fix `Plugin` 方式调when,Update `className` willdeletecomponent自身class name @Aicmortal ([#2386](https://github.com/Tencent/tdesign-vue-next/pull/2386))
- `Timeline`: Fix the `TimelineItem.labelAlign` 优先级not高in `Timeline.labelAlign` issue @chaishi ([#2395](https://github.com/Tencent/tdesign-vue-next/pull/2395))
- `Cascader`: Fix `options` 变化whennotre-render @PengYYYYY ([#2399](https://github.com/Tencent/tdesign-vue-next/pull/2399))
- `Input`: Fix the valueas `null` when，长度计算not正确 issue @chaishi ([#2402](https://github.com/Tencent/tdesign-vue-next/pull/2402))
- `RangeInput`: Fix the icons大小display issue @honkinglin ([#2406](https://github.com/Tencent/tdesign-vue-next/pull/2406))
- `TagInput`: Fix the issue of componentAdd `blur` behaviorcause `Select` / `Cascader` / `TreeSelect` unable tofilter多选 @uyarn ([#2407](https://github.com/Tencent/tdesign-vue-next/pull/2407))
- `Slider`: Fix快速滑动滑块when `tooltip` not跟手 @AuYuHui ([#2408](https://github.com/Tencent/tdesign-vue-next/pull/2408))
- `Guide`: 引导框contentSupport字符串 @zhangpaopao0609 ([#2414](https://github.com/Tencent/tdesign-vue-next/pull/2414))
### 🚧 Others
- `Code`: use `lodash` 工具functioninstead原生method @Simon-He95 ([#2380](https://github.com/Tencent/tdesign-vue-next/pull/2380))
- `Drawer`: Fix `drawer` examplein eventerror @Aicmortal ([#2386](https://github.com/Tencent/tdesign-vue-next/pull/2386))
- `Affix`: Optimizestyle设置性能 @Simon-He95 ([#2394](https://github.com/Tencent/tdesign-vue-next/pull/2394))
- `Timeline`: 输出complete test cases @chaishi ([#2395](https://github.com/Tencent/tdesign-vue-next/pull/2395))
- `Calendar`: Optimize命名规范 @Simon-He95 ([#2398](https://github.com/Tencent/tdesign-vue-next/pull/2398))
- `Checkbox`: code结构Optimize @Simon-He95 ([#2403](https://github.com/Tencent/tdesign-vue-next/pull/2403))
## 🌈 1.0.7 `2023-02-15` 
### 🚀 Features
- `TagInput`: @chaishi ([#2357](https://github.com/Tencent/tdesign-vue-next/pull/2357))
- 失去焦点when，清空not成astag textcontent，and `onBlur` eventparameter `inputValue` 更as `''`
- Supportslot `suffix`
- deletetagwhen机变化，由 `onKeyup` 更as `onKeydown`，以便更快速地响should
- Support `onClick` event
- `Guide`: @chaishi ([#2363](https://github.com/Tencent/tdesign-vue-next/pull/2363))
- Support `title/content/body/highlightContent` etc.contentviaslot自definition，同whenSupportpropertyfunction
- Support `popupProps.overlayInnerClassName` definition步骤浮层content
- `Select`: @uyarn ([#2388](https://github.com/Tencent/tdesign-vue-next/pull/2388))
- Add `suffix`、`suffixIcon`、`autofocus` etc. API
- `Option` Add `title` Support自definition `hover` displaycontent
- `Dropdown`: `submenu` 层级结构Adjust，Add一层`t-dropdown__submenu-wrapper` @uyarn ([#2370](https://github.com/Tencent/tdesign-vue-next/pull/2370))
- `Form`: Support导出 `FormRules` 数据type @chaishi ([#2378](https://github.com/Tencent/tdesign-vue-next/pull/2378))
- `Popup`: Add `popperOptions` and `onScrollToBottom` event @uyarn ([#2388](https://github.com/Tencent/tdesign-vue-next/pull/2388))
### 🐞 Bug Fixes
- `TagInput`: Fix the 输入contentas空when，not能trigger onEnter event issue @chaishi ([#2357](https://github.com/Tencent/tdesign-vue-next/pull/2357))
- `Dropdown`: Fix the 多层too longmenu positionabnormality issue @uyarn ([#2370](https://github.com/Tencent/tdesign-vue-next/pull/2370))
- `SelectInput`: Fix the `defaultInputValue` invalid issue @chaishi ([#2373](https://github.com/Tencent/tdesign-vue-next/pull/2373))
- `Table`: Fix the `column.edit.on.onChange` invaliderror issue @chaishi ([#2374](https://github.com/Tencent/tdesign-vue-next/pull/2374))
- `Guide`: Optimize自definition消息框whencontainer style @zhangpaopao0609 ([#2371](https://github.com/Tencent/tdesign-vue-next/pull/2371))
- `Anchor`: Fixincomponent卸载when候 意外event注册 @tjstyx ([#2387](https://github.com/Tencent/tdesign-vue-next/pull/2387))
- `Tree`: Fixtreedragwhen候鼠标预期behaviorstyle @PengYYYYY ([#2390](https://github.com/Tencent/tdesign-vue-next/pull/2390))
### 🚧 Others
- `TagInput`: 输出complete test cases @chaishi ([#2357](https://github.com/Tencent/tdesign-vue-next/pull/2357))
- `Guide`: 输出complete test cases @chaishi ([#2363](https://github.com/Tencent/tdesign-vue-next/pull/2363))
- `Select`: Addscrollloadingoptionexamplecode @uyarn ([#2388](https://github.com/Tencent/tdesign-vue-next/pull/2388))
- `Lint`: Add `lint` 缓存 @Simon-He95 ([#2376](https://github.com/Tencent/tdesign-vue-next/pull/2376))
## 🌈 1.0.6 `2023-02-07` 
### 🚀 Features
- `Image`: @chaishi ([#2342](https://github.com/Tencent/tdesign-vue-next/pull/2342))
- component内部 ChineseSupportgloballanguageconfiguration，can以configurationasEnglish、日文、任意文字
- `onLoad/onError` etc.eventAddeventparameter `{ e: Event }`
- Support `placeholder` useslotorfunction自definitionimage占位content
- Support `loading`useslotorfunction自definitionimageloadinginstatecontent
- Support `error` useslotorfunction自definitionimageloading失败content
### 🐞 Bug Fixes
- `Tag`: @chaishi ([#2349](https://github.com/Tencent/tdesign-vue-next/pull/2349))
- Fix the disabledstate依然show closeicons issue
- Fix the exceed省略functionmissing `title` property issue
- Fix the `maxWidth` notSupport带单位 width issue
- 去除 Tag component `.t-tag--text` 元素 多余class name，以and非必要class name `.t-size-m`
- `Table`:
- Fix the slot `cell-empty-content` invalid issue（`cellEmptyContent` 一直有效） @chaishi ([#2319](https://github.com/Tencent/tdesign-vue-next/pull/2319))
- Fix`headerAffixedTop`、`footerAffixedBottom`、`filterValue` typeerror @uyarn ([#2352](https://github.com/Tencent/tdesign-vue-next/pull/2352))
- `Form`:
- Fix the `FormItem.name` 和 `FormItem.rules` 变化whenunable totriggervalidation issue @chaishi ([#2346](https://github.com/Tencent/tdesign-vue-next/pull/2346))
- Fix the form类componentvalue语法糖can能存in type issue @uyarn ([#2352](https://github.com/Tencent/tdesign-vue-next/pull/2352))
- `Image`:
- Fixcomponent `error`，`overlayContent` 字段typeerror @PengYYYYY ([#2328](https://github.com/Tencent/tdesign-vue-next/pull/2328))
- Fix the imageloadingin和imageloading失败missing必要icons issue @chaishi ([#2342](https://github.com/Tencent/tdesign-vue-next/pull/2342))
- `Dialog`: Fix the 确认button `theme` 取value issue，Fixunit testwarning @PengYYYYY ([#2320](https://github.com/Tencent/tdesign-vue-next/pull/2320))
- `Watermark`: Fix the issue of `unplugin`方式use`watermark`componenterror @uyarn ([#2329](https://github.com/Tencent/tdesign-vue-next/pull/2329))
- `Loading`: whenproperty `loading=false` when，not允许存inanyloadingcomponent相关元素 @chaishi ([#2319](https://github.com/Tencent/tdesign-vue-next/pull/2319))
- `Steps`: Fix the examplestyle issue @Wen1kang ([#2330](https://github.com/Tencent/tdesign-vue-next/pull/2330))
- `Affix`: Fix the issue of in `nuxt` under运行error @uyarn ([#2341](https://github.com/Tencent/tdesign-vue-next/pull/2341))
- `Pagination`: Fix the issue of in `nuxt` under运行error @uyarn ([#2341](https://github.com/Tencent/tdesign-vue-next/pull/2341))
- `InputNumber`: Fix the decimal点after第二个数字ifas `0` unable to输入 issue @chaishi ([#2344](https://github.com/Tencent/tdesign-vue-next/pull/2344))
- `Avatar`: Fix the `size` dynamic变化invalid issue @PengYYYYY ([#2340](https://github.com/Tencent/tdesign-vue-next/pull/2340))
- `Calendar`: Fix the `controllerConfig` 产物type issue @uyarn ([#2352](https://github.com/Tencent/tdesign-vue-next/pull/2352))
- `Drawer`: Fix the `cancelBtn`、`confirmBtn` type issue @uyarn ([#2352](https://github.com/Tencent/tdesign-vue-next/pull/2352))
- `Popconfirm`: Fix the `cancelBtn`、`confirmBtn` type issue @uyarn ([#2352](https://github.com/Tencent/tdesign-vue-next/pull/2352))
- `Slider`: Fix the `InputNumberProps` type issue @uyarn ([#2352](https://github.com/Tencent/tdesign-vue-next/pull/2352))
- `Textarea`: Fix the `autosize` type issue @uyarn ([#2352](https://github.com/Tencent/tdesign-vue-next/pull/2352))
- `Select`: Fix the `options` type issue @uyarn ([#2352](https://github.com/Tencent/tdesign-vue-next/pull/2352))
- `BreadCrumb`: Fix the `BreadCrumbItem` in `to` type issue @uyarn ([#2352](https://github.com/Tencent/tdesign-vue-next/pull/2352))
- `Dropdown`: Fix `dropdown content` Support `function` type @hkaikai ([#2354](https://github.com/Tencent/tdesign-vue-next/pull/2354))
### 🚧 Others
- `Image`:
- Fixunit testwarning @PengYYYYY ([#2320](https://github.com/Tencent/tdesign-vue-next/pull/2320))
- 输出complete test cases @chaishi ([#2342](https://github.com/Tencent/tdesign-vue-next/pull/2342))
- `Calendar`: Fixunit testwarning @PengYYYYY ([#2320](https://github.com/Tencent/tdesign-vue-next/pull/2320))
- `SelectInput`: Fixunit testwarning @PengYYYYY ([#2320](https://github.com/Tencent/tdesign-vue-next/pull/2320))
- `Popup`: Fixunit testwarning @PengYYYYY ([#2320](https://github.com/Tencent/tdesign-vue-next/pull/2320))
- `Rate`: 补充 `rate` unit test @whitexie ([#2336](https://github.com/Tencent/tdesign-vue-next/pull/2336))
- `Tag`: add更多test cases @chaishi ([#2349](https://github.com/Tencent/tdesign-vue-next/pull/2349))
## 🌈 1.0.5 `2023-01-31` 
### 🚀 Features
- `ColorPicker`: switch单色-渐变modewhentrigger色valueand `onChange` 变化 @uyarn ([#2305](https://github.com/Tencent/tdesign-vue-next/pull/2305))
### 🐞 Bug Fixes
- `Input`: Fixuse `format` propertywhen，光标appear跳动 @Lmmmmmm-bb ([#2289](https://github.com/Tencent/tdesign-vue-next/pull/2289))
- `Table`:
- can编辑单元格，Fix the unable to退出编辑态 issue @chaishi ([#2303](https://github.com/Tencent/tdesign-vue-next/pull/2303))
- Fix the issue of 因 `useResizeObserver` 被重写cause 全部scenarioappearwarning @chaishi ([#2303](https://github.com/Tencent/tdesign-vue-next/pull/2303))
- `Tooltip`: Fix the `Props` 覆盖slot issue @Aicmortal ([#2308](https://github.com/Tencent/tdesign-vue-next/pull/2308))
- `DatePicker`: Fix the `dayjs` internationalization设置 issue @honkinglin ([#2314](https://github.com/Tencent/tdesign-vue-next/pull/2314))
- `Notification`: Fix单独引入 `NotifyPlugin` whennot带入 `css` style @pengYYYYY ([#2316](https://github.com/Tencent/tdesign-vue-next/pull/2316))
### 🚧 Others
- `Transfer`: Fix `tree` codeexample @Lmmmmmm-bb ([#2300](https://github.com/Tencent/tdesign-vue-next/pull/2300))
- `SelectInput`: 补充unit test @whitexie ([#2291](https://github.com/Tencent/tdesign-vue-next/pull/2291))
## 🌈 1.0.4 `2023-01-18` 
### 🚀 Features
- `Input`: @chaishi ([#2275](https://github.com/Tencent/tdesign-vue-next/pull/2275))
- `change` eventAdd `trigger` parameter for表示trigger本次数据变化 scenario
- 去除非必要 class name `t-is-default`
- Add `click` 点击event
### 🐞 Bug Fixes
- `Cascader`: Fixunable touse `0` 作as `value` @AuYuHui ([#2273](https://github.com/Tencent/tdesign-vue-next/pull/2273))
- `Input`: Fix the initialvalue长度超过 `maxlength` whenunable todelete issue @chaishi ([#2275](https://github.com/Tencent/tdesign-vue-next/pull/2275))
- `AutoComplete`: Fix the 初次focus，键盘eventunable to上underselected issue @chaishi ([#2275](https://github.com/Tencent/tdesign-vue-next/pull/2275))
- `Select`: `valueType` or `multiple` dynamicswitchcausecomponentineffective @zybzzc ([#2276](https://github.com/Tencent/tdesign-vue-next/pull/2276))
- `Popup`: Fix `trigger` 元素变化when `popper` positionerror @zybzzc ([#2277](https://github.com/Tencent/tdesign-vue-next/pull/2277))
- `TimePicker`: Fix the issue of `TimePickerPanel`notautomatically注册 @uyarn ([#2283](https://github.com/Tencent/tdesign-vue-next/pull/2283))
- `Loading`: Fix the partial浏览器under `loading` 晃动 issue @yusongh ([#2244](https://github.com/Tencent/tdesign-vue-next/pull/2244))
- `SelectInput`: Fix the issue of dropdownpopupstatenot改变when，duplicatetrigger `onPopupVisibleChange` event @xiaosansiji ([#2284](https://github.com/Tencent/tdesign-vue-next/pull/2284))
- `Tree`: Fixnode `checkable: false` nottake effect @pengYYYYY ([#2286](https://github.com/Tencent/tdesign-vue-next/pull/2286))
### 🚧 Others
- `Input`: Updatedocumentation，输出complete test cases，覆盖率达to `98.11%` @chaishi ([#2275](https://github.com/Tencent/tdesign-vue-next/pull/2275))
- `Card`: 修改examplepartial带操作codeunable to点击case @AuYuHui ([#2273](https://github.com/Tencent/tdesign-vue-next/pull/2273))
- `AutoComplete`: Add键盘eventtest cases检测，测试覆盖率达to `98.47%` @chaishi ([#2275](https://github.com/Tencent/tdesign-vue-next/pull/2275))
- `Select`: 补充unit test @zybzzc ([#2276](https://github.com/Tencent/tdesign-vue-next/pull/2276))
- `Card`: 修改examplepartial带操作codeunable to点击case @AuYuHui ([#2273](https://github.com/Tencent/tdesign-vue-next/pull/2273))
- `Select`: 补充unit test @zybzzc ([#2276](https://github.com/Tencent/tdesign-vue-next/pull/2276))
## 🌈 1.0.3 `2023-01-12` 
### 🚀 Features
- `Table`: @chaishi ([#2256](https://github.com/Tencent/tdesign-vue-next/pull/2256))
- can编辑单元格，Supportuse `col.edit.on` pass throughcomponentevent
- can编辑单元格，Supportuse `validateTableData` validation处in编辑态 单元格
- can编辑单元格，单元格 value cellValue not再解构处理
- Add `attach` forunified设置exceed省略浮层、筛选filterdropdownetc.元素 挂载元素。if：`attach={() => document.body}`
- `Radio`: Support键盘event（`tab` 键switchoption，`enter` 键selected）@chaishi ([#2241](https://github.com/Tencent/tdesign-vue-next/pull/2241))
- `RadioGroup`: Support `allowUncheck` @chaishi ([#2241](https://github.com/Tencent/tdesign-vue-next/pull/2241))
- `Select`: `valueDisplay`callbackAdd`displayValue`parameter，for设置`minCollapsedNum` scenario @uyarn ([#2243](https://github.com/Tencent/tdesign-vue-next/pull/2243))
- `Local`: Add阿拉伯language包 @pengYYYYY ([#2240](https://github.com/Tencent/tdesign-vue-next/pull/2240))

### 🐞 Bug Fixes
- `Dialog`:
- component销毁before立即Removewhenbeforenode，notneed要 `setTimeout` etc.待time @chaishi ([#2242](https://github.com/Tencent/tdesign-vue-next/pull/2242))
- Fixtypeerror @yaogengzhu ([#2247](https://github.com/Tencent/tdesign-vue-next/pull/2247))
- `Dropdown`: Fix the issue of 三级and以上子menuexceedissue计算partialscenarioabnormality @uyarn ([#2252](https://github.com/Tencent/tdesign-vue-next/pull/2252))
- `TreeSelect`: Fix the abnormality of optiontextprocessstyle @uyarn ([#2252](https://github.com/Tencent/tdesign-vue-next/pull/2252))
- `Tooltip`:
- 修改trigger元素pass方式 @Aicmortal ([#2253](https://github.com/Tencent/tdesign-vue-next/pull/2253))
- Fix the issue of in `duration` time结束afterunable toautomaticallyclose @FliPPeDround ([#2255](https://github.com/Tencent/tdesign-vue-next/pull/2255))
- `Table`: 处理单击和双击event冲突issue，avoid双击 when候trigger行selectedor行expand @chaishi ([#2256](https://github.com/Tencent/tdesign-vue-next/pull/2256))
- `Image`: Fix the first设置imageshowerrorafterdynamic修改 `src` valueimageunable toshow issue @sechi747 ([#2259](https://github.com/Tencent/tdesign-vue-next/pull/2259))
- `Swiper`: 循环播放导航指示标showissue @wenkeming ([#2257](https://github.com/Tencent/tdesign-vue-next/pull/2257))
- `Volar`: 完善 `volar` codepromptfile @code2933 ([#2262](https://github.com/Tencent/tdesign-vue-next/pull/2262))
- `Select`: Fix `value` notin `options` whennotshowvalue @Aicmortal ([#2267](https://github.com/Tencent/tdesign-vue-next/pull/2267))
### 🚧 Others
- `Radio`: 输出complete test cases @chaishi ([#2241](https://github.com/Tencent/tdesign-vue-next/pull/2241))
- `docs`: Optimize最afterUpdatedatedisplay @honkinglin ([#2261](https://github.com/Tencent/tdesign-vue-next/pull/2261))
## 🌈 1.0.2 `2023-01-05` 
### 🚀 Features
- `AutoComplete`: @chaishi ([#2219](https://github.com/Tencent/tdesign-vue-next/pull/2219))
- Add清空function `clearable`
- Addautomaticallyfocusfunction `autofocus`
- Add `enter/blur/compositionend/compositionstart` etc.event，and相关parameter和documentationmaintain一致
- `Input`: Update API 之after，defaultwill给componentaddclass name `t-is-default` @chaishi ([#2219](https://github.com/Tencent/tdesign-vue-next/pull/2219))
### 🐞 Bug Fixes
- `DatePicker`:
- Fix the defaultvaluenotshow issue @Aicmortal ([#2229](https://github.com/Tencent/tdesign-vue-next/pull/2229))
- Fix the input box变化panelnot响should issue & monthswitcherror响shouldissue @honkinglin ([#2238](https://github.com/Tencent/tdesign-vue-next/pull/2238))
- `Input`:
- Fix `enter` event判断，Support code as `Enter` or `enter` @chaishi ([#2219](https://github.com/Tencent/tdesign-vue-next/pull/2219))
- 处理in `clear` eventinunable to获取to最新 `value` issue @chaishi ([#2231](https://github.com/Tencent/tdesign-vue-next/pull/2231))
- `AutoComplete`: Fix the `options` not存inwhen，component因missing判空error issue @chaishi ([#2219](https://github.com/Tencent/tdesign-vue-next/pull/2219))
- `Checkbox`: Fix `max` propertyinvalid @FliPPeDround ([#2233](https://github.com/Tencent/tdesign-vue-next/pull/2233))
### 🚧 Others
- `AutoComplete`: 补充complete test cases（35 个） @chaishi ([#2219](https://github.com/Tencent/tdesign-vue-next/pull/2219))
- `Link`: 补充complete test cases（25 个） @chaishi ([#2219](https://github.com/Tencent/tdesign-vue-next/pull/2219))
- `Link`: 去掉非必要 class name `t-size-m` @chaishi ([#2219](https://github.com/Tencent/tdesign-vue-next/pull/2219))
- `Button`: 去掉非必要 class name `t-size-m` @chaishi ([#2219](https://github.com/Tencent/tdesign-vue-next/pull/2219))
- `Divider`: 输出complete test cases @chaishi ([#2225](https://github.com/Tencent/tdesign-vue-next/pull/2225))
## 🌈 1.0.1 `2022-12-30` 
### 🚀 Features
- `Table`: Supportpass throughpaginationcomponent `Pagination` slot `totalContent` @chaishi ([#2208](https://github.com/Tencent/tdesign-vue-next/pull/2208))
### 🐞 Bug Fixes
- `Avatar`: Fixexceed最大configuration数量whenappearduplicate 省略icons @pengYYYYY ([#2203](https://github.com/Tencent/tdesign-vue-next/pull/2203))
- `DatePicker`: Fixyearselect器intervaldisplayerror @honkinglin ([#2204](https://github.com/Tencent/tdesign-vue-next/pull/2204))
- `Table`: Fix the 本地数据paginationfunctionin，`onPageChange` parameter `newData` valuenot正确 issue @chaishi ([#2208](https://github.com/Tencent/tdesign-vue-next/pull/2208))
- `Space`: Fix `size` parametermissing `Array` cause warning @pengYYYYY ([#2203](https://github.com/Tencent/tdesign-vue-next/pull/2203))
### 🚧 Others
- `Dialog`: 恢复插件type examplecode @pengYYYYY ([#2203](https://github.com/Tencent/tdesign-vue-next/pull/2203))
- `Link`: Fixafter置 `icon` examplecode @pengYYYYY ([#2203](https://github.com/Tencent/tdesign-vue-next/pull/2203))
## 🌈 1.0.0 `2022-12-22` 
### 🚀 Features
- `Table`: @chaishi ([#2183](https://github.com/Tencent/tdesign-vue-next/pull/2183))
- 列configurationSupport `stopPropagation: true`，for设置某一列单元格阻止event冒泡
- 虚拟scrollSupport行高dynamic变化
- `Menu`: styleOptimize @xiaosansiji ([#2172](https://github.com/Tencent/tdesign-vue-next/pull/2172))
- `TreeSelect`: `onVisibleChange` eventAddcallbackparameter @uyarn ([#2184](https://github.com/Tencent/tdesign-vue-next/pull/2184))
### 🐞 Bug Fixes
- `Table`: @chaishi ([#2183](https://github.com/Tencent/tdesign-vue-next/pull/2183))
- Fix the tablewidth过小when抖动 issue
- 固定表头background色alwaysmaintainas灰色底，无论contentwhether溢出
- `Dropdown`: Fix the issue of 多级menu长度too longwhen，unable toselect子menuandpositionabnormality @uyarn ([#2171](https://github.com/Tencent/tdesign-vue-next/pull/2171))
- `Slider`: Fix the `tooltip` property自definition `content` nottake effect issue @ChrisLee0211 ([#2181](https://github.com/Tencent/tdesign-vue-next/pull/2181))
- `DatePicker`: compatiblepass in空字符串 @honkinglin ([#2169](https://github.com/Tencent/tdesign-vue-next/pull/2169))

## 🌈 0.x `2021-05-19 - 2022-12-14`
before往 [GitHub](https://github.com/Tencent/tdesign-vue-next/blob/develop/packages/tdesign-vue-next/CHANGELOG-0.x.md) 查看 `0.x` Update日志



