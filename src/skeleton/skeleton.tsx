import { h, defineComponent } from 'vue';
import isNumber from 'lodash/isNumber';
import isFunction from 'lodash/isFunction';
import { renderContent } from '../utils/render-tnode';
import props from './props';
import { SkeletonRowCol, SkeletonRowColObj, TdSkeletonProps } from './type';
import { usePrefixClass } from '../hooks/useConfig';

const ThemeMap: Record<TdSkeletonProps['theme'], SkeletonRowCol> = {
  text: [1],
  avatar: [{ type: 'circle', size: '56px' }],
  paragraph: [1, 1, { width: '70%' }],
  'avatar-text': [[{ type: 'circle' }, { type: 'text', height: '32px' }]],
  tab: [{ height: '30px' }, { height: '200px' }],
  article: [
    { type: 'rect', height: '30px', width: '100%' },
    { type: 'rect', height: '200px', width: '100%' },
    [
      { type: 'text', height: '30px' },
      { type: 'text', height: '30px' },
      { type: 'text', height: '30px' },
    ],
    [
      { type: 'text', height: '30px' },
      { type: 'text', height: '30px' },
    ],
    [
      { type: 'text', height: '30px' },
      { type: 'text', height: '30px' },
    ],
    [
      { type: 'text', height: '30px' },
      { type: 'text', height: '30px' },
    ],
  ],
};

const getColItemStyle = (obj: SkeletonRowColObj) => {
  const styleName = ['width', 'height', 'marginRight', 'marginLeft', 'margin', 'size', 'background', 'backgroundColor'];
  const style = Object.create(null);
  styleName.forEach((name) => {
    if (name in obj) {
      const px = isNumber(obj[name]) ? `${obj[name]}px` : obj[name];
      if (name === 'size') {
        [style.width, style.height] = [px, px];
      } else {
        style[name] = px;
      }
    }
  });
  return style;
};

export default defineComponent({
  name: 'TSkeleton',

  props: { ...props },

  setup(props) {
    const COMPONENT_NAME = usePrefixClass('skeleton');
    const getColItemClass = (obj: SkeletonRowColObj) => [
      `${COMPONENT_NAME.value}__col`,
      `${COMPONENT_NAME.value}--type-${obj.type || 'text'}`,
      { [`${COMPONENT_NAME.value}--animation-${props.animation}`]: props.animation },
    ];

    const renderCols = (_cols: Number | SkeletonRowColObj | Array<SkeletonRowColObj>) => {
      let cols: Array<SkeletonRowColObj> = [];
      if (Array.isArray(_cols)) {
        cols = _cols;
      } else if (isNumber(_cols)) {
        cols = new Array(_cols).fill({ type: 'text' });
      } else {
        cols = [_cols as SkeletonRowColObj];
      }
      return cols.map((obj) => (
        <div class={getColItemClass(obj)} style={getColItemStyle(obj)}>
          {isFunction(obj.content) ? obj.content(h) : obj.content}
        </div>
      ));
    };

    const renderRowCol = (_rowCol?: SkeletonRowCol) => {
      const rowCol: SkeletonRowCol = _rowCol || props.rowCol;

      const getBlockClass = () => [`${COMPONENT_NAME.value}__row`];

      return rowCol.map((item) => <div class={getBlockClass()}>{renderCols(item)}</div>);
    };

    return {
      COMPONENT_NAME,
      renderRowCol,
    };
  },

  render() {
    const content = renderContent(this, 'default', 'content');

    if (this.$slots.default && !this.loading) {
      return <div>{content}</div>;
    }

    if (!this.loading) {
      return;
    }

    const children = [];
    if (this.theme) {
      children.push(this.renderRowCol(ThemeMap[this.theme]));
    }
    if (this.rowCol) {
      children.push(this.renderRowCol(this.rowCol));
    }
    if (!this.theme && !this.rowCol) {
      // 什么都不传时，传入默认 rowCol
      children.push(this.renderRowCol([1, 1, 1, { width: '70%' }]));
    }

    return <div class={this.COMPONENT_NAME}>{children}</div>;
  },
});
