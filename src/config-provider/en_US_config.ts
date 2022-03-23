/* eslint-disable no-template-curly-in-string */
import { GlobalConfigProvider } from './type';

// 文件有效，为国际化做准备
const GLOBAL_CONFIG_EN: GlobalConfigProvider = {
  pagination: {
    itemsPerPage: '{size} / page',
    jumpTo: 'jump to',
    page: '',
    total: '{total} items',
  },
  cascader: {
    empty: 'Empty Data',
    loadingText: 'loading...',
    placeholder: '',
  },
  calendar: {
    firstDayOfWeek: 7,
    fillWithZero: true,
    yearSelection: '{year}',
    monthSelection: '{month}',
    yearRadio: 'year',
    monthRadio: 'month',
    hideWeekend: 'Hide Week',
    showWeekend: 'Show Week',
    today: 'Today',
    thisMonth: 'This Month',
    week: 'Monday,Tuesday,Wedsday,Thuresday,Friday,Staturday,Sunday',
    cellMonth: 'January,February,March,April,May,June,July,August,September,October,November,December',
  },
  transfer: {
    title: '{checked} / {total}',
    empty: 'Empty Data',
    placeholder: 'type keyworkd to search',
  },
  timePicker: {
    now: 'Now',
    confirm: 'Confirm',
    anteMeridiem: 'AM',
    postMeridiem: 'PM',
    placeholder: '',
  },
  dialog: {
    confirm: 'Confirm',
    cancel: 'Cancel',
    confirmBtnTheme: {
      default: 'primary',
      info: 'primary',
      warning: 'primary',
      danger: 'primary',
      success: 'primary',
    },
  },
  drawer: {
    confirm: 'Confirm',
    cancel: 'Cancel',
  },
  popconfirm: {
    confirm: 'OK',
    cancel: 'Cancel',
    confirmBtnTheme: {
      default: 'primary',
      warning: 'primary',
      danger: 'primary',
    },
  },
  table: {
    empty: 'Empty Data',
    // 展开和收起图标（使用收起图标）
    expandIcon: undefined,
    // 排序图标（使用降序图标）
    sortIcon: undefined,
    loadingMoreText: 'Load More',
    loadingText: 'Loading',
    sortAscendingOperationText: 'ascending sort',
    sortCancelOperationText: 'cancel sort',
    sortDescendingOperationText: 'decending sort',
  },
  select: {
    empty: 'Empty Data',
    loadingText: 'loading...',
    placeholder: '',
    // 清除按钮
    clearIcon: undefined,
  },
  tree: {
    empty: 'Empty Data',
    // 目录层级图标
    folderIcon: undefined,
  },
  treeSelect: {
    empty: 'Empty Data',
    loadingText: 'loading...',
  },
  datePicker: {
    placeholder: {
      date: 'select date',
      month: 'select month',
      year: 'select year',
    },
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    firstDayOfWeek: 7,
    rangeSeparator: ' ~ ',
    format: 'DD/MM/YYYY',
    yearAriaLabel: '',
    confirm: 'Confirm',
    selectTime: 'Select Time',
    selectDate: 'Select Date',
    nextYear: 'Next Year',
    preYear: 'Last Year',
    nextMonth: 'Next Month',
    preMonth: 'Last Month',
    preDecade: 'Last Decade',
    nextDecade: 'Next Decade',
    now: 'Now',
  },
  steps: {
    errorIcon: undefined,
  },
  upload: {
    sizeLimitMessage: 'File is too large to upload. {sizeLimit}',
    cancelUploadText: 'Cancel',
  },
  tag: {
    closeIcon: undefined,
  },
  form: {
    requiredMark: true,
    errorMessage: {
      date: '${name} is invalid',
      url: '${name} is invalid',
      required: '${name} is required',
      max: '${name} must be at least ${validate} characters',
      min: '${name} cannot be longer than ${validate} characters',
      len: '${name} must be exactly ${validate} characters',
      enum: '${name} must be one of ${validate}',
      idcard: '${name} is invalid',
      telnumber: '${name} is invalid',
      pattern: '${name} is invalid',
      validator: '${name} is invalid',
      boolean: '${name} is not a boolean',
      number: '${name} must be a number',
    },
  },
  input: {
    placeholder: '',
  },
  colorPicker: {
    swatchColorTitle: 'System Default',
    recentColorTitle: 'Recently Used',
    clearConfirmText: 'Clear recently used colors?',
  },
};

export default GLOBAL_CONFIG_EN;
