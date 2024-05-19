// 文件有效，为国际化做准备
import 'dayjs/locale/zh-tw';

export default {
  actionSheet: {
    cancel: '取消',
  },
  calendar: {
    title: '請選擇日期',
    confirm: '確認',
    weekdays: ['日', '一', '二', '三', '四', '五', '六'],
    monthTitle: '{year} 年 {month}',
    months: ['1 月', '2 月', '3 月', '4 月', '5 月', '6 月', '7 月', '8 月', '9 月', '10 月', '11 月', '12 月'],
  },
  cascader: {
    title: '標題',
    placeholder: '選擇選項',
  },
  dropdownMenu: {
    reset: '重置',
    confirm: '確定',
  },
  dateTimePicker: {
    title: '選擇時間',
    cancel: '取消',
    confirm: '確定',
    format: 'YYYY-MM-DD',
    yearLabel: '年',
    monthLabel: '月',
    dateLabel: '日',
    hourLabel: '時',
    minuteLabel: '分',
    secondLabel: '秒',
  },
  picker: {
    cancel: '取消',
    confirm: '確認',
  },
  pullDownRefresh: {
    loadingTexts: ['下拉刷新', '鬆手刷新', '正在刷新', '刷新完成'],
  },
  rate: {
    valueText: '{value} 分',
    noValueText: '未評分',
  },
  tabBar: {
    newsAriaLabel: '有新消息',
    moreNewsAriaLabel: '有很多消息',
    haveMoreNewsAriaLabel: '有 {value}+ 條消息',
    haveNewsAriaLabel: '有 {value} 條消息',
  },
  table: {
    empty: '暫無數據',
  },
  list: {
    loading: '加載中...',
    loadingMoreText: '點擊加載更多',
    pulling: '下拉即可刷新...',
    loosing: '釋放即可刷新...',
    success: '刷新成功',
  },
  upload: {
    progress: {
      uploadingText: '上傳中...',
      waitingText: '待上傳',
      failText: '上傳失敗',
      successText: '上傳成功',
    },
  },
  guide: {
    next: '下一步',
    skip: '跳過',
    finish: '完成',
    back: '返回',
  },
};
