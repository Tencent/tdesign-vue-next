import { computed, onMounted, defineComponent, watch, ref, reactive } from '@td/adapter-vue';
import { usePrefixClass, useContent } from '@td/adapter-hooks';

import props from '@td/intel/components/watermark/props';
import generateBase64Url from '@td/shared/_common/js/watermark/generateBase64Url';
import randomMovingStyle from '@td/shared/_common/js/watermark/randomMovingStyle';
import injectStyle from '@td/shared/_common/js/utils/injectStyle';

import { useMutationObserver } from './hooks';

export default defineComponent({
  name: 'TWatermark',
  props,
  setup(props) {
    const backgroundImage = ref('');
    const watermarkRef = ref<HTMLElement>();
    const watermarkContentRef = ref<HTMLElement>();
    const parent = ref<HTMLElement | null>();

    const offset = reactive(props.offset || []);

    const gapX = computed(() => {
      return !props.movable && props.x ? props.x : 0;
    });

    const gapY = computed(() => {
      return !props.movable && props.y ? props.y : 0;
    });

    const rotate = computed(() => {
      return !props.movable && props.rotate ? props.rotate : 0;
    });

    const backgroundRepeat = computed(() => {
      if (props.movable) {
        return 'no-repeat';
      }
      return props.isRepeat ? 'repeat' : 'no-repeat';
    });

    const offsetLeft = computed(() => {
      return offset[0] || (gapX.value || 0) / 2;
    });

    const offsetTop = computed(() => {
      return offset[1] || (gapY.value || 0) / 2;
    });

    const bgImageOptions = computed(() => ({
      width: props.width || 0,
      height: props.height || 0,
      rotate: rotate.value,
      lineSpace: props.lineSpace,
      alpha: props.alpha,
      gapX: gapX.value,
      gapY: gapY.value,
      watermarkContent: props.watermarkContent || {},
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
      parent.value = watermarkRef.value?.parentElement;
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
                  parent.value!.appendChild(element);
                }
                if (element === watermarkContentRef.value) {
                  watermarkRef.value!.appendChild(element);
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

    return () => {
      const COMPONENT_NAME = usePrefixClass('watermark');
      const renderContent = useContent();
      const {zIndex, width = 0, movable, moveInterval} = props;
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
              zIndex,
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              width: '100%',
              height: '100%',
              backgroundSize: `${gapX.value + width}px`,
              pointerEvents: 'none',
              backgroundRepeat: backgroundRepeat.value,
              backgroundImage: `url('${backgroundImage.value}')`,
              animation: movable ? `watermark infinite ${(moveInterval * 4) / 60}s` : 'none',
            }}
          />
        </div>
      );
    }
  }
});
