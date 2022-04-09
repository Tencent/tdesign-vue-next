import { defineComponent, inject } from 'vue';
import props from './tab-panel-props';
import { usePrefixClass } from '../hooks/useConfig';
import useDestroyOnClose from '../hooks/useDestroyOnClose';
import { useContent } from '../hooks/tnode';

import type { InjectTabs } from './tabs';

export default defineComponent({
  name: 'TTabPanel',

  props: { ...props },

  setup(props) {
    const COMPONENT_NAME = usePrefixClass('tab-panel');
    const renderTNodeContent = useContent();

    useDestroyOnClose();

    const tabs = inject<InjectTabs>('tabs');

    return () => {
      const isActive = props.value === tabs.value.value;

      if (props.destroyOnHide && !isActive) return null;
      return (
        <div class={COMPONENT_NAME.value} v-show={isActive}>
          {renderTNodeContent('default', 'panel')}
        </div>
      );
    };
  },
});
