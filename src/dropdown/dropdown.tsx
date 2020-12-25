import Vue, { VNode } from 'vue';
import { prefix } from '../config';
import Popup from '../popup/index';
import DropdownMenu from './dropdown-menu';
import bus from './bus';

const name = `${prefix}-dropdown`;

let instanceCount = 0; // 组件实例数目

export default Vue.extend({
  name,
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    placement: {
      type: String,
      default: 'bottomLeft',
    },
    trigger: {
      type: String,
      default: 'hover',
    },
    hideAfterItemClick: {
      type: Boolean,
      default: true,
    },
    options: {
      type: Array,
      default: (): [] => [],
    },
    maxColumnHeight: {
      type: Number,
      default: 300,
    },
    minItemWidth: {
      type: Number,
      default: 10,
    },
    maxItemWidth: {
      type: Number,
      default: 100,
    },
  },
  data() {
    instanceCount += 1;
    return {
      busId: `${instanceCount}`,
    };
  },
  methods: {
    onShowChangeHandler(visible: boolean) {
      this.$emit('visibleChange', visible);
      if (!visible) {
        bus.$emit(`${this.busId}clearPath`);
      }
    },
  },
  mounted() {
    // console.log(this.busId);
    bus.$on(`${this.busId}item-click`, (data: any) => {
      if (this.hideAfterItemClick) {
        const {
          popupElem,
        }: any = this.$refs;
        popupElem.doClose();
      }
      // console.log(data);
      this.$emit('click', data);
    });
  },
  render() {
    const trigger: VNode[] | VNode | string = this.$scopedSlots.default
      ? this.$scopedSlots.default(null) : '';

    const popupProps = {
      props: {
        ...this.$attrs,
        disabled: this.disabled,
        visibleArrow: false,
        placement: this.placement,
        trigger: this.trigger,
        overlayClassName: name,
      },
      ref: 'popup',
      on: {
        visibleChange: this.onShowChangeHandler,
      },
    };

    return (
      <Popup {...popupProps} ref="popupElem">
        <template slot='content' role='dropdown'>
          <DropdownMenu
            busId={this.busId}
            options={this.options}
            maxColumnHeight={this.maxColumnHeight}
            maxItemWidth={this.maxItemWidth}
            minItemWidth={this.minItemWidth}
          />
        </template>
        {trigger}
      </Popup>
    );
  },
});
