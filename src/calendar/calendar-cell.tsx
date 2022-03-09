import { defineComponent } from 'vue';
import dayjs from 'dayjs';
import { emitEvent } from '../utils/event';

import { usePrefixClass, useCommonClassName } from '../config-provider';

// 组件相关的自定义类型
import { CalendarCell } from './type';
import { renderTNodeJSXDefault, renderTNodeJSX } from '../utils/render-tnode';

const clickTypeEmitEventMap = {
  click: 'click',
  dblclick: 'dblclick',
  contextmenu: 'rightclick',
};

export default defineComponent({
  name: `TCalendarCell`,
  inheritAttrs: false,
  props: {
    item: {
      type: Object,
      default: (): CalendarCell => null,
    },
    fillWithZero: {
      type: Boolean,
      default: undefined,
    },
    theme: {
      type: String,
      default: (): string => null,
    },
    t: Function,
    global: Object,
    cell: Function,
  },
  emits: ['click', 'dblclick', 'rightclick'],
  setup() {
    const COMPONENT_NAME = usePrefixClass('calendar');
    const classPrefix = usePrefixClass();
    const { STATUS } = useCommonClassName();
    return {
      STATUS,
      COMPONENT_NAME,
      classPrefix,
    };
  },
  computed: {
    allowSlot(): boolean {
      return this.theme === 'full';
    },
    disabled(): boolean {
      return this.item.mode === 'month' && this.item.belongTo !== 0;
    },
    valueDisplay(): string {
      if (this.item.mode === 'month') {
        const dateNum = this.item.date.getDate();
        const fillZero = dateNum < 10 && (this.fillWithZero ?? this.global.fillWithZero ?? true);
        return fillZero ? `0${dateNum}` : dateNum;
      }
      const map = this.t(this.global.cellMonth).split(',');
      return map[this.item.date.getMonth().toString()];
    },
    cellCls(): Record<string, any> {
      const { mode, date, formattedDate, isCurrent } = this.item;
      const isNow =
        mode === 'year' ? new Date().getMonth() === date.getMonth() : formattedDate === dayjs().format('YYYY-MM-DD');
      return [
        `${this.COMPONENT_NAME}__table-body-cell`,
        {
          [this.STATUS.disabled]: this.disabled,
          [this.STATUS.checked]: isCurrent,
          [`${this.COMPONENT_NAME}__table-body-cell--now`]: isNow,
        },
      ];
    },
  },
  methods: {
    clickCell(e: MouseEvent) {
      if (this.disabled) return;
      emitEvent(this, clickTypeEmitEventMap[e.type], e);
    },
  },
  render() {
    // const { item, cellCls, clickCell, dblclick, contextmenuClick, valueDisplay, allowSlot } = this;
    const { item, cellCls, clickCell, valueDisplay, allowSlot } = this;

    const defaultNode = () => (
      <span>
        <div class={`${this.COMPONENT_NAME}__table-body-cell-display`}>{valueDisplay}</div>
        <div class={`${this.COMPONENT_NAME}__table-body-cell-content`}>
          {allowSlot &&
            renderTNodeJSX(this, 'cellAppend', {
              params: item,
            })}
        </div>
      </span>
    );

    return (
      item && (
        <div class={cellCls} onClick={clickCell} ondblclick={clickCell} oncontextmenu={clickCell}>
          {typeof this.cell === 'function'
            ? this.cell(item)
            : renderTNodeJSXDefault(this, 'cell', {
                defaultNode: defaultNode(),
                params: item,
              })}
        </div>
      )
    );
  },
});
