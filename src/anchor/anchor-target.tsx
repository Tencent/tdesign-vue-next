import { defineComponent } from 'vue';
import { FileCopyIcon } from 'tdesign-icons-vue-next';
import { copyText } from '../utils/clipboard';
import Message from '../message/plugin';
import props from './anchor-target-props';
import TPopup from '../popup';
import { useConfig, usePrefixClass } from '../hooks/useConfig';

export default defineComponent({
  name: 'TAnchorTarget',

  components: {
    TPopup,
    FileCopyIcon,
  },

  props: { ...props },

  setup() {
    const { global, classPrefix } = useConfig('anchor');
    const COMPONENT_NAME = usePrefixClass('anchor');
    return {
      COMPONENT_NAME,
      global,
      classPrefix,
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
      Message.success(this.global.copySuccessText, 1000);
    },
  },
  render() {
    const {
      COMPONENT_NAME,
      classPrefix,
      tag: TAG,
      $slots: { default: children },
      id,
    } = this;
    const className = [`${COMPONENT_NAME}__target`];
    const iconClassName = `${classPrefix}-copy`;
    return (
      <TAG id={id} class={className}>
        {children && children(null)}
        <t-popup content={this.global.copyText} placement="top" showArrow class={iconClassName}>
          <FileCopyIcon onClick={this.copyText} />
        </t-popup>
      </TAG>
    );
  },
});
