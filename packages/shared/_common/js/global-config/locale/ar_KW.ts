/* eslint-disable no-template-curly-in-string */
// 文件有效，为国际化做准备
import 'dayjs/locale/ar';

export default {
  pagination: {
    itemsPerPage: '{size} / الصفحة',
    jumpTo: 'القفز إلى',
    page: '',
    total: '{total} عناصر',
  },
  cascader: {
    empty: 'لا تتوافر بيانات',
    loadingText: 'جار التحميل…',
    placeholder: 'الرجاء التحديد',
  },
  calendar: {
    yearSelection: '{year}',
    monthSelection: '{month}',
    yearRadio: 'عام',
    monthRadio: 'شهر',
    hideWeekend: 'إخفاء عطلة نهاية الأسبوع',
    showWeekend: 'عرض عطلة نهاية الأسبوع',
    today: 'اليوم',
    thisMonth: 'هذا الشهر',
    week: 'الاثنين الثلاثاء الاربعاء الخميس الجمعة السبت الاحد',
    cellMonth:
      'يناير ، فبراير ، مارس ، أبريل ، مايو ، يونيو ، يوليو ، أغسطس ، سبتمبر ، أكتوبر ، نوفمبر ، ديسمبر',
  },
  transfer: {
    title: '{checked} / {total}',
    empty: 'لا تتوافر بيانات',
    placeholder: 'أدخل الكلمة للبحث',
  },
  timePicker: {
    dayjsLocale: 'ar',
    now: 'الآن',
    confirm: 'نعم',
    anteMeridiem: 'صباحا',
    postMeridiem: 'مساءً',
    placeholder: 'الرجاء التحديد',
  },
  dialog: {
    confirm: 'نعم',
    cancel: 'يلغي',
  },
  drawer: {
    confirm: 'نعم',
    cancel: 'يلغي',
  },
  popconfirm: {
    confirm: { content: 'نعم' },
    cancel: { content: 'يلغي' },
  },
  table: {
    empty: 'لا تتوافر بيانات',
    loadingText: 'جار التحميل…',
    loadingMoreText: 'انقر لتحميل المزيد',
    filterInputPlaceholder:
      'الرجاء إدخال المحتوى (لا توجد قيمة افتراضية متاحة)',
    sortAscendingOperationText: 'انقر للفرز تصاعديًا',
    sortCancelOperationText: 'انقر لإلغاء الفرز',
    sortDescendingOperationText: 'انقر للفرز تنازليًا',
    clearFilterResultButtonText: 'صافي',
    columnConfigButtonText: 'تكوين العمود',
    columnConfigTitleText: 'تكوين عمود الجدول',
    columnConfigDescriptionText:
      'الرجاء تحديد أعمدة البيانات المراد عرضها في الجدول',
    confirmText: 'نعم',
    cancelText: 'يلغي',
    resetText: 'إعادة ضبط',
    selectAllText: 'اختر الكل',
    searchResultText: "تم العثور على بحث '{result}' و{count} من العناصر.",
  },

  select: {
    empty: 'لا تتوافر بيانات',
    loadingText: 'جار التحميل…',
    placeholder: 'الرجاء التحديد',
  },

  tree: { empty: 'لا تتوافر بيانات' },

  treeSelect: {
    empty: 'لا تتوافر بيانات',
    loadingText: 'جار التحميل…',
    placeholder: 'الرجاء التحديد',
  },

  datePicker: {
    dayjsLocale: 'ar',
    placeholder: {
      date: 'حدد تاريخ',
      month: 'اختر الشهر',
      year: 'اختر السنة',
      quarter: 'الرجاء تحديد الربع',
      week: 'الرجاء تحديد اسبوع',
    },
    weekdays: [
      'الإثنين',
      'الثلاثاء',
      'الأربعاء',
      'الخميس',
      'الجمعة',
      'السبت',
      'الأحد',
    ],
    months: [
      'يناير',
      'فبراير',
      'مارس',
      'أبريل',
      'مايو',
      'يونيو',
      'يوليو',
      'أغسطس',
      'سبتمبر',
      'أكتوبر',
      'نوفمبر',
      'ديسمبر',
    ],
    quarters: ['Q1', 'Q2', 'Q3', 'Q4'],
    rangeSeparator: ' - ',
    direction: 'ltr',
    format: 'YYYY-MM-DD',
    dayAriaLabel: 'D',
    yearAriaLabel: 'Y',
    monthAriaLabel: 'M',
    weekAbbreviation: 'W',
    confirm: 'نعم',
    selectTime: 'حدد الوقت',
    selectDate: 'حدد تاريخ',
    nextYear: 'العام القادم',
    preYear: 'العام الماضي',
    nextMonth: 'الشهر القادم',
    preMonth: 'الشهر الماضي',
    preDecade: 'العقد الماضي',
    nextDecade: 'العقد القادم',
    now: 'الآن',
  },

  upload: {
    sizeLimitMessage: 'لا يمكن أن يتجاوز حجم الملف {sizeLimit}',
    cancelUploadText: 'يلغي',
    triggerUploadText: {
      fileInput: 'حدد الملف',
      image: 'انقر لتحميل الصورة',
      normal: 'تحميل',
      reupload: 'أعد تحميل',
      continueUpload: 'تحميل المزيد',
      delete: 'حذف',
      uploading: 'تحميل',
    },

    dragger: {
      dragDropText: 'أسقطها هنا',
      draggingText: 'اسحب الملف هنا',
      clickAndDragText: 'اختر ملفًا أو اسحبه هنا.',
    },

    file: {
      fileNameText: 'اسم الملف',
      fileSizeText: 'حجم',
      fileStatusText: 'حالة',
      fileOperationText: 'عملية',
      fileOperationDateText: 'تاريخ',
    },
    progress: {
      uploadingText: 'تحميل',
      waitingText: 'جار التحميل',
      failText: 'التحميل فشل',
      successText: 'تم التحميل بنجاح.',
    },
  },

  form: {
    errorMessage: {
      date: 'الرجاء إدخال ${name} الصحيح',
      url: 'الرجاء إدخال ${name} الصحيح',
      required: 'مطلوب ${name}',
      max: 'يمكن أن يحتوي ${name} على ما يصل إلى ${validate} حرفًا',
      min: 'لا يمكن أن يكون ${name} أقل من ${validate} حرفًا',
      len: 'يجب أن يتكون ${name} من أحرف ${validate} بالضبط',
      enum: '${name} يجب أن يكون واحدًا من ${validate} ',
      idcard: 'الرجاء إدخال ${name} الصحيح',
      telnumber: 'الرجاء إدخال ${name} الصحيح',
      pattern: 'الرجاء إدخال ${name} الصحيح',
      validator: '${name} غير صالح',
      boolean: '${name} ليس منطقيًا',
      number: 'يجب أن يكون ${name} رقمًا',
    },
  },

  input: { placeholder: 'الرجاء إدخال' },

  list: {
    loadingText: 'جار التحميل…',
    loadingMoreText: 'انقر لتحميل المزيد',
  },

  alert: {
    expandText: 'تزسيع',
    collapseText: 'انهيار',
  },

  anchor: {
    copySuccessText: 'تم نسخ الرابط',
    copyText: 'انسخ الرابط',
  },

  colorPicker: {
    swatchColorTitle: 'الألوان الافتراضية',
    recentColorTitle: 'مستخدم حديثا',
    clearConfirmText: 'هل تريد مسح الألوان المستخدمة مؤخرًا؟',
  },
  image: {
    errorText: 'غير قادر على التحميل',
    loadingText: 'جار التحميل',
  },
  imageViewer: {
    errorText: 'غير قادر على التحميل',
    mirrorTipText: 'مرآة',
    rotateTipText: 'استدارة',
    originalSizeTipText: 'أصلي',
  },
  typography: {
    expand: 'توسيع',
    collpase: 'طي',
    copied: 'النسخ اكتمل'
  }
} as const;
