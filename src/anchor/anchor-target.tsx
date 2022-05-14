import { defineComponent } from 'vue';
import { FileCopyIcon } from 'tdesign-icons-vue-next';
import { copyText } from '../utils/clipboard';
import Message from '../message/plugin';
import props from './anchor-target-props';
import { useConfig, usePrefixClass } from '../hooks/useConfig';

export default defineComponent({
  name: 'TAnchorTarget',
  props,
  setup(props, { slots }) {
    const { global, classPrefix } = useConfig('anchor');
    const COMPONENT_NAME = usePrefixClass('anchor');
    /**
     * 复制当前target的链接
     *
     */
    const toCopyText = () => {
      // 通过构造一个a标签, 自动拼接好传入的id为href
      const a = document.createElement('a');
      a.href = `#${props.id}`;
      copyText(a.href);
      Message.success(global.value.copySuccessText, 1000);
    };
    return () => {
      const { default: children } = slots;
      const { tag: TAG, id } = props;
      const className = [`${COMPONENT_NAME.value}__target`];
      const iconClassName = `${classPrefix.value}-copy`;
      return (
        <TAG id={id} class={className}>
          {children && children(null)}
          <t-popup content={global.value.copyText} placement="top" showArrow class={iconClassName}>
            <FileCopyIcon onClick={toCopyText} />
          </t-popup>
        </TAG>
      );
    };
  },
});
