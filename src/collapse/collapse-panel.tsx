import { defineComponent, ref, onMounted, watch, computed, inject, Ref, toRefs, ComponentPublicInstance } from 'vue';
import { prefix } from '../config';
import props from './collapse-panel-props';
import { renderTNodeJSX } from '../utils/render-tnode';
import FakeArrow from '../common-components/fake-arrow';
import SlideDown from './slide-down';
import { CollapseValue } from './type';

const preName = `${prefix}-collapse-panel`;
const DISABLE_CLASS = `${prefix}-is-disabled`;
const CLICKABLE_CLASS = `${prefix}-is-clickable`;

export default defineComponent({
  name: 'TCollapsePanel',
  props,
  setup(props, context) {
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
    const headDom = ref<HTMLElement>();
    const isDisabled = computed(() => disabled.value || disableAll.value);
    const isActive = computed(() =>
      collapseValue.value instanceof Array
        ? collapseValue.value.includes(value.value)
        : collapseValue.value === value.value,
    );
    const classes = computed(() => {
      return [preName, { [DISABLE_CLASS]: isDisabled.value }];
    });
    const handleClick = (e: MouseEvent) => {
      const canExpand =
        (expandOnRowClick.value && e.target === headDom.value) ||
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
          overlayClassName={`${preName}__icon ${preName}__icon--${direction}`}
        />
      );
    };
    const renderBlank = () => {
      return <div class={`${preName}__header--blank`}></div>;
    };
    const renderHeader = (context: ComponentPublicInstance) => {
      const cls = [
        `${preName}__header`,
        {
          [CLICKABLE_CLASS]: expandOnRowClick.value && !isDisabled.value,
        },
      ];
      return (
        <div ref="headDom" class={cls} onClick={handleClick}>
          {expandIcon.value && expandIconPlacement.value === 'left' ? renderIcon(expandIconPlacement.value) : null}
          {renderTNodeJSX(context, 'header')}
          {renderBlank()}
          {renderTNodeJSX(context, 'headerRightContent')}
          {expandIcon.value && expandIconPlacement.value === 'right' ? renderIcon(expandIconPlacement.value) : null}
        </div>
      );
    };
    const renderBody = (context: ComponentPublicInstance) => {
      return (
        <div v-show={isActive.value} class={`${preName}__body`}>
          <div class={`${preName}__content`}>{renderTNodeJSX(context, 'default')}</div>
        </div>
      );
    };
    return {
      renderHeader,
      renderBlank,
      renderBody,
      headDom,
      classes,
    };
  },
  render() {
    const { renderBody, renderHeader, classes } = this;

    return (
      <div class={classes}>
        <div class={`${preName}__wrapper`}>
          {renderHeader(this)}
          <SlideDown>{renderBody(this)}</SlideDown>
        </div>
      </div>
    );
  },
});
