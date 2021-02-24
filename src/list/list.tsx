import Vue, { CreateElement, VNode, PropType } from 'vue';
import { prefix } from '../config';
import RenderComponent from '../utils/render-component';
import props from '@TdTypes/list/props';
import TIconLoading from '../icon/loading';
import CLASSNAMES from '../utils/classnames';
import { LOAD_MORE, LOADING } from './const';
import { TdListProps } from '@TdTypes/list/TdListProps';

const name = `${prefix}-list`;

export default Vue.extend({
  name,
  // 暂时手动重写validator
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
  components: {
    RenderComponent,
    TIconLoading,
  },
  methods: {
    renderLoading(h: CreateElement) {
      if (typeof this.loading === 'function') {
        return this.loading(h);
      } if (typeof this.loading === 'number') {
        return <span>{this.loading}</span>;
      } if (typeof this.loading === 'string') {
        if (this.loading === LOADING) {
          return (
            <div>
              <TIconLoading />
              <span>&nbsp;&nbsp;正在加载中，请稍等</span>
            </div>
          );
        }
        if (this.loading === LOAD_MORE) {
          return <span>点击加载更多</span>;
        }
      }

      if (this.$slots.loading) {
        return this.$slots.loading;
      }

      return undefined;
    },
    renderPropContent(h: CreateElement, propName: 'header' | 'footer') {
      const propsContent = this[propName];

      if (typeof propsContent === 'function') {
        return propsContent(h);
      } if (typeof propsContent === 'number' || typeof propsContent === 'string') {
        return <div class={`${name}__${propName}`}>{propsContent}</div>;
      }

      if (this.$slots[propName]) {
        return <div class={`${name}__${propName}`}>{this.$slots[propName]}</div>;
      }
      return undefined;
    },
    handleScroll(e: any) {
      const refListElem = this.$refs.refListElem as HTMLElement;
      const { scrollTop, scrollHeight, clientHeight } = refListElem;
      this.$emit('scroll', {
        $event: e,
        scrollTop,
        scrollBottom: scrollHeight - clientHeight - scrollTop,
      });
      if (this.onScroll) {
        this.onScroll(e);
      }
    },
    handleLoadMore(e: any) {
      if (typeof this.loading === 'string' && this.loading !== LOAD_MORE) return;
      this.$emit('load-more');
      if (this.onLoadMore) {
        this.onLoadMore(e);
      }
    },
    renderContent(h: CreateElement) {
      const propsHeaderContent = this.renderPropContent(h, 'header');
      const propsFooterContent = this.renderPropContent(h, 'footer');
      return [
        propsHeaderContent,
        <ul class={`${name}-items`}>{this.$slots.default ? this.$slots.default : ''}</ul>,
        propsFooterContent,
      ];
    },
  },
  render(h: CreateElement): VNode {
    let listContent: JsxNode = this.renderContent(h);

    const listClass = [
      `${name}`,
      CLASSNAMES.SIZE[this.size],
      {
        [`${name}--split`]: this.split,
        [`${name}--stripe`]: this.stripe,
        [`${name}--vertical-action`]: this.layout === 'vertical',
      },
    ];

    listContent = [
      listContent,
      <div
        class={typeof this.loading === 'string' ? `${name}__load ${name}__load--${this.loading}` : `${name}__load`}
        onClick={this.handleLoadMore}
      >
        {this.renderLoading(h)}
      </div>,
    ];

    return (
      <div class={listClass} onScroll={this.handleScroll} ref="refListElem">
        {listContent}
      </div>
    );
  },
});
