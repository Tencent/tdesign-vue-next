import { defineComponent, VNode } from 'vue';
import { prefix } from '../config';
import Popup from '../popup/index';
import DropdownMenu from './dropdown-menu';
import { DropdownOption, TdDropdownProps } from './type';
import props from './props';
import { renderTNodeJSX } from '../utils/render-tnode';
import { emitEvent } from '../utils/event';

const name = `${prefix}-dropdown`;

export default defineComponent({
  name: 'TDropdown',
  components: {
    DropdownMenu,
  },
  provide() {
    return {
      dropdown: this,
    };
  },
  props: {
    ...props,
  },
  emits: ['click', 'visibleChange'],
  methods: {
    handleMenuClick(data: DropdownOption, context: { e: MouseEvent }) {
      if (this.hideAfterItemClick) {
        const { popupElem }: any = this.$refs;
        popupElem.handleClose();
      }
      emitEvent(this, 'click', data, context);
    },
  },
  render() {
    const trigger: VNode[] | VNode | string = this.$slots.default ? this.$slots.default(null) : '';

    const contentSlot: VNode[] | VNode | string = renderTNodeJSX(this, 'dropdown');
    const popupProps = {
      ...this.$attrs,
      disabled: this.disabled,
      placement: this.placement,
      trigger: this.trigger,
      overlayClassName: [name, (this.popupProps as TdDropdownProps['popupProps'])?.overlayClassName],
    };

    return (
      <Popup
        {...this.popupProps}
        {...popupProps}
        destroyOnClose
        ref="popupElem"
        expandAnimation
        v-slots={{
          content: () =>
            contentSlot || (
              <dropdown-menu
                options={this.options}
                maxHeight={this.maxHeight}
                maxColumnWidth={this.maxColumnWidth}
                minColumnWidth={this.minColumnWidth}
              />
            ),
        }}
      >
        {trigger}
      </Popup>
    );
  },
});
