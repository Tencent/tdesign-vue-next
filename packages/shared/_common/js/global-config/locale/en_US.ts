/* eslint-disable no-template-curly-in-string */
// 文件有效，为国际化做准备
import 'dayjs/locale/en';

export default {
  pagination: {
    itemsPerPage: '{size} / page',
    jumpTo: 'Jump to',
    page: '',
    total: '{total} items',
  },
  cascader: {
    empty: 'Empty Data',
    loadingText: 'loading...',
    placeholder: 'please select',
  },
  calendar: {
    yearSelection: '{year}',
    monthSelection: '{month}',
    yearRadio: 'year',
    monthRadio: 'month',
    hideWeekend: 'Hide Week',
    showWeekend: 'Show Week',
    today: 'Today',
    thisMonth: 'This Month',
    week: 'Monday,Tuesday,Wedsday,Thuresday,Friday,Staturday,Sunday',
    cellMonth:
      'January,February,March,April,May,June,July,August,September,October,November,December',
  },
  transfer: {
    title: '{checked} / {total}',
    empty: 'Empty Data',
    placeholder: 'enter keyworkd to search',
  },
  timePicker: {
    dayjsLocale: 'en',
    now: 'Now',
    confirm: 'Confirm',
    anteMeridiem: 'AM',
    postMeridiem: 'PM',
    placeholder: 'please select',
  },
  dialog: {
    confirm: 'Confirm',
    cancel: 'Cancel',
  },
  drawer: {
    confirm: 'Confirm',
    cancel: 'Cancel',
  },
  popconfirm: {
    confirm: {
      content: 'OK',
    },
    cancel: {
      content: 'Cancel',
    },
  },
  table: {
    empty: 'Empty Data',
    loadingText: 'loading...',
    loadingMoreText: 'loading more',
    filterInputPlaceholder: '',
    sortAscendingOperationText: 'click to sort ascending',
    sortCancelOperationText: 'click to cancel sorting',
    sortDescendingOperationText: 'click to sort descending',
    clearFilterResultButtonText: 'Clear',
    columnConfigButtonText: 'Column Config',
    columnConfigTitleText: 'Table Column Config',
    columnConfigDescriptionText:
      'Please select columns to show them in the table',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    resetText: 'Reset',
    selectAllText: 'Select All',
    searchResultText: 'Search "{result}". Find {count} items.',
  },
  select: {
    empty: 'Empty Data',
    loadingText: 'loading...',
    placeholder: 'please select',
  },
  tree: {
    empty: 'Empty Data',
  },
  treeSelect: {
    empty: 'Empty Data',
    loadingText: 'loading...',
    placeholder: 'please select',
  },
  datePicker: {
    dayjsLocale: 'en',
    placeholder: {
      date: 'select date',
      month: 'select month',
      year: 'select year',
      quarter: 'select quarter',
      week: 'select week',
    },
    weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    months: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    quarters: ['Q1', 'Q2', 'Q3', 'Q4'],
    rangeSeparator: ' - ',
    direction: 'ltr',
    format: 'YYYY-MM-DD',
    dayAriaLabel: 'D',
    yearAriaLabel: 'Y',
    monthAriaLabel: 'M',
    weekAbbreviation: 'W',
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
  upload: {
    sizeLimitMessage: 'File is too large to upload. {sizeLimit}',
    cancelUploadText: 'Cancel',
    triggerUploadText: {
      fileInput: 'Upload',
      image: 'Click to upload',
      normal: 'Upload',
      reupload: 'ReUpload',
      continueUpload: 'Continue Upload',
      delete: 'Delete',
      uploading: 'Uploading',
    },
    dragger: {
      dragDropText: 'Drop here',
      draggingText: 'Drag file to this area to upload',
      clickAndDragText: 'Click "Upload" or Drag file to this area to upload',
    },
    file: {
      fileNameText: 'filename',
      fileSizeText: 'size',
      fileStatusText: 'status',
      fileOperationText: 'operation',
      fileOperationDateText: 'date',
    },
    progress: {
      uploadingText: 'Uploading',
      waitingText: 'Waiting',
      failText: 'Failed',
      successText: 'Success',
    },
  },
  form: {
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
    placeholder: 'please enter',
  },
  list: {
    loadingText: 'loading...',
    loadingMoreText: 'loading more',
  },
  alert: {
    expandText: 'expand',
    collapseText: 'collapse',
  },
  anchor: {
    copySuccessText: 'copy the link successfully',
    copyText: 'copy link',
  },
  colorPicker: {
    swatchColorTitle: 'System Default',
    recentColorTitle: 'Recently Used',
    clearConfirmText: 'Clear recently used colors?',
  },
  guide: {
    finishButtonProps: {
      content: 'Finish',
      theme: 'primary',
    },
    nextButtonProps: {
      content: 'Next Step',
      theme: 'primary',
    },
    skipButtonProps: {
      content: 'Skip',
      theme: 'default',
    },
    prevButtonProps: {
      content: 'Last Step',
      theme: 'default',
    },
  },
  image: {
    errorText: 'unable to load',
    loadingText: 'loading',
  },
  imageViewer: {
    errorText: 'unable to load',
    mirrorTipText: 'mirror',
    rotateTipText: 'rotate',
    originalSizeTipText: 'original',
  },
  typography: {
    expand: 'more',
    collapse: 'collapse',
    copied: 'copied'
  }
} as const;
