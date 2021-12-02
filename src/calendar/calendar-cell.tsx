import dayjs from 'dayjs';

// 通用库
import { defineComponent } from 'vue';

// 组件的一些常量
import { COMPONENT_NAME } from './const';

// 组件相关的自定义类型
import { CalendarCell } from './type';
import { renderTNodeJSXDefault, renderTNodeJSX } from '../utils/render-tnode';

export default defineComponent({
  name: `${COMPONENT_NAME}-cell`,
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
    locale: Object,
    cell: Function,
  },
  emits: ['click', 'dblclick', 'rightClick'],
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
        const fillZero = dateNum < 10 && (this.fillWithZero ?? this.locale.fillWithZero ?? true);
        return fillZero ? `0${dateNum}` : dateNum;
      }
      const map = this.t(this.locale.cellMonth).split(',');
      return map[this.item.date.getMonth().toString()];
    },
    cellCls(): Record<string, any> {
      const { mode, date, formattedDate, isCurrent } = this.item;
      const isNow =
        mode === 'year' ? new Date().getMonth() === date.getMonth() : formattedDate === dayjs().format('YYYY-MM-DD');
      return [
        't-calendar__table-body-cell',
        {
          't-is-disabled': this.disabled,
          't-is-checked': isCurrent,
          't-is-now': isNow,
        },
      ];
    },
  },
  methods: {
    clickCell(e: MouseEvent) {
      if (this.disabled) return;
      this.$emit('click', e);
    },
    dblclick(e: MouseEvent) {
      this.$emit('dblclick', e);
    },
    contextmenuClick(e: MouseEvent) {
      this.$emit('rightClick', e);
    },
  },
  render() {
    const { item, cellCls, clickCell, dblclick, contextmenuClick, valueDisplay, allowSlot } = this;
    const defaultNode = (
      <>
        <div class="t-calendar__table-body-cell-value">{valueDisplay}</div>
        <div class="t-calendar__table-body-cell-content">
          {allowSlot &&
            renderTNodeJSX(this, 'cellAppend', {
              params: item,
            })}
        </div>
      </>
    );
    return (
      item && (
        <div class={cellCls} onClick={clickCell} ondblclick={dblclick} oncontextmenu={contextmenuClick}>
          {typeof this.cell === 'function'
            ? this.cell(item)
            : renderTNodeJSXDefault(this, 'cell', {
                defaultNode,
                params: item,
              })}
        </div>
      )
    );
  },
});
