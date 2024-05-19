// 文件有效，为国际化做准备
import 'dayjs/locale/ko';

export default {
  actionSheet: {
    cancel: '취소',
  },
  calendar: {
    confirm: '확인',
    title: '날짜 선택',
    weekdays: ['일', '월', '화', '수', '목', '금', '토'],
    monthTitle: '{month} {year}',
    months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  },
  cascader: {
    title: '제목',
    placeholder: '옵션 선택',
  },
  dropdownMenu: {
    reset: '초기화',
    confirm: '확인',
  },
  dateTimePicker: {
    title: '날짜 선택',
    cancel: '취소',
    confirm: '확인',
    format: 'YYYY-MM-DD',
    yearLabel: '년',
    monthLabel: '월',
    dateLabel: '일',
    hourLabel: '시',
    minuteLabel: '분',
    secondLabel: '초',
  },
  picker: {
    cancel: '취소',
    confirm: '확인',
  },
  pullDownRefresh: {
    loadingTexts: ['새로고침을 당겨주세요', '느슨하게 하여 새로 고침', '새로고침 중...', '새로고침 완료'],
  },
  rate: {
    valueText: '{value}점',
    noValueText: '점수 없음',
  },
  tabBar: {
    newsAriaLabel: '새 뉴스가 있습니다',
    moreNewsAriaLabel: '많은 뉴스가 있습니다',
    haveMoreNewsAriaLabel: '{value}+건의 뉴스가 있습니다',
    haveNewsAriaLabel: '{value}건의 뉴스가 있습니다',
  },
  table: {
    empty: '빈 데이터',
  },
  list: {
    loading: '로딩 중...',
    loadingMoreText: '더 많은 것을 보시려면 클릭하세요',
    pulling: '새로고침을 당겨주세요...',
    loosing: '느슨하게 하여 새로 고침...',
    success: '새로고침 성공',
  },
  upload: {
    progress: {
      uploadingText: '업로드 중...',
      waitingText: '대기 중',
      failText: '실패했습니다',
      successText: '성공했습니다',
    },
  },
  guide: {
    next: '다음',
    skip: '건너뛰기',
    finish: '완료',
    back: '뒤로',
  },
};
