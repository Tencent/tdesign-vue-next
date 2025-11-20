import { defineComponent } from 'vue';
import { usePrefixClass } from '@tdesign/shared-hooks';
import props from './chat-loading-props';

export default defineComponent({
  name: 'TChatLoading',
  props,
  setup(props) {
    const componentName = usePrefixClass('chat-loading');

    return () => (
      <div class={`${componentName.value}`}>
        {props.animation === 'moving' ? (
          <div class={[`${componentName.value}__indicator`, `${componentName.value}__indicator--moving`]}>
            <div class={[`${componentName.value}__dot`, `${componentName.value}__dot--top`]} />
            <div class={[`${componentName.value}__dot`, `${componentName.value}__dot--left`]} />
            <div class={[`${componentName.value}__dot`, `${componentName.value}__dot--right`]} />
          </div>
        ) : (
          <div class={[`${componentName.value}__indicator`, `${componentName.value}__indicator--gradient`]} />
        )}
        <div class={`${componentName.value}__text`}>{props.text}</div>
      </div>
    );
  },
});
