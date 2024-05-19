/* eslint-disable no-template-curly-in-string */
// 文件有效，为国际化做准备
import 'dayjs/locale/ja';

export default {
  pagination: {
    itemsPerPage: '{size} /ページ',
    jumpTo: 'ジャンプする',
    page: 'ページ',
    total: '合計 {total} 項目データ',
  },
  cascader: {
    empty: 'データなし',
    loadingText: 'ローディング',
    placeholder: '選択してください',
  },
  calendar: {
    yearSelection: '{year} 年',
    monthSelection: '{month} 月',
    yearRadio: '年',
    monthRadio: '月',
    hideWeekend: 'ヒドゥン・ウィークエンド',
    showWeekend: 'ショーウィークエンド',
    today: '今日',
    thisMonth: '今月は',
    week: '月,火,水,木,金,土,日',
    cellMonth: '1 月,2 月,3 月,4 月,5 月,6 月,7 月,8 月,9 月,10 月,11 月,12 月',
  },
  transfer: {
    title: '{checked} / {total} 項目',
    empty: 'データなし',
    placeholder: '検索するキーワードを入力してください',
  },
  timePicker: {
    dayjsLocale: 'ja',
    now: 'このとき',
    confirm: '決定事項',
    anteMeridiem: 'モーニング',
    postMeridiem: '午後',
    placeholder: '時間を選択する',
  },
  dialog: {
    confirm: '確認事項',
    cancel: 'キャンセルについて',
  },
  drawer: {
    confirm: '確認事項',
    cancel: 'キャンセルについて',
  },
  popconfirm: {
    confirm: {
      content: '確認事項',
    },
    cancel: {
      content: 'キャンセルについて',
    },
  },
  table: {
    empty: 'データなし',
    loadingText: 'ロード中です、お待ちください',
    loadingMoreText: 'クリックでさらに読み込み',
    filterInputPlaceholder: '内容を入力してください（初期値なし）',
    sortAscendingOperationText: 'クリックで昇降',
    sortCancelOperationText: 'クリックでソート解除',
    sortDescendingOperationText: '降順でクリック',
    clearFilterResultButtonText: 'クリアフィルター',
    columnConfigButtonText: 'カラム構成',
    columnConfigTitleText: 'テーブルカラムの構成',
    columnConfigDescriptionText: '表に表示するデータの列を選択してください。',
    confirmText: '確認事項',
    cancelText: 'キャンセルについて',
    resetText: 'リセット',
    selectAllText: 'すべて選択',
    searchResultText: '検索“{result}”，探す {count} 記事結果',
  },
  select: {
    empty: 'データなし',
    loadingText: 'ローディング',
    placeholder: '選択してください',
  },
  tree: {
    empty: 'データなし',
  },
  treeSelect: {
    empty: 'データなし',
    loadingText: 'ローディング',
    placeholder: '選択してください',
  },
  datePicker: {
    dayjsLocale: 'ja',
    placeholder: {
      date: '日付を選択してください',
      month: '月を選択してください',
      year: '年度を選択してください',
      quarter: '四半期を選択してください',
      week: '週を選択してください'
    },
    weekdays: ['月', '火', '水', '木', '金', '土', '日'],
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
    quarters: ['Q1', 'Q2', 'Q3', 'Q4'],
    rangeSeparator: ' - ',
    direction: 'ltr',
    format: 'YYYY-MM-DD',
    dayAriaLabel: '日',
    weekAbbreviation: '週間',
    yearAriaLabel: '年',
    monthAriaLabel: '月',
    confirm: '決定事項',
    selectTime: '時間を選択する',
    selectDate: '日付を選択',
    nextYear: '来年度',
    preYear: '前年度',
    nextMonth: '来月',
    preMonth: '先月',
    preDecade: '過去10年間',
    nextDecade: '次の10年',
    now: '電流',
  },
  upload: {
    sizeLimitMessage: '画像サイズは最大で {sizeLimit}',
    cancelUploadText: 'アップロードをキャンセルする',
    triggerUploadText: {
      fileInput: 'ファイル選択',
      image: 'クリックで画像をアップロード',
      normal: 'クリックでアップロード',
      reupload: '再アップロード',
      continueUpload: 'アップロードを継続する',
      delete: '削除',
      uploading: 'アップロード中',
    },
    dragger: {
      dragDropText: 'マウスを離す',
      draggingText: 'この領域にドラッグ＆ドロップする',
      clickAndDragText:
        '上の「ファイルを選択」をクリックするか、このエリアにファイルをドラッグ＆ドロップしてください',
    },
    file: {
      fileNameText: 'ファイル名',
      fileSizeText: 'ファイルサイズ',
      fileStatusText: '状態です',
      fileOperationText: '操作',
      fileOperationDateText: 'アップロード日',
    },
    progress: {
      uploadingText: 'アップロード中',
      waitingText: 'アップロード予定',
      failText: 'アップロードに失敗しました',
      successText: 'アップロード成功',
    },
  },
  form: {
    errorMessage: {
      date: '正しく入力してください${name}',
      url: '正しく入力してください${name}',
      required: '${name}必須項目',
      max: '${name}文字数制限 ${validate} 文字，一中二文',
      min: '${name}を下回る文字数は使用できません ${validate} 文字，一中二文',
      len: '${name}文字の長さは、必ず ${validate}',
      enum: '${name}でしかありえません${validate}等',
      idcard: '正しく入力してください${name}',
      telnumber: '正しく入力してください${name}',
      pattern: '正しく入力してください${name}',
      validator: '${name}要件を満たしていない',
      boolean: '${name}データ型は Boolean 型であること',
      number: '${name}デジタルであること',
    },
  },
  input: {
    placeholder: '入力してください',
  },
  list: {
    loadingText: 'ロード中です、お待ちください',
    loadingMoreText: 'クリックでさらに読み込み',
  },
  alert: {
    expandText: 'もっと拡大する',
    collapseText: 'コレクト',
  },
  anchor: {
    copySuccessText: 'リンクが正常にコピーされました',
    copyText: 'コピーリンク',
  },
  colorPicker: {
    swatchColorTitle: 'システムプリセットカラー',
    recentColorTitle: '最近使用した色',
    clearConfirmText: '最近使用した色をクリアにするのは確実ですか？',
  },
  guide: {
    finishButtonProps: {
      content: '終了',
      theme: 'primary',
    },
    nextButtonProps: {
      content: '次のステップ',
      theme: 'primary',
    },
    skipButtonProps: {
      content: 'スキップ',
      theme: 'default',
    },
    prevButtonProps: {
      content: '前へ',
      theme: 'default',
    },
  },
  image: {
    errorText: '画像を表示できません',
    loadingText: '画像の読み込み',
  },
  imageViewer: {
    errorText: '画像の読み込みに失敗しました。再読み込みしてみてください',
    mirrorTipText: '鏡像',
    rotateTipText: '回転する',
    originalSizeTipText: 'オリジナルサイズ',
  },
  typography: {
    expand: 'もっと拡大する',
    collapse: '畳む',
    copied: 'コピー成功'
  }
} as const;
