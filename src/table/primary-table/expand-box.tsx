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
    handleClick(e: Event) {
      this.$emit('click', e);
    },
  },
  render() {
    const { expanded } = this;

    return (
      <span class={`${prefix}-table-expand-box`}onClick={this.handleClick}>
        {this.getExpandIcon(expanded)}
      </span>
    );
  },
});
