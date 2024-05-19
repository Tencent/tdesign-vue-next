/* eslint-disable no-template-curly-in-string */
// 意大利语-意大利 Italian
import 'dayjs/locale/it';

export default {
  pagination: {
    itemsPerPage: '{size} articoli/pagina',
    jumpTo: 'Vai a',
    page: 'pagina',
    total: 'totale {total} elementi dati',
  },
  cascader: {
    empty: 'Nessun dato',
    loadingText: 'Caricamento in corso',
    placeholder: 'Seleziona',
  },
  calendar: {
    yearSelection: '{year} anno',
    monthSelection: '{month} mese',
    yearRadio: 'anno',
    monthRadio: 'mese',
    hideWeekend: 'Nascondi weekend',
    showWeekend: 'Mostra weekend',
    today: 'Oggi',
    thisMonth: 'Questo mese',
    week: 'Lun,Mar,Mer,Gio,Ven,Sab,Dom',
    cellMonth: 'Gen,Feb,Mar,Apr,Mag,Giu,Lug,Ago,Set,Ott,Nov,Dic',
  },
  transfer: {
    title: '{checked} / {total} elementi',
    empty: 'Nessun dato',
    placeholder: 'Inserisci la parola chiave per la ricerca',
  },
  timePicker: {
    dayjsLocale: 'it',
    now: 'Ora',
    confirm: 'Conferma',
    anteMeridiem: 'AM',
    postMeridiem: 'PM',
    placeholder: 'Seleziona ora',
  },
  dialog: {
    confirm: 'OK',
    cancel: 'Annulla',
  },
  drawer: {
    confirm: 'OK',
    cancel: 'Annulla',
  },
  popconfirm: {
    confirm: {
      content: 'OK',
    },
    cancel: {
      content: 'Annulla',
    },
  },
  table: {
    empty: 'Nessun dato',
    loadingText: 'Caricamento in corso, attendere',
    loadingMoreText: 'Clicca per caricare di più',
    filterInputPlaceholder: 'Inserisci il contenuto (nessun valore predefinito)',
    sortAscendingOperationText: 'Clicca per ordinare in modo crescente',
    sortCancelOperationText: "Clicca per annullare l'ordinamento",
    sortDescendingOperationText: 'Clicca per ordinare in modo decrescente',
    clearFilterResultButtonText: 'Pulisci il filtro',
    columnConfigButtonText: 'Configurazione delle colonne',
    columnConfigTitleText: 'Configurazione delle colonne della tabella',
    columnConfigDescriptionText: 'Seleziona le colonne dei dati da visualizzare nella tabella',
    confirmText: 'Conferma',
    cancelText: 'Annulla',
    resetText: 'Ripristina',
    selectAllText: 'Seleziona tutto',
    searchResultText: 'Ricerca "{result}", trovati {count} risultati',
  },
  select: {
    empty: 'Nessun dato',
    loadingText: 'Caricamento in corso',
    placeholder: 'Seleziona',
  },
  tree: {
    empty: 'Nessun dato',
  },
  treeSelect: {
    empty: 'Nessun dato',
    loadingText: 'Caricamento in corso',
    placeholder: 'Seleziona',
  },
  datePicker: {
    dayjsLocale: 'it',
    placeholder: {
      date: 'Seleziona la data',
      month: 'Seleziona il mese',
      year: "Seleziona l'anno",
      quarter: 'Seleziona il trimestre',
      week: 'Seleziona una settimana'
    },
    weekdays: ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'],
    months: [
      'Gen',
      'Feb',
      'Mar',
      'Apr',
      'Mag',
      'Giu',
      'Lug',
      'Ago',
      'Set',
      'Ott',
      'Nov',
      'Dic',
    ],
    quarters: ['Primo trimestre', 'Secondo trimestre', 'Terzo trimestre', 'Quarto trimestre'],
    rangeSeparator: ' - ',
    direction: 'ltr',
    format: 'DD-MM-YYYY',
    dayAriaLabel: 'Giorno',
    weekAbbreviation: 'Sett.',
    yearAriaLabel: 'Anno',
    monthAriaLabel: 'Mese',
    confirm: 'Conferma',
    selectTime: 'Seleziona ora',
    selectDate: 'Seleziona data',
    nextYear: 'Anno successivo',
    preYear: 'Anno precedente',
    nextMonth: 'Mese successivo',
    preMonth: 'Mese precedente',
    preDecade: 'Decennio precedente',
    nextDecade: 'Decennio successivo',
    now: 'Ora',
  },
  upload: {
    sizeLimitMessage: 'La dimensione del file non può superare {sizeLimit}',
    cancelUploadText: 'Annulla caricamento',
    triggerUploadText: {
      fileInput: 'Seleziona file',
      image: 'Clicca per caricare immagine',
      normal: 'Clicca per caricare',
      reupload: 'Seleziona di nuovo',
      continueUpload: 'Continua a selezionare',
      delete: 'Elimina',
      uploading: 'Caricamento in corso',
    },
    dragger: {
      dragDropText: 'Rilascia il mouse',
      draggingText: 'Trascina in questa area',
      clickAndDragText:
        'Clicca su "Seleziona file" sopra o trascina i file in questa area',
    },
    file: {
      fileNameText: 'Nome del file',
      fileSizeText: 'Dimensione del file',
      fileStatusText: 'Stato',
      fileOperationText: 'Operazione',
      fileOperationDateText: 'Data di caricamento',
    },
    progress: {
      uploadingText: 'Caricamento in corso',
      waitingText: 'In attesa di caricamento',
      failText: 'Caricamento fallito',
      successText: 'Caricamento riuscito',
    },
  },
  form: {
    errorMessage: {
      date: 'Inserisci la ${name} corretta',
      url: 'Inserisci la ${name} corretta',
      required: '${name} obbligatorio',
      max: 'La lunghezza dei caratteri di ${name} non può superare i ${validate} caratteri',
      min: 'La lunghezza dei caratteri di ${name} non può essere inferiore a ${validate} caratteri',
      len: 'La lunghezza dei caratteri di ${name} deve essere ${validate}',
      enum: '${name} può essere solo ${validate}, ecc.',
      idcard: 'Inserisci la ${name} corretta',
      telnumber: 'Inserisci la ${name} corretta',
      pattern: 'Inserisci la ${name} corretta',
      validator: '${name} non conforme ai requisiti',
      boolean: 'Il tipo di dati di ${name} deve essere booleano',
      number: '${name} deve essere un numero',
    },
  },
  input: {
    placeholder: 'Inserisci',
  },
  list: {
    loadingText: 'Caricamento in corso, attendere prego',
    loadingMoreText: 'Clicca per caricare di più',
  },
  alert: {
    expandText: 'Espandi per maggiori dettagli',
    collapseText: 'Riduci',
  },
  anchor: {
    copySuccessText: 'Link copiato con successo',
    copyText: 'Copia link',
  },
  colorPicker: {
    swatchColorTitle: 'Colori predefiniti dal sistema',
    recentColorTitle: 'Colori usati di recente',
    clearConfirmText: 'Sei sicuro di voler cancellare i colori usati di recente?',
  },
  guide: {
    finishButtonProps: {
      content: 'Finito',
      theme: 'primario',
    },
    nextButtonProps: {
      content: 'Prossimo',
      theme: 'primario',
    },
    skipButtonProps: {
      content: 'Salta',
      theme: 'predefinito',
    },
    prevButtonProps: {
      content: 'Precedente',
      theme: 'predefinito',
    },
  },
  image: {
    errorText: "L'immagine non può essere visualizzata",
    loadingText: 'Caricamento immagine in corso',
  },
  imageViewer: {
    errorText: 'Caricamento immagine fallito, puoi provare a ricaricare',
    mirrorTipText: 'Specchio',
    rotateTipText: 'Ruota',
    originalSizeTipText: 'Dimensione originale',
  },
  typography: {
    expand: 'Espandere',
    collapse: 'ripiegare',
    copied: 'Copia completata'
  }
} as const;
