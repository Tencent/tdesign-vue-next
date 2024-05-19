// 文件有效，为国际化做准备
import 'dayjs/locale/ar';

export default {
  actionSheet: {
    cancel: 'الإلغاء',
  },
  calendar: {
    confirm: 'أكد',
    title: 'انتقِ التاريخ',
    weekdays: ['يوم الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    monthTitle: '{شهر واحد} {سنة واحدة}',
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
  },
  cascader: {
    title: 'العنوان',
    placeholder: 'اختر الخيارات',
  },
  dropdownMenu: {
    reset: 'إعادة الضبط',
    confirm: 'أكد',
  },
  dateTimePicker: {
    title: 'انتقِ التاريخ',
    cancel: 'الإلغاء',
    confirm: 'أكد',
    format: 'DD-MM-YYYY',
    yearLabel: 'سنة',
    monthLabel: 'الشهر',
    dateLabel: 'التاريخ',
    hourLabel: 'الساعة',
    minuteLabel: 'دقيقة',
    secondLabel: 'ثانيا',
  },
  picker: {
    cancel: 'الإلغاء',
    confirm: 'أكد',
  },
  pullDownRefresh: {
    loadingTexts: ['اسحب للتحديث', 'مرتخية للتجديد', 'منعش', 'اكتمل التحديث'],
  },
  rate: {
    valueText: '{القيمة} نتيجة',
    noValueText: 'لا توجد نقاط',
  },
  tabBar: {
    newsAriaLabel: 'هناك أخبار جديدة',
    moreNewsAriaLabel: 'هناك الكثير من الأخبار السيئة',
    haveMoreNewsAriaLabel: 'هناك { قيمة }+ أخبار',
    haveNewsAriaLabel: 'هناك { قيمة } أخبار',
  },
  table: {
    empty: 'البيانات الفارغة',
  },
  list: {
    loading: 'التحميل...',
    loadingMoreText: 'انقر لتحميل المزيد',
    pulling: 'اسحب للتحديث...',
    loosing: 'مرتخية للتجديد...',
    success: 'تم التحديث بنجاح',
  },
  upload: {
    progress: {
      uploadingText: 'جارٍ التحميل...',
      waitingText: 'الانتظار',
      failText: 'فشل',
      successText: 'النجاح',
    },
  },
  guide: {
    next: 'التالي',
    skip: 'تخطي',
    finish: 'أنهي',
    back: 'العودة',
  },
};
