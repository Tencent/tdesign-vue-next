import { defineComponent, ref, SetupContext, computed, shallowRef, onMounted } from 'vue';
import { TdBackTopProps } from './type';
import props from './props';
import { BacktopIcon as TIconBackTop } from 'tdesign-icons-vue-next';
import throttle from 'lodash/throttle';
import isString from 'lodash/isString';
import { getScrollContainer, scrollTo } from '../utils/dom';
import type { ScrollContainer, AttachNode } from '@src/common';
import { usePrefixClass, useConfig, useContent } from '../hooks';

export default defineComponent({
  name: 'TBackTop',
  components: { TIconBackTop },
  props,
  setup(props: TdBackTopProps) {
    const { classPrefix } = useConfig();

    const componentName = usePrefixClass('back-top');

    const visible = ref(false);

    const containerEl = shallowRef<HTMLElement>();

    const visibleHeight = isString(props.visibleHeight)
      ? +props.visibleHeight.match(/\d+/g).toString()
      : props.visibleHeight;

    const handleScroll = throttle(() => {
      visible.value = containerEl.value.scrollTop >= visibleHeight;
    }, 300);

    onMounted(() => {
      let container: AttachNode | string = 'body';

      if (props.container && props.container !== 'body') {
        container = props.container;
      } else if (props.target && props.target !== 'body') {
        container = props.target;
      }

      containerEl.value = getScrollContainer(container as ScrollContainer) as HTMLElement;

      if (containerEl.value) {
        containerEl.value.addEventListener('scroll', handleScroll);

        visible.value = containerEl.value.scrollTop >= visibleHeight;
      } else {
        console.error(`[${componentName.value}] container does not exist: ${container}`);
      }
    });

    const classes = computed(() => {
      return {
        [`${classPrefix.value}-is-fixed`]: true,
        [`${componentName.value}`]: true,
        [`${componentName.value}--${props.shape}`]: true,
      };
    });

    function handleOffset() {
      let [right, bottom] = props.offset;

      right = isString(right) ? right : `${right}px`;

      bottom = isString(bottom) ? bottom : `${bottom}px`;

      return { right, bottom };
    }

    const styles = handleOffset();

    const scrollToOptions = computed(() => ({
      container: containerEl.value,
      duration: props.duration,
    }));

    function click(e: MouseEvent) {
      scrollTo(0, scrollToOptions.value);

      props.onClick?.({ e });
    }

    const renderContent = useContent();

    return {
      visible,
      classes,
      styles,
      click,
      componentName,
      renderContent,
    };
  },
  render() {
    return (
      <div class={this.classes} style={this.styles} onClick={this.click} v-show={this.visible}>
        <TIconBackTop size="20"></TIconBackTop>
        <div class={`${this.componentName}__text`}>{this.renderContent('content', 'default')}</div>
      </div>
    );
  },
});
