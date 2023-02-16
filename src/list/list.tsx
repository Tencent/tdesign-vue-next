import { defineComponent, VNodeChild, computed } from 'vue';
import { useTNodeJSX } from '../hooks/tnode';
import TLoading from '../loading';
import props from './props';
import { TdListProps } from './type';
import { LOAD_MORE, LOADING } from './const';
import { useConfig, usePrefixClass, useCommonClassName } from '../hooks/useConfig';
import isString from 'lodash/isString';

export default defineComponent({
  name: 'TList',
  props: {
    ...props,
  },
  setup(props: TdListProps) {
    const { globalConfig } = useConfig('list');
    const COMPONENT_NAME = usePrefixClass('list');
    const { SIZE } = useCommonClassName();
    const renderTNodeJSX = useTNodeJSX();

    /** 列表基础逻辑 start */
    const listClass = computed(() => {
      return [
        `${COMPONENT_NAME.value}`,
        SIZE.value[props.size],
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
      return isString(props.asyncLoading) && ['loading', 'load-more'].includes(props.asyncLoading)
        ? `${COMPONENT_NAME.value}__load ${COMPONENT_NAME.value}__load--${props.asyncLoading}`
        : `${COMPONENT_NAME.value}__load`;
    });

    const renderLoading = () => {
      if (props.asyncLoading && isString(props.asyncLoading)) {
        if (props.asyncLoading === LOADING) {
          return (
            <div>
              <TLoading />
              <span>{globalConfig.value.loadingText}</span>
            </div>
          );
        }
        if (props.asyncLoading === LOAD_MORE) {
          return <span>{globalConfig.value.loadingMoreText}</span>;
        }
      }
      return renderTNodeJSX('asyncLoading');
    };

    const handleLoadMore = (e: MouseEvent) => {
      if (isString(props.asyncLoading) && props.asyncLoading !== LOAD_MORE) return;
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
