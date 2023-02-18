import { defineComponent, ref, SetupContext, computed, shallowRef, onMounted } from 'vue';
import { TdBackTopProps } from './type';
import props from './props';
import { usePrefixClass } from '../hooks/useConfig';
import { useConfig } from '../hooks/useConfig';
import { BacktopIcon as TIconBackTop } from 'tdesign-icons-vue-next';
import throttle from 'lodash/throttle';
import { useIcon } from '../hooks/icon';

export default defineComponent({
  name: 'TBackTop',
  components: { TIconBackTop },
  props,
  emits: ['to-top'],
  setup(props: TdBackTopProps, { emit, slots }: SetupContext) {
    const { classPrefix } = useConfig();

    const componentName = usePrefixClass('back-top');

    const visible = ref(false);

    const el = shallowRef<HTMLElement>();

    const containerEl = shallowRef<HTMLElement | Document>();

    const handleScroll = throttle(() => {
      visible.value = el.value.scrollTop >= props.visibilityHeight;
    }, 300);

    onMounted(() => {
      if (props.target) {
        containerEl.value = el.value = props.target();
      } else {
        containerEl.value = document;
        el.value = document.documentElement;
      }
      containerEl.value.addEventListener('scroll', handleScroll);
    });

    const classes = computed(() => {
      return {
        [`${componentName.value}`]: true,
        [`${classPrefix.value}-is-fixed`]: props.fixed,
        [`${componentName.value}--${props.shape}`]: true,
      };
    });

    function handleClick(e: MouseEvent) {
      el.value.scrollTo({ top: 0, behavior: 'smooth' });
      emit('to-top', e);
    }

    const renderIconTNode = useIcon();

    const renderIcon = () => {
      const iconNode = renderIconTNode('icon');
      return iconNode ? <div>{iconNode}</div> : <TIconBackTop size="18"></TIconBackTop>;
    };

    const renderText = () => {
      if (props.text || slots.text) {
        return <div class={`${componentName.value}__text`}>{props.text || slots.text()}</div>;
      } else {
        return null;
      }
    };

    return {
      classes,
      visible,
      handleClick,
      renderIcon,
      renderText,
    };
  },
  render() {
    return (
      <div class={this.classes} onClick={this.handleClick} v-show={this.visible}>
        {this.renderIcon()}
        {this.renderText()}
      </div>
    );
  },
});
