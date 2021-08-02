import { VNode, defineComponent, h } from 'vue';
import { prefix } from '../../config';
import Popup from '../../popup';
import { isNodeOverflow } from '../../utils/dom';
import { TdInstance } from '../util/interface';

const overlayStyle = {
  width: '100%',
  maxWidth: '400px',
  wordBreak: 'break-all',
};

export default defineComponent({
  name: `${prefix}-table-cell`,
  props: {
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
    const { fixed } = this.cellData?.col;
    const children = this.$parent.$refs;
    // 计算当前固定列偏移的宽度
    if (fixed && children) {
      let offsetLeft = 0;
      const fixedColumns: Array<TdInstance> = [];
      Object.keys(children).forEach((refKey) => {
        const el = children[refKey] as TdInstance;
        if (el?.cellData?.col?.fixed === fixed) {
          fixedColumns.push(el);
        }
      });
      const indexInFixedColumns = fixedColumns.findIndex(el => (el === this));

      fixedColumns.forEach((el: any, cur) => {
        if ((fixed === 'right' && cur > indexInFixedColumns) || (fixed === 'left' && cur < indexInFixedColumns)) {
          const { width } = el.cellData?.col;
          const { clientWidth } = el.$el;
          offsetLeft += width > 0 ? width : clientWidth;
        }
      });
      this.isBoundary = fixed === 'left' ? indexInFixedColumns === fixedColumns.length - 1 : indexInFixedColumns === 0;
      this.offsetLeft = offsetLeft;
    }
    this.isCutOff = isNodeOverflow(this.$el);
  },
  render() {
    const { cellData, offsetLeft, isBoundary, isCutOff } = this;
    const { col, colIndex, row, rowIndex, customData, customRender, withBorder } = cellData;
    const { colKey, attrs, align, ellipsis, width, className, title, fixed } = col;

    // 固定列 单元格属性
    const style: Record<string, any> = {};
    const attrClass = attrs?.class || {};
    if (fixed) {
      style.position = 'sticky';
      style[fixed] = `${offsetLeft}px`;
      attrClass[`${prefix}-table__cell--fixed-${fixed}`] = true;
      if (isBoundary) {
        attrClass[`${prefix}-table__cell--fixed-${fixed}-${fixed === 'left' ? 'last' : 'first'}`] = true;
      }
    }
    if (align) {
      attrClass[`align-${align}`] = true;
    }
    if (width && !fixed) {
      style.overflow = 'hidden';
    }
    if (withBorder) {
      style.borderLeft = '1px solid #E7E7E7';
    }
    if (ellipsis === true) {
      attrClass['text-ellipsis'] = true;
    }
    if (className) {
      if (typeof className === 'function') {
        attrClass[className({ type: cellData.type, col, colIndex, row, rowIndex })] = true;
      } else {
        attrClass[className] = true;
      }
    }
    // 自定义单元格渲染
    let cellContent: VNode;
    if (typeof customRender === 'function') {
      const  { type, func } = customData;
      const baseData = {
        col,
        colIndex,
        row,
        rowIndex,
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
      class: attrClass,
      key: colKey,
      style,
    };
    // 如果被截断给加上 Tooltip 提示
    if (ellipsis && isCutOff) {
      const slots = {
        default: () => cellContent,
        content: () => cellContent,
      };
      return <td {...tdAttrs}>
        <Popup
          style="display: inline;"
          overlayStyle={overlayStyle}
          placement="bottom-left"
          showArrow={false}
        >
          {slots}
        </Popup>
      </td>;
    }
    return <td {...tdAttrs}>{cellContent}</td>;
  },
});
