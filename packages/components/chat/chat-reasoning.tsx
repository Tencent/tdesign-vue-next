import { defineComponent, computed, provide, inject, ComputedRef, toRefs } from 'vue';
import { usePrefixClass } from '../hooks/useConfig';
import props from './chat-reasoning-props';
import { Collapse, CollapsePanel } from '../collapse';
import { useTNodeJSX } from '../hooks/tnode';
import useVModel from '../hooks/useVModel';

export default defineComponent({
  name: 'TChatReasoning',
  props,
  emits: ['update:collapsed'],
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('chat');
    const injectedRole = inject<ComputedRef<string>>('role');
    const role = computed(() => injectedRole?.value || '');
    provide('role', role);
    const renderTNodeJSX = useTNodeJSX();
    const { collapsed, modelValue } = toRefs(props);
    // Use useVModel for collapsed
    const [innerCollapsed, setInnerCollapsed] = useVModel(
      collapsed,
      modelValue,
      props.defaultCollapsed,
      props.onExpandChange,
      'collapsed',
    );

    const onChangeFn = (value: Array<number>) => {
      setInnerCollapsed(value.length === 0); // Update collapsed state based on value
    };

    return () => (
      <div class={`${COMPONENT_NAME.value}__detail-reasoning`}>
        <Collapse
          borderless={true}
          expandIconPlacement={props.expandIconPlacement}
          onChange={onChangeFn}
          value={innerCollapsed.value ? [] : [0]}
        >
          <CollapsePanel
            expandIcon={true}
            value={0}
            v-slots={{
              destroyOnCollapse: () => props?.collapsePanelProps?.destroyOnCollapse,
              disabled: () => props?.collapsePanelProps?.disabled,
              default: () => props?.collapsePanelProps?.content || renderTNodeJSX('default'),
              header: () => props?.collapsePanelProps?.header || renderTNodeJSX('header'),
              expandIcon: () => props?.collapsePanelProps?.expandIcon || renderTNodeJSX('expandIcon'),
              headerRightContent: () =>
                props?.collapsePanelProps?.headerRightContent || renderTNodeJSX('headerRightContent'),
              content: () => props?.collapsePanelProps?.content || renderTNodeJSX('default'),
            }}
          ></CollapsePanel>
        </Collapse>
      </div>
    );
  },
});
