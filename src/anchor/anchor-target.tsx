import Vue from 'vue';
import { prefix } from '../config';
import { copyText } from '../utils/clipboard';
import Icon from '../icon';
import Message from '../message/plugin';

const name = `${prefix}-anchor-target`;

export default Vue.extend({
  name,

  components: {
    [Icon.name]: Icon,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      default: 'div',
    },
  },

  methods: {
    /**
     * 复制当前target的链接
     *
     */
    copyText() {
      // 通过构造一个a标签, 自动拼接好传入的id为href
      const a = document.createElement('a');
      a.href = `#${this.id}`;
      copyText(a.href);
      Message.success('链接复制成功', 1000);
    },
  },
  render() {
    const {
      tag: Tag,
      $scopedSlots: { default: children },
      id,
    } = this;
    const className = [name];
    return (
      <Tag id={id} class={className}>
        {children && children(null)}
        <t-popup content="复制链接" placement="top" visibleArrow>
          <t-icon name="file-copy" nativeOnClick={this.copyText} />
        </t-popup>
      </Tag>
    );
  },
});
