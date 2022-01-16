import { defineComponent, h, VNode } from 'vue';
import isString from 'lodash/isString';
import primaryTableProps from '../../primary-table-props';
import Loading from '../../../loading';
import { prefix } from '../../../config';
import { STATUS_CLASSNAMES } from '../../../utils/classnames';
import { emitEvent } from '../../../utils/event';
import { TdPrimaryTableProps } from '../../type';
import { ClassName } from '../../../common';
import { renderTNodeJSX } from '../../../utils/render-tnode';

type AsyncLoadingClickParams = Parameters<TdPrimaryTableProps['onAsyncLoadingClick']>;

export const ASYNC_LOADING_ROW = 'async-loading-row';

export default defineComponent({
  name: `${prefix}-primary-table-async-loading`,
  props: {
    asyncLoading: primaryTableProps.asyncLoading,
  },
  data() {
    return {
      pullDownLoading: false,
    };
  },
  computed: {
    classes(): ClassName {
      return [
        `${prefix}-table__async-loading`,
        {
          [STATUS_CLASSNAMES.loading]: this.asyncLoading === 'loading',
          [STATUS_CLASSNAMES.loadMore]: this.asyncLoading === 'load-more',
        },
      ];
    },
  },
  methods: {
    onLoadClick() {
      if (typeof this.asyncLoading !== 'string') return;
      emitEvent<AsyncLoadingClickParams>(this, 'async-loading-click', { status: this.asyncLoading });
    },
    renderAsyncLoadingRow(): VNode {
      const asyncLoadingNode = renderTNodeJSX(this, 'asyncLoading');
      if (isString(asyncLoadingNode)) {
        const { asyncLoading } = this;
        const loadingText = {
          'load-more': '点击加载更多',
          loading: '正在加载中，请稍后',
        }[String(asyncLoading)];
        return (
          <div class={this.classes} onClick={this.onLoadClick}>
            {<Loading loading={asyncLoading === 'loading'} text={loadingText} />}
          </div>
        );
      }
      if (![null, false, undefined].includes(asyncLoadingNode)) {
        return (
          <div class={this.classes} onClick={this.onLoadClick}>
            {asyncLoadingNode}
          </div>
        );
      }
      return null;
    },
  },
});
