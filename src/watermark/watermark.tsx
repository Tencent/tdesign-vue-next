import { computed, onMounted, defineComponent, h, VNode, ref, reactive } from 'vue';
import props from './props';
import generateBase64Url from '../_common/js/watermark/generateBase64Url';
import randomMovingStyle from '../_common/js/watermark/randomMovingStyle';
import injectStyle from '../_common/js/utils/injectStyle';

import { usePrefixClass } from '../hooks/useConfig';
import { useMutationObserver } from './hooks';

export default defineComponent({
  name: 'TWatermark',
  props,
  setup(props, { slots }) {
    const COMPONENT_NAME = usePrefixClass('watermark');
    const backgroundImage = ref('');
    const watermarkRef = ref<HTMLElement>();
    const parent = ref<HTMLElement>();

    const x = ref(props.x || 200);
    const y = ref(props.y || 210);
    const width = ref(props.width || 120);
    const height = ref(props.height || 60);
    const offset = reactive(props.offset || []);
    const zIndex = ref(props.zIndex || 10);

    const gapX = computed(() => {
      return props.movable ? 0 : x.value;
    });

    const gapY = computed(() => {
      return props.movable ? 0 : y.value;
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

    useMutationObserver(
      watermarkRef,
      (mutations) => {
        if (props.removable) return;
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            const removeNodes = mutation.removedNodes;
            removeNodes.forEach((node) => {
              watermarkRef.value.appendChild(node);
            });
          }
        });
      },
      { attributes: true, childList: true, characterData: true, subtree: true },
    );

    onMounted(() => {
      generateBase64Url(
        {
          width: width.value,
          height: height.value,
          rotate: rotate.value,
          lineSpace: props.lineSpace,
          alpha: props.alpha,
          gapX: gapX.value,
          gapY: gapY.value,
          watermarkContent: props.watermarkContent,
          offsetLeft: offsetLeft.value,
          offsetTop: offsetTop.value,
        },
        (base64Url) => {
          backgroundImage.value = base64Url;
        },
      );
      parent.value = watermarkRef.value.parentElement;
      const keyframesStyle = randomMovingStyle();
      injectStyle(keyframesStyle);
    });

    const { default: children } = slots;
    return () => (
      <div
        style={{ position: 'relative', overflow: 'hidden', width: '100%' }}
        class={COMPONENT_NAME.value}
        ref={watermarkRef}
      >
        {children?.(null) || props.content}
        <div
          class={''}
          style={{
            zIndex: zIndex.value,
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            backgroundSize: `${gapX.value + width.value}px`,
            pointerEvents: 'none',
            backgroundRepeat: backgroundRepeat.value,
            backgroundImage: `url('${backgroundImage.value}')`,
            animation: props.movable ? `watermark infinite ${(props.moveInterval * 4) / 60}s` : 'none',
          }}
        />
      </div>
    );
  },
});
