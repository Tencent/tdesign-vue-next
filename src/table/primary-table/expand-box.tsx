import { defineComponent, h } from 'vue';
import isFunction from 'lodash/isFunction';
import mixins from '../../utils/mixins';
import getLocalReceiverMixins from '../../locale/local-receiver';
import TIconChevronDown from '../../icon/chevron-down-circle';
import { prefix } from '../../config';
import { Styles } from '../../common';

export default defineComponent({
  ...mixins(getLocalReceiverMixins('table')),
  name: `${prefix}-expand-box`,
  components: {
    TIconChevronDown,
  },
  props: {
    expanded: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['click'],
  methods: {
    getExpandIcon(expanded: boolean) {
      const icon = isFunction(this.locale.expandIcon)
        ? this.locale.expandIcon(h)
        : <TIconChevronDown />;
      const style: Styles = {
        transition: 'all .2s',
        display: 'flex',
        'align-items': 'center',
      };
      if (!expanded) {
        style.transform = 'rotate(-180deg)';
      }
      return <span style={style}>{icon}</span>;
    },
  },
  render() {
    const { expanded } = this;
    return (
      <span onClick={(e) => { this.$emit('click', e); }} class={`${prefix}-table-expand-box`}>
        {this.getExpandIcon(expanded)}
      </span>
    );
  },
});
