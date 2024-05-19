import { computed, onMounted, defineComponent, watch, ref, reactive } from 'vue';
import props from './props';
import generateBase64Url from '../_common/js/watermark/generateBase64Url';
import randomMovingStyle from '../_common/js/watermark/randomMovingStyle';
import injectStyle from '../_common/js/utils/injectStyle';
import { usePrefixClass } from '../hooks/useConfig';
import { useMutationObserver } from './hooks';
import { useContent } from '../hooks/tnode';

export default defineComponent({
  name: 'TWatermark',
  props,
  setup(props) {
    const backgroundImage = ref('');
    const watermarkRef = ref<HTMLElement>();
    const watermarkContentRef = ref<HTMLElement>();
    const parent = ref<HTMLElement>();

    const offset = reactive(props.offset || []);

    const gapX = computed(() => {
      return props.movable ? 0 : props.x;
    });

    const gapY = computed(() => {
      return props.movable ? 0 : props.y;
    });

    const rotate = computed(() => {
      return props.movable ? 0 : props.rotate;
    });

    const backgroundRepeat = computed(() => {
      if (props.movable) {
        return 'no-repeat';
      }
      return props.isRepeat ? 'repeat' : 'no-repeat';
    });

    const offsetLeft = computed(() => {
      return offset[0] || gapX.value / 2;
    });

    const offsetTop = computed(() => {
      return offset[1] || gapY.value / 2;
    });

    const bgImageOptions = computed(() => ({
      width: props.width,
      height: props.height,
      rotate: rotate.value,
      lineSpace: props.lineSpace,
      alpha: props.alpha,
      gapX: gapX.value,
      gapY: gapY.value,
      watermarkContent: props.watermarkContent,
      offsetLeft: offsetLeft.value,
      offsetTop: offsetTop.value,
    }));

    const injectWaterMark = () => {
      generateBase64Url(bgImageOptions.value, (base64Url) => {
        backgroundImage.value = base64Url;
      });
      const keyframesStyle = randomMovingStyle();
      injectStyle(keyframesStyle);
    };

    onMounted(() => {
      injectWaterMark();
      parent.value = watermarkRef.value.parentElement;
      useMutationObserver(
        parent.value,
        (mutations) => {
          if (props.removable) return;
          mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
              const removeNodes = mutation.removedNodes;
              removeNodes.forEach((node) => {
                const element = node as HTMLElement;
                if (element === watermarkRef.value) {
                  parent.value.appendChild(element);
                }
                if (element === watermarkContentRef.value) {
                  watermarkRef.value.appendChild(element);
                }
              });
            }
          });
        },
        {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true,
        },
      );
    });

    watch(() => props.watermarkContent, injectWaterMark, { deep: true });

    return {
      gapX,
      gapY,
      backgroundRepeat,
      backgroundImage,
      watermarkRef,
      watermarkContentRef,
      bgImageOptions,
    };
  },

  render() {
    const COMPONENT_NAME = usePrefixClass('watermark');
    const renderContent = useContent();

    return (
      <div
        style={{ position: 'relative', overflow: 'hidden', width: '100%' }}
        class={COMPONENT_NAME.value}
        ref="watermarkRef"
      >
        {renderContent('default', 'content')}
        <div
          ref="watermarkContentRef"
          style={{
            zIndex: this.zIndex,
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            backgroundSize: `${this.gapX + this.width}px`,
            pointerEvents: 'none',
            backgroundRepeat: this.backgroundRepeat,
            backgroundImage: `url('${this.backgroundImage}')`,
            animation: this.movable ? `watermark infinite ${(this.moveInterval * 4) / 60}s` : 'none',
          }}
        />
      </div>
    );
  },
});
