import { defineComponent, VNode, computed } from 'vue';
import props from './props';
import { useChildComponentSlots } from '../hooks/slot';
import { usePrefixClass } from '../hooks/useConfig';

export default defineComponent({
  name: 'TSwiper',
  components: {},

  props: { ...props },

  setup() {
    const items = computed(() => useChildComponentSlots('TSwiperItem'));
    const COMPONENT_NAME = usePrefixClass('swiper');
    const classPrefix = usePrefixClass();
    return {
      classPrefix,
      COMPONENT_NAME,
      items,
    };
  },

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
        <div class={`${this.COMPONENT_NAME}__content`}>
          <div class={`${this.COMPONENT_NAME}__swiper-wrap--${this.direction}`} style={wraperStyles}>
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
      `${this.COMPONENT_NAME}`,
      {
        [`${this.classPrefix}-is-hidden`]: !this.visible,
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
