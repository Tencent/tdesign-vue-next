import { computed, defineComponent, inject, ref, watch } from '@td/adapter-vue';
import props from '@td/intel/tabs/tab-panel-props';
import { useCommonClassName, useContent, useDestroyOnClose, usePrefixClass } from '@td/adapter-hooks';

import type { InjectTabs } from './tabs';

export default defineComponent({
  name: 'TTabPanel',

  props: { ...props },

  setup(props) {
    const COMPONENT_NAME = usePrefixClass('tab-panel');
    const { STATUS } = useCommonClassName();
    const renderTNodeContent = useContent();

    useDestroyOnClose();

    const tabs = inject<InjectTabs>('tabs');
    const isActive = computed(() => props.value === tabs.value.value);
    const isMount = ref(props.lazy ? isActive.value : true);

    watch(
      isActive,
      () => {
        if (isActive.value) {
          if (!isMount.value) {
            isMount.value = true;
          }
        } else if (props.destroyOnHide) {
          isMount.value = false;
        }
      },
      { immediate: true },
    );

    const tabPanelClass = computed(() => [
      COMPONENT_NAME.value,
      {
        [STATUS.value.hidden]: !isActive.value,
      },
    ]);
    return () => {
      if (!isMount.value) {
        return null;
      }
      return <div class={tabPanelClass.value}>{renderTNodeContent('default', 'panel')}</div>;
    };
  },
});
