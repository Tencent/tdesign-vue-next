import { computed, onMounted, defineComponent, watch, ref, reactive, shallowRef } from 'vue';
import props from './props';
import generateBase64Url from '../_common/js/watermark/generateBase64Url';
import randomMovingStyle from '../_common/js/watermark/randomMovingStyle';
import injectStyle from '../_common/js/utils/injectStyle';
import { usePrefixClass } from '../hooks/useConfig';
import { useMutationObserver } from './hooks';
import { useContent } from '../hooks/tnode';
import setStyle from '../_common/js/utils/set-style';

export default defineComponent({
  name: 'TWatermark',
  props,
  setup(props) {
    const backgroundImage = ref('');
    const watermarkRef = shallowRef<HTMLElement>();
    const watermarkContentRef = shallowRef<HTMLElement>();

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

    const removeWaterMark = () => {
      if (!watermarkContentRef.value) return;
      watermarkContentRef.value.remove();
      watermarkContentRef.value = null;
    };

    const injectWaterMark = () => {
      generateBase64Url(bgImageOptions.value, (base64Url) => {
        removeWaterMark();

        backgroundImage.value = base64Url;
        watermarkContentRef.value = document.createElement('div');
        setStyle(watermarkContentRef.value, {
          zIndex: props.zIndex,
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          backgroundSize: `${gapX.value + props.width}px`,
          pointerEvents: 'none',
          backgroundRepeat: backgroundRepeat.value,
          backgroundImage: `url('${backgroundImage.value}')`,
          animation: props.movable ? `watermark infinite ${(props.moveInterval * 4) / 60}s` : 'none',
        });
        watermarkRef.value?.append(watermarkContentRef.value);
      });

      if (props.movable) {
        const keyframesStyle = randomMovingStyle();
        injectStyle(keyframesStyle);
      }
    };

    onMounted(() => {
      injectWaterMark();
      useMutationObserver(
        watermarkRef.value,
        (mutations) => {
          if (props.removable || !watermarkContentRef.value) return;
          for (const mutation of mutations) {
            const isRemoved = Array.from(mutation.removedNodes).includes(watermarkContentRef.value);
            const isModified = mutation.type === 'attributes' && watermarkContentRef.value === mutation.target;
            if (isRemoved || isModified) {
              injectWaterMark();
              break;
            }
          }
        },
        {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true,
        },
      );
    });

    watch(() => props, injectWaterMark, { deep: true, flush: 'post' });

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
      </div>
    );
  },
});
