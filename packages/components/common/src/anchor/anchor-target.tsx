import { defineComponent } from '@td/adapter-vue';
import { FileCopyIcon as TdFileCopyIcon } from 'tdesign-icons-vue-next';
import props from '@td/intel/anchor/anchor-target-props';
import { useConfig, useGlobalIcon, usePrefixClass } from '@td/adapter-hooks';
import { copyText } from '../utils/clipboard';
import Message from '../message/plugin';
import Popup from '../popup';

export default defineComponent({
  name: 'TAnchorTarget',
  props,
  setup(props, { slots }) {
    const { globalConfig, classPrefix } = useConfig('anchor');
    const { FileCopyIcon } = useGlobalIcon({ FileCopyIcon: TdFileCopyIcon });
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
      Message.success(globalConfig.value.copySuccessText, 1000);
    };
    return () => {
      const { default: children } = slots;
      const { tag: TAG, id } = props;
      const className = [`${COMPONENT_NAME.value}__target`];
      const iconClassName = `${classPrefix.value}-copy`;
      return (
        <TAG id={id} class={className}>
          {children && children(null)}
          <Popup content={globalConfig.value.copyText} placement="top" showArrow class={iconClassName}>
            <FileCopyIcon onClick={toCopyText} />
          </Popup>
        </TAG>
      );
    };
  },
});
