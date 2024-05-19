// 文件有效，为国际化做准备
import 'dayjs/locale/it';

export default {
  actionSheet: {
    cancel: 'Annulla',
  },
  calendar: {
    confirm: 'Conferma',
    title: 'Seleziona Data',
    weekdays: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
    monthTitle: '{mese} {anno}',
    months: [
      'Gennaio',
      'Febbraio',
      'Marzo',
      'Aprile',
      'Maggio',
      'Giugno',
      'Luglio',
      'Agosto',
      'Settembre',
      'Ottobre',
      'Novembre',
      'Dicembre',
    ],
  },
  cascader: {
    title: 'Titolo',
    placeholder: 'Seleziona opzioni',
  },
  dropdownMenu: {
    reset: 'Reimposta',
    confirm: 'Conferma',
  },
  dateTimePicker: {
    title: 'Seleziona Data',
    cancel: 'Annulla',
    confirm: 'Conferma',
    format: 'DD-MM-YYYY',
    yearLabel: 'Anno',
    monthLabel: 'Mese',
    dateLabel: 'Data',
    hourLabel: 'Ora',
    minuteLabel: 'Minuto',
    secondLabel: 'Secondo',
  },
  picker: {
    cancel: 'Annulla',
    confirm: 'Conferma',
  },
  pullDownRefresh: {
    loadingTexts: ['Tirare per aggiornare', 'Libera da aggiornare', 'Rinfrescante', 'Aggiornamento completato'],
  },
  rate: {
    valueText: '{valore} punteggio',
    noValueText: 'Nessun punteggio',
  },
  tabBar: {
    newsAriaLabel: 'Ci sono nuove notizie',
    moreNewsAriaLabel: 'Ci sono molte notizie',
    haveMoreNewsAriaLabel: 'Ci sono {valore}+ notizie',
    haveNewsAriaLabel: 'Ci sono {valore} notizie',
  },
  table: {
    empty: 'Dati Vuoti',
  },
  list: {
    loading: 'Caricamento...',
    loadingMoreText: 'Fai clic per caricare di più',
    pulling: 'Estrai per aggiornare...',
    loosing: 'Libera da aggiornare...',
    success: 'Aggiorna riuscito',
  },
  upload: {
    progress: {
      uploadingText: 'Invio...',
      waitingText: 'Attesa',
      failText: 'Fallito',
      successText: 'Successo',
    },
  },
  guide: {
    next: 'Successivo',
    skip: 'Salta',
    finish: 'Finisci',
    back: 'Indietro',
  },
};
