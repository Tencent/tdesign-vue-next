import { defineComponent, VNodeChild, computed } from 'vue';
import { useTNodeJSX } from '../hooks/tnode';
import TLoading from '../loading';
import props from './props';
import { TdListProps } from './type';
import CLASSNAMES from '../utils/classnames';
import { LOAD_MORE, LOADING } from './const';
import { useConfig, usePrefixClass } from '../hooks/useConfig';

export default defineComponent({
  name: 'TList',
  props: {
    ...props,
  },
  setup(props: TdListProps) {
    const { global } = useConfig('list');
    const COMPONENT_NAME = usePrefixClass('list');

    const renderTNodeJSX = useTNodeJSX();
    /** 列表基础逻辑 start */
    const listClass = computed(() => {
      return [
        `${COMPONENT_NAME.value}`,
        CLASSNAMES.SIZE[props.size],
        {
          [`${COMPONENT_NAME.value}--split`]: props.split,
          [`${COMPONENT_NAME.value}--stripe`]: props.stripe,
          [`${COMPONENT_NAME.value}--vertical-action`]: props.layout === 'vertical',
        },
      ];
    });
    const renderContent = (): VNodeChild => {
      const propsHeaderContent = renderTNodeJSX('header');
      const propsFooterContent = renderTNodeJSX('footer');
      return [
        propsHeaderContent && <div class={`${COMPONENT_NAME.value}__header`}>{propsHeaderContent}</div>,
        <ul class={`${COMPONENT_NAME.value}__inner`}>{renderTNodeJSX('default')}</ul>,
        propsFooterContent && <div class={`${COMPONENT_NAME.value}__footer`}>{propsFooterContent}</div>,
      ];
    };
    /** 列表基础逻辑 end */

    /** 滚动相关逻辑 start */

    const handleScroll = (e: WheelEvent | Event) => {
      const listElement = e.target as HTMLElement;
      const { scrollTop, scrollHeight, clientHeight } = listElement;
      props.onScroll?.({
        e,
        scrollTop,
        scrollBottom: scrollHeight - clientHeight - scrollTop,
      });
    };
    /** 滚动相关逻辑 end */

    /** loading加载相关逻辑 start */
    const loadingClass = computed(() => {
      return typeof props.asyncLoading === 'string' && ['loading', 'load-more'].includes(props.asyncLoading)
        ? `${COMPONENT_NAME.value}__load ${COMPONENT_NAME.value}__load--${props.asyncLoading}`
        : `${COMPONENT_NAME.value}__load`;
    });

    const renderLoading = () => {
      if (props.asyncLoading && typeof props.asyncLoading === 'string') {
        if (props.asyncLoading === LOADING) {
          return (
            <div>
              <TLoading />
              <span>{global.value.loadingText}</span>
            </div>
          );
        }
        if (props.asyncLoading === LOAD_MORE) {
          return <span>{global.value.loadingMoreText}</span>;
        }
      }
      return renderTNodeJSX('asyncLoading');
    };

    const handleLoadMore = (e: MouseEvent) => {
      if (typeof props.asyncLoading === 'string' && props.asyncLoading !== LOAD_MORE) return;
      props.onLoadMore?.({ e });
    };
    /** loading加载相关逻辑 end */
    return {
      COMPONENT_NAME,
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
