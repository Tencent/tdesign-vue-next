import { computed, defineComponent, h, inject } from 'vue';
import isFunction from 'lodash/isFunction';
import { CheckIcon, CloseIcon } from 'tdesign-icons-vue-next';
import props from './step-item-props';
import { ClassName, SlotReturnValue } from '../common';
import { useConfig, usePrefixClass } from '../hooks/useConfig';
import { useTNodeJSX, useContent } from '../hooks';

export default defineComponent({
  name: 'TStepItem',
  props: { ...props, index: Number },

  setup(props) {
    const stepsState = inject('StepsState', undefined);
    const stepsProps = inject('StepsProps', undefined);

    const { global } = useConfig('steps');
    const canClick = computed(() => {
      return props.status !== 'process' && !stepsProps?.readonly;
    });

    // when props.value is undefined
    const onStepClick = (e: MouseEvent) => {
      if (!canClick.value) return;
      const val = props.value === undefined ? props.index : props.value;
      stepsState.setCurrent(val, stepsState.current, { e });
    };

    // class
    const COMPONENT_NAME = usePrefixClass('steps-item');
    const statusClass: ClassName = computed(() => ({ [`${COMPONENT_NAME.value}--${props.status}`]: props.status }));
    const baseClass: ClassName = computed(() => [COMPONENT_NAME.value, statusClass.value]);
    const iconClass: ClassName = computed(() => [`${COMPONENT_NAME.value}__icon`, statusClass.value]);

    // render
    const renderTNodeJSX = useTNodeJSX();
    const renderContent = useContent();
    const renderIcon = () => {
      let defaultIcon;
      if (stepsProps.theme === 'default') {
        let icon: SlotReturnValue = '';
        switch (props.status) {
          case 'finish':
            icon = <CheckIcon />;
            break;
          case 'error':
            if (isFunction(global.value.errorIcon)) {
              icon = global.value.errorIcon(h);
            } else {
              icon = <CloseIcon />;
            }
            break;
          default:
            icon = String(props.index + 1);
            break;
        }
        defaultIcon = <span class={`${COMPONENT_NAME.value}__icon--number`}>{icon}</span>;
      }
      return renderTNodeJSX('icon', defaultIcon);
    };

    return () => (
      <div class={baseClass.value}>
        <div
          class={`${COMPONENT_NAME.value}__inner ${canClick.value ? `${COMPONENT_NAME.value}--clickable` : ''}`}
          onClick={onStepClick}
        >
          <div class={iconClass.value}>{renderIcon()}</div>
          <div class={`${COMPONENT_NAME.value}__content`}>
            <div class={`${COMPONENT_NAME.value}__title`}>{renderTNodeJSX('title')}</div>
            <div class={`${COMPONENT_NAME.value}__description`}>{renderContent('default', 'content')}</div>
            <div class={`${COMPONENT_NAME.value}__extra`}>{renderTNodeJSX('extra')}</div>
          </div>
        </div>
      </div>
    );
  },
});
