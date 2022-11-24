/**
 * Global Components for Volar
 * https://github.com/johnsoncodehk/volar/issues/418
 * https://github.com/johnsoncodehk/volar/discussions/848
 * put global.d.ts to your project root dir
 */
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    TButton: typeof import('tdesign-vue-next')['Button'];
    TIcon: typeof import('tdesign-vue-next')['Icon'];
    TLink: typeof import('tdesign-vue-next')['Link'];
    TCol: typeof import('tdesign-vue-next')['Col'];
    TRow: typeof import('tdesign-vue-next')['Row'];
    TLayout: typeof import('tdesign-vue-next')['Layout'];
    TDivider: typeof import('tdesign-vue-next')['Divider'];
    TSpace: typeof import('tdesign-vue-next')['Space'];
    TAffix: typeof import('tdesign-vue-next')['Affix'];
    TAnchor: typeof import('tdesign-vue-next')['Anchor'];
    TAnchorItem: typeof import('tdesign-vue-next')['AnchorItem'];
    TAnchorTarget: typeof import('tdesign-vue-next')['AnchorTarget'];
    TBreadcrumb: typeof import('tdesign-vue-next')['Breadcrumb'];
    TBreadcrumbItem: typeof import('tdesign-vue-next')['BreadcrumbItem'];
    TDropdown: typeof import('tdesign-vue-next')['Dropdown'];
    TJumper: typeof import('tdesign-vue-next')['Jumper'];
    TMenu: typeof import('tdesign-vue-next')['Menu'];
    TPagination: typeof import('tdesign-vue-next')['Pagination'];
    TSteps: typeof import('tdesign-vue-next')['Steps'];
    TTabs: typeof import('tdesign-vue-next')['Tabs'];
    TAutoComplete: typeof import('tdesign-vue-next')['AutoComplete'];
    TCascader: typeof import('tdesign-vue-next')['Cascader'];
    TCheckbox: typeof import('tdesign-vue-next')['Checkbox'];
    TCheckboxGroup: typeof import('tdesign-vue-next')['CheckboxGroup'];
    TDatePicker: typeof import('tdesign-vue-next')['DatePicker'];
    TDatePickerPanel: typeof import('tdesign-vue-next')['DatePickerPanel'];
    TDateRangePicker: typeof import('tdesign-vue-next')['DateRangePicker'];
    TDateRangePickerPanel: typeof import('tdesign-vue-next')['DateRangePickerPanel'];
    TForm: typeof import('tdesign-vue-next')['Form'];
    TInputAdornment: typeof import('tdesign-vue-next')['InputAdornment'];
    TInput: typeof import('tdesign-vue-next')['Input'];
    TInputNumber: typeof import('tdesign-vue-next')['InputNumber'];
    TRadio: typeof import('tdesign-vue-next')['Radio'];
    TRadioGroup: typeof import('tdesign-vue-next')['RadioGroup'];
    TSelect: typeof import('tdesign-vue-next')['Select'];
    TOption: typeof import('tdesign-vue-next')['Option'];
    TSlider: typeof import('tdesign-vue-next')['Slider'];
    TSwitch: typeof import('tdesign-vue-next')['Switch'];
    TTagInput: typeof import('tdesign-vue-next')['TagInput'];
    TSelectInput: typeof import('tdesign-vue-next')['SelectInput'];
    TTextarea: typeof import('tdesign-vue-next')['Textarea'];
    TTransfer: typeof import('tdesign-vue-next')['Transfer'];
    TTimePicker: typeof import('tdesign-vue-next')['TimePicker'];
    TTimeRangePicker: typeof import('tdesign-vue-next')['TimeRangePicker'];
    TTimePickerPanel: typeof import('tdesign-vue-next')['TimePickerPanel'];
    TTreeSelect: typeof import('tdesign-vue-next')['TreeSelect'];
    TColorPicker: typeof import('tdesign-vue-next')['ColorPicker'];
    TColorPickerPanel: typeof import('tdesign-vue-next')['ColorPickerPanel'];
    TRangeInput: typeof import('tdesign-vue-next')['RangeInput'];
    TAvatar: typeof import('tdesign-vue-next')['Avatar'];
    TBadge: typeof import('tdesign-vue-next')['Badge'];
    TCalendar: typeof import('tdesign-vue-next')['Calendar'];
    TCard: typeof import('tdesign-vue-next')['Card'];
    TComment: typeof import('tdesign-vue-next')['Comment'];
    TImage: typeof import('tdesign-vue-next')['Image'];
    TImageViewer: typeof import('tdesign-vue-next')['ImageViewer'];
    TList: typeof import('tdesign-vue-next')['List'];
    TListItem: typeof import('tdesign-vue-next')['ListItem'];
    TProgress: typeof import('tdesign-vue-next')['Progress'];
    TSkeleton: typeof import('tdesign-vue-next')['Skeleton'];
    TSwiper: typeof import('tdesign-vue-next')['Swiper'];
    TSwiperItem: typeof import('tdesign-vue-next')['SwiperItem'];
    TTable: typeof import('tdesign-vue-next')['Table'];
    TBaseTable: typeof import('tdesign-vue-next')['BaseTable'];
    TPrimaryTable: typeof import('tdesign-vue-next')['PrimaryTable'];
    TEnhancedTable: typeof import('tdesign-vue-next')['EnhancedTable'];
    TTag: typeof import('tdesign-vue-next')['Tag'];
    TTimeline: typeof import('tdesign-vue-next')['Timeline'];
    TTooltip: typeof import('tdesign-vue-next')['Tooltip'];
    TTree: typeof import('tdesign-vue-next')['Tree'];
    TCollapse: typeof import('tdesign-vue-next')['Collapse'];
    TCollapsePanel: typeof import('tdesign-vue-next')['CollapsePanel'];
    TWatermark: typeof import('tdesign-vue-next')['Watermark'];
    TRate: typeof import('tdesign-vue-next')['Rate'];
    TAlert: typeof import('tdesign-vue-next')['Alert'];
    TDialog: typeof import('tdesign-vue-next')['Dialog'];
    TDrawer: typeof import('tdesign-vue-next')['Drawer'];
    TGuide: typeof import('tdesign-vue-next')['Guide'];
    TLoading: typeof import('tdesign-vue-next')['Loading'];
    TMessage: typeof import('tdesign-vue-next')['Message'];
    TNotification: typeof import('tdesign-vue-next')['Notification'];
    TPopconfirm: typeof import('tdesign-vue-next')['Popconfirm'];
    TPopup: typeof import('tdesign-vue-next')['Popup'];
    TUpload: typeof import('tdesign-vue-next')['Upload'];
    TConfigProvider: typeof import('tdesign-vue-next')['ConfigProvider'];
  }
}

export {};
