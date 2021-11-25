import { defineComponent, h, VNode } from 'vue';
import primaryTableProps from '../../primary-table-props';
import baseTableProps from '../../base-table-props';
import TableRow from '../../base-table/table-row';
import { prefix } from '../../../config';
import GradientIcon from '../../../loading/icon/gradient';
import { emitEvent } from '../../../utils/event';
import { TdPrimaryTableProps } from '../../type';
import { ClassName } from '../../../common';

type AsyncLoadingClickParams = Parameters<TdPrimaryTableProps['onAsyncLoadingClick']>;
type CreateElement = typeof h;

export const ASYNC_LOADING_ROW = 'async-loading-row';

export default defineComponent({
  name: `${prefix}-primary-table-async-loading`,
  props: {
    data: baseTableProps.data,
    columns: primaryTableProps.columns,
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
        `${prefix}-table--loading-async`,
        {
          [`${prefix}-table--loading-status-${this.asyncLoading}`]: typeof this.asyncLoading === 'string',
        },
      ];
    },
  },
  methods: {
    // 异步加载 pullDownLoading 新增一条数据
    asyncLoadingHandler(): Array<any> {
      if (this.asyncLoading || typeof this.$slots.asyncLoading === 'function') {
        return this.data.concat({ colKey: ASYNC_LOADING_ROW });
      }
      return this.data;
    },
    onLoadClick() {
      if (typeof this.asyncLoading !== 'string') return;
      emitEvent<AsyncLoadingClickParams>(this, 'async-loading-click', { status: this.asyncLoading });
    },
    renderAsyncLoadingRow(): VNode {
      const { asyncLoading } = this;
      const columns = [
        {
          colKey: ASYNC_LOADING_ROW,
          attrs: { colSpan: this.columns.length },
          render: (h: CreateElement) => {
            if (typeof asyncLoading === 'function') {
              return asyncLoading(h);
            }
            if (typeof this.$slots.asyncLoading === 'function') {
              return this.$slots.asyncLoading(h);
            }
            const loadingText = {
              'load-more': '点击加载更多',
              loading: '正在加载中，请稍后',
            }[String(asyncLoading)];
            if (!loadingText) {
              return '';
            }
            return (
              <div class={this.classes} onClick={this.onLoadClick}>
                {asyncLoading === 'loading' && <GradientIcon size="small" />}
                {loadingText}
              </div>
            );
          },
        },
      ];
      return <TableRow rowKey={ASYNC_LOADING_ROW} columns={columns}></TableRow>;
    },
  },
});
