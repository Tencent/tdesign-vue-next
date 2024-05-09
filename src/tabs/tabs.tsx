import { ComponentPublicInstance, defineComponent, provide, Ref, toRefs } from 'vue';

import isArray from 'lodash/isArray';

import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useConfig';
import useVModel from '../hooks/useVModel';

import props from './props';
import TTabNav from './tab-nav';
import TTabPanel from './tab-panel';
import { TabValue, TdTabsProps } from './type';

export interface InjectTabs {
  value: Ref<TabValue>;
}

export default defineComponent({
  name: 'TTabs',

  props,

  setup(props) {
    const COMPONENT_NAME = usePrefixClass('tabs');
    const classPrefix = usePrefixClass();
    const renderTNodeJSX = useTNodeJSX();

    const { value, modelValue } = toRefs(props);
    const [tabValue, setTabValue] = useVModel(value, modelValue, props.defaultValue || '', props.onChange);

    provide<InjectTabs>('tabs', { value: tabValue });

    // methods
    const onTabAdd = (context: { e: MouseEvent }) => {
      props.onAdd?.({ e: context.e });
    };
    const onTabChange = (value: TabValue) => {
      setTabValue(value);
    };
    const onTabRemove = ({ e, value, index }: Parameters<TdTabsProps['onRemove']>[0]) => {
      props.onRemove?.({ value, index, e });
    };

    // render
    const getSlotPanels = () => {
      const content = renderTNodeJSX('default');
      if (!content) return [];

      const flatContent = (ct: any) => {
        return ct
          .map((item: ComponentPublicInstance) => {
            if (item.children && isArray(item.children)) return flatContent(item.children);
            return item;
          })
          .flat()
          .filter((item: ComponentPublicInstance) => {
            return item.type.name === 'TTabPanel';
          });
      };

      return flatContent(content);
    };
    const renderHeader = () => {
      const panels = (props.list?.length ? props.list : getSlotPanels()) || [];
      const actionContent = renderTNodeJSX('action');
      const panelsData = panels.map((item: ComponentPublicInstance) => {
        const selfItem = item;

        if (item.props) {
          Object.keys(item.props).forEach((key) => {
            selfItem[key] = item.props[key];
          });
        }

        return selfItem;
      });
      const tabNavProps = {
        theme: props.theme,
        value: tabValue.value,
        size: props.size,
        disabled: props.disabled,
        placement: props.placement,
        addable: props.addable,
        panels: panelsData,
        dragSort: props.dragSort,
        action: actionContent,
      };
      return (
        <div
          class={{
            [`${classPrefix.value}-tabs__header`]: true,
            [`${classPrefix.value}-is-${props.placement}`]: true,
          }}
        >
          <TTabNav
            {...tabNavProps}
            onDragSort={props.onDragSort}
            onChange={onTabChange}
            onAdd={onTabAdd}
            onRemove={onTabRemove}
          />
        </div>
      );
    };
    const renderContent = () => {
      const panels = getSlotPanels();
      if (props.list?.length) {
        return props.list.map((item) => <TTabPanel {...item} onRemove={onTabRemove} />);
      }
      if (panels && panels.length) {
        return <div class={[`${classPrefix.value}-tabs__content`]}>{panels}</div>;
      }
    };

    return () => {
      return (
        <div class={[COMPONENT_NAME.value]}>
          {props.placement !== 'bottom' ? [renderHeader(), renderContent()] : [renderContent(), renderHeader()]}
        </div>
      );
    };
  },
});
