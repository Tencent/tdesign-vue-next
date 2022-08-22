import { defineComponent, onMounted, onUnmounted, ref, Fragment, Text, watch, PropType, VNode, Teleport } from 'vue';
import { useContent, useTNodeJSX } from '../hooks/tnode';
import { TdGuideStepProps } from './type';

export const GuidePopupStepContent = defineComponent({
  props: { content: [String, Function] as PropType<TdGuideStepProps['content']> },
  setup() {
    const renderTNodeJSX = useTNodeJSX();
    const el = ref(null);

    onMounted(() => {
      const { parentNode } = el.value;
      parentNode.parentNode.appendChild(el.value);
      parentNode.parentNode.removeChild(parentNode);
    });

    return () => <div ref={el}>{renderTNodeJSX('content', 'default')}</div>;
  },
});
