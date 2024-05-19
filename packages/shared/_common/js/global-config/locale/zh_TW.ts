/* eslint-disable no-template-curly-in-string */
// 文件有效，为国际化做准备
import 'dayjs/locale/zh-tw';

export default {
  pagination: {
    itemsPerPage: '{size} 項/頁',
    jumpTo: '跳至',
    page: '頁',
    total: '共 {total} 項數據',
  },
  cascader: {
    empty: '暫無數據',
    loadingText: '載入中',
    placeholder: '請選擇',
  },
  calendar: {
    yearSelection: '{year} 年',
    monthSelection: '{month} 月',
    yearRadio: '年',
    monthRadio: '月',
    hideWeekend: '隱藏週末',
    showWeekend: '顯示週末',
    today: '今天',
    thisMonth: '本月',
    week: '一,二,三,四,五,六,日',
    cellMonth: '1 月,2 月,3 月,4 月,5 月,6 月,7 月,8 月,9 月,10 月,11 月,12 月',
  },
  transfer: {
    title: '{checked} / {total} 項',
    empty: '暫無數據',
    placeholder: '請輸入關鍵詞搜尋',
  },
  timePicker: {
    dayjsLocale: 'zh-tw',
    now: '此刻',
    confirm: '確認',
    anteMeridiem: '上午',
    postMeridiem: '下午',
    placeholder: '選擇時間',
  },
  dialog: {
    confirm: '確認',
    cancel: '取消',
  },
  drawer: {
    confirm: '確認',
    cancel: '取消',
  },
  popconfirm: {
    confirm: {
      content: '確認',
    },
    cancel: {
      content: '取消',
    },
  },
  table: {
    empty: '暫無數據',
    loadingText: '正在載入中，請稍後',
    loadingMoreText: '點擊載入更多',
    filterInputPlaceholder: '請輸入内容（無默認值）',
    sortAscendingOperationText: '點擊升序',
    sortCancelOperationText: '點擊取消排序',
    sortDescendingOperationText: '點擊降序',
    clearFilterResultButtonText: '清空篩選',
    columnConfigButtonText: '行配置',
    columnConfigTitleText: '表格行配置',
    columnConfigDescriptionText: '請選擇需要在表格中顯示的數據行',
    confirmText: '確認',
    cancelText: '取消',
    resetText: '重置',
    selectAllText: '全選',
    searchResultText: '搜尋"{result}"，找到{count}項結果',
  },
  select: {
    empty: '暫無數據',
    loadingText: '載入中',
    placeholder: '請選擇',
  },
  tree: {
    empty: '暫無數據',
  },
  treeSelect: {
    empty: '暫無數據',
    loadingText: '載入中',
    placeholder: '請選擇',
  },
  datePicker: {
    dayjsLocale: 'zh-tw',
    placeholder: {
      date: '請選擇日期',
      month: '請選擇月份',
      year: '請選擇年份',
      quarter: '請選擇季度',
      week: '請選擇周',
    },
    weekdays: ['一', '二', '三', '四', '五', '六', '日'],
    months: [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ],
    quarters: ['一季度', '二季度', '三季度', '四季度'],
    rangeSeparator: ' - ',
    direction: 'ltr',
    format: 'YYYY-MM-DD',
    dayAriaLabel: '日',
    weekAbbreviation: '週',
    yearAriaLabel: '年',
    monthAriaLabel: '月',
    comfirm: '確認',
    selectTime: '選擇時間',
    selectDate: '選擇日期',
    nextYear: '下一年',
    preYear: '上一年',
    nextMonth: '下個月',
    preMonth: '上個月',
    preDecade: '上十年',
    nextDecade: '下十年',
    now: '當前',
  },
  upload: {
    sizeLimitMessage: '文件大小不能超過 {sizeLimit}',
    cancelUploadText: '取消上傳',
    triggerUploadText: {
      fileInput: '選擇文件',
      image: '點擊上傳圖片',
      normal: '點擊上傳',
      // 選擇文件和上傳文件是 2 個步驟，文本需明確步驟
      reupload: '重新選擇',
      continueUpload: '繼續選擇',
      delete: '刪除',
      uploading: '上傳中',
    },
    dragger: {
      dragDropText: '釋放鼠標',
      draggingText: '拖拽到此區域',
      clickAndDragText: '點擊上方“選擇文件”或將文件拖拽到此區域',
    },
    file: {
      fileNameText: '文件名',
      fileSizeText: '文件大小',
      fileStatusText: '狀態',
      fileOperationText: '操作',
      fileOperationDateText: '上傳日期',
    },
    progress: {
      uploadingText: '正在上傳',
      waitingText: '等待上傳',
      failText: '上傳失敗',
      successText: '上傳成功',
    },
  },
  form: {
    errorMessage: {
      date: '請輸入正確的${name}',
      url: '請輸入正確的${name}',
      required: '${name}必填',
      max: '${name}字符長度不能超過 ${validate} 個字符，一個中文等於兩個字符',
      min: '${name}字符長度不能少於 ${validate} 個字符，一個中文等於兩個字符',
      len: '${name}字符長度必須是 ${validate}',
      enum: '${name}只能是${validate}等',
      idcard: '請輸入正確的${name}',
      telnumber: '請輸入正確的${name}',
      pattern: '請輸入正確的${name}',
      validator: '${name}不符合要求',
      boolean: '${name}數據類型必須是布林類型',
      number: '${name}必須是數字',
    },
  },
  input: {
    placeholder: '請輸入',
  },
  list: {
    loadingText: '正在載入中，請稍後',
    loadingMoreText: '點擊載入更多',
  },
  alert: {
    expandText: '展開更多',
    collapseText: '收起',
  },
  anchor: {
    copySuccessText: '連結複製成功',
    copyText: '複製連結',
  },
  colorPicker: {
    swatchColorTitle: '系統預設顔色',
    recentColorTitle: '最近使用的顔色',
    clearConfirmText: '確定清空最近使用的顔色嗎？',
  },
  guide: {
    finishButtonProps: {
      content: '完成',
      theme: 'primary',
    },
    nextButtonProps: {
      content: '下一步',
      theme: 'primary',
    },
    skipButtonProps: {
      content: '跳過',
      theme: 'default',
    },
    prevButtonProps: {
      content: '上一步',
      theme: 'default',
    },
  },
  image: {
    errorText: '圖片無法顯示',
    loadingText: '圖片載入中',
  },
  imageViewer: {
    errorText: '圖片載入失敗，可嘗試重新載入',
    mirrorTipText: '鏡像',
    rotateTipText: '旋轉',
    originalSizeTipText: '原始大小',
  },
  typography: {
    expand: '展開',
    collapse: '收起',
    copied: '復製成功'
  }
} as const;
