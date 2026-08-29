import { defineComponent, computed, toRefs } from 'vue';
import { CheckCircleIcon, ErrorCircleIcon, ChevronDownIcon, LoadingIcon } from 'tdesign-icons-vue-next';
import { usePrefixClass, useTNodeJSX, useVModel } from '@tdesign/shared-hooks';
import props from './chat-thought-chain-props';
import type { TdThoughtChainItem } from '../type';
import './chat-thought-chain.less';

export default defineComponent({
  name: 'TChatThoughtChain',
  props,
  emits: ['update:expandedValue'],
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('chat');
    const renderTNodeJSX = useTNodeJSX();
    const baseClass = computed(() => `${COMPONENT_NAME.value}__thought-chain`);

    const { expandedValue, modelValue } = toRefs(props);
    const [innerExpanded, setInnerExpanded] = useVModel(
      expandedValue,
      modelValue,
      props.defaultExpandedValue,
      props.onExpandChange,
      'expandedValue',
    );

    const getItemKey = (item: TdThoughtChainItem, index: number) => item.key ?? index;

    const isExpanded = (item: TdThoughtChainItem, index: number) =>
      (innerExpanded.value || []).includes(getItemKey(item, index));

    const toggleExpand = (item: TdThoughtChainItem, index: number) => {
      if (!props.collapsible || !item.content) return;
      const key = getItemKey(item, index);
      const expanded = !isExpanded(item, index);
      const next = expanded
        ? [...(innerExpanded.value || []), key]
        : (innerExpanded.value || []).filter((k) => k !== key);
      setInnerExpanded(next, { item, index, expanded });
    };

    const renderItemNode = (node: TdThoughtChainItem['title']) => (typeof node === 'function' ? node(null) : node);

    const renderIcon = (item: TdThoughtChainItem, index: number) => {
      const custom = renderTNodeJSX('icon', { params: { item, index } }) ?? renderItemNode(item.icon);
      if (custom) return custom;
      const status = item.status || 'pending';
      if (status === 'success') return <CheckCircleIcon />;
      if (status === 'error') return <ErrorCircleIcon />;
      if (status === 'processing') return <LoadingIcon />;
      return <span class={`${baseClass.value}-dot`} />;
    };

    return () => (
      <div class={baseClass.value}>
        {(props.items || []).map((item, index) => {
          const status = item.status || 'pending';
          const expanded = isExpanded(item, index);
          const expandable = props.collapsible && Boolean(item.content);
          const title = renderTNodeJSX('title', { params: { item, index } }) ?? renderItemNode(item.title);
          const content = renderTNodeJSX('content', { params: { item, index } }) ?? renderItemNode(item.content);
          return (
            <div
              key={getItemKey(item, index)}
              class={[
                `${baseClass.value}-item`,
                `${baseClass.value}-item--${status}`,
                { [`${baseClass.value}-item--expanded`]: expanded },
              ]}
            >
              <div class={`${baseClass.value}-item__node`}>
                <span class={`${baseClass.value}-item__icon`}>{renderIcon(item, index)}</span>
                {index < (props.items || []).length - 1 && <span class={`${baseClass.value}-item__line`} />}
              </div>
              <div class={`${baseClass.value}-item__detail`}>
                <div
                  class={[
                    `${baseClass.value}-item__header`,
                    { [`${baseClass.value}-item__header--collapsible`]: expandable },
                  ]}
                  onClick={() => toggleExpand(item, index)}
                >
                  <span class={`${baseClass.value}-item__title`}>{title}</span>
                  {expandable && <ChevronDownIcon class={`${baseClass.value}-item__arrow`} />}
                </div>
                {item.content && expanded && <div class={`${baseClass.value}-item__content`}>{content}</div>}
              </div>
            </div>
          );
        })}
      </div>
    );
  },
});
