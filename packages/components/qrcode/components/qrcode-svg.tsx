import { computed, defineComponent } from 'vue';
import { QRCodeSubComponentProps } from './props';
import {
  DEFAULT_NEED_MARGIN,
  DEFAULT_MINVERSION,
  excavateModules,
  generatePath,
} from '@tdesign/common-js/qrcode/utils';
import { useQRCode } from '../hooks/useQRCode';

export default defineComponent({
  name: 'QRCodeSVG',
  props: QRCodeSubComponentProps,
  setup(props) {
    const qrCodeData = computed(() =>
      useQRCode({
        value: props.value,
        level: props.level,
        minVersion: DEFAULT_MINVERSION,
        includeMargin: DEFAULT_NEED_MARGIN,
        marginSize: props.marginSize,
        imageSettings: props.imageSettings,
        size: props.size,
      }),
    );

    const cellsToDraw = computed(() => {
      const { cells, calculatedImageSettings } = qrCodeData.value;
      if (props.imageSettings && calculatedImageSettings.value?.excavation != null) {
        return excavateModules(cells.value, calculatedImageSettings.value.excavation);
      }
      return cells.value;
    });

    const imageNode = computed(() => {
      const { calculatedImageSettings, margin } = qrCodeData.value;
      if (!props.imageSettings || !calculatedImageSettings.value) return null;

      return (
        <image
          href={props.imageSettings.src}
          height={calculatedImageSettings.value.h}
          width={calculatedImageSettings.value.w}
          x={calculatedImageSettings.value.x + margin.value}
          y={calculatedImageSettings.value.y + margin.value}
          crossOrigin={calculatedImageSettings.value.crossOrigin}
        />
      );
    });

    return () => {
      const { margin, numCells } = qrCodeData.value;
      const fgPath = generatePath(cellsToDraw.value, margin.value);
      return (
        <svg
          height={props.size}
          width={props.size}
          viewBox={`0 0 ${numCells.value} ${numCells.value}`}
          role="img"
          style={props.style}
        >
          {!!props.title && <title>{props.title}</title>}
          <path fill={props.bgColor} d={`M0,0 h${numCells.value}v${numCells.value}H0z`} shape-rendering="crispEdges" />
          <path fill={props.fgColor} d={fgPath} shape-rendering="crispEdges" />
          {imageNode.value}
        </svg>
      );
    };
  },
});
