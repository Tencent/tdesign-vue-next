import { VNode, defineComponent, h, ComponentPublicInstance } from 'vue';
import { prefix } from '../../config';
import Popup from '../../popup';
import { isNodeOverflow } from '../../utils/dom';
import { TdInstance } from '../util/interface';
import { getRecord } from '../util/common';
import { emitEvent } from '../../utils/event';
import { TdBaseTableProps } from '../type';
import baseTableProps from '../base-table-props';

const overlayStyle = {
  width: '100%',
  maxWidth: '400px',
  wordBreak: 'break-all',
};

export default defineComponent({
  name: `${prefix}-table-cell`,
  components: {
    Popup,
  },
  props: {
    onCellClick: baseTableProps.onCellClick,
    cellData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      offsetLeft: 0,
      isBoundary: false,
      isCutOff: false,
    };
  },
  mounted() {
    this.init();
  },
  updated() {
    this.init();
  },
  methods: {
    init() {
      const { fixed } = this.cellData.col;
      const children = this.$parent.$refs;
      // 计算当前固定列偏移的宽度
      if (fixed) {
        let offsetLeft = 0;
        const fixedColumns: Array<ComponentPublicInstance> = [];
        Object.keys(children).forEach((refKey) => {
          const el = children[refKey] as TdInstance;
          if (el?.cellData?.col?.fixed === fixed) {
            fixedColumns.push(el);
          }
        });
        const indexInFixedColumns = fixedColumns.findIndex((el: ComponentPublicInstance) => el === this);
        fixedColumns.forEach((el: any, cur: number) => {
          if ((fixed === 'right' && cur > indexInFixedColumns) || (fixed === 'left' && cur < indexInFixedColumns)) {
            const { width } = el.cellData.col;
            const { clientWidth } = el.$el;
            offsetLeft += width > 0 ? width : clientWidth;
          }
        });
        this.isBoundary =
          fixed === 'left' ? indexInFixedColumns === fixedColumns.length - 1 : indexInFixedColumns === 0;
        this.offsetLeft = offsetLeft;
      }
      this.isCutOff = isNodeOverflow(this.$el);
    },
  },
  render() {
    const { cellData } = this;
    const { col, colIndex, row, rowIndex, customData, customRender, withoutBorder, withBorder } = cellData;
    const { colKey, attrs, align, ellipsis, width, className, title, fixed } = col;

    // 固定列 单元格属性
    const style: Record<string, any> = {
      ...col.attrs?.style,
    };
    const fixedClass = [];
    // 普通样式
    const attrClass = attrs?.class || [];
    if (fixed) {
      style.position = 'sticky';
      style[fixed] = `${this.offsetLeft}px`;
      fixedClass.push(`${prefix}-table__cell--fixed-${fixed}`);
      if (this.isBoundary) {
        fixedClass.push(`${prefix}-table__cell--fixed-${fixed}-${fixed === 'left' ? 'last' : 'first'}`);
      }
    }
    if (align) {
      attrClass.push(`${prefix}-align-${align}`);
    }
    if (width && !fixed) {
      style.overflow = 'hidden';
    }
    if (withoutBorder === true) {
      style.borderLeftWidth = '0px';
    }
    if (withBorder) {
      style.borderLeft = '1px solid #E7E7E7';
    }
    if (ellipsis === true || typeof ellipsis === 'function') {
      attrClass.push(`${prefix}-text-ellipsis`);
    }
    if (className) {
      if (typeof className === 'function') {
        attrClass.push(
          className({
            type: cellData.type,
            col,
            colIndex,
            row,
            rowIndex,
          }),
        );
      } else {
        attrClass.push(className);
      }
    }
    if (['single', 'multiple'].indexOf(col.type) > -1) {
      attrClass.push(`${prefix}-table__cell--selectable`);
    }
    const record = getRecord(row);
    // 自定义单元格渲染
    let cellContent: VNode;
    if (typeof customRender === 'function') {
      const { type, func } = customData;
      const baseData = {
        col,
        colIndex,
        row,
        rowIndex,
        record,
      };
      if (func === 'title') {
        cellContent = customRender(h, { col, colIndex, type });
      } else if (func === 'cell') {
        cellContent = customRender(h, baseData);
      } else if (func === 'render') {
        cellContent = customRender(h, { type, ...baseData });
      }
    } else {
      cellContent = h(title || '');
    }
    const tdAttrs = {
      ...attrs,
      class: [...fixedClass, ...attrClass].filter((notEmpty) => notEmpty).join(' '),
      key: colKey,
      style,
      onClick: (e: MouseEvent) => {
        emitEvent<Parameters<TdBaseTableProps['onCellClick']>>(this, 'cell-click', {
          col,
          colIndex,
          row,
          rowIndex,
          e,
        });
      },
    };
    // 如果被截断给加上 Tooltip 提示
    if (ellipsis && this.isCutOff) {
      let popupCellContent = cellContent;
      if (typeof ellipsis === 'function') {
        popupCellContent = ellipsis(h, {
          row,
          col,
          rowIndex,
          colIndex,
        });
      }
      return (
        <td {...tdAttrs}>
          <Popup
            style="display: inline;"
            overlayStyle={overlayStyle}
            placement="bottom-left"
            showArrow={false}
            v-slots={{
              default: () => cellContent,
              content: () => popupCellContent,
            }}
          />
        </td>
      );
    }
    return <td {...tdAttrs}>{cellContent}</td>;
  },
});
