import { computed, defineComponent, ref, toRefs, watchEffect, onMounted } from 'vue';
import { QRCodeSubComponentProps } from './props';
import {
  DEFAULT_BACKGROUND_COLOR,
  DEFAULT_FRONT_COLOR,
  DEFAULT_NEED_MARGIN,
  DEFAULT_LEVEL,
  DEFAULT_MINVERSION,
  DEFAULT_SIZE,
  isSupportPath2d,
  excavateModules,
  generatePath,
} from '@tdesign/common-js/qrcode/utils';
import { useQRCode } from '../hooks/useQRCode';

export default defineComponent({
  name: 'QRCodeCanvas',
  props: QRCodeSubComponentProps,
  setup(props) {
    const {
      value,
      size = ref(DEFAULT_SIZE),
      level = ref(DEFAULT_LEVEL),
      bgColor = ref(DEFAULT_BACKGROUND_COLOR),
      fgColor = ref(DEFAULT_FRONT_COLOR),
      includeMargin = ref(DEFAULT_NEED_MARGIN),
      minVersion = ref(DEFAULT_MINVERSION),
      marginSize,
      imageSettings,
    } = toRefs(props);

    const imgSrc = computed(() => imageSettings.value?.src);

    const imageRef = ref<HTMLImageElement>(null);

    const canvasRef = ref<HTMLCanvasElement>(null);

    const imgCrossOrigin = ref('');

    const renderQRCode = () => {
      const { margin, cells, numCells, calculatedImageSettings } = useQRCode({
        value: value.value,
        level: level.value,
        minVersion: minVersion.value,
        includeMargin: includeMargin.value,
        marginSize: marginSize.value,
        imageSettings: imageSettings.value,
        size: size.value,
      });

      if (!canvasRef.value) {
        return;
      }

      const canvas = canvasRef.value;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        return;
      }

      imgCrossOrigin.value = calculatedImageSettings.value?.crossOrigin;

      let cellsToDraw = cells;
      const image = imageRef.value;

      if (image) {
        image.crossOrigin = calculatedImageSettings.value.crossOrigin;
      }

      const haveImageToRender =
        calculatedImageSettings.value &&
        image !== null &&
        image.complete &&
        image.naturalHeight !== 0 &&
        image.naturalWidth !== 0;

      if (haveImageToRender && calculatedImageSettings.value.excavation != null) {
        cellsToDraw = computed(() => excavateModules(cells.value, calculatedImageSettings.value.excavation));
      }

      const pixelRatio = window.devicePixelRatio || 1;
      canvas.height = size.value * pixelRatio;
      canvas.width = size.value * pixelRatio;
      const scale = (size.value / numCells.value) * pixelRatio;
      ctx.scale(scale, scale);

      ctx.fillStyle = bgColor.value;
      ctx.fillRect(0, 0, numCells.value, numCells.value);

      ctx.fillStyle = fgColor.value;
      if (isSupportPath2d) {
        ctx.fill(new Path2D(generatePath(cellsToDraw.value, margin.value)));
      } else {
        cells.value.forEach((row, rdx) => {
          row.forEach((cell, cdx) => {
            if (cell) {
              ctx.fillRect(cdx + margin.value, rdx + margin.value, 1, 1);
            }
          });
        });
      }

      if (calculatedImageSettings) {
        ctx.globalAlpha = calculatedImageSettings.value.opacity;
      }

      if (haveImageToRender) {
        ctx.globalAlpha = calculatedImageSettings.value.opacity;
        ctx.drawImage(
          image,
          calculatedImageSettings.value.x + margin.value,
          calculatedImageSettings.value.y + margin.value,
          calculatedImageSettings.value.w,
          calculatedImageSettings.value.h,
        );
      }
    };

    watchEffect(() => {
      renderQRCode();
    });

    onMounted(() => {
      renderQRCode();
    });

    return () => {
      return (
        <>
          <canvas ref={canvasRef} role="img" />
          {imgSrc.value != null ? (
            <img ref={imageRef} onLoad={renderQRCode} style={{ display: 'none' }} src={imgSrc.value} />
          ) : null}
        </>
      );
    };
  },
});
