import { defineComponent, h } from 'vue';
import isFunction from 'lodash/isFunction';
import { CheckIcon, CloseIcon } from 'tdesign-icons-vue-next';
import props from './step-item-props';
import { renderTNodeJSX, renderContent } from '../utils/render-tnode';
import { ClassName, SlotReturnValue } from '../common';
import { useConfig, usePrefixClass } from '../hooks/useConfig';

export default defineComponent({
  name: 'TStepItem',
  components: {
    CheckIcon,
    CloseIcon,
  },
  inject: {
    steps: { default: undefined },
  },
  props: {
    ...props,
  },
  setup() {
    const COMPONENT_NAME = usePrefixClass('steps-item');
    const { global } = useConfig('steps');
    return {
      global,
      COMPONENT_NAME,
    };
  },
  data() {
    return {
      index: -1,
    };
  },
  computed: {
    current(): string | number {
      return this.steps && this.steps.current;
    },
    baseClass(): ClassName {
      return [this.COMPONENT_NAME, { [`${this.COMPONENT_NAME}--${this.status}`]: this.status }];
    },
    iconClass(): ClassName {
      return [`${this.COMPONENT_NAME}__icon`, { [`${this.COMPONENT_NAME}--${this.status}`]: this.status }];
    },
    canClick(): boolean {
      return this.status !== 'process' && !this.steps?.readonly;
    },
  },
  mounted() {
    this.steps.addItem(this);
  },
  unmounted() {
    this.steps.removeItem(this);
  },
  methods: {
    renderIcon() {
      let defaultIcon;
      if (this.steps.theme === 'default') {
        let icon: SlotReturnValue = '';
        switch (this.status) {
          case 'finish':
            icon = <check-icon />;
            break;
          case 'error':
            if (isFunction(this.global.errorIcon)) {
              icon = this.global.errorIcon(h);
            } else {
              icon = <close-icon />;
            }
            break;
          default:
            icon = String(this.index + 1);
            break;
        }
        defaultIcon = <span class={`${this.COMPONENT_NAME}__icon--number`}>{icon}</span>;
      }
      return renderTNodeJSX(this, 'icon', defaultIcon);
    },
    onStepClick(e: MouseEvent) {
      const val = this.value === undefined ? this.index : this.value;
      this.steps.handleChange(val, this.current, e);
    },
  },
  render() {
    const content = renderContent(this, 'default', 'content');
    return (
      <div class={this.baseClass}>
        <div
          class={`${this.COMPONENT_NAME}__inner ${this.canClick ? `${this.COMPONENT_NAME}--clickable` : ''}`}
          onClick={this.onStepClick}
        >
          <div class={this.iconClass}>{this.renderIcon()}</div>
          <div class={`${this.COMPONENT_NAME}__content`}>
            <div class={`${this.COMPONENT_NAME}__title`}>{renderTNodeJSX(this, 'title')}</div>
            <div class={`${this.COMPONENT_NAME}__description`}>{content}</div>
            <div class={`${this.COMPONENT_NAME}__extra`}>{renderTNodeJSX(this, 'extra')}</div>
          </div>
        </div>
      </div>
    );
  },
});
