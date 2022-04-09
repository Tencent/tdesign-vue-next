import { defineComponent } from 'vue';
import props from './props';
import popupProps from '../popup/props';
import Popup, { PopupProps, PopupVisibleChangeContext } from '../popup';
import { ClassName } from '../common';
import { renderTNodeJSX, renderContent } from '../utils/render-tnode';
import { emitEvent } from '../utils/event';
import { usePrefixClass } from '../hooks/useConfig';

export default defineComponent({
  name: 'TTooltip',
  components: { Popup },
  props: {
    ...popupProps,
    ...props,
  },
  emits: ['visible-change'],
  setup() {
    const classPrefix = usePrefixClass();
    return {
      classPrefix,
    };
  },
  data() {
    return {
      timer: null,
      tooltipVisible: false,
    };
  },
  computed: {
    tooltipOverlayClassName(): ClassName {
      return [
        `${this.classPrefix}-tooltip`,
        { [`${this.classPrefix}-tooltip--${this.theme}`]: this.theme },
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
        emitEvent(this, 'visible-change', false);
        clearTimeout(this.timer);
        this.timer = null;
      }, this.duration);
    }
  },
  methods: {
    onTipVisibleChange(val: boolean, ctx?: PopupVisibleChangeContext) {
      // 因 props={this.getPopupProps()} 已经透传 onVisibleChange props，此处不再需要使用 emitEvent
      if (this.timer && ctx?.trigger !== 'document') return;
      emitEvent(this, 'visible-change', val);
    },

    getPopupProps(): PopupProps {
      const r: PopupProps = {
        showArrow: true,
        ...this.$props,
        content: () => renderTNodeJSX(this, 'content'),
        default: () => renderContent(this, 'default', 'triggerElement'),
        overlayClassName: this.tooltipOverlayClassName,
        onVisibleChange: this.onTipVisibleChange,
      };
      return r;
    },
  },
  render() {
    return <Popup visible={this.visible} showArrow={this.showArrow} {...this.getPopupProps()} />;
  },
});
