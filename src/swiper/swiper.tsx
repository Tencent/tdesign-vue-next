import { defineComponent, VNode } from 'vue';
import { prefix } from '../config';
import props from './props';
import { TVNode } from '../common';

const name = `${prefix}-swiper`;

export default defineComponent({
  name,
  components: {},

  props: { ...props },

  data() {
    return {
      // 是否可见，关闭后置为false
      visible: true,
      // 轮播序列
      index: 0,
      // 自动轮播定时器handler
      timeoutHandler: null,
    };
  },

  computed: {
    items(): VNode[] {
      const { default: defaultSlot } = this.$slots;
      return ((defaultSlot && defaultSlot()) || []).filter((child) => {
        const node = child as VNode;
        return node.type && (node.type as TVNode).name === `${prefix}-swiper-item`;
      });
    },
  },

  watch: {
    interval: {
      handler() {
        this.swiperTo(this.index); // 重置定时器
      },
      immediate: true,
    },
  },

  methods: {
    renderContent(): VNode {
      let wraperStyles = {};
      if (this.direction === 'vertical') {
        wraperStyles = {
          height: `${this.items.length * 100}%`,
          transform: `translate3d(0,${(-this.index * 100) / this.items.length}%,0)`,
          transition: `transform ${this.duration / 1000}s`,
        };
      } else {
        wraperStyles = {
          width: `${this.items.length * 100}%`,
          transform: `translate3d(${(-this.index * 100) / this.items.length}%,0,0)`,
          transition: `transform ${this.duration / 1000}s`,
        };
      }
      return (
        <div class={`${name}__content`}>
          <div class={`${name}__swiper-wrap--${this.direction}`} style={wraperStyles}>
            {this.items}
          </div>
        </div>
      );
    },

    renderTrigger(): VNode {
      const index = this.index % this.items.length;
      return (
        <ul class="t-swiper__trigger-wrap">
          {this.items.map((_: VNode, i: number) => (
            <li class={i === index ? 't-swiper__trigger--active' : ''} onclick={() => this.swiperTo(i)}></li>
          ))}
        </ul>
      );
    },

    swiperToNext() {
      this.swiperTo(this.index + 1);
    },

    swiperTo(index: number) {
      const findIndex = this.items.length === 0 ? 0 : index % this.items.length;
      if (this.timeoutHandler) {
        this.clearTimer();
      }
      this.index = findIndex;
      if (this.interval > 0) {
        this.timeoutHandler = setTimeout(() => {
          this.swiperToNext();
        }, this.interval);
      }
    },

    setTimer() {
      if (this.interval > 0) {
        this.timeoutHandler = Number(
          setTimeout(() => {
            this.clearTimer();
            this.swiperToNext();
          }, this.interval),
        );
      }
    },

    clearTimer() {
      clearTimeout(this.timeoutHandler);
      this.timeoutHandler = null;
    },
  },
  render(): VNode {
    const swiperClass = [
      `${name}`,
      {
        [`${prefix}-is-hidden`]: !this.visible,
      },
    ];
    return (
      <div class={swiperClass} onMouseenter={this.clearTimer} onMouseleave={this.setTimer}>
        {this.renderContent()}
        {this.renderTrigger()}
      </div>
    );
  },
});
