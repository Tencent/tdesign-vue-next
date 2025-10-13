import { defineComponent, computed, provide, ref, onMounted, onUnmounted } from 'vue';
import { ClearIcon } from 'tdesign-icons-vue-next';
import { useConfig } from 'tdesign-vue-next/es/config-provider/hooks';
import { isArray, throttle } from 'lodash-es';

import props from './props';
import { Divider, Popconfirm } from 'tdesign-vue-next';
import { usePrefixClass, useTNodeJSX } from '@tdesign/shared-hooks';
import ChatMessage from '../chat-message';
import { TdChatItemMeta, ScrollToBottomParams } from '../type';

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
  setup(props, { emit, expose }) {
    const COMPONENT_NAME = usePrefixClass('chat');
    const { globalConfig } = useConfig('chat');
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
        // webc是通过message的content是否有值来判断是否是loading状态
        // const isLoading = (index: number) => {
        //   return (props.reverse ? index === 0 : index === data.length - 1) && props.textLoading;
        // };
        // const isReasoningLoading = (index: number) => {
        //   return (props.reverse ? index === 0 : index === data.length - 1) && props.isStreamLoad;
        // };
        // 判断content是否为插槽，如果是插槽，则关闭reasoning默认渲染
        // const setReasoning = (item: TdChatItemMeta) => {
        //   return slots.content ? false : item.reasoning;
        // };
        // 根据layout来设置placement，both时仅对user、assistant设置placement，其他值使用默认left
        const setPlacement = (item: TdChatItemMeta) => {
          if (props.layout === 'both') {
            if (item.role === 'assistant') return 'left';
            if (item.role === 'user') return 'right';
            return 'left'; // 其他role使用默认值
          }
          return 'left';
        };
        return data.map((item: TdChatItemMeta, index: number) => (
          <ChatMessage
            avatar={item.avatar}
            name={item.name}
            role={item.role}
            status={props.textLoading && (props.reverse ? index === 0 : index === data.length - 1) ? 'pending' : ''}
            content={item.content}
            datetime={item.datetime}
            animation={props.animation}
            placement={setPlacement(item)}
            v-slots={{
              actionbar: () =>
                renderTNodeJSX('actionbar', {
                  params: { item, index },
                }) ||
                renderTNodeJSX('actions', {
                  params: { item, index },
                }),
              name: () => renderTNodeJSX('name', { params: { item, index } }),
              avatar: () => renderTNodeJSX('avatar', { params: { item, index } }),
              datetime: () => renderTNodeJSX('datetime', { params: { item, index } }),
              header: () => renderTNodeJSX('header', { params: { item, index } }),
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
      <Popconfirm content={globalConfig.value.confirmClearHistory} onConfirm={clearConfirm}>
        <Divider class="clear-btn">
          <ClearIcon size="14px" />
          <span class="clear-btn-text">{globalConfig.value.clearHistoryBtnText}</span>
        </Divider>
      </Popconfirm>
    );
    const showFooter = computed(() => renderTNodeJSX('footer'));
    const listRef = ref<HTMLDivElement>();
    const innerRef = ref<HTMLDivElement>();
    // 自动滚动相关状态
    const scrollTopTmp = ref(0);
    const scrollHeightTmp = ref(0);
    const preventAutoScroll = ref(false);
    const isAutoScrollEnabled = ref(false);
    const observer = ref<ResizeObserver | null>(null);

    // 滚动到底部
    const scrollToBottom = (data: ScrollToBottomParams) => {
      if (!listRef.value) return;
      const { behavior = 'auto' } = data;
      handleScrollToBottom(listRef.value, behavior);
    };

    /** 触发自动滚动 */
    const handleAutoScroll = throttle(() => {
      const { autoScroll, defaultScrollTo } = props;
      if (!autoScroll || !isAutoScrollEnabled.value) {
        return;
      }

      if (!listRef.value) return;

      if (defaultScrollTo === 'top') {
        listRef.value.scrollTo({
          top: 0,
          behavior: 'auto',
        });
      } else {
        scrollToBottom({
          behavior: 'auto',
        });
      }
    }, 50);

    /** 检测自动滚动是否触发 */
    const checkAutoScroll = throttle(() => {
      if (!listRef.value) return;
      const { scrollTop, scrollHeight, clientHeight } = listRef.value;
      const { defaultScrollTo } = props;

      // 判断上滚：总高度未变更 && 滚动diff大于阈值
      const scrollDiff = scrollTopTmp.value - scrollTop;
      const upScroll = scrollHeight === scrollHeightTmp.value && scrollDiff >= 10 ? true : false;
      // 用户主动上滚，取消自动滚动，标记为手动阻止
      if (upScroll) {
        isAutoScrollEnabled.value = false;
        preventAutoScroll.value = true;
      } else {
        const threshold = 50;
        let isNearTarget = false;

        if (defaultScrollTo === 'top') {
          // 滚动到顶部模式：检查是否接近顶部
          isNearTarget = scrollTop <= threshold;
        } else {
          // 滚动到底部模式：检查是否接近底部
          isNearTarget = scrollHeight - (scrollTop + clientHeight) <= threshold;
        }

        // 如果手动阻止，必须滚动至目标位置阈值内才可恢复自动滚动
        if (preventAutoScroll.value) {
          if (isNearTarget) {
            isAutoScrollEnabled.value = true;
            preventAutoScroll.value = false;
          }
          // 未手动阻止，可触发自动滚动
        } else {
          isAutoScrollEnabled.value = true;
        }
      }
      scrollTopTmp.value = scrollTop;
    }, 60);

    const handleScroll = (e: Event) => {
      checkAutoScroll();
      emit('scroll', {
        e,
      });
    };

    // 初始化自动滚动
    onMounted(() => {
      const { defaultScrollTo } = props;
      defaultScrollTo === 'bottom' && (isAutoScrollEnabled.value = true);

      const list = listRef.value;
      const inner = innerRef.value;
      if (list) {
        observer.value = new ResizeObserver(() => {
          // 高度变化，触发滚动校验
          if (list?.scrollHeight !== scrollHeightTmp.value) {
            handleAutoScroll();
          }
          scrollHeightTmp.value = list?.scrollHeight || 0;
        });
        if (inner) {
          observer.value?.observe(inner);
        }
      }
    });

    onUnmounted(() => {
      observer.value?.disconnect();
    });

    expose({
      scrollToBottom,
    });

    // clearHistory为true时，清空历史记录显示
    // return里的props是响应式
    // 倒序渲染不影响清空历史的位置
    return () => (
      <div class={classes.value}>
        <div class={listClasses.value} ref={listRef} onScroll={handleScroll}>
          {props.reverse && <div class="place-holder"></div>}
          {props.reverse && props.clearHistory && renderTNodeJSX('clearHistory', defaultClearHistory)}
          <div ref={innerRef}>{renderBody()}</div>
          {!props.reverse && props.clearHistory && renderTNodeJSX('clearHistory', defaultClearHistory)}
        </div>
        {showFooter.value && <div class={`${COMPONENT_NAME.value}__footer`}>{showFooter.value}</div>}
      </div>
    );
  },
});
