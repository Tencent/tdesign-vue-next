import { defineComponent, ref, computed, inject, Ref, toRefs } from 'vue';
import props from './collapse-panel-props';
import FakeArrow from '../common-components/fake-arrow';
import SlideDown from './slide-down';
import { CollapseValue } from './type';
import { useTNodeJSX } from '../hooks/tnode';
import { usePrefixClass } from '../config-provider';

export default defineComponent({
  name: 'TCollapsePanel',
  props,
  setup(props, context) {
    const renderTNodeJSX = useTNodeJSX();
    const COMPONENT_NAME = usePrefixClass('collapse-panel');
    const DISABLE_CLASS = usePrefixClass('is-disabled');
    const CLICKABLE_CLASS = usePrefixClass('is-clickable');
    const { value, disabled } = toRefs(props);
    const collapseValue: Ref<CollapseValue> = inject('collapseValue');
    const updateCollapseValue: Function = inject('updateCollapseValue');
    const {
      defaultExpandAll,
      disabled: disableAll,
      expandIconPlacement,
      expandOnRowClick,
      expandIcon,
    } = inject('collapseProps');
    if (defaultExpandAll.value) {
      updateCollapseValue(value.value);
    }
    const headRef = ref<HTMLElement>();
    const isDisabled = computed(() => disabled.value || disableAll.value);
    const isActive = computed(() =>
      collapseValue.value instanceof Array
        ? collapseValue.value.includes(value.value)
        : collapseValue.value === value.value,
    );
    const classes = computed(() => {
      return [COMPONENT_NAME.value, { [DISABLE_CLASS.value]: isDisabled.value }];
    });
    const handleClick = (e: MouseEvent) => {
      const canExpand =
        (expandOnRowClick.value && e.target === headRef.value) ||
        (e.target as Element).getAttribute('name') === 'arrow';
      if (canExpand && !isDisabled.value) {
        updateCollapseValue(value.value);
      }
    };
    const renderIcon = (direction: string) => {
      return (
        <FakeArrow
          name="arrow"
          isActive={isActive.value}
          overlayClassName={`${COMPONENT_NAME.value}__icon ${COMPONENT_NAME.value}__icon--${direction}`}
        />
      );
    };
    const renderBlank = () => {
      return <div class={`${COMPONENT_NAME.value}__header--blank`}></div>;
    };
    const renderHeader = () => {
      const cls = [
        `${COMPONENT_NAME.value}__header`,
        {
          [CLICKABLE_CLASS.value]: expandOnRowClick.value && !isDisabled.value,
        },
      ];
      return (
        <div ref={headRef} class={cls} onClick={handleClick}>
          {expandIcon.value && expandIconPlacement.value === 'left' ? renderIcon(expandIconPlacement.value) : null}
          {renderTNodeJSX('header')}
          {renderBlank()}
          {renderTNodeJSX('headerRightContent')}
          {expandIcon.value && expandIconPlacement.value === 'right' ? renderIcon(expandIconPlacement.value) : null}
        </div>
      );
    };
    const renderBody = () => {
      return (
        <div v-show={isActive.value} class={`${COMPONENT_NAME.value}__body`}>
          <div class={`${COMPONENT_NAME.value}__content`}>{renderTNodeJSX('default')}</div>
        </div>
      );
    };
    return () => {
      return (
        <div class={classes.value}>
          <div class={`${COMPONENT_NAME.value}__wrapper`}>
            {renderHeader()}
            <SlideDown>{renderBody()}</SlideDown>
          </div>
        </div>
      );
    };
  },
});
