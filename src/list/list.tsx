import Vue, { CreateElement, VNode, PropType } from 'vue';
import { prefix } from '../config';
import props from '@TdTypes/list/props';
import { renderPropNode } from '../mixins/utils';
import TIconLoading from '../icon/loading';
import CLASSNAMES from '../utils/classnames';
import { LOAD_MORE, LOADING } from './const';
import { TdListProps } from '@TdTypes/list/TdListProps';
import { ScopedSlotReturnValue } from 'vue/types/vnode';

const name = `${prefix}-list`;

export default Vue.extend({
  name,
  props: {
    ...props,
    loading: {
      type: [String, Number, Function] as PropType<TdListProps['loading']>,
      default: undefined,
      validator(val: string | Function | number): boolean {
        if (typeof val === 'string') {
          return ['loading', 'loading-more'].includes(val);
        }
        return true;
      },
    },
  },
  computed: {
    listClass(): ClassName {
      return [
        `${name}`,
        CLASSNAMES.SIZE[this.size],
        {
          [`${name}--split`]: this.split,
          [`${name}--stripe`]: this.stripe,
          [`${name}--vertical-action`]: this.layout === 'vertical',
        },
      ];
    },
    loadingClass(): ClassName {
      return typeof this.loading === 'string' ? `${name}__load ${name}__load--${this.loading}` : `${name}__load`;
    },
  },
  components: {
    TIconLoading,
  },
  methods: {
    renderLoading(h: CreateElement) {
      if (typeof this.loading === 'function') {
        return this.loading(h);
      }
      if (!this.loading && this.$scopedSlots.loading) {
        return this.$scopedSlots.loading(null);
      }
      if (typeof this.loading === 'string') {
        if (this.loading === LOADING) {
          return (
            <div>
              <TIconLoading />
              <span>正在加载中，请稍等</span>
            </div>
          );
        }
        if (this.loading === LOAD_MORE) {
          return <span>点击加载更多</span>;
        }
      }
      return this.loading;
    },
    handleScroll(e: WheelEvent | Event) {
      const listElement = this.$el as HTMLElement;
      const { scrollTop, scrollHeight, clientHeight } = listElement;
      this.$emit('scroll', {
        $event: e,
        scrollTop,
        scrollBottom: scrollHeight - clientHeight - scrollTop,
      });
      if (this.onScroll) {
        this.onScroll({
          e,
          scrollTop,
          scrollBottom: scrollHeight - clientHeight - scrollTop,
        });
      }
    },
    handleLoadMore(e: MouseEvent) {
      if (typeof this.loading === 'string' && this.loading !== LOAD_MORE) return;
      this.$emit('load-more', e);
      if (this.onLoadMore) {
        this.onLoadMore({
          e,
        });
      }
    },
    renderContent() {
      return [
        typeof renderPropNode(this, 'header') !== 'undefined' ? (
          <div class={`${name}__header`}>{renderPropNode(this, 'header')}</div>
        ) : (
          undefined
        ),
        <ul class={`${name}-items`}>{this.$scopedSlots.default ? this.$scopedSlots.default(null) : ''}</ul>,
        typeof renderPropNode(this, 'footer') !== 'undefined' ? (
          <div class={`${name}__footer`}>{renderPropNode(this, 'footer')}</div>
        ) : (
          undefined
        ),
      ];
    },
  },
  render(h: CreateElement): VNode {
    let listContent: ScopedSlotReturnValue = this.renderContent();

    listContent = [
      listContent,
      <div class={this.loadingClass} onClick={this.handleLoadMore}>
        {this.renderLoading(h)}
      </div>,
    ];

    return (
      <div class={this.listClass} onScroll={this.handleScroll}>
        {listContent}
      </div>
    );
  },
});
