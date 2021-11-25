import { defineComponent } from 'vue';
import { prefix } from '../config';
import props from './props';
import popupProps from '../popup/props';
import Popup, { PopupProps, PopupVisibleChangeContext } from '../popup';
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
      return [
        `${prefix}-tooltip`,
        { [`${prefix}-tooltip-${this.theme}`]: this.theme },
        this.overlayClassName,
      ];
    },
  },
  watch: {
    visible(visible) {
      if (this.timer && !visible) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    },
  },
  created() {
    if (this.duration && this.visible) {
      this.timer = setTimeout(() => {
        this.$emit('visible-change', false);
        clearTimeout(this.timer);
        this.timer = null;
      }, this.duration);
    }
  },
  methods: {
    onTipVisibleChange(val: boolean, ctx?: PopupVisibleChangeContext) {
      // 因 props={this.getPopupProps()} 已经透传 onVisibleChange props，此处不再需要使用 emitEvent
      if (this.timer && ctx?.trigger !== 'document') return;
      this.$emit('visible-change', val);
    },

    getPopupProps(): PopupProps {
      const r: PopupProps = {
        showArrow: true,
        ...this.$props,
        trigger: 'click',
        content: () => renderTNodeJSX(this, 'content'),
        default: () => renderContent(this, 'default', 'triggerElement'),
        overlayClassName: this.tooltipOverlayClassName,
        onVisibleChange: this.onTipVisibleChange,
      };
      return r;
    },
  },
  render() {
    return (
      <Popup
        visible={this.visible}
        showArrow={this.showArrow}
        {...this.getPopupProps()}
      />
    );
  },
});
