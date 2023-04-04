import classNames from 'classnames';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { TdBackTopProps } from './type';
import props from './props';
import { BacktopIcon, BacktopIcon as TIconBackTop } from 'tdesign-icons-vue-next';
import { scrollTo } from '../utils/dom';
import { useChildSlots, useConfig, useContent } from '../hooks';
import { AttachNode } from '..';

export default defineComponent({
  name: 'TBackTop',
  components: { TIconBackTop },
  props,
  setup(props: TdBackTopProps, { attrs }) {
    const visible = ref(false);
    const containerRef = ref(null);
    const { classPrefix } = useConfig('classPrefix');
    const renderContent = useContent();
    const getContainer = (container: AttachNode | string) => {
      if (typeof container === 'string') {
        if (container === 'body') {
          return document;
        }
        return document.querySelector(container);
      }
      if (typeof container === 'function') {
        return container();
      }
      return null;
    };
    onMounted(() => {
      containerRef.value = getContainer(props.container) as HTMLElement;
      let visibleHeight: number;
      if (typeof props.visibleHeight === 'string') {
        visibleHeight = Number(props.visibleHeight.replace('px', ''));
      } else {
        visibleHeight = props.visibleHeight;
      }
      if (visibleHeight === 0) {
        visible.value = true;
        return;
      }
      let scrollDOM: HTMLElement;
      if (containerRef.value.scrollTop === undefined) {
        scrollDOM = document.documentElement;
      } else {
        scrollDOM = containerRef.value;
      }
      containerRef.value.onscroll = () => {
        const scrollTop = scrollDOM.scrollTop;
        if (scrollTop >= visibleHeight) {
          visible.value = true;
          containerRef.value.onscroll = null;
        }
      };
    });
    return () => {
      const { theme, shape, size, target, duration, offset, container } = props;
      const getChild = useChildSlots();
      let children = getChild();
      if (children.length < 1) children = null;
      const cls = classNames(
        `${classPrefix.value}-back-top`,
        `${classPrefix.value}-back-top--theme-${theme}`,
        `${classPrefix.value}-back-top--${shape}`,
        {
          [`${classPrefix.value}-back-top--show`]: visible.value,
          [`${classPrefix.value}-size-s`]: size === 'small',
          [`${classPrefix.value}-size-m`]: size === 'medium',
        },
        attrs.class as string,
      );
      const defaultContent = (
        <>
          <BacktopIcon className={`${classPrefix.value}-back-top__icon`} size={'24'} />
          <span className={`${classPrefix.value}-back-top__text`}>TOP</span>
        </>
      );
      const getBackTo = () => {
        if (target === container) return 0;
        if (target === 'body') return 0;
        if (!target) return 0;
        const targetNode = getContainer(target);
        if (!targetNode) return 0;
        const y = (targetNode as HTMLElement).getBoundingClientRect().y;
        return y;
      };
      const handleClick = (e: MouseEvent) => {
        const y = getBackTo();
        scrollTo(y, { container: containerRef.value, duration });
        props.onClick({ e });
      };
      const positionStyle = computed(() => {
        return {
          insetInlineEnd: offset[0],
          insetBlockEnd: offset[1],
        };
      });
      return (
        <button type="button" className={cls} style={positionStyle.value} onClick={handleClick}>
          {renderContent('content', 'default', defaultContent)}
        </button>
      );
    };
  },
});
