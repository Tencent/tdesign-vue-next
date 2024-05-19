/* eslint-disable no-template-curly-in-string */
// 文件有效，为国际化做准备
import 'dayjs/locale/zh-cn';

export default {
  pagination: {
    itemsPerPage: '{size} 条/页',
    jumpTo: '跳至',
    page: '页',
    total: '共 {total} 条数据',
  },
  cascader: {
    empty: '暂无数据',
    loadingText: '加载中',
    placeholder: '请选择',
  },
  calendar: {
    yearSelection: '{year} 年',
    monthSelection: '{month} 月',
    yearRadio: '年',
    monthRadio: '月',
    hideWeekend: '隐藏周末',
    showWeekend: '显示周末',
    today: '今天',
    thisMonth: '本月',
    week: '一,二,三,四,五,六,日',
    cellMonth: '1 月,2 月,3 月,4 月,5 月,6 月,7 月,8 月,9 月,10 月,11 月,12 月',
  },
  transfer: {
    title: '{checked} / {total} 项',
    empty: '暂无数据',
    placeholder: '请输入关键词搜索',
  },
  timePicker: {
    dayjsLocale: 'zh-cn',
    now: '此刻',
    confirm: '确定',
    anteMeridiem: '上午',
    postMeridiem: '下午',
    placeholder: '选择时间',
  },
  dialog: {
    confirm: '确认',
    cancel: '取消',
  },
  drawer: {
    confirm: '确认',
    cancel: '取消',
  },
  popconfirm: {
    confirm: {
      content: '确定',
    },
    cancel: {
      content: '取消',
    },
  },
  table: {
    empty: '暂无数据',
    loadingText: '正在加载中，请稍后',
    loadingMoreText: '点击加载更多',
    filterInputPlaceholder: '请输入内容（无默认值）',
    sortAscendingOperationText: '点击升序',
    sortCancelOperationText: '点击取消排序',
    sortDescendingOperationText: '点击降序',
    clearFilterResultButtonText: '清空筛选',
    columnConfigButtonText: '列配置',
    columnConfigTitleText: '表格列配置',
    columnConfigDescriptionText: '请选择需要在表格中显示的数据列',
    confirmText: '确认',
    cancelText: '取消',
    resetText: '重置',
    selectAllText: '全选',
    searchResultText: '搜索“{result}”，找到 {count} 条结果',
  },
  select: {
    empty: '暂无数据',
    loadingText: '加载中',
    placeholder: '请选择',
  },
  tree: {
    empty: '暂无数据',
  },
  treeSelect: {
    empty: '暂无数据',
    loadingText: '加载中',
    placeholder: '请选择',
  },
  datePicker: {
    dayjsLocale: 'zh-cn',
    placeholder: {
      date: '请选择日期',
      month: '请选择月份',
      year: '请选择年份',
      quarter: '请选择季度',
      week: '请选择周',
    },
    weekdays: ['一', '二', '三', '四', '五', '六', '日'],
    months: [
      '1 月',
      '2 月',
      '3 月',
      '4 月',
      '5 月',
      '6 月',
      '7 月',
      '8 月',
      '9 月',
      '10 月',
      '11 月',
      '12 月',
    ],
    quarters: ['一季度', '二季度', '三季度', '四季度'],
    rangeSeparator: ' - ',
    direction: 'ltr',
    format: 'YYYY-MM-DD',
    dayAriaLabel: '日',
    weekAbbreviation: '周',
    yearAriaLabel: '年',
    monthAriaLabel: '月',
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
  upload: {
    sizeLimitMessage: '文件大小不能超过 {sizeLimit}',
    cancelUploadText: '取消上传',
    triggerUploadText: {
      fileInput: '选择文件',
      image: '点击上传图片',
      normal: '点击上传',
      // 选择文件和上传文件是 2 个步骤，文本需明确步骤
      reupload: '重新选择',
      continueUpload: '继续选择',
      delete: '删除',
      uploading: '上传中',
    },
    dragger: {
      dragDropText: '释放鼠标',
      draggingText: '拖拽到此区域',
      clickAndDragText: '点击上方“选择文件”或将文件拖拽到此区域',
    },
    file: {
      fileNameText: '文件名',
      fileSizeText: '文件大小',
      fileStatusText: '状态',
      fileOperationText: '操作',
      fileOperationDateText: '上传日期',
    },
    progress: {
      uploadingText: '上传中',
      waitingText: '待上传',
      failText: '上传失败',
      successText: '上传成功',
    },
  },
  form: {
    errorMessage: {
      date: '请输入正确的${name}',
      url: '请输入正确的${name}',
      required: '${name}必填',
      max: '${name}字符长度不能超过 ${validate} 个字符，一个中文等于两个字符',
      min: '${name}字符长度不能少于 ${validate} 个字符，一个中文等于两个字符',
      len: '${name}字符长度必须是 ${validate}',
      enum: '${name}只能是${validate}等',
      idcard: '请输入正确的${name}',
      telnumber: '请输入正确的${name}',
      pattern: '请输入正确的${name}',
      validator: '${name}不符合要求',
      boolean: '${name}数据类型必须是布尔类型',
      number: '${name}必须是数字',
    },
  },
  input: {
    placeholder: '请输入',
  },
  list: {
    loadingText: '正在加载中，请稍等',
    loadingMoreText: '点击加载更多',
  },
  alert: {
    expandText: '展开更多',
    collapseText: '收起',
  },
  anchor: {
    copySuccessText: '链接复制成功',
    copyText: '复制链接',
  },
  colorPicker: {
    swatchColorTitle: '系统预设颜色',
    recentColorTitle: '最近使用颜色',
    clearConfirmText: '确定清空最近使用的颜色吗？',
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
      content: '跳过',
      theme: 'default',
    },
    prevButtonProps: {
      content: '上一步',
      theme: 'default',
    },
  },
  image: {
    errorText: '图片无法显示',
    loadingText: '图片加载中',
  },
  imageViewer: {
    errorText: '图片加载失败，可尝试重新加载',
    mirrorTipText: '镜像',
    rotateTipText: '旋转',
    originalSizeTipText: '原始大小',
  },
  typography: {
    expand: '展开',
    collapse: '收起',
    copied: '复制成功'
  }
} as const;
