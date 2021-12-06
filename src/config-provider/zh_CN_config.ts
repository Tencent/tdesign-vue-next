import { GlobalConfigProvider } from './type';

const GLOBAL_CONFIG_ZH: GlobalConfigProvider = {
  pagination: {
    itemsPerPage: '{size} 条/页',
    jumpTo: '跳至',
    page: '页',
    total: '共 {total} 项数据',
  },
  cascader: {
    empty: '暂无数据',
    loadingText: '加载中',
    placeholder: '请选择',
  },
  calendar: {
    firstDayOfWeek: 1,
    fillWithZero: true,
    yearSelection: '{year} 年',
    monthSelection: '{month} 月',
    yearRadio: '年',
    monthRadio: '月',
    hideWeekend: '隐藏周末',
    showWeekend: '显示周末',
    today: '今天',
    thisMonth: '本月',
    week: '一,二,三,四,五,六,日',
    cellMonth: '一月,二月,三月,四月,五月,六月,七月,八月,九月,十月,十一月,十二月',
  },
  transfer: {
    title: '{checked} / {total} 项',
    empty: '暂无数据',
    placeholder: '请输入关键词搜索',
  },
  timePicker: {
    now: '此刻',
    confirm: '确定',
    anteMeridiem: '上午',
    postMeridiem: '下午',
    placeholder: '请选择时间',
  },
  dialog: {
    confirm: '确认',
    cancel: '取消',
    confirmBtnTheme: {
      default: 'primary',
      info: 'primary',
      warning: 'primary',
      danger: 'primary',
      success: 'primary',
    },
  },
  drawer: {
    confirm: '确认',
    cancel: '取消',
  },
  popconfirm: {
    confirm: {
      content: '确定',
      size: 'small',
    },
    cancel: {
      content: '取消',
      size: 'small',
    },
    confirmBtnTheme: {
      default: 'primary',
      warning: 'primary',
      danger: 'primary',
    },
  },
  table: {
    empty: '暂无数据',
    // 展开和收起图标（使用收起图标）
    expandIcon: undefined,
    // 排序图标（使用降序图标）
    sortIcon: undefined,
  },
  select: {
    empty: '暂无数据',
    loadingText: '加载中',
    placeholder: '请选择',
    // 清除按钮
    clearIcon: undefined,
  },
  tree: {
    empty: '暂无数据',
    // 目录层级图标
    folderIcon: undefined,
  },
  treeSelect: {
    empty: '暂无数据',
    loadingText: '加载中',
  },
  datePicker: {
    placeholder: {
      date: '请选择日期',
      month: '请选择月份',
      year: '请选择年份',
    },
    weekdays: ['一', '二', '三', '四', '五', '六', '日'],
    months: ['1 月', '2 月', '3 月', '4 月', '5 月', '6 月', '7 月', '8 月', '9 月', '10 月', '11 月', '12 月'],
    firstDayOfWeek: 1,
    rangeSeparator: ' 至 ',
    format: 'YYYY-MM-DD',
    yearAriaLabel: '年',
    confirm: '确定',
    selectTime: '选择时间',
    selectDate: '选择日期',
    nextYear: '下一年',
    preYear: '上一年',
    nextMonth: '下个月',
    preMonth: '上个月',
    preDecade: '上个十年',
    nextDecade: '下个十年',
    now: '当前',
  },
  steps: {
    errorIcon: undefined,
  },
  upload: {
    sizeLimitMessage: '文件大小不能超过 {sizeLimit}',
    cancelUploadText: '取消上传',
  },
  tag: {
    closeIcon: undefined,
  },
  form: {
    requiredMark: true,
  },
};

export default GLOBAL_CONFIG_ZH;
