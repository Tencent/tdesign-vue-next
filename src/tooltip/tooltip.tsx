import { defineComponent } from 'vue';
import { prefix } from '../config';
import props from './props';
import popupProps from '../popup/props';
import Popup, { PopupProps } from '../popup';
import { ClassName } from '../common';
import { renderTNodeJSX, renderContent } from '../utils/render-tnode';

const name = `${prefix}-tooltip`;

export default defineComponent({
  name,
  components: { Popup },
  props: {
    ...popupProps,
    ...props,
  },
  emits: ['visible-change'],
  data() {
    return {
      timer: null,
      tooltipVisible: false,
    };
  },
  computed: {
    tooltipOverlayClassName(): ClassName {
      const tmp = [
        `${prefix}-tooltip`,
        { [`${prefix}-tooltip-${this.theme}`]: this.theme },
        this.overlayClassName,
      ];
      const oClassName = this.$attrs.overlayClassName as PopupProps['overlayClassName'];
      if (oClassName instanceof Array) return oClassName.concat(tmp);
      return oClassName ? tmp.concat(oClassName) : tmp;
    },
  },
  watch: {
    visible: {
      handler(val) {
        this.tooltipVisible = val;
      },
      immediate: true,
    },
  },
  created() {
    if (this.duration) {
      this.timer = setTimeout(() => {
        this.tooltipVisible = false;
        clearTimeout(this.timer);
        this.timer = null;
      }, this.duration);
    }
  },
  methods: {
    onTipVisibleChange(val: boolean) {
      this.tooltipVisible = val;
      this.$emit('visible-change', this.tooltipVisible);
    },
    getPopupProps(): PopupProps {
      const r: PopupProps = {
        showArrow: true,
        ...this.$props,
        content: () => renderTNodeJSX(this, 'content'),
        default: () => renderContent(this, 'default', 'triggerElement'),
        overlayClassName: this.tooltipOverlayClassName,
      };
      delete r.visible;
      return r;
    },
  },
  render() {
    return (
      <Popup
        visible={this.tooltipVisible}
        showArrow={this.showArrow}
        {...this.getPopupProps()}
      ></Popup>
    );
  },
});
