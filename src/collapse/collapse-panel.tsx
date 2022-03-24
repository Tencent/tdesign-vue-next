import { defineComponent, ref, onMounted, nextTick, watch, computed, inject, Ref, toRefs } from 'vue';
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
    const { header, value, disabled } = toRefs(props);
    const { slots } = context;
    const collapseValue: Ref<CollapseValue> = inject('collapseValue');
    const updateCollapseValue: Function = inject('updateCollapseValue');
    const defaultExpandAll: Ref<boolean> = inject('defaultExpandAll');
    const disableAll: Ref<boolean> = inject('disableAll');
    const wrapDom = ref<HTMLElement>();
    const headDom = ref<HTMLElement>();
    const bodyDom = ref<HTMLElement>();
    const handleClick = () => {
      if (!(disableAll.value || disabled.value)) {
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
    const renderHeader = () => {
      return (
        <div ref="headDom" class={`${preName}__header`} onClick={handleClick}>
          <FakeArrow isActive={isActive.value} />
          {header.value}
        </div>
      );
    };
    const renderBody = () => {
      if (slots?.default) {
        const body = slots.default();
        return (
          <div ref="bodyDom" class={`${preName}__body`}>
            {body}
          </div>
        );
      }
    };
    return {
      renderHeader,
      renderBody,
      wrapDom,
      headDom,
      bodyDom,
    };
  },
  render() {
    const { renderHeader, renderBody } = this;
    return (
      <div class={preName}>
        <div ref="wrapDom" class={`${preName}__wrapper`}>
          {renderHeader()}
          {renderBody()}
        </div>
      </div>
    );
  },
});
