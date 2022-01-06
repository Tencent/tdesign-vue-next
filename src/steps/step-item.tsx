import { defineComponent, h } from 'vue';
import isFunction from 'lodash/isFunction';
import { CheckIcon, CloseIcon } from 'tdesign-icons-vue-next';
import { prefix } from '../config';
import props from './step-item-props';
import { renderTNodeJSX, renderContent } from '../utils/render-tnode';
import { ClassName, SlotReturnValue } from '../common';

import mixins from '../utils/mixins';
import getConfigReceiverMixins, { StepsConfig } from '../config-provider/config-receiver';

const name = `${prefix}-steps-item`;

export default defineComponent({
  ...mixins(getConfigReceiverMixins<StepsConfig>('steps')),
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
      return [name, { [`${name}--${this.status}`]: this.status }];
    },
    iconClass(): ClassName {
      return [`${name}__icon`, { [`${name}--${this.status}`]: this.status }];
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
        defaultIcon = <span class={`${name}__icon--number`}>{icon}</span>;
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
        <div class={`${name}__inner ${this.canClick ? `${name}--clickable` : ''}`} onClick={this.onStepClick}>
          <div class={this.iconClass}>{this.renderIcon()}</div>
          <div class={`${name}__content`}>
            <div class={`${name}__title`}>{renderTNodeJSX(this, 'title')}</div>
            <div class={`${name}__description`}>{content}</div>
            <div class={`${name}__extra`}>{renderTNodeJSX(this, 'extra')}</div>
          </div>
        </div>
      </div>
    );
  },
});
