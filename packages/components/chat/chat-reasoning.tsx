import { defineComponent, computed, provide, inject, ComputedRef } from 'vue';
import { usePrefixClass } from '../hooks/useConfig';
import props from './chat-reasoning-props';
import { Collapse, CollapsePanel } from '../collapse';
import { useTNodeJSX } from '../hooks/tnode';

export default defineComponent({
  name: 'TChatReasoning',
  props,
  setup(props) {
    const COMPONENT_NAME = usePrefixClass('chat');
    // 修复响应式链断裂问题
    const injectedRole = inject<ComputedRef<string>>('role');
    const role = computed(() => injectedRole?.value || '');
    provide('role', role);
    const renderTNodeJSX = useTNodeJSX();

    return () => (
      <>
        {role.value === 'assistant' ? (
          <div class={`${COMPONENT_NAME.value}__detail-reasoning`}>
            <Collapse
              borderless={true}
              defaultExpandAll={true}
              expandIconPlacement={props.expandIconPlacement}
              onChange={props.onExpandChange}
            >
              <CollapsePanel
                expandIcon={true}
                value="0"
                v-slots={{
                  destroyOnCollapse: () => props?.collapsePanelProps?.destroyOnCollapse,
                  disabled: () => props?.collapsePanelProps?.disabled,
                  default: () => props?.collapsePanelProps?.content || renderTNodeJSX('default'),
                  header: () => props?.collapsePanelProps?.header || renderTNodeJSX('header'), // 保证响应式
                  expandIcon: () => props?.collapsePanelProps?.expandIcon || renderTNodeJSX('expandIcon'),
                  headerRightContent: () =>
                    props?.collapsePanelProps?.headerRightContent || renderTNodeJSX('headerRightContent'),
                  content: () => props?.collapsePanelProps?.content || renderTNodeJSX('default'), // 保证响应式
                }}
              ></CollapsePanel>
            </Collapse>
          </div>
        ) : null}
      </>
    );
  },
});
