import { defineComponent, PropType, computed } from 'vue';

import { CascaderContextType } from '../types';
import CascaderProps from '../props';
import { useConfig, usePrefixClass, useTNodeDefault } from '@tdesign/shared-hooks';
import { getPanels } from '../utils';
import List from './List';

export default defineComponent({
  name: 'TCascaderSubPanel',
  props: {
    option: CascaderProps.option,
    options: CascaderProps.options,
    empty: CascaderProps.empty,
    trigger: CascaderProps.trigger,
    onChange: CascaderProps.onChange,
    loading: CascaderProps.loading,
    loadingText: CascaderProps.loadingText,
    cascaderContext: {
      type: Object as PropType<CascaderContextType>,
    },
    scroll: CascaderProps.scroll,
  },

  setup(props) {
    const renderTNodeJSXDefault = useTNodeDefault();
    const COMPONENT_NAME = usePrefixClass('cascader');
    const { globalConfig } = useConfig('cascader');

    const panels = computed(() => getPanels(props.cascaderContext.treeNodes));

    const renderPanels = () => {
      const { inputVal, treeNodes } = props.cascaderContext;

      return inputVal ? (
        <List
          treeNodes={treeNodes}
          isFilter
          option={props.option}
          cascaderContext={props.cascaderContext}
          scroll={props.scroll}
          trigger={props.trigger}
        />
      ) : (
        panels.value.map((treeNodes, index: number) => (
          <List
            treeNodes={treeNodes}
            isFilter={false}
            segment={index !== panels.value.length - 1}
            key={`${COMPONENT_NAME}__menu${index}`}
            listKey={`${COMPONENT_NAME}__menu${index}`}
            level={index}
            option={props.option}
            cascaderContext={props.cascaderContext}
            scroll={props.scroll}
            trigger={props.trigger}
          />
        ))
      );
    };

    return () => {
      let content;
      if (props.loading) {
        content = renderTNodeJSXDefault(
          'loadingText',
          <div class={`${COMPONENT_NAME.value}__panel--empty`}>{globalConfig.value.loadingText}</div>,
        );
      } else {
        content = panels.value.length
          ? renderPanels()
          : renderTNodeJSXDefault(
              'empty',
              <div class={`${COMPONENT_NAME.value}__panel--empty`}>{globalConfig.value.empty}</div>,
            );
      }
      return (
        <div
          class={[
            `${COMPONENT_NAME.value}__panel`,
            { [`${COMPONENT_NAME.value}--normal`]: panels.value.length && !props.loading },
          ]}
        >
          {content}
        </div>
      );
    };
  },
});
