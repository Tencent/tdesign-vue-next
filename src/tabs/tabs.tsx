import { ComponentPublicInstance, defineComponent, provide, Ref, toRefs } from 'vue';
import TTabPanel from './tab-panel';
import TTabNav from './tab-nav';
import { TabValue, TdTabsProps } from './type';
import props from './props';

import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../hooks/useConfig';
import useVModel from '../hooks/useVModel';

export interface InjectTabs {
  value: Ref<TabValue>;
}

export default defineComponent({
  name: 'TTabs',

  components: {
    TTabPanel,
    TTabNav,
  },

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
      props.onRemove({ value, index, e });
    };

    // render
    const getSlotPanels = () => {
      let content = renderTNodeJSX('default');
      if (!content) return [];
      content = content
        .map((item: ComponentPublicInstance) => {
          if (item.children && Array.isArray(item.children)) return item.children;
          return item;
        })
        .flat()
        .filter((item: ComponentPublicInstance) => {
          return item.type.name === 'TTabPanel';
        });

      return content;
    };
    const renderHeader = () => {
      const panels = (props.list?.length ? props.list : getSlotPanels()) || [];
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
      console.warn('Tdesign error: list or slots is empty');
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
