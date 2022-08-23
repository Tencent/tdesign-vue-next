import { computed, defineComponent, TransitionGroup, provide } from 'vue';

import props from './props';
import { useConfig } from '../hooks/useConfig';
import { useTNodeDefault } from '../hooks/tnode';
import { useCLASSNAMES, injectKey } from './constants';
import useTree from './useTree';
import useExposeFunc from './hooks/useExposeFunc';

export default defineComponent({
  name: 'TTree',
  props,
  setup(props, { expose, slots }) {
    const { globalConfig, t } = useConfig('tree');
    const CLASS_NAMES = useCLASSNAMES();
    const renderTNodeJSX = useTNodeDefault();

    // 向子组件传递的状态
    const statusContext = computed(() => {
      const { checkProps, empty, icon, label, line, disableCheck, operations } = props;
      return {
        checkProps,
        empty,
        icon,
        label,
        line,
        disableCheck,
        operations,
        scopedSlots: slots,
      };
    });
    provide(injectKey, statusContext);

    // tree核心逻辑
    const { treeStore, treeNodeViews } = useTree(props);

    // 导出方法
    useExposeFunc(treeStore, expose);

    const classList = computed(() => [
      CLASS_NAMES.value.tree,
      {
        [CLASS_NAMES.value.disabled]: props.disabled,
        [CLASS_NAMES.value.treeHoverAble]: props.hover,
        [CLASS_NAMES.value.treeCheckable]: props.checkable,
        [CLASS_NAMES.value.treeTransition]: props.transition,
        [CLASS_NAMES.value.treeBlockNode]: props.expandOnClickNode,
      },
    ]);

    return () => (
      <div class={classList.value}>
        {treeNodeViews.value.length === 0 ? (
          <div class={CLASS_NAMES.value.treeEmpty}>
            {renderTNodeJSX('empty', {
              defaultNode: t(globalConfig.value.empty),
            })}
          </div>
        ) : (
          <TransitionGroup
            name={CLASS_NAMES.value.treeNodeToggle}
            tag="div"
            enter-active-class={CLASS_NAMES.value.treeNodeEnter}
            leave-active-class={CLASS_NAMES.value.treeNodeLeave}
          >
            {treeNodeViews.value}
          </TransitionGroup>
        )}
      </div>
    );
  },
});
