export type AnimationType = 'ripple' | 'expand' | 'fade';

export default {
  classPrefix: 't',
  animation: {
    include: ['ripple', 'expand', 'fade'],
    exclude: []
  } as Record<'include'|'exclude', Array<AnimationType>>,
  calendar: {
    firstDayOfWeek: 1,
    fillWithZero: true,
    controllerConfig: undefined,
  },
  icon: {},
  input: {
    autocomplete: '',
  },
  dialog: {
    closeOnEscKeydown: true,
    closeOnOverlayClick: true,
    confirmBtnTheme: {
      default: 'primary',
      info: 'primary',
      warning: 'primary',
      danger: 'primary',
      success: 'primary',
    },
  },
  message: {},
  popconfirm: {
    confirmBtnTheme: {
      default: 'primary',
      warning: 'primary',
      danger: 'primary',
    },
  },
  table: {
    // 展开和收起图标（使用收起图标）
    expandIcon: undefined,
    // 排序图标（使用降序图标）
    sortIcon: undefined,
    // 过滤图标
    filterIcon: undefined,
    // 树形结构展开图标
    treeExpandAndFoldIcon: undefined,
    // 是否隐藏排序图标的文本提示
    hideSortTips: false,
    // 全局表格尺寸配置
    size: 'medium',
  },
  select: {
    // 清除按钮
    clearIcon: undefined,
    filterable: false,
  },
  drawer: {
    closeOnEscKeydown: true,
    closeOnOverlayClick: true,
    size: 'small',
  },
  tree: {
    // 目录层级图标
    folderIcon: undefined,
  },
  datePicker: {
    firstDayOfWeek: 1,
  },
  steps: {
    checkIcon: undefined,
    errorIcon: undefined,
  },
  tag: {
    closeIcon: undefined,
  },
  form: {
    requiredMark: undefined,
  },
} as const;
