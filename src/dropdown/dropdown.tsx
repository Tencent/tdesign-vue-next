import { defineComponent, VNode } from 'vue';
import { prefix } from '../config';
import Popup from '../popup/index';
import DropdownMenu from './dropdown-menu';
import { DropdownOption, TdDropdownProps } from './type';
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
      this.$emit('click', data, context);
    },
  },
  render() {
    const trigger: VNode[] | VNode | string = this.$slots.default
      ? this.$slots.default(null) : '';

    const POPUP_PROPS = this.popupProps as TdDropdownProps['popupProps'];

    const overlayClassName = POPUP_PROPS && POPUP_PROPS.overlayClassName ? [name, POPUP_PROPS.overlayClassName] : name;
    const popupProps = {
      ...this.$attrs,
      disabled: this.disabled,
      placement: this.placement,
      trigger: this.trigger,
      overlayClassName,
      ref: 'popup'
    };

    return (
      <Popup {...popupProps}  destroyOnClose ref="popupElem" expandAnimation v-slots={{
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
