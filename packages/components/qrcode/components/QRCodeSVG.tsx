import { computed, defineComponent, ref, toRefs } from 'vue';
import { QRCodeSubComponentProps } from './props';
import {
  DEFAULT_BACKGROUND_COLOR,
  DEFAULT_FRONT_COLOR,
  DEFAULT_NEED_MARGIN,
  DEFAULT_LEVEL,
  DEFAULT_MINVERSION,
  DEFAULT_SIZE,
  excavateModules,
  generatePath,
} from '@tdesign/common-js/qrcode/utils';
import { useQRCode } from '../hooks/useQRCode';

export default defineComponent({
  name: 'QRCodeSVG',
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
      title,
      marginSize,
      imageSettings,
      style,
    } = toRefs(props);

    const { margin, cells, numCells, calculatedImageSettings } = useQRCode({
      value: value.value,
      level: level.value,
      minVersion: minVersion.value,
      includeMargin: includeMargin.value,
      marginSize: marginSize.value,
      imageSettings: imageSettings.value,
      size: size.value,
    });

    const cellsToDraw = computed(() => {
      if (imageSettings.value && calculatedImageSettings.value?.excavation != null) {
        return excavateModules(cells.value, calculatedImageSettings.value.excavation);
      }
      return cells.value;
    });

    const imageNode = computed(() => {
      if (!imageSettings.value || !calculatedImageSettings.value) return null;

      return (
        <image
          href={imageSettings.value.src}
          height={calculatedImageSettings.value.h}
          width={calculatedImageSettings.value.w}
          x={calculatedImageSettings.value.x + margin.value}
          y={calculatedImageSettings.value.y + margin.value}
          crossOrigin={calculatedImageSettings.value.crossOrigin}
        />
      );
    });

    return () => {
      const fgPath = generatePath(cellsToDraw.value, margin.value);
      return (
        <svg
          height={size.value}
          width={size.value}
          viewBox={`0 0 ${numCells.value} ${numCells.value}`}
          role="img"
          style={style.value}
        >
          {!!title.value && <title>{title.value}</title>}
          <path fill={bgColor.value} d={`M0,0 h${numCells.value}v${numCells.value}H0z`} shape-rendering="crispEdges" />
          <path fill={fgColor.value} d={fgPath} shape-rendering="crispEdges" />
          {imageNode.value}
        </svg>
      );
    };
  },
});
