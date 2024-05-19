import { isArray } from 'lodash-es';
import { isNumber } from 'lodash-es';
import { isFunction } from 'lodash-es';
import { h, defineComponent, ref, watch } from '@td/adapter-vue';

import { usePrefixClass, useContent } from '@td/adapter-hooks';

import props from '@td/intel/components/skeleton/props';
import { SkeletonRowCol, SkeletonRowColObj, TdSkeletonProps } from '@td/intel/components/skeleton/type';

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
  props,
  setup(props, { slots }) {
    const isShow = ref(false);
    const COMPONENT_NAME = usePrefixClass('skeleton');
    const renderContent = useContent();
    const getColItemClass = (obj: SkeletonRowColObj) => [
      `${COMPONENT_NAME.value}__col`,
      `${COMPONENT_NAME.value}--type-${obj.type || 'text'}`,
      { [`${COMPONENT_NAME.value}--animation-${props.animation}`]: props.animation },
    ];

    const renderCols = (_cols: Number | SkeletonRowColObj | Array<SkeletonRowColObj>) => {
      let cols: Array<SkeletonRowColObj> = [];
      if (isArray(_cols)) {
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

    watch(
      () => props.loading,
      (val) => {
        if (!val || props.delay === 0) {
          isShow.value = val;
          return;
        }
        setTimeout(() => {
          isShow.value = val;
        }, props.delay);
      },
      { immediate: true },
    );

    return () => {
      const content = renderContent('default', 'content');

      if (slots.default && !isShow.value) {
        return <div>{content}</div>;
      }

      if (!isShow.value) {
        return;
      }

      const children = [];
      if (props.theme) {
        children.push(renderRowCol(ThemeMap[props.theme]));
      }
      if (props.rowCol) {
        children.push(renderRowCol(props.rowCol));
      }
      if (!props.theme && !props.rowCol) {
        // 什么都不传时，传入默认 rowCol
        children.push(renderRowCol([1, 1, 1, { width: '70%' }]));
      }

      return <div class={COMPONENT_NAME.value}>{children}</div>;
    };
  },
});
