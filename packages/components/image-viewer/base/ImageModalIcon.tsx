import { computed, defineComponent, PropType } from 'vue';
import { useTNodeJSX, usePrefixClass } from '@tdesign/shared-hooks';
import { TNode } from '../../common';

export default defineComponent({
  name: 'TImageModalIcon',
  props: {
    disabled: Boolean,
    onClick: Function as PropType<(e: MouseEvent) => void>,
    label: String,
    icon: Function as PropType<TNode>,
  },
  setup(props) {
    const classPrefix = usePrefixClass();
    const renderTNodeJSX = useTNodeJSX();
    const wrapClass = computed(() => [
      `${classPrefix.value}-image-viewer__modal-icon`,
      {
        [`${classPrefix.value}-is-disabled`]: props.disabled,
      },
    ]);

    return () => (
      <div class={wrapClass.value} onClick={props.onClick}>
        {renderTNodeJSX('icon')}
        {props.label && <span class={`${classPrefix.value}-image-viewer__modal-icon-label`}>{props.label}</span>}
      </div>
    );
  },
});
