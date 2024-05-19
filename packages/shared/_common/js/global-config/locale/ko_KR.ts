/* eslint-disable no-template-curly-in-string */
// 文件有效，为国际化做准备
import 'dayjs/locale/ko';

export default {
  pagination: {
    itemsPerPage: '{size} /페이지',
    jumpTo: '건너뛰다',
    page: '페이지',
    total: '흔한 {total} 아이템 데이터',
  },
  cascader: {
    empty: '데이터 없음',
    loadingText: '로딩 중',
    placeholder: '선택해주세요',
  },
  calendar: {
    yearSelection: '{year} 년도',
    monthSelection: '{month} 달',
    yearRadio: '년도',
    monthRadio: '달',
    hideWeekend: '주말을 숨기다',
    showWeekend: '주말 쇼',
    today: '오늘',
    thisMonth: '이번 달',
    week: '하나,둘,셋,넷,다섯,여섯,하루',
    cellMonth: '1월,2월,3월,4월,5월,6월,7월,8월,9월,10월,11월,12월',
  },
  transfer: {
    title: '{checked} / {total} 안건',
    empty: '데이터 없음',
    placeholder: '검색할 키워드를 입력하세요',
  },
  timePicker: {
    dayjsLocale: 'ko',
    now: '지금',
    confirm: '확신하는',
    anteMeridiem: '아침',
    postMeridiem: '오후',
    placeholder: '선발 기간',
  },
  dialog: {
    confirm: '확인하다',
    cancel: '취소',
  },
  drawer: {
    confirm: '확인하다',
    cancel: '취소',
  },
  popconfirm: {
    confirm: {
      content: '확신하는',
    },
    cancel: {
      content: '취소',
    },
  },
  table: {
    empty: '데이터 없음',
    loadingText: '로딩 중 기다려주세요',
    loadingMoreText: '더 로드하려면 클릭하세요',
    filterInputPlaceholder: '아무거나 입력하세요(기본값 없음)',
    sortAscendingOperationText: '오름차순으로 클릭',
    sortCancelOperationText: '클릭하여 정렬 해제',
    sortDescendingOperationText: '내림차순으로 클릭',
    clearFilterResultButtonText: '클리어 필터',
    columnConfigButtonText: '열 구성',
    columnConfigTitleText: '테이블 열 구성',
    columnConfigDescriptionText: '테이블에 표시할 데이터 열을 선택하십시오',
    confirmText: '확인하다',
    cancelText: '취소',
    resetText: '초기화',
    selectAllText: '모두 선택',
    searchResultText: '검색“{result}”，일어나 {count} 결과',
  },
  select: {
    empty: '데이터 없음',
    loadingText: '로딩 중',
    placeholder: '선택해주세요',
  },
  tree: {
    empty: '데이터 없음',
  },
  treeSelect: {
    empty: '데이터 없음',
    loadingText: '로딩 중',
    placeholder: '선택해주세요',
  },
  datePicker: {
    dayjsLocale: 'ko',
    placeholder: {
      date: '날짜를 선택하세요Z',
      month: '월을 선택하세요',
      year: '연도를 선택하세요',
      quarter: '분기별 선택',
      week: '요일 선택'
    },
    weekdays: ['월', '화', '수', '목', '금', '토', '일'],
    months: [
      '1 월',
      '2 월',
      '3 월',
      '4 월',
      '5 월',
      '6 월',
      '7 월',
      '8 월',
      '9 월',
      '10 월',
      '11 월',
      '12 월',
    ],
    quarters: ['Q1', 'Q2', 'Q3', 'Q4'],
    rangeSeparator: ' - ',
    direction: 'ltr',
    format: 'YYYY-MM-DD',
    dayAriaLabel: '낮',
    weekAbbreviation: '주',
    yearAriaLabel: '년도',
    monthAriaLabel: '달',
    confirm: '확신하는',
    selectTime: '선발 기간',
    selectDate: '날짜 선택',
    nextYear: '내년',
    preYear: '작년',
    nextMonth: '다음 달',
    preMonth: '지난 달',
    preDecade: '지난 십 년',
    nextDecade: '다음 10년',
    now: '현재의',
  },
  upload: {
    sizeLimitMessage: '이미지 크기는 다음을 초과할 수 없습니다 {sizeLimit}',
    cancelUploadText: '업로드 취소',
    triggerUploadText: {
      fileInput: '파일 선택',
      image: '이미지를 업로드하려면 클릭하세요',
      normal: '업로드하려면 클릭',
      reupload: '재업로드',
      continueUpload: '계속 업로드',
      delete: '삭제',
      uploading: '업로드',
    },
    dragger: {
      dragDropText: '마우스를 놓으십시오',
      draggingText: '이 영역으로 드래그 앤 드롭',
      clickAndDragText:
        '위의 "파일 선택"을 클릭하거나 파일을 이 영역으로 끌어다 놓습니다',
    },
    file: {
      fileNameText: '파일 이름',
      fileSizeText: '파일 크기',
      fileStatusText: '상태',
      fileOperationText: '작동하다',
      fileOperationDateText: '업로드 날짜',
    },
    progress: {
      uploadingText: '업로드',
      waitingText: '업로드 보류 중',
      failText: '업로드 실패',
      successText: '성공적으로 업로드됨',
    },
  },
  form: {
    errorMessage: {
      date: '정확한 내용을 입력해주세요${name}',
      url: '정확한 내용을 입력해주세요${name}',
      required: '${name}필수의',
      max: '${name}문자 길이는 초과할 수 없습니다 ${validate} 캐릭터，한자는 두 글자와 같다',
      min: '${name}문자 길이는 다음보다 작을 수 없습니다 ${validate} 캐릭터，한자는 두 글자와 같다',
      len: '${name}문자 길이는 다음과 같아야 합니다. ${validate}',
      enum: '${name}만 될 수 있습니다${validate}그리고 더',
      idcard: '정확한 내용을 입력해주세요${name}',
      telnumber: '정확한 내용을 입력해주세요${name}',
      pattern: '정확한 내용을 입력해주세요${name}',
      validator: '${name}비준수',
      boolean: '${name}데이터 유형은 부울이어야 합니다',
      number: '${name}숫자여야 합니다',
    },
  },
  input: {
    placeholder: '들어 오세요',
  },
  list: {
    loadingText: '로딩 중 기다려주세요',
    loadingMoreText: '더 로드하려면 클릭하세요',
  },
  alert: {
    expandText: '더 확장',
    collapseText: '치워',
  },
  anchor: {
    copySuccessText: '링크 복사 성공',
    copyText: '링크 복사',
  },
  colorPicker: {
    swatchColorTitle: '시스템 기본 색상',
    recentColorTitle: '최근 사용한 색상',
    clearConfirmText: '최근에 사용한 색상을 지우시겠습니까?',
  },
  guide: {
    finishButtonProps: {
      content: '완료',
      theme: 'primary',
    },
    nextButtonProps: {
      content: '다음 단계',
      theme: 'primary',
    },
    skipButtonProps: {
      content: '건너뛰기',
      theme: 'default',
    },
    prevButtonProps: {
      content: '마지막 단계',
      theme: 'default',
    },
  },
  image: {
    errorText: '사진을 표시할 수 없습니다.',
    loadingText: '이미지 로딩',
  },
  imageViewer: {
    errorText: '이미지를 로드하지 못했습니다. 새로고침해 보세요.',
    mirrorTipText: '미러 이미지',
    rotateTipText: '회전하다',
    originalSizeTipText: '원본 크기',
  },
  typography: {
    expand: '펼치다',
    collapse: '접다',
    copied: '복사 성공'
  }
} as const;
