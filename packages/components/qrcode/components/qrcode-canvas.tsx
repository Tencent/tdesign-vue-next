import { computed, defineComponent, ref, watchEffect, onMounted } from 'vue';
import { QRCodeSubComponentProps } from './props';
import {
  DEFAULT_NEED_MARGIN,
  DEFAULT_MINVERSION,
  isSupportPath2d,
  excavateModules,
  generatePath,
} from '@tdesign/common-js/qrcode/utils';
import { useQRCode } from '../hooks/useQRCode';

export default defineComponent({
  name: 'QRCodeCanvas',
  props: QRCodeSubComponentProps,
  setup(props) {
    const imgSrc = computed(() => props.imageSettings?.src);

    const imageRef = ref<HTMLImageElement>();

    const canvasRef = ref<HTMLCanvasElement>(null);

    const imgCrossOrigin = ref('');

    const renderQRCode = () => {
      const { margin, cells, numCells, calculatedImageSettings } = useQRCode({
        value: props.value,
        level: props.level,
        minVersion: DEFAULT_MINVERSION,
        includeMargin: DEFAULT_NEED_MARGIN,
        marginSize: props.marginSize,
        imageSettings: props.imageSettings,
        size: props.size,
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
      canvas.height = props.size * pixelRatio;
      canvas.width = props.size * pixelRatio;
      const scale = (props.size / numCells.value) * pixelRatio;
      ctx.scale(scale, scale);

      ctx.fillStyle = props.bgColor;
      ctx.fillRect(0, 0, numCells.value, numCells.value);

      ctx.fillStyle = props.fgColor;
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
