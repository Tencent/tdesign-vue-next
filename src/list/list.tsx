import { defineComponent, VNodeChild, computed, ref } from 'vue';
import isString from 'lodash/isString';
import omit from 'lodash/omit';
import { useTNodeJSX } from '../hooks/tnode';
import TLoading from '../loading';
import TListItem from './list-item';
import props from './props';
import { LOAD_MORE, LOADING } from './const';
import { useConfig, usePrefixClass, useCommonClassName } from '../hooks/useConfig';
import { useListItems } from './hooks/useListItems';
import { useListVirtualScroll } from './hooks/useListVirtualScroll';

import type { TdListProps } from './type';

export default defineComponent({
  name: 'TList',
  props: {
    ...props,
  },
  setup(props: TdListProps) {
    const listRef = ref();

    const { globalConfig } = useConfig('list');
    const COMPONENT_NAME = usePrefixClass('list');
    const { SIZE } = useCommonClassName();
    const renderTNodeJSX = useTNodeJSX();
    const { listItems } = useListItems();

    const { virtualConfig, cursorStyle, listStyle, isVirtualScroll, onInnerVirtualScroll } = useListVirtualScroll(
      props.scroll,
      listRef,
      listItems,
    );

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
      const isVirtualScroll = virtualConfig.isVirtualScroll.value;
      return (
        <>
          {propsHeaderContent ? <div class={`${COMPONENT_NAME.value}__header`}>{propsHeaderContent}</div> : null}
          {isVirtualScroll ? (
            <>
              <div style={cursorStyle.value}></div>
              <ul class={`${COMPONENT_NAME.value}__inner`} style={listStyle.value}>
                {virtualConfig.visibleData.value.map((item) => (
                  <>
                    <TListItem v-slots={item.slots} {...omit(item, 'slots')}></TListItem>
                  </>
                ))}
              </ul>
            </>
          ) : (
            <ul class={`${COMPONENT_NAME.value}__inner`}>{renderTNodeJSX('default')}</ul>
          )}
          {propsFooterContent ? <div class={`${COMPONENT_NAME.value}__footer`}>{propsFooterContent}</div> : null}
        </>
      );
    };
    /** 列表基础逻辑 end */

    /** 滚动相关逻辑 start */
    const handleScroll = (e: WheelEvent) => {
      const listElement = e.target as HTMLElement;
      const { scrollTop, scrollHeight, clientHeight } = listElement;
      if (isVirtualScroll.value) onInnerVirtualScroll(e);
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
      listRef,
      isVirtualScroll,
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
      <div
        class={this.listClass}
        onScroll={this.handleScroll}
        ref="listRef"
        style={this.isVirtualScroll ? 'position:relative' : null}
      >
        {listContent}
      </div>
    );
  },
});
