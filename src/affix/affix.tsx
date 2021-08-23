import { defineComponent } from  'vue';
import { prefix } from '../config';
import isFunction from 'lodash/isFunction';
import { on, off, getScrollContainer } from '../utils/dom';
import props from './props';
const name = `${prefix}-affix`;

export default defineComponent({
  name,

  props,

  emits: ['fixedChange'],

  data() {
    return {
      fixedTop: false as false | number,
      oldWidthHeight: { width: '0px', height: '0px' },
    };
  },

  watch: {
    offsetTop() {
      this.calcInitValue();
    },
    offsetBottom() {
      this.calcInitValue();
    },
  },
  async mounted() {
    await this.$nextTick();
    this.scrollContainer = getScrollContainer(this.container);
    this.calcInitValue();
    on(this.scrollContainer, 'scroll', this.handleScroll);
    on(window, 'resize', this.calcInitValue);
    if (!(this.scrollContainer instanceof Window)) on(window, 'scroll', this.handleScroll);
  },
  unmounted() {
    if (!this.scrollContainer) return;
    off(this.scrollContainer, 'scroll', this.handleScroll);
    off(window, 'resize', this.calcInitValue);
    if (!(this.scrollContainer instanceof Window)) off(window, 'scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          const { top } = this.$el.getBoundingClientRect(); // top = 节点到页面顶部的距离，包含 scroll 中的高度
          let containerTop = 0; // containerTop = 容器到页面顶部的距离
          if (this.scrollContainer instanceof HTMLElement) {
            containerTop = this.scrollContainer.getBoundingClientRect().top;
          }
          const calcTop = top - containerTop; // 节点顶部到 container 顶部的距离
          const calcBottom = containerTop + this.containerHeight - this.offsetBottom; // 计算 bottom 相对应的 top 值
          if (this.offsetTop !== undefined && calcTop <= this.offsetTop) {
            // top 的触发
            this.fixedTop = containerTop + this.offsetTop;
          } else if (this.offsetBottom !== undefined && top >= calcBottom) {
            // bottom 的触发
            this.fixedTop = calcBottom;
          } else {
            this.fixedTop = false;
          }
          this.ticking = false;
          this.$emit('fixedChange', this.fixedTop !== false, { top: this.fixedTop });
          if (isFunction(this.onFixedChange)) this.onFixedChange(this.fixedTop !== false, { top: this.fixedTop });
        });
        this.ticking = true;
      }
    },
    calcInitValue() {
      const { scrollContainer } = this;
      let containerHeight = 0; // 获取当前可视的高度
      if (scrollContainer instanceof Window) {
        containerHeight = scrollContainer.innerHeight;
      } else {
        containerHeight = scrollContainer.clientHeight;
      }
      // 需要减掉当前节点的高度，对比的高度应该从 border-top 比对开始
      this.containerHeight = containerHeight - this.$el.clientHeight;
      // 被包裹的子节点宽高
      const { clientWidth, clientHeight } = this.$el.querySelector(`.${name}`) || this.$el;
      this.oldWidthHeight = { width: `${clientWidth}px`, height: `${clientHeight}px` };

      this.handleScroll();
    },
  },
  render() {
    const {
      $slots: { default: children },
      oldWidthHeight,
      fixedTop,
      zIndex,
    } = this;

    if (fixedTop !== false) {
      return (
        <div>
          <div style={oldWidthHeight}></div>
          <div class={name} style={{ zIndex, top: `${fixedTop}px`, width: oldWidthHeight.width }}>
            {children?.()}
          </div>
        </div>
      );
    }

    return <div>{children?.()}</div>;
  },
});
