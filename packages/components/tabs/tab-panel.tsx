import { computed, defineComponent, inject, ref, watch } from 'vue';
import props from './tab-panel-props';
import { usePrefixClass, useCommonClassName } from '@tdesign/hooks';
import { useDestroyOnClose } from '@tdesign/hooks';
import { useContent } from '@tdesign/hooks';

import type { InjectTabs } from './tabs';

export default defineComponent({
  name: 'TTabPanel',
  props,
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
      if (!isMount.value) return null;
      return <div class={tabPanelClass.value}>{renderTNodeContent('default', 'panel')}</div>;
    };
  },
});
