import { computed, defineComponent } from 'vue';
import dayjs from 'dayjs';
import { emitEvent } from '../utils/event';

import { usePrefixClass, useCommonClassName } from '../config-provider';

// 组件相关的自定义类型
import { CalendarCell } from './type';
import { renderContent } from '../utils/render-tnode';

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
    cell: [String, Function],
  },
  emits: ['click', 'dblclick', 'rightclick'],
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('calendar');
    const classPrefix = usePrefixClass();
    const { STATUS } = useCommonClassName();

    const valueDisplay = computed<string>(() => {
      if (props.item.mode === 'month') {
        const dateNum = props.item.date.getDate();
        const fillZero = dateNum < 10 && (props.fillWithZero ?? props.global.fillWithZero ?? true);
        return fillZero ? `0${dateNum}` : dateNum;
      }
      const map = props.t(props.global.cellMonth).split(',');
      return map[props.item.date.getMonth().toString()];
    });
    const allowSlot = computed<boolean>(() => {
      return props.theme === 'full';
    });
    const disabled = computed<boolean>(() => {
      return props.item.mode === 'month' && props.item.belongTo !== 0;
    });
    const cellCls = computed(() => {
      const { mode, date, formattedDate, isCurrent } = props.item;
      const isNow =
        mode === 'year' ? new Date().getMonth() === date.getMonth() : formattedDate === dayjs().format('YYYY-MM-DD');
      return [
        `${COMPONENT_NAME.value}__table-body-cell`,
        {
          [STATUS.value.disabled]: disabled.value,
          [STATUS.value.checked]: isCurrent,
          [`${COMPONENT_NAME.value}__table-body-cell--now`]: isNow,
        },
      ];
    });

    return {
      STATUS,
      COMPONENT_NAME,
      classPrefix,
      cellCls,
      valueDisplay,
      allowSlot,
      disabled,
    };
  },
  render() {
    const { item, cellCls, valueDisplay, allowSlot } = this;

    const clickCell = (e: MouseEvent): void => {
      if (this.disabled) return;
      emitEvent(this, clickTypeEmitEventMap[e.type], e);
    };

    const renderDefaultNode = () => (
      <>
        <div class={`${this.COMPONENT_NAME}__table-body-cell-display`}>{valueDisplay}</div>
        <div class={`${this.COMPONENT_NAME}__table-body-cell-content`}>
          {allowSlot &&
            renderContent(this, 'cellAppend', undefined, {
              params: { ...item },
            })}
        </div>
      </>
    );
    return (
      item && (
        <td class={cellCls} onClick={clickCell} ondblclick={clickCell} oncontextmenu={clickCell}>
          {typeof this.cell === 'function'
            ? this.cell(item)
            : renderContent(this, 'cell', undefined, {
                defaultNode: renderDefaultNode(),
                params: { ...item },
              })}
        </td>
      )
    );
  },
});
