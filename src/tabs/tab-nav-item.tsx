import { defineComponent, ref } from 'vue';
import { CloseIcon } from 'tdesign-icons-vue-next';
import { TdTabsProps } from './type';
import { emitEvent } from '../utils/event';
import tabProps from './props';
import tabPanelProps from './tab-panel-props';

import useRipple from '../hooks/useRipple';
import { usePrefixClass, useCommonClassName } from '../config-provider';

export default defineComponent({
  name: 'TTabNavItem',
  components: {
    CloseIcon,
  },

  props: {
    index: Number,
    active: {
      type: Boolean,
    },
    theme: tabProps.theme,
    size: tabProps.size,
    placement: tabProps.placement,
    label: {
      type: null,
    },
    disabled: tabPanelProps.disabled,
    removable: tabPanelProps.removable,
    value: tabPanelProps.value,
  },

  emits: ['click', 'remove'],
  setup() {
    const itemRef = ref<HTMLElement>();
    useRipple(itemRef);

    const COMPONENT_NAME = usePrefixClass('tabs__nav-item');
    const classPrefix = usePrefixClass();
    const { STATUS, SIZE } = useCommonClassName();
    return {
      SIZE,
      STATUS,
      COMPONENT_NAME,
      itemRef,
      classPrefix,
    };
  },
  computed: {
    navItemClass(): {} {
      return {
        [this.COMPONENT_NAME]: true,
        [`${this.classPrefix}-tabs__nav--card`]: this.theme === 'card',
        [this.STATUS.disabled]: this.disabled,
        [this.STATUS.active]: this.active,
        [`${this.classPrefix}-is-left`]: this.placement === 'left',
        [`${this.classPrefix}-is-right`]: this.placement === 'right',
        [this.SIZE.medium]: this.size === 'medium',
        [this.SIZE.large]: this.size === 'large',
      };
    },
  },
  methods: {
    removeBtnClick({ e }: { e: MouseEvent }): void {
      e.stopPropagation();
      emitEvent<Parameters<TdTabsProps['onRemove']>>(this, 'remove', { e, value: this.value, index: this.index });
    },
    onClickNav(e: MouseEvent) {
      if (this.disabled) return;
      emitEvent<Parameters<(e: MouseEvent) => void>>(this, 'click', e);
    },
    renderCardItem() {
      return (
        <div class={this.navItemClass} onClick={this.onClickNav} ref="itemRef">
          <span class={`${this.COMPONENT_NAME}-text-wrapper`}>{this.label}</span>
          {this.removable && !this.disabled ? <CloseIcon class="remove-btn" onClick={this.removeBtnClick} /> : null}
        </div>
      );
    },
    renderNormalItem() {
      return (
        <div class={this.navItemClass} onClick={this.onClickNav}>
          <div
            class={[
              `${this.COMPONENT_NAME}-wrapper`,
              {
                [this.STATUS.disabled]: this.disabled,
                [this.STATUS.active]: this.active,
              },
            ]}
            ref="itemRef"
          >
            <span class={`${this.COMPONENT_NAME}-text-wrapper`}>{this.label}</span>
          </div>
        </div>
      );
    },
  },
  render() {
    return this.theme === 'card' ? this.renderCardItem() : this.renderNormalItem();
  },
});
