// 文件有效，为国际化做准备
import 'dayjs/locale/en';

export default {
  actionSheet: {
    cancel: 'Cancel',
  },
  calendar: {
    confirm: 'Confirm',
    title: 'Select Date',
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    monthTitle: '{month} {year}',
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  },
  cascader: {
    title: 'Title',
    placeholder: 'Select options',
  },
  dropdownMenu: {
    reset: 'Reset',
    confirm: 'Confirm',
  },
  dateTimePicker: {
    title: 'Select Date',
    cancel: 'Cancel',
    confirm: 'Confirm',
    format: 'YYYY-MM-DD',
    yearLabel: 'Year',
    monthLabel: 'Month',
    dateLabel: 'Date',
    hourLabel: 'Hour',
    minuteLabel: 'Minute',
    secondLabel: 'Second',
  },
  picker: {
    cancel: 'Cancel',
    confirm: 'Confirm',
  },
  pullDownRefresh: {
    loadingTexts: ['Pull to refresh', 'Loose to refresh', 'Refreshing ', 'Refresh completed'],
  },
  rate: {
    valueText: '{value} score',
    noValueText: 'No score',
  },
  tabBar: {
    newsAriaLabel: 'There is new news',
    moreNewsAriaLabel: 'There is a lot of news',
    haveMoreNewsAriaLabel: 'There are {value}+ news',
    haveNewsAriaLabel: 'There are {value} news',
  },
  table: {
    empty: 'Empty Data',
  },
  list: {
    loading: 'Loading...',
    loadingMoreText: 'Click to load more',
    pulling: 'Pull to refresh...',
    loosing: 'Loose to refresh...',
    success: 'Refresh successful',
  },
  upload: {
    progress: {
      uploadingText: 'Uploading...',
      waitingText: 'Waiting',
      failText: 'Failed',
      successText: 'Success',
    },
  },
  guide: {
    next: 'Next',
    skip: 'Skip',
    finish: 'Finish',
    back: 'Back',
  },
};
