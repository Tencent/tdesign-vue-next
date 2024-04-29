import dayjs from 'dayjs';
import { computed, defineComponent } from 'vue';

import { useContent } from '../hooks/tnode';
import { useCommonClassName } from '../hooks/useConfig';

// eslint-disable-next-line import/order
import { useCalendarCellClass } from './hook';

// 组件相关的自定义类型
import { CalendarCell } from './type';

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
    cellAppend: [String, Function],
  },
  emits: [...Object.values(clickTypeEmitEventMap)],
  setup(props, { emit }) {
    const renderContent = useContent();
    const cls = useCalendarCellClass();
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
      const now = new Date();
      const isNow =
        mode === 'year'
          ? now.getMonth() === date.getMonth() && now.getFullYear() === date.getFullYear()
          : formattedDate === dayjs().format('YYYY-MM-DD');
      return [
        cls.tableBodyCell.value,
        {
          [STATUS.value.disabled]: disabled.value,
          [STATUS.value.checked]: isCurrent,
          [cls.tableBodyCell4Now.value]: isNow,
        },
      ];
    });
    const clickCell = (e: MouseEvent): void => {
      if (disabled.value) return;
      const emitName = clickTypeEmitEventMap[e.type];
      emit(emitName, e);
    };

    const renderDefaultNode = () => (
      <>
        <div class={cls.tableBodyCellDisplay.value}>{valueDisplay.value}</div>
        <div class={cls.tableBodyCellCsontent.value}>
          {allowSlot.value &&
            renderContent('cellAppend', undefined, {
              params: { ...props.item },
            })}
        </div>
      </>
    );

    return () => {
      return (
        props.item && (
          <td class={cellCls.value} onClick={clickCell} ondblclick={clickCell} oncontextmenu={clickCell}>
            {renderContent('cell', undefined, {
              defaultNode: renderDefaultNode(),
              params: { ...props.item },
            })}
          </td>
        )
      );
    };
  },
});
