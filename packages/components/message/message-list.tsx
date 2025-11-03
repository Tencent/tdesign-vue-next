import { computed, defineComponent, ref } from 'vue';
import type { CSSProperties } from 'vue';
import { PLACEMENT_OFFSET } from './consts';
import TMessage from './message';
import { MessageOptions, MessageItemInternal, MessageMergeConfig } from './type';
import { usePrefixClass } from '@tdesign/shared-hooks';
import { isString } from 'lodash-es';

export const DEFAULT_Z_INDEX = 6000;

const getUniqueId = (() => {
  let id = 0;
  return () => {
    id += 1;
    return id;
  };
})();

export const MessageList = defineComponent({
  name: 'TMessageList',
  props: {
    zIndex: {
      type: Number,
      default: 0,
    },
    placement: {
      type: String,
      default: '',
    },
  },
  setup(props, { expose }) {
    const COMPONENT_NAME = usePrefixClass('message__list');
    const list = ref<MessageItemInternal[]>([]);
    const messageList = ref([]);

    // 全局合并配置
    const globalMergeConfig = ref<MessageMergeConfig>({
      mergeIdentical: false,
      mergeWindow: 500,
      maxMergeCount: 99,
      showMergeCount: true,
      mergeCountFormat: '(×{count})',
    });

    // 合并定时器映射
    const mergeTimers = new Map<string, number>();

    /**
     * 生成消息合并标识
     */
    const generateMergeKey = (msg: MessageOptions): string => {
      if (msg.mergeKey) {
        return msg.mergeKey;
      }
      const content = isString(msg.content) ? msg.content : JSON.stringify(msg.content);
      return `${msg.theme || 'info'}-${content}`;
    };

    /**
     * 格式化显示内容，添加合并计数
     */
    const formatContentWithCount = (item: MessageItemInternal): string | any => {
      const {
        originalContent,
        mergeCount,
        showMergeCount: _showMergeCount,
        mergeCountFormat: _mergeCountFormat,
      } = item;
      const config = { ...globalMergeConfig.value, ...item };

      if (!config.showMergeCount || !mergeCount || mergeCount <= 1) {
        return originalContent || item.content;
      }

      const countText = (config.mergeCountFormat || '(×{count})').replace('{count}', String(mergeCount));

      if (isString(originalContent)) {
        return `${originalContent} ${countText}`;
      }

      return originalContent || item.content;
    };

    const styles = computed(() => ({
      ...(PLACEMENT_OFFSET[props.placement as keyof typeof PLACEMENT_OFFSET] as CSSProperties),
      zIndex: props.zIndex !== DEFAULT_Z_INDEX ? props.zIndex : DEFAULT_Z_INDEX,
    }));

    const add = (msg: MessageOptions): number => {
      const config = { ...globalMergeConfig.value, ...msg };

      // 如果启用了合并功能
      if (config.mergeIdentical) {
        const mergeKey = generateMergeKey(msg);

        // 查找是否存在相同的消息
        const existingIndex = list.value.findIndex((item) => {
          // 使用原始内容生成合并键，避免合并计数影响匹配
          const itemMergeKey = generateMergeKey({
            ...item,
            content: item.originalContent || item.content,
          });
          return itemMergeKey === mergeKey;
        });

        if (existingIndex !== -1) {
          const existingItem = list.value[existingIndex];
          const newCount = (existingItem.mergeCount || 1) + 1;

          // 检查是否超过最大合并次数
          if (newCount <= (config.maxMergeCount || 99)) {
            // 清除之前的合并定时器
            if (existingItem.mergeTimer) {
              clearTimeout(existingItem.mergeTimer);
            }

            // 更新现有消息
            const updatedItem: MessageItemInternal = {
              ...existingItem,
              ...msg, // 使用新消息的配置覆盖
              key: existingItem.key, // 保持原有的 key
              mergeCount: newCount,
              originalContent: existingItem.originalContent || existingItem.content,
              content: formatContentWithCount({
                ...existingItem,
                mergeCount: newCount,
                originalContent: existingItem.originalContent || existingItem.content,
              }),
            };

            // 清除旧的定时器并重新设置消息显示定时器
            if (existingItem.mergeTimer) {
              clearTimeout(existingItem.mergeTimer);
            }
            if (updatedItem.duration && updatedItem.duration > 0) {
              updatedItem.mergeTimer = window.setTimeout(() => {
                // 重新查找消息索引，因为数组可能已经变化
                const currentIndex = list.value.findIndex((item) => item.key === updatedItem.key);
                if (currentIndex !== -1) {
                  remove(currentIndex);
                }
              }, updatedItem.duration);
            }

            list.value[existingIndex] = updatedItem;

            return existingItem.key;
          }
        }

        // 设置合并定时器，在合并窗口期内等待相同消息
        if (config.mergeWindow && config.mergeWindow > 0) {
          const timer = mergeTimers.get(mergeKey);
          if (timer) {
            clearTimeout(timer);
          }

          mergeTimers.set(
            mergeKey,
            window.setTimeout(() => {
              mergeTimers.delete(mergeKey);
            }, config.mergeWindow),
          );
        }
      }

      // 创建新消息
      const mg: MessageItemInternal = {
        ...msg,
        key: getUniqueId(),
        mergeCount: 1,
        originalContent: msg.content,
      };

      // 为新消息设置初始定时器
      if (mg.duration && mg.duration > 0) {
        mg.mergeTimer = window.setTimeout(() => {
          // 重新查找消息索引，因为数组可能已经变化
          const currentIndex = list.value.findIndex((item) => item.key === mg.key);
          if (currentIndex !== -1) {
            remove(currentIndex);
          }
        }, mg.duration);
      }

      list.value.push(mg);
      return mg.key;
    };

    const remove = (index: number) => {
      list.value.splice(index, 1);
    };

    const removeAll = () => {
      // 清除所有合并定时器
      list.value.forEach((item) => {
        if (item.mergeTimer) {
          clearTimeout(item.mergeTimer);
        }
      });
      mergeTimers.forEach((timer) => clearTimeout(timer));
      mergeTimers.clear();

      list.value = [];
    };

    /**
     * 根据合并标识清除消息
     */
    const clearByKey = (mergeKey: string) => {
      const indexesToRemove: number[] = [];

      list.value.forEach((item, index) => {
        const itemMergeKey = generateMergeKey(item);
        if (itemMergeKey === mergeKey) {
          if (item.mergeTimer) {
            clearTimeout(item.mergeTimer);
          }
          indexesToRemove.push(index);
        }
      });

      // 从后往前删除，避免索引变化
      indexesToRemove.reverse().forEach((index) => {
        list.value.splice(index, 1);
      });

      // 清除对应的合并定时器
      if (mergeTimers.has(mergeKey)) {
        clearTimeout(mergeTimers.get(mergeKey));
        mergeTimers.delete(mergeKey);
      }
    };

    /**
     * 配置全局合并选项
     */
    const configMerge = (config: Partial<MessageMergeConfig>) => {
      Object.assign(globalMergeConfig.value, config);
    };

    const getOffset = (val: string | number) => {
      if (!val) return;
      return isNaN(Number(val)) ? val : `${val}px`;
    };

    const msgStyles = (item: MessageItemInternal) => {
      return (
        item.offset && {
          position: 'relative',
          left: getOffset(item.offset[0]),
          top: getOffset(item.offset[1]),
        }
      );
    };

    const getProps = (index: number, item: MessageOptions) => {
      return {
        ...item,
        // 禁用Message组件内部的duration定时器，由MessageList统一管理
        duration: 0,
        onCloseBtnClick: (e: any) => {
          if (item.onCloseBtnClick) {
            item.onCloseBtnClick(e);
          }
          return remove(index);
        },
        onDurationEnd: () => {
          if (item.onDurationEnd) {
            item.onDurationEnd();
          }
          return remove(index);
        },
      };
    };

    const addChild = (el: Element) => {
      if (el) {
        messageList.value.push(el);
      }
    };

    expose({ add, removeAll, clearByKey, configMerge, list, messageList });

    return () => {
      if (!list.value.length) return;

      return (
        <div class={COMPONENT_NAME.value} style={styles.value}>
          {list.value.map((item, index) => (
            <TMessage key={item.key} style={msgStyles(item)} ref={addChild} {...getProps(index, item)} />
          ))}
        </div>
      );
    };
  },
});

export default MessageList;
