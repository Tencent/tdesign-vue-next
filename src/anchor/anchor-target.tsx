import { defineComponent } from 'vue';
import { FileCopyIcon } from 'tdesign-icons-vue-next';
import { prefix } from '../config';
import { copyText } from '../utils/clipboard';
import Message from '../message/plugin';
import props from './anchor-target-props';
import TPopup from '../popup';
import { useConfig, useComponentName } from '../config-provider';

export default defineComponent({
  name: 'TAnchorTarget',

  components: {
    TPopup,
    FileCopyIcon,
  },

  props: { ...props },

  setup() {
    const { global } = useConfig('anchor');
    const COMPONENT_NAME = useComponentName('anchor');
    return {
      COMPONENT_NAME,
      global,
    };
  },
  methods: {
    /**
     * 复制当前target的链接
     *
     */
    copyText(): void {
      // 通过构造一个a标签, 自动拼接好传入的id为href
      const a = document.createElement('a');
      a.href = `#${this.id}`;
      copyText(a.href);
      Message.success(this.global.anchorCopySuccessText, 1000);
    },
  },
  render() {
    const {
      tag: TAG,
      $slots: { default: children },
      id,
    } = this;
    const className = [`${this.COMPONENT_NAME}__target`];
    const iconClassName = `${prefix}-copy`;
    return (
      <TAG id={id} class={className}>
        {children && children(null)}
        <t-popup content={this.global.anchorCopyText} placement="top" showArrow class={iconClassName}>
          <FileCopyIcon onClick={this.copyText} />
        </t-popup>
      </TAG>
    );
  },
});
