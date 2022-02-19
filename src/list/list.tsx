import { defineComponent, VNodeChild, computed, ComponentPublicInstance, ref } from 'vue';
import { useTNodeJSX } from '../hooks/tnode';
import { useEmitEvent } from '../hooks/event';
import TLoading from '../loading';
import { prefix } from '../config';
import props from './props';
import CLASSNAMES from '../utils/classnames';
import { LOAD_MORE, LOADING } from './const';
import { ClassName } from '../common';

const name = `${prefix}-list`;

export default defineComponent({
  name: 'TList',
  props: {
    ...props,
  },
  emits: ['scroll', 'load-more'],
  setup(props) {
    const emitEvent = useEmitEvent();
    const renderTNodeJSX = useTNodeJSX();
    /** 列表基础逻辑 start */
    const listClass = computed<ClassName>(() => {
      return [
        `${name}`,
        CLASSNAMES.SIZE[props.size],
        {
          [`${name}--split`]: props.split,
          [`${name}--stripe`]: props.stripe,
          [`${name}--vertical-action`]: props.layout === 'vertical',
        },
      ];
    });
    const renderContent = (): VNodeChild => {
      const propsHeaderContent = renderTNodeJSX('header');
      const propsFooterContent = renderTNodeJSX('footer');
      return [
        propsHeaderContent && <div class={`${name}__header`}>{propsHeaderContent}</div>,
        <ul class={`${name}__inner`}>{renderTNodeJSX('default')}</ul>,
        propsFooterContent && <div class={`${name}__footer`}>{propsFooterContent}</div>,
      ];
    };
    /** 列表基础逻辑 end */

    /** 滚动相关逻辑 start */

    const handleScroll = (e: WheelEvent | Event) => {
      const listElement = e.target as HTMLElement;
      const { scrollTop, scrollHeight, clientHeight } = listElement;
      emitEvent('scroll', {
        $event: e,
        scrollTop,
        scrollBottom: scrollHeight - clientHeight - scrollTop,
      });
    };
    /** 滚动相关逻辑 end */

    /** loading加载相关逻辑 start */
    const loadingClass = computed(() => {
      return typeof props.asyncLoading === 'string' && ['loading', 'load-more'].includes(props.asyncLoading)
        ? `${name}__load ${name}__load--${props.asyncLoading}`
        : `${name}__load`;
    });

    const renderLoading = () => {
      if (props.asyncLoading && typeof props.asyncLoading === 'string') {
        if (props.asyncLoading === LOADING) {
          return (
            <div>
              <TLoading />
              <span>正在加载中，请稍等</span>
            </div>
          );
        }
        if (props.asyncLoading === LOAD_MORE) {
          return <span>点击加载更多</span>;
        }
      }
      return renderTNodeJSX('asyncLoading');
    };

    const handleLoadMore = (e: MouseEvent) => {
      if (typeof props.asyncLoading === 'string' && props.asyncLoading !== LOAD_MORE) return;
      emitEvent('load-more', { e });
    };
    /** loading加载相关逻辑 end */
    return {
      listClass,
      loadingClass,
      renderLoading,
      renderContent,
      handleScroll,
      handleLoadMore,
    };
  },

  render() {
    let listContent = this.renderContent();
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
