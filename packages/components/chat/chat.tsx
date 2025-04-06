import { defineComponent, computed, provide, ref } from 'vue';
import { ClearIcon } from 'tdesign-icons-vue-next';
import { isArray } from 'lodash-es';
import props from './props';
import Divider from '../divider';
import Popconfirm from '../popconfirm';

import { usePrefixClass, useConfig } from '../hooks/useConfig';
import { useTNodeJSX } from '../hooks/tnode';
import ChatItem from './chat-item';
import { TdChatItemProps, ScrollToBottomParams } from './type';

const handleScrollToBottom = (target: HTMLDivElement, behavior?: 'auto' | 'smooth') => {
  const currentScrollHeight = target.scrollHeight;
  const currentClientHeight = target.clientHeight;

  const innerBehavior = behavior ?? 'auto';
  if (innerBehavior === 'auto') {
    target.scrollTop = currentScrollHeight - currentClientHeight;
  } else {
    const startScrollTop = target.scrollTop;
    const endScrollTop = currentScrollHeight - currentClientHeight;
    const duration = 300;
    const step = (endScrollTop - startScrollTop) / duration;
    let startTime: number | undefined;
    // 平滑地修改scrollTop值
    const animateScroll = (time: number) => {
      if (!startTime) {
        startTime = time;
      }
      const elapsed = time - startTime;
      const top = Math.min(endScrollTop, startScrollTop + elapsed * step);
      target.scrollTop = top;
      if (top < endScrollTop) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }
};

export default defineComponent({
  name: 'TChat',
  props,
  emits: ['clear', 'scroll'],
  setup(props, { emit, expose, slots }) {
    const COMPONENT_NAME = usePrefixClass('chat');
    const { globalConfig } = useConfig('chat');
    const { clearHistoryBtnText, confirmClearHistory } = globalConfig.value;
    const renderTNodeJSX = useTNodeJSX();
    provide('textLoading', props.textLoading);
    provide('animation', props.animation);
    provide('reverse', props.reverse);
    const classes = computed(() => {
      return [
        COMPONENT_NAME.value,
        {
          [`${COMPONENT_NAME.value}--normal`]: props.layout === 'both',
        },
      ];
    });
    // 默认反转布局
    const listClasses = computed(() => {
      return [
        `${COMPONENT_NAME.value}__list`,
        {
          [`${COMPONENT_NAME.value}__list--reverse`]: props.reverse,
        },
      ];
    });
    const renderBody = () => {
      /**
       * 1. 两种方式获取要渲染的 list
       *  a. props 传 data
       *  b. slots t-chat-item
       * a 优先级更高
       */
      const data = renderTNodeJSX('data');
      if (isArray(data) && data.length > 0) {
        const isLoading = (index: number) => {
          return (props.reverse ? index === 0 : index === data.length - 1) && props.textLoading;
        };
        const isReasoningLoading = (index: number) => {
          return (props.reverse ? index === 0 : index === data.length - 1) && props.isStreamLoad;
        };
        // 判断content是否为插槽，如果是插槽，则关闭reasoning默认渲染
        const setReasoning = (item: TdChatItemProps) => {
          return slots.content ? false : item.reasoning;
        };
        return data.map((item: TdChatItemProps, index: number) => (
          <ChatItem
            avatar={item.avatar}
            name={item.name}
            role={item.role}
            datetime={item.datetime}
            content={item.content}
            reasoning={setReasoning(item)}
            reasoningLoading={isReasoningLoading(index)}
            text-loading={isLoading(index)}
            itemIndex={index}
            animation={props.animation}
            v-slots={{
              actions: () =>
                renderTNodeJSX('actions', {
                  params: { item, index },
                }),
              name: () => renderTNodeJSX('name', { params: { item, index } }),
              avatar: () => renderTNodeJSX('avatar', { params: { item, index } }),
              datetime: () => renderTNodeJSX('datetime', { params: { item, index } }),
              content: () => renderTNodeJSX('content', { params: { item, index } }),
            }}
          />
        ));
      } else {
        return renderTNodeJSX('default');
      }
    };
    const clearConfirm = (context: { e: MouseEvent }) => {
      emit('clear', context);
    };
    const defaultClearHistory = (
      <Popconfirm content={confirmClearHistory} onConfirm={clearConfirm}>
        <Divider class="clear-btn">
          <ClearIcon size="14px" />
          <span class="clear-btn-text">{clearHistoryBtnText}</span>
        </Divider>
      </Popconfirm>
    );
    const showFooter = computed(() => renderTNodeJSX('footer'));
    const chatBoxRef = ref<HTMLDivElement>();
    // 滚动到底部
    const scrollToBottom = (data: ScrollToBottomParams) => {
      if (!chatBoxRef.value) return;
      const { behavior = 'auto' } = data;
      handleScrollToBottom(chatBoxRef.value, behavior);
    };
    const handleScroll = (e: Event) => {
      emit('scroll', {
        e,
      });
    };
    expose({
      scrollToBottom,
    });
    // clearHistory为true时，清空历史记录显示
    // return里的props是响应式
    // 倒序渲染不影响清空历史的位置
    return () => (
      <div class={classes.value}>
        <div class={listClasses.value} ref={chatBoxRef} onScroll={handleScroll}>
          {props.reverse && <div class="place-holder"></div>}
          {props.reverse && props.clearHistory && renderTNodeJSX('clearHistory', defaultClearHistory)}
          {renderBody()}
          {!props.reverse && props.clearHistory && renderTNodeJSX('clearHistory', defaultClearHistory)}
        </div>
        {showFooter.value && <div class={`${COMPONENT_NAME.value}__footer`}>{showFooter.value}</div>}
      </div>
    );
  },
});
