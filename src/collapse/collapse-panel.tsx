import {
  defineComponent,
  ref,
  onMounted,
  nextTick,
  watch,
  computed,
  inject,
  Ref,
  toRefs,
  ComponentPublicInstance,
} from 'vue';
import { prefix } from '../config';
import props from './collapse-panel-props';
import { renderTNodeJSX } from '../utils/render-tnode';
import FakeArrow from '../common-components/fake-arrow';
import { CollapseValue } from './type';

const preName = `${prefix}-collapse-panel`;

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
    const wrapDom = ref<HTMLElement>();
    const headDom = ref<HTMLElement>();
    const bodyDom = ref<HTMLElement>();
    const handleClick = (e: MouseEvent) => {
      const canExpand =
        (expandOnRowClick.value && e.target === headDom.value) ||
        (e.target as Element).getAttribute('name') === 'arrow';
      if (canExpand && !(disableAll.value || disabled.value)) {
        updateCollapseValue(value.value);
      }
    };
    if (defaultExpandAll.value) {
      updateCollapseValue(value.value);
    }
    const isActive = computed(() =>
      collapseValue.value instanceof Array
        ? collapseValue.value.includes(value.value)
        : collapseValue.value === value.value,
    );
    watch(isActive, (activeVal) => updatePanelState(activeVal));
    const updatePanelState = (isActive: boolean) => {
      if (!wrapDom.value) return;
      const headHeight = headDom.value.getBoundingClientRect().height;
      const bodyHeight = bodyDom.value.getBoundingClientRect().height;
      wrapDom.value.style.height = isActive ? `${headHeight + bodyHeight}px` : `${headHeight}px`;
    };
    onMounted(() => {
      nextTick(() => {
        updatePanelState(isActive.value);
      });
    });
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
      const cls = [`${preName}__header`, { [`${preName}__header-is-clickable`]: expandOnRowClick.value }];
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
        <div ref="bodyDom" class={`${preName}__body`}>
          {renderTNodeJSX(context, 'default')}
        </div>
      );
    };
    return {
      renderHeader,
      renderBlank,
      renderBody,
      wrapDom,
      headDom,
      bodyDom,
    };
  },
  render() {
    const { renderBody, renderHeader } = this;
    return (
      <div class={preName}>
        <div ref="wrapDom" class={`${preName}__wrapper`}>
          {renderHeader(this)}
          {renderBody(this)}
        </div>
      </div>
    );
  },
});
