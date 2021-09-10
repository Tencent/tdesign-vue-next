import { defineComponent, VNode } from 'vue';
import { prefix } from '../config';
import Popup from '../popup/index';
import DropdownMenu from './dropdown-menu';
import { DropdownOption } from './type';
import props from './props';

const name = `${prefix}-dropdown`;

export default defineComponent({
  name,
  components: {
    DropdownMenu
  },
  props: {
    ...props,
  },
  emits: ['click', 'visibleChange'],
  methods: {
    handleMenuClick(data: DropdownOption, context: { e: MouseEvent }) {
      if (this.hideAfterItemClick) {
        const {
          popupElem,
        }: any = this.$refs;
        popupElem.handleClose();
      }
      this.$emit('click', data, context)
    },
  },
  render() {
    const trigger: VNode[] | VNode | string = this.$slots.default
      ? this.$slots.default(null) : '';

    const popupProps = {
      ...this.$attrs,
      disabled: this.disabled,
      showArrow: false,
      placement: this.placement,
      trigger: this.trigger,
      overlayClassName: name,
      ref: 'popup',
    };

    return (
      <Popup {...popupProps} {...this.popupProps} destroyOnClose ref="popupElem" expandAnimation v-slots={{
        content: () => <dropdown-menu
          options={this.options}
          maxHeight={this.maxHeight}
          maxColumnWidth={this.maxColumnWidth}
          minColumnWidth={this.minColumnWidth}
          onClick={this.handleMenuClick}
        />,
      }}>
        {trigger}
      </Popup>
    );
  },
});
