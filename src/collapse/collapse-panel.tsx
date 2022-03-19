import { defineComponent, ref, onMounted, nextTick, watch } from 'vue';
import { prefix } from '../config';
import props from './collapse-panel-props';
import { renderTNodeJSX } from '../utils/render-tnode';
import FakeArrow from '../common-components/fake-arrow';

const preName = `${prefix}-collapse-panel`;

export default defineComponent({
  name: 'TCollapsePanel',
  inject: {
    collapse: {
      default: undefined,
    },
  },
  props,
  setup(props, ctx) {
    const isActive = ref(false);
    const wrapDom = ref<HTMLElement>();
    const headDom = ref<HTMLElement>();
    const bodyDom = ref<HTMLElement>();
    const handleClick = () => {
      isActive.value = !isActive.value;
    };
    const updatePanelState = () => {
      if (!wrapDom.value) {
        return;
      }
      const headHeight = headDom.value.getBoundingClientRect().height;
      const bodyHeight = bodyDom.value.getBoundingClientRect().height;
      wrapDom.value.style.height = !isActive.value ? `${headHeight}px` : `${headHeight + bodyHeight}px`;
    };
    watch(isActive, () => {
      nextTick(updatePanelState);
    });
    onMounted(() => {
      nextTick(() => {
        updatePanelState();
      });
    });
    return {
      handleClick,
      wrapDom,
      headDom,
      bodyDom,
      isActive,
    };
  },
  methods: {
    renderHeader() {
      const { header } = this;
      return (
        <div ref="headDom" class={`${preName}__header`} onClick={this.handleClick}>
          <FakeArrow isActive={this.expand} />
          {header}
        </div>
      );
    },
    renderBody() {
      if (this.$slots.default) {
        const body = this.$slots.default();
        return (
          <div ref="bodyDom" class={`${preName}__body`}>
            {body}
          </div>
        );
      }
      return null;
    },
  },
  render() {
    const rightIcon = renderTNodeJSX(this, 'headerRightContent');
    return (
      <div class={preName}>
        <div ref="wrapDom" class={`${preName}__wrapper`}>
          {this.renderHeader()}
          {this.renderBody()}
        </div>
      </div>
    );
  },
});
