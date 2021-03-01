import Vue, { VNode, PropType } from 'vue';
import { prefix } from '../config';
import props from '@TdTypes/list/props';
import { renderTNodeJSX } from '../utils/render-tnode';
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
    renderLoading() {
      if (this.loading && typeof this.loading === 'string') {
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
      return renderTNodeJSX(this, 'loading');
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
        this.header && <div class={`${name}__header`}>{renderTNodeJSX(this, 'header')}</div>,
        <ul class={`${name}-items`}>{renderTNodeJSX(this, 'default')}</ul>,
        this.footer && <div class={`${name}__footer`}>{renderTNodeJSX(this, 'footer')}</div>,
      ];
    },
  },
  render(): VNode {
    let listContent: ScopedSlotReturnValue = this.renderContent();

    listContent = [
      listContent,
      <div class={this.loadingClass} onClick={this.handleLoadMore}>
        {this.renderLoading()}
      </div>,
    ];

    return (
      <div class={this.listClass} onScroll={this.handleScroll}>
        {listContent}
      </div>
    );
  },
});
